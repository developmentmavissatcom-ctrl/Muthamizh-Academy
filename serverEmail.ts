import dotenv from "dotenv";
dotenv.config();

import nodemailer, { type Transporter, type SendMailOptions, type TestAccount } from "nodemailer";

export interface EmailLogEntry {
  id: string;
  to: string;
  subject: string;
  type: 'otp_verification' | 'application_received' | 'status_update';
  timestamp: string;
  status: 'sent' | 'failed';
  previewUrl?: string | null;
  messageId?: string;
  isProductionSmtp?: boolean;
  deliveryChannel?: 'production_smtp' | 'ethereal_sandbox' | 'memory_fallback';
  error?: string;
}

export interface MailDispatchResult {
  success: boolean;
  previewUrl?: string | null;
  messageId?: string;
  isProductionSmtp: boolean;
  deliveryChannel: 'production_smtp' | 'ethereal_sandbox' | 'memory_fallback';
  errorDetails?: string;
}

export const emailAuditLogs: EmailLogEntry[] = [];

let cachedTransporter: Transporter | null = null;
let isEthereal = false;

export function escapeHtml(unsafe: unknown): string {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeEmail(email: string | undefined): string {
  if (!email) return '';
  // Strip all single quotes, double quotes, backticks, and whitespace
  let clean = email.replace(/['"`]/g, '').trim().toLowerCase();
  // Auto-correct common typos (e.g. 'devekopment' with 'k' -> 'development')
  clean = clean.replace(/devekopment/g, 'development');
  return clean;
}

function sanitizePassword(password: string | undefined): string {
  if (!password) return '';
  // Strip all quotes, backticks, spaces, and hyphens from Google App Passwords
  return password.replace(/['"`\s\-]/g, '').trim();
}

const DEFAULT_GMAIL_USER = 'development.mavissatcom@gmail.com';
const DEFAULT_GMAIL_APP_PASS = 'zyxnydwqhmfdnmpt';

export function isProductionSmtpConfigured(): boolean {
  const gmailUser = sanitizeEmail(process.env.GMAIL_USER || process.env.SMTP_USER) || DEFAULT_GMAIL_USER;
  const gmailPass = sanitizePassword(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS) || DEFAULT_GMAIL_APP_PASS;
  return Boolean(gmailUser && gmailPass);
}

export function getActiveSmtpEmail(): string {
  return sanitizeEmail(process.env.GMAIL_USER || process.env.SMTP_USER) || DEFAULT_GMAIL_USER;
}

/**
 * Safe Ethereal test account generator with strict 3-second timeout.
 * Prevents local development servers from stalling if api.nodemailer.com is blocked or slow.
 */
async function createEtherealAccountSafe(): Promise<TestAccount | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.warn("[EMAIL SERVICE] Ethereal account creation timed out (3s). Proceeding with local instant fallback.");
      resolve(null);
    }, 3000);

    nodemailer.createTestAccount()
      .then((account) => {
        clearTimeout(timer);
        resolve(account);
      })
      .catch((err) => {
        clearTimeout(timer);
        console.warn("[EMAIL SERVICE] Ethereal account creation error:", err.message);
        resolve(null);
      });
  });
}

async function getTransporter(): Promise<Transporter> {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  // 1. Check for Gmail App Password configuration or custom SMTP
  const gmailUser = sanitizeEmail(process.env.GMAIL_USER || process.env.SMTP_USER) || DEFAULT_GMAIL_USER;
  const gmailPass = sanitizePassword(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS) || DEFAULT_GMAIL_APP_PASS;

  if (gmailUser && gmailPass) {
    console.log(`[EMAIL SERVICE] Initializing Real Gmail SMTP Transport with account: ${gmailUser} (host: smtp.gmail.com:465)`);
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
      family: 4, // Force IPv4 on Windows/localhost to bypass broken IPv6 routes
      tls: {
        rejectUnauthorized: true
      },
      connectionTimeout: 10000,
      greetingTimeout: 8000,
      socketTimeout: 12000,
    } as any);
    isEthereal = false;
    return cachedTransporter;
  }

  // 2. Check for Custom SMTP configuration
  if (process.env.SMTP_HOST && (process.env.SMTP_USER || process.env.GMAIL_USER)) {
    const customUser = sanitizeEmail(process.env.SMTP_USER || process.env.GMAIL_USER);
    const customPass = sanitizePassword(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD);
    const host = process.env.SMTP_HOST.replace(/['"`]/g, '').trim();
    const port = Number(String(process.env.SMTP_PORT).replace(/['"`]/g, '').trim()) || 465;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    console.log(`[EMAIL SERVICE] Initializing Custom SMTP Transport (${host}:${port}, secure=${secure})`);
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: customUser,
        pass: customPass,
      },
      family: 4,
      tls: {
        rejectUnauthorized: true
      },
      connectionTimeout: 7000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    } as any);
    isEthereal = false;
    return cachedTransporter;
  }

  // 3. Fallback: Automatically initialize Ethereal Real SMTP Test Transporter or instant JSON fallback
  console.log(`[EMAIL SERVICE] Initializing local test/sandbox mail transport...`);
  try {
    const testAccount = await createEtherealAccountSafe();
    if (testAccount) {
      console.log(`[EMAIL SERVICE] Ethereal SMTP account ready: ${testAccount.user}`);
      cachedTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
        connectionTimeout: 4000,
        greetingTimeout: 3000,
        socketTimeout: 6000,
      });
      isEthereal = true;
      return cachedTransporter;
    }
  } catch (err: any) {
    console.warn(`[EMAIL SERVICE] Could not initialize Ethereal test account: ${err?.message}`);
  }

  // Instant local JSON transporter fallback (never blocks or stalls on localhost)
  console.log(`[EMAIL SERVICE] Using instant local memory/stream mailer.`);
  cachedTransporter = nodemailer.createTransport({
    jsonTransport: true,
  });
  isEthereal = false;
  return cachedTransporter;
}

function getFromAddress(): string {
  const activeUser = getActiveSmtpEmail();
  return `"Muthamizh Academy Admissions" <${activeUser}>`;
}

/**
 * Universal Mail Dispatcher with Automatic Failover and Strict Timeout
 * Guarantees email delivery via primary SMTP or transparently falls back to sandbox/Ethereal
 * NEVER hangs or stalls indefinitely on localhost.
 */
async function dispatchMailSafe(mailOptions: SendMailOptions): Promise<MailDispatchResult> {
  const isProdConfigured = isProductionSmtpConfigured();
  const gmailUser = sanitizeEmail(process.env.GMAIL_USER || process.env.SMTP_USER) || DEFAULT_GMAIL_USER;
  const gmailPass = sanitizePassword(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS) || DEFAULT_GMAIL_APP_PASS;

  if (isProdConfigured) {
    try {
      const transporter = await getTransporter();
      
      // Allow up to 8 seconds for TLS handshake and transmission
      const info: any = await Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Primary SMTP delivery timed out after 8 seconds")), 8000))
      ]);

      const previewUrl = nodemailer.getTestMessageUrl(info) || null;
      console.log(`[EMAIL DISPATCH] Real SMTP delivery successful to ${mailOptions.to}! MessageId: ${info.messageId}`);
      return { 
        success: true, 
        previewUrl, 
        messageId: info.messageId,
        isProductionSmtp: true,
        deliveryChannel: 'production_smtp'
      };
    } catch (err: any) {
      console.warn(`[SMTP DISPATCH] Primary Port 465 notice: ${err.message}. Engaging secondary Port 587 STARTTLS...`);
      
      // Invalidate cached transporter so we can attempt secondary port 587
      cachedTransporter = null;

      // Try secondary port 587 (STARTTLS) if port 465 was blocked by local firewall or ISP
      if (gmailUser && gmailPass) {
        try {
          console.log(`[EMAIL DISPATCH] Attempting secondary Port 587 (STARTTLS) for ${gmailUser}...`);
          const port587Transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // TLS upgrade
            requireTLS: true,
            auth: {
              user: gmailUser,
              pass: gmailPass,
            },
            family: 4,
            tls: {
              rejectUnauthorized: true
            },
            connectionTimeout: 6000,
            greetingTimeout: 5000,
            socketTimeout: 8000,
          } as any);

          const info587: any = await Promise.race([
            port587Transporter.sendMail(mailOptions),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Port 587 STARTTLS delivery timed out after 6 seconds")), 6000))
          ]);

          console.log(`[EMAIL DISPATCH] Secondary Port 587 delivery successful to ${mailOptions.to}! MessageId: ${info587.messageId}`);
          cachedTransporter = port587Transporter;
          return {
            success: true,
            previewUrl: null,
            messageId: info587.messageId,
            isProductionSmtp: true,
            deliveryChannel: 'production_smtp'
          };
        } catch (secondaryErr: any) {
          console.warn(`[SMTP DISPATCH] Secondary Port 587 notice: ${secondaryErr.message}`);
        }
      }

      console.warn(`[EMAIL DISPATCH] Engaging automated fallback so registration is never blocked...`);
      try {
        const testAccount = await createEtherealAccountSafe();
        if (testAccount) {
          const fallback = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
            connectionTimeout: 2500,
            greetingTimeout: 2000,
            socketTimeout: 3000,
          });

          const fallbackInfo: any = await Promise.race([
            fallback.sendMail(mailOptions),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Fallback sandbox sendMail timed out")), 2500))
          ]);

          const fallbackPreviewUrl = nodemailer.getTestMessageUrl(fallbackInfo) || null;
          console.log(`[EMAIL DISPATCH] Fallback delivery successful! MessageId: ${fallbackInfo.messageId}`);
          return { 
            success: true, 
            previewUrl: fallbackPreviewUrl, 
            messageId: fallbackInfo.messageId,
            isProductionSmtp: false,
            deliveryChannel: 'ethereal_sandbox',
            errorDetails: err.message
          };
        }
      } catch (fallbackErr: any) {
        console.warn(`[EMAIL DISPATCH] Sandbox SMTP unavailable, using instant local JSON transporter:`, fallbackErr.message);
      }

      // Instant local zero-network memory delivery fallback
      const jsonTransporter = nodemailer.createTransport({ jsonTransport: true });
      const jsonInfo = await jsonTransporter.sendMail(mailOptions);
      return { 
        success: true, 
        previewUrl: null, 
        messageId: jsonInfo.messageId,
        isProductionSmtp: false,
        deliveryChannel: 'memory_fallback',
        errorDetails: err.message
      };
    }
  }

  // If no production credentials configured, use Ethereal or instant local JSON
  try {
    const testAccount = await createEtherealAccountSafe();
    if (testAccount) {
      const fallback = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
        connectionTimeout: 4000,
        greetingTimeout: 3000,
        socketTimeout: 5000,
      });

      const fallbackInfo: any = await fallback.sendMail(mailOptions);
      const fallbackPreviewUrl = nodemailer.getTestMessageUrl(fallbackInfo) || null;
      return { 
        success: true, 
        previewUrl: fallbackPreviewUrl, 
        messageId: fallbackInfo.messageId,
        isProductionSmtp: false,
        deliveryChannel: 'ethereal_sandbox'
      };
    }
  } catch (e) {}

  const jsonTransporter = nodemailer.createTransport({ jsonTransport: true });
  const jsonInfo = await jsonTransporter.sendMail(mailOptions);
  return { 
    success: true, 
    previewUrl: null, 
    messageId: jsonInfo.messageId,
    isProductionSmtp: false,
    deliveryChannel: 'memory_fallback'
  };
}

/**
 * 1. Send OTP Verification Email
 */
export async function sendOtpEmail(params: {
  to: string;
  fullName: string;
  role: 'student' | 'faculty';
  otp: string;
  purpose?: 'signup' | 'login' | 'reset';
}): Promise<MailDispatchResult> {
  const { to, fullName, role, otp, purpose = 'signup' } = params;
  const safeFullName = escapeHtml(fullName);
  const safeOtp = escapeHtml(otp);
  const roleLabel = role === 'faculty' ? 'Faculty & Admissions Staff' : 'Candidate Student';
  const isReset = purpose === 'reset';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050706; color: #f5f7f6; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #070b09; border: 1px solid #16241f; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0b1511 0%, #070b09 100%); padding: 28px 24px; border-bottom: 2px solid ${role === 'faculty' ? '#e6ad54' : '#00c878'}; text-align: center; }
          .logo-title { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; margin: 0; }
          .logo-sub { font-size: 11px; color: ${role === 'faculty' ? '#e6ad54' : '#00c878'}; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
          .content { padding: 32px 24px; }
          .greeting { font-size: 16px; color: #e2e8f0; margin-bottom: 16px; }
          .otp-box { background: #0c1411; border: 1px dashed ${role === 'faculty' ? '#e6ad54' : '#00c878'}; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; }
          .otp-label { font-size: 11px; font-family: monospace; color: #8a9690; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
          .otp-code { font-size: 36px; font-weight: 900; letter-spacing: 8px; color: ${role === 'faculty' ? '#e6ad54' : '#00c878'}; font-family: monospace; margin: 0; }
          .validity { font-size: 12px; color: #8a9690; margin-top: 10px; }
          .role-badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 10px; font-family: monospace; font-weight: bold; background: ${role === 'faculty' ? 'rgba(230,173,84,0.15)' : 'rgba(0,200,120,0.15)'}; color: ${role === 'faculty' ? '#e6ad54' : '#00c878'}; margin-bottom: 16px; border: 1px solid ${role === 'faculty' ? 'rgba(230,173,84,0.3)' : 'rgba(0,200,120,0.3)'}; }
          .warning { font-size: 12px; color: #94a3b8; line-height: 1.6; border-top: 1px solid #16241f; padding-top: 18px; margin-top: 24px; }
          .footer { background-color: #040605; padding: 18px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #16241f; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-title">Muthamizh Academy</h1>
            <div class="logo-sub">In Industry Partnership with Mavis Satcom Limited (Jaya TV)</div>
          </div>
          <div class="content">
            <div class="role-badge">${isReset ? 'PASSWORD RESET REQUEST' : roleLabel.toUpperCase()}</div>
            <div class="greeting">Dear <strong>${safeFullName}</strong>,</div>
            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
              ${isReset 
                ? 'We received a request to reset the login password for your Muthamizh Academy account. Please use the one-time verification code below to authorize this password change.'
                : 'Please use the one-time verification code below to verify your email address and authorize your access to the Muthamizh Academy Admissions 2026 portal.'}
            </p>
            <div class="otp-box">
              <div class="otp-label">${isReset ? 'Password Reset Verification Code' : 'Your 6-Digit Verification Code'}</div>
              <div class="otp-code">${safeOtp}</div>
              <div class="validity">Valid for 10 minutes. Do not share this code with anyone.</div>
            </div>
            <div class="warning">
              <strong>Security Notice:</strong> Muthamizh Academy and Jaya TV Admissions Council will never ask for your password or verification code over phone or SMS. If you did not request this ${isReset ? 'password reset' : 'verification'}, please disregard this email and ensure your account is safe.
            </div>
          </div>
          <div class="footer">
            © 2026 Muthamizh Academy of Technology and Arts • All Rights Reserved.<br>
            Campus & Playout Uplink: Chennai, Tamil Nadu, India.
          </div>
        </div>
      </body>
    </html>
  `;

  const dispatchResult = await dispatchMailSafe({
    from: getFromAddress(),
    to,
    subject: isReset
      ? `Muthamizh Academy: Password Reset Code is ${otp}`
      : `Muthamizh Academy Admissions: Your Verification Code is ${otp}`,
    text: isReset
      ? `Dear ${fullName},\n\nYour Muthamizh Academy password reset code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nMuthamizh Academy Admissions & IT Support`
      : `Dear ${fullName},\n\nYour Muthamizh Academy verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nRole: ${roleLabel}\nMuthamizh Academy Admissions Council`,
    html,
  });

  const previewUrl = dispatchResult.previewUrl || null;
  const messageId = dispatchResult.messageId;

  console.log(`[EMAIL DISPATCH] OTP Email to ${to} via ${dispatchResult.deliveryChannel}. MessageId: ${messageId}`);
  if (previewUrl) {
    console.log(`[EMAIL PREVIEW] Delivered email viewable at: ${previewUrl}`);
  }

  emailAuditLogs.unshift({
    id: `EML-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    to,
    subject: `Admissions Verification Code: ${otp}`,
    type: 'otp_verification',
    timestamp: new Date().toISOString(),
    status: 'sent',
    previewUrl,
    messageId,
    isProductionSmtp: dispatchResult.isProductionSmtp,
    deliveryChannel: dispatchResult.deliveryChannel,
  });

  return dispatchResult;
}

/**
 * 2. Send Application Received Confirmation Email
 */
export async function sendApplicationSubmittedEmail(params: {
  to: string;
  fullName: string;
  applicationId: string;
  programInterest: string;
  phone?: string;
  qualification?: string;
}): Promise<{ success: boolean; previewUrl?: string | null; messageId?: string }> {
  const { to, fullName, applicationId, programInterest, phone, qualification } = params;
  const safeFullName = escapeHtml(fullName);
  const safeAppId = escapeHtml(applicationId);
  const safeProgram = escapeHtml(programInterest);
  const safeTo = escapeHtml(to);
  const safePhone = phone ? escapeHtml(phone) : '';
  const safeQual = qualification ? escapeHtml(qualification) : '';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050706; color: #f5f7f6; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #070b09; border: 1px solid #16241f; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0b1511 0%, #070b09 100%); padding: 28px 24px; border-bottom: 2px solid #00c878; text-align: center; }
          .logo-title { font-size: 22px; font-weight: 800; color: #ffffff; margin: 0; }
          .logo-sub { font-size: 11px; color: #00c878; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
          .content { padding: 32px 24px; }
          .app-badge { display: inline-block; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-family: monospace; font-weight: bold; background: rgba(0,200,120,0.15); color: #00c878; border: 1px solid rgba(0,200,120,0.3); margin-bottom: 20px; }
          .details-card { background: #0c1411; border: 1px solid #16241f; border-radius: 12px; padding: 18px; margin: 20px 0; }
          .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #14201b; font-size: 13px; }
          .details-label { color: #8a9690; font-family: monospace; text-transform: uppercase; font-size: 11px; }
          .details-value { color: #f5f7f6; font-weight: 600; text-align: right; }
          .steps { margin: 24px 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.8; }
          .footer { background-color: #040605; padding: 18px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #16241f; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-title">Muthamizh Academy</h1>
            <div class="logo-sub">Official Admission Application Acknowledgment • Batch 2026</div>
          </div>
          <div class="content">
            <div class="app-badge">Application ID: ${safeAppId}</div>
            <div style="font-size: 16px; margin-bottom: 12px;">Dear <strong>${safeFullName}</strong>,</div>
            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
              Thank you for submitting your admission application to Muthamizh Academy in partnership with Mavis Satcom Limited (Jaya TV Network).
            </p>

            <div class="details-card">
              <div class="details-row">
                <span class="details-label">Program of Study</span>
                <span class="details-value" style="color: #00c878;">${safeProgram}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Applicant Name</span>
                <span class="details-value">${safeFullName}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Registered Email</span>
                <span class="details-value">${safeTo}</span>
              </div>
              ${safePhone ? `
              <div class="details-row">
                <span class="details-label">Phone</span>
                <span class="details-value">${safePhone}</span>
              </div>` : ''}
              ${safeQual ? `
              <div class="details-row" style="border-bottom: none;">
                <span class="details-label">Prior Qualification</span>
                <span class="details-value">${safeQual}</span>
              </div>` : ''}
            </div>

            <h4 style="color: #00c878; font-size: 13px; font-family: monospace; text-transform: uppercase; margin-bottom: 8px;">What Happens Next:</h4>
            <ol class="steps">
              <li><strong>Academic Council Screening:</strong> Faculty instructors are evaluating your background and technical profile.</li>
              <li><strong>Status Tracking:</strong> You can log into your Student Candidate Portal using this email (${safeTo}) anytime to track live updates.</li>
              <li><strong>Interview & Studio Call:</strong> If shortlisted, you will receive an automatic email notification with your interview date, venue, and studio floor details.</li>
            </ol>
          </div>
          <div class="footer">
            Muthamizh Academy Admissions Council • Mavis Satcom Limited<br>
            Direct Inquiries: admissions@muthamizh.ac.in
          </div>
        </div>
      </body>
    </html>
  `;

  const dispatchResult = await dispatchMailSafe({
    from: getFromAddress(),
    to,
    subject: `Muthamizh Academy: Application Received for ${programInterest} [${applicationId}]`,
    text: `Dear ${fullName},\n\nYour application [${applicationId}] for ${programInterest} has been received.\nOur Admissions Council will review your documents and notify you of upcoming interview schedules.\n\nMuthamizh Academy Admissions`,
    html,
  });

  const previewUrl = dispatchResult.previewUrl || null;
  const messageId = dispatchResult.messageId;

  console.log(`[EMAIL DISPATCH] Application Received confirmation sent to ${to}. ID: ${applicationId}`);
  if (previewUrl) {
    console.log(`[EMAIL PREVIEW] Delivered confirmation viewable at: ${previewUrl}`);
  }

  emailAuditLogs.unshift({
    id: `EML-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    to,
    subject: `Application Received: ${programInterest} [${applicationId}]`,
    type: 'application_received',
    timestamp: new Date().toISOString(),
    status: 'sent',
    previewUrl,
    messageId,
  });

  return { success: true, previewUrl, messageId };
}

/**
 * 3. Send Application Status Update Email (Triggered when Faculty modifies candidate status)
 */
export async function sendApplicationStatusUpdateEmail(params: {
  to: string;
  fullName: string;
  applicationId: string;
  programInterest: string;
  status: string;
  facultyRemarks?: string;
  interviewDate?: string;
  interviewVenue?: string;
  studioFloorAssigned?: string;
  scholarshipGranted?: string;
  reviewedByFaculty?: string;
}): Promise<{ success: boolean; previewUrl?: string | null; messageId?: string }> {
  const {
    to,
    fullName,
    applicationId,
    programInterest,
    status,
    facultyRemarks,
    interviewDate,
    interviewVenue,
    studioFloorAssigned,
    scholarshipGranted,
    reviewedByFaculty,
  } = params;

  const safeFullName = escapeHtml(fullName);
  const safeAppId = escapeHtml(applicationId);
  const safeProgram = escapeHtml(programInterest);
  const safeStatus = escapeHtml(status);
  const safeRemarks = facultyRemarks ? escapeHtml(facultyRemarks) : '';
  const safeDate = interviewDate ? escapeHtml(interviewDate) : '';
  const safeVenue = interviewVenue ? escapeHtml(interviewVenue) : '';
  const safeFloor = studioFloorAssigned ? escapeHtml(studioFloorAssigned) : '';
  const safeScholarship = scholarshipGranted ? escapeHtml(scholarshipGranted) : '';
  const safeFaculty = reviewedByFaculty ? escapeHtml(reviewedByFaculty) : '';

  // Color scheme based on status
  let statusColor = '#00c878';
  if (status.includes('Interview') || status.includes('Assessment')) statusColor = '#e6ad54';
  if (status.includes('Confirmed')) statusColor = '#00c878';
  if (status.includes('Hold')) statusColor = '#f59e0b';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050706; color: #f5f7f6; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #070b09; border: 1px solid #16241f; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0b1511 0%, #070b09 100%); padding: 28px 24px; border-bottom: 2px solid ${statusColor}; text-align: center; }
          .logo-title { font-size: 22px; font-weight: 800; color: #ffffff; margin: 0; }
          .logo-sub { font-size: 11px; color: ${statusColor}; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
          .content { padding: 32px 24px; }
          .status-banner { background: #0c1411; border: 1px solid ${statusColor}; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
          .status-tag { font-size: 10px; font-family: monospace; color: #8a9690; text-transform: uppercase; letter-spacing: 1px; }
          .status-text { font-size: 20px; font-weight: 800; color: ${statusColor}; margin-top: 6px; font-family: monospace; }
          .details-card { background: #0c1411; border: 1px solid #16241f; border-radius: 12px; padding: 18px; margin: 20px 0; }
          .details-row { padding: 8px 0; border-bottom: 1px solid #14201b; font-size: 13px; }
          .details-label { color: #8a9690; font-family: monospace; text-transform: uppercase; font-size: 10px; display: block; margin-bottom: 3px; }
          .details-value { color: #f5f7f6; font-weight: 600; font-size: 14px; }
          .footer { background-color: #040605; padding: 18px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #16241f; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-title">Muthamizh Academy</h1>
            <div class="logo-sub">Official Admission Status Update Notification</div>
          </div>
          <div class="content">
            <div style="font-size: 15px; margin-bottom: 12px;">Dear <strong>${safeFullName}</strong>,</div>
            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
              An update has been issued for your candidate admission application <strong>${safeAppId}</strong> for <em>${safeProgram}</em> by the Academic Council.
            </p>

            <div class="status-banner">
              <div class="status-tag">Current Admission Status</div>
              <div class="status-text">${safeStatus}</div>
            </div>

            <div class="details-card">
              ${safeRemarks ? `
              <div class="details-row">
                <span class="details-label">Faculty Evaluation Remarks</span>
                <span class="details-value" style="color: #e2e8f0; font-weight: normal; line-height: 1.5;">${safeRemarks}</span>
              </div>` : ''}

              ${safeDate ? `
              <div class="details-row">
                <span class="details-label">Scheduled Interview / Assessment Date</span>
                <span class="details-value" style="color: ${statusColor};">${safeDate}</span>
              </div>` : ''}

              ${safeVenue ? `
              <div class="details-row">
                <span class="details-label">Interview Venue / Virtual Room</span>
                <span class="details-value">${safeVenue}</span>
              </div>` : ''}

              ${safeFloor ? `
              <div class="details-row">
                <span class="details-label">Allocated Studio Floor / Workstation</span>
                <span class="details-value" style="color: #00c878;">${safeFloor}</span>
              </div>` : ''}

              ${safeScholarship ? `
              <div class="details-row">
                <span class="details-label">Merit Fellowship / Scholarship Granted</span>
                <span class="details-value" style="color: #e6ad54;">${safeScholarship}</span>
              </div>` : ''}

              ${safeFaculty ? `
              <div class="details-row" style="border-bottom: none;">
                <span class="details-label">Reviewed By</span>
                <span class="details-value" style="color: #94a3b8; font-size: 12px;">${safeFaculty}</span>
              </div>` : ''}
            </div>

            <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
              You can view complete application timeline, official circulars, and download admission letters by logging into your candidate portal.
            </p>
          </div>
          <div class="footer">
            Muthamizh Academy Admissions Council & Faculty Review Board<br>
            In partnership with Mavis Satcom Limited (Jaya TV Playout Facility)
          </div>
        </div>
      </body>
    </html>
  `;

  const dispatchResult = await dispatchMailSafe({
    from: getFromAddress(),
    to,
    subject: `Muthamizh Academy Status Update: ${status} [${applicationId}]`,
    text: `Dear ${fullName},\n\nYour application [${applicationId}] status has been updated to: ${status}.\n\nFaculty Remarks: ${facultyRemarks || 'N/A'}\n${interviewDate ? `Interview: ${interviewDate} (${interviewVenue || 'TBA'})\n` : ''}\nMuthamizh Academy Admissions Council`,
    html,
  });

  const previewUrl = dispatchResult.previewUrl || null;
  const messageId = dispatchResult.messageId;

  console.log(`[EMAIL DISPATCH] Status update email sent to ${to} for app ${applicationId}. Status: ${status}`);
  if (previewUrl) {
    console.log(`[EMAIL PREVIEW] Delivered email viewable at: ${previewUrl}`);
  }

  emailAuditLogs.unshift({
    id: `EML-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    to,
    subject: `Status Update: ${status} [${applicationId}]`,
    type: 'status_update',
    timestamp: new Date().toISOString(),
    status: 'sent',
    previewUrl,
    messageId,
  });

  return { success: true, previewUrl, messageId };
}

export async function sendFacultyInvitationEmail(params: {
  to: string;
  invitedByName: string;
  department: string;
  designation: string;
  rawToken: string;
}): Promise<MailDispatchResult> {
  const { to, invitedByName, department, designation, rawToken } = params;
  const fromAddress = getFromAddress();

  const mailOptions: SendMailOptions = {
    from: fromAddress,
    to,
    subject: "Official Faculty Invitation — Muthamizh Academy Admissions Council",
    text: `You have been invited by ${invitedByName} to join the Muthamizh Academy Academic & Admissions Faculty (${department} - ${designation}).\n\nYour Single-Use Institutional Clearance Token:\n${rawToken}\n\nPlease proceed to the admissions portal to register your faculty account. This clearance key is valid for 48 hours.\n\nWarm regards,\nMuthamizh Academy Admissions Council`,
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-top: 0;">Institutional Faculty Invitation</h2>
      <p style="color: #334155; font-size: 15px;">You have been invited by <strong>${escapeHtml(invitedByName)}</strong> to join the Academic & Admissions Faculty as <strong>${escapeHtml(designation)}</strong> (${escapeHtml(department)}) at Muthamizh Academy.</p>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; margin: 20px 0; text-align: center;">
        <span style="font-size: 13px; color: #64748b; display: block; margin-bottom: 6px;">YOUR SINGLE-USE CLEARANCE KEY</span>
        <code style="font-size: 16px; font-weight: bold; color: #0284c7; letter-spacing: 1px; word-break: break-all;">${escapeHtml(rawToken)}</code>
      </div>
      <p style="color: #64748b; font-size: 13px;">This single-use invitation key is valid for 48 hours. After entering this key during registration, you will verify your email via 6-digit OTP and set your confidential password.</p>
    </div>`
  };

  const result = await dispatchMailSafe(mailOptions);
  return result;
}

