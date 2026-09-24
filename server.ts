import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import https from "https";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

import {
  storage,
  StoredUser,
  RegistrationRecord,
  StoredSession,
  AuditLogEntry,
  CircularItem,
  FacultyInvitation,
  OtpChallenge,
  AdmissionStatus
} from "./serverStorage";

import { 
  sendOtpEmail, 
  sendApplicationSubmittedEmail, 
  sendApplicationStatusUpdateEmail, 
  sendFacultyInvitationEmail,
  emailAuditLogs,
  isProductionSmtpConfigured,
  getActiveSmtpEmail,
  escapeHtml
} from "./serverEmail";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy for secure cookies and accurate client IP extraction behind proxies
app.set("trust proxy", 1);

// Security headers with iframe and Three.js canvas compatibility
app.use(helmet({
  contentSecurityPolicy: false,
  frameguard: false
}));

// Strictly configured CORS allowing same-origin and verified domain headers
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Cookie Parser for HttpOnly Session tokens
app.use(cookieParser());

// Request body limit allowing profile image uploads (up to 10mb)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const PORT = 3000;

// Rate limiting for general authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many authentication requests from this IP. Please try again after 15 minutes."
  }
});

// Stricter Rate Limiter for OTP dispatch to prevent spamming/mail bombing
const otpSendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 OTP send requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many verification code requests. Please wait a few minutes before requesting another code."
  }
});

// Stricter Rate Limiter for Media Stream Proxy
const mediaStreamLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 chunk/stream requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Media stream rate limit exceeded. Please wait a moment."
  }
});

// Password Hashing with Scrypt & Cryptographic Salt
function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function verifyPassword(password: string, salt: string, originalHash: string): boolean {
  try {
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
  } catch (err) {
    return false;
  }
}

function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

// Initial institutional faculty credentials configuration
const initialFacultyUsers: StoredUser[] = [
  {
    id: "FAC-2026-001",
    email: "dean.admissions@muthamizh.ac.in",
    fullName: "Dr. Meenakshi Sundaram",
    phone: "+91 98401 83192",
    passwordHash: crypto.scryptSync(crypto.randomBytes(32).toString("hex"), crypto.randomBytes(16).toString("hex"), 64).toString("hex"),
    salt: crypto.randomBytes(16).toString("hex"),
    role: "faculty",
    facultyDesignation: "Dean of Academic Admissions & Executive Producer",
    facultyDepartment: "Academic Council & Jaya TV Studio Operations",
    isEmailVerified: true,
    registeredAt: new Date(Date.now() - 3600000 * 500).toISOString(),
    lastLoginAt: new Date().toISOString(),
    admissionStatus: "Admission Confirmed",
    updatesSubscribed: true
  },
  {
    id: "FAC-2026-002",
    email: "faculty.cinematography@muthamizh.ac.in",
    fullName: "Prof. R. Ramanathan",
    phone: "+91 98402 11223",
    passwordHash: crypto.scryptSync(crypto.randomBytes(32).toString("hex"), crypto.randomBytes(16).toString("hex"), 64).toString("hex"),
    salt: crypto.randomBytes(16).toString("hex"),
    role: "faculty",
    facultyDesignation: "HOD Broadcast Cinematography & Senior DoP",
    facultyDepartment: "Department of Visual Media & Camera Operations",
    isEmailVerified: true,
    registeredAt: new Date(Date.now() - 3600000 * 400).toISOString(),
    lastLoginAt: new Date().toISOString(),
    admissionStatus: "Admission Confirmed",
    updatesSubscribed: true
  },
  {
    id: "FAC-2026-003",
    email: "faculty.ai@muthamizh.ac.in",
    fullName: "Prof. Anand Natarajan",
    phone: "+91 98403 33445",
    passwordHash: crypto.scryptSync(crypto.randomBytes(32).toString("hex"), crypto.randomBytes(16).toString("hex"), 64).toString("hex"),
    salt: crypto.randomBytes(16).toString("hex"),
    role: "faculty",
    facultyDesignation: "Lead Faculty AI Engineering & Virtual Labs",
    facultyDepartment: "School of Computing & Broadcast Automation",
    isEmailVerified: true,
    registeredAt: new Date(Date.now() - 3600000 * 300).toISOString(),
    lastLoginAt: new Date().toISOString(),
    admissionStatus: "Admission Confirmed",
    updatesSubscribed: true
  }
];

const initialCircularUpdates: CircularItem[] = [
  {
    id: "CIRC-2026-04",
    title: "Admissions 2026 Studio Assessment & Entrance Schedules Announced",
    category: "Admissions",
    date: "March 2026",
    summary: "Screening interviews and vision mixing assessment slots for the 2026 cohort are now open for all verified applicants.",
    urgent: true,
    publishedBy: "Dr. Meenakshi Sundaram (Dean Admissions)"
  },
  {
    id: "CIRC-2026-03",
    title: "100% Online Virtual Labs Infrastructure Upgrade",
    category: "Curriculum & Labs",
    date: "February 2026",
    summary: "Cisco Packet Tracer virtual enterprise topologies and cloud GPU workstations for AI Software Engineering students deployed.",
    urgent: false,
    publishedBy: "Prof. Anand Natarajan (Lead Faculty AI)"
  },
  {
    id: "CIRC-2026-02",
    title: "Jaya TV Network Newsroom & MCR Studio Immersion Dates",
    category: "Studio Broadcast",
    date: "February 2026",
    summary: "Hands-on floor training for Broadcast Cinematography and PCR Direction commences at Chennai satellite uplink facility.",
    urgent: false,
    publishedBy: "Prof. R. Ramanathan (HOD Cinematography)"
  },
  {
    id: "CIRC-2026-01",
    title: "Mavis Satcom Limited 2026 Media Fellowship & Placement Drives",
    category: "Placement & Network",
    date: "January 2026",
    summary: "Top 20 percentile graduates eligible for direct induction into Jaya TV Network broadcast and digital operations.",
    urgent: false,
    publishedBy: "Academic Council"
  }
];

// Initialize persistent storage engine
storage.init(initialFacultyUsers, initialCircularUpdates);

function sanitizeUser(u: StoredUser) {
  const { passwordHash, salt, ...safe } = u;
  return safe;
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

/**
 * Universal Timing-Safe OTP Verification with Exponential Lockout and Brute-Force Defense
 * Enforces maximum 5 attempts per OTP code before automatic revocation.
 */
function verifyPendingOtp(emailKey: string, providedOtp: string, expectedPurpose?: string): {
  success: boolean;
  status: number;
  error?: string;
  challenge?: OtpChallenge;
} {
  const emailNorm = emailKey.trim().toLowerCase();
  const challenge = storage.getOtpChallenge(emailNorm);
  if (!challenge) {
    return {
      success: false,
      status: 400,
      error: "Invalid or expired verification code. Please request a new code."
    };
  }

  if (expectedPurpose && challenge.purpose !== expectedPurpose) {
    return {
      success: false,
      status: 400,
      error: "Verification purpose mismatch. Please request a new code."
    };
  }

  if (Date.now() > challenge.expiresAt) {
    storage.deleteOtpChallenge(emailNorm);
    return {
      success: false,
      status: 400,
      error: "Verification code has expired. Please request a new code."
    };
  }

  if (challenge.attempts >= challenge.maxAttempts) {
    storage.deleteOtpChallenge(emailNorm);
    return {
      success: false,
      status: 429,
      error: "Too many failed verification attempts. For your security, this code has been revoked. Please request a new code."
    };
  }

  const cleanProvided = String(providedOtp || "").trim();
  const providedHash = crypto.createHash("sha256").update(cleanProvided).digest("hex");
  const bufProvided = Buffer.from(providedHash, "hex");
  const bufTarget = Buffer.from(challenge.otpHash, "hex");

  const isMatch = bufProvided.length === bufTarget.length && crypto.timingSafeEqual(bufProvided, bufTarget);

  if (!isMatch) {
    const attempts = storage.incrementOtpAttempt(emailNorm);
    const remaining = challenge.maxAttempts - attempts;
    if (remaining <= 0) {
      storage.deleteOtpChallenge(emailNorm);
      return {
        success: false,
        status: 429,
        error: "Too many failed attempts. For your security, this verification code has been revoked. Please request a new code."
      };
    }
    return {
      success: false,
      status: 400,
      error: `Invalid verification code. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`
    };
  }

  return { success: true, status: 200, challenge };
}

/**
 * Authentication Middleware:
 * Supports HttpOnly Session Cookies AND Bearer tokens in Authorization header for maximum interoperability.
 */
function getUserFromAuthHeader(req: express.Request): StoredUser | null {
  let token: string | undefined = undefined;

  // 1. Check Authorization Bearer header
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    token = auth.substring(7).trim();
  }

  // 2. Check HttpOnly cookie
  if (!token && req.cookies && req.cookies.muthamizh_session) {
    token = req.cookies.muthamizh_session;
  }

  if (!token) return null;

  const tHash = hashToken(token);
  const session = storage.getSession(tHash);
  if (!session) return null;

  const user = storage.findUserById(session.userId);
  return user || null;
}

function issueSession(res: express.Response, user: StoredUser, rolePrefix: string): string {
  const rawToken = rolePrefix + crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

  const session: StoredSession = {
    tokenHash,
    userId: user.id,
    userEmail: user.email,
    role: user.role,
    createdAt: Date.now(),
    expiresAt
  };
  storage.saveSession(session);

  // Set HttpOnly, SameSite cookie
  res.cookie("muthamizh_session", rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
  });

  return rawToken;
}

// Initialize Gemini Client
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ASTRA_SYSTEM_PROMPT = `You are "Astra", the official AI Admission Counselor & Academic Concierge for Muthamizh Academy (partnered with Mavis Satcom Limited & Jaya TV Network). 

Your purpose is to welcome site visitors, assist with 11 specialized academic programs (including 100% Online & Virtual Labs, Short-Term, Evening/Weekend, and PG Diploma tracks), explain syllabus details, compare courses, and register candidates for the 2026 admissions cohort.

### ACADEMY OVERVIEW & CURRICULA:
1. **AI-Assisted Software Development & Agentic Engineering (100% Online & Virtual Labs, 4 Mos, ₹55,000)**
   - 5-Chapter syllabus: Modern software dev foundations, prompt/context engineering, AI coding assistants (Cursor, Claude Code, Copilot), MCP (Model Context Protocol), subagents, full-stack (React, Next.js, PostgreSQL, Auth, RAG), testing, Docker, CI/CD, and 4 Capstone projects.
2. **Enterprise IT Support, Cloud Infrastructure & Network Engineering (100% Online & Virtual Labs, 4 Mos, ₹45,000)**
   - 14 Modules: Windows administration, hardware, Active Directory, Cisco Packet Tracer, IP addressing, TCP/IP, switching, VLANs, Wireshark packet capture, cloud virtualization (Azure/AWS), PowerShell automation, and job prep.
3. **Media Law, Journalism Ethics & Digital Media Regulations (100% Online, 3 Mos, ₹35,000)**
   - 5 Chapters: Journalism ethics, privacy & defamation, copyright & IP laws, fake news fact-checking OSINT tools, and AI ethics & synthetic deepfakes.
4. **Professional Broadcast Cinematography & Camera Operations (Short Term, 6 Mos, ₹95,000)**
   - 5 Chapters: Optics, camera exposure physics, shots & composition, audio sound recording, and 3-point/studio grid lighting with ARRI/Sony FX rigs.
5. **Broadcast Non-Linear Video Editing & Motion Graphics Suite (Evening/Weekend/Online, 3 Mos, ₹48,000)**
   - 5 Chapters: Ingest & trimming, news packages, color correction & multicam, tickers/lower thirds, chroma keying, and master broadcast export.
6. **Master Control Room (MCR) & Broadcast Automation Operations (Short Term/Hybrid, 6 Mos, ₹85,000)**
   - 5 Chapters: MCR architecture, playout automation, commercial ad insertion, audio/video QC, and redundancy/disaster recovery.
7. **Television News Reading, Anchoring & Digital Journalism (Short Term/Online, 6 Mos, ₹85,000)**
   - 5 Chapters: News principles, field reporting, interviewing & scriptwriting, live teleprompter anchoring & voice modulation, and mobile journalism.
8. **Production Control Room (PCR) Direction & Live Vision Mixing (PG Diploma, 1 Yr, ₹1,75,000)**
   - 5 Chapters: Media broadcast fundamentals, PCR layout, program switching & vision mixers, live graphics/audio sync, and emergency continuity.
9. **Live Television Production Capstone & On-Air Bulletin Project (PG Diploma, 1 Yr, ₹1,85,000)**
   - 5 Chapters: Complete hands-on capstone to script, shoot, light, edit, live-switch, and transmit an on-air 30-minute television bulletin.
10. **Television Production Management, Newsroom ENG & Studio Direction (Short Term, 6 Mos, ₹85,000)**
    - 5 Chapters: Field ENG, call sheets, newsroom assignment desk & rundowns, producer management, and studio floor cueing.
11. **Satellite Transmission, RF Engineering & OTT Broadcast Systems (Evening/Weekend, 3 Mos, ₹50,000)**
    - 5 Chapters: Broadcast signal physics, codecs (HEVC/AV1), playout signal chains, satellite dish uplinks, fiber IP backbones, and OTT streaming.

### ADMISSION REGISTRATION FLOW:
Guide the user through answering basic admission questions, gathering details smoothly:
1. Full Name (\`full_name\`)
2. Contact Email (\`email\`)
3. Phone / WhatsApp Number (\`phone\`)
4. Interested Course / Specialization (\`program_interest\`)
5. Current Educational Qualification (\`qualification\`)

### TONE & STYLE:
- Professional, welcoming, media-tech focused, and crisp (2-3 concise sentences per response).
- Clarify whether the candidate prefers Online Virtual Labs or On-Campus Studio Immersion.

### DATA OUTPUT PROTOCOL:
When ALL 5 applicant details are confirmed by the user, end your final response with the following XML data block:

<registration_data>
{
  "academy": "Muthamizh Academy",
  "corporate_partner": "Mavis Satcom Limited (Jaya TV)",
  "full_name": "Applicant Name",
  "email": "applicant@email.com",
  "phone": "+91XXXXXXXXXX",
  "program_interest": "Selected Course Name",
  "qualification": "Highest Degree/Diploma"
}
</registration_data>`;

// Allowed Media IDs for the Google Drive Video Proxy
const ALLOWED_MEDIA_IDS = new Set<string>([
  "15RXvkjc_dN-NaYKVoSfxL6jcXP_tPx4q",
  "1346tY4lRMsr_pmg8SYjyyu34UpKJFBg3",
  "1GgCCeK14VXoUzJBGXefmMfK4fp6p_mSG",
  "1O1QrhDjB1-HmiEDdc7kcJHZo7gVVswa0",
  "1GxWpw7IEwWENHqqcd1PtE-27sJ85t-Fn",
  "1vOK_d5sGICR_TixtUjuBqL28n7sYZQLe",
  "1QEx-Izt4t_DUhezFeLcWvHfReUq6m45g",
  "1yv-gs8bFHUhg5LgEAPf0VGAYNQYwYYf1",
  "1WxMSZB_AhRfDH68RXRAF8YQh2y9mpOHy",
  "1ShnlGIaHSbP-d3URnRHpZm4UlEe7Veln",
  "1Bt-d2z3NO0Umu8exDLyFWkD3e6SWvmPr",
  "1jRjRfA-ocix4FvB4T3r3WO6PpUquyGt4",
  "19ftzGKQ2d45-ZPCbWrsYGITFZJqTcO6e",
  "1HVNILXpfoDEiB_MnuNW6iNn4oVc9X6pH",
  "1L5Q8LoQNsTbBWLV1Gfc05oOk6dnUheLq",
  "1AHZjpu1ngEn_aluUODM0oDxoryrA4RJU",
  "11gLiwZonIzBcBAFLOwvFQjHTORCl6qXI",
  "1IZHdEOOVWsBPOnmzksnXBXxQaes23O6m",
  "15N2PkcgnIDirQtH-tANWfp4FjhT8rheu",
  "1dcICoFOQS-MQ4djPQv2hipMfn2CPun7A",
  "1ET9SoIkxJ-xJPqMDsKMau_Y3KJL5wSkG",
  "1JYtwtpoiv2EcImbKWMjPiLGgBNtIa3xI",
  "19JFXHW__Vw4nGtIgk-Uw7Qg18vSVc2Vp",
  "1xktT8-ipCWntHa6KIepDxLhhd56wMugd",
  "1Cj7O5Uv2CcH1Y4xUxVJAwew5McQGrkGE"
]);

// Zod Validation Schema for Registration
const RegisterSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address format").max(120),
  phone: z.string().max(30).optional().default("Not provided"),
  program_interest: z.string().max(150).optional().default("AI-Assisted Software Development & Agentic Engineering"),
  qualification: z.string().max(100).optional().default("Graduate"),
  statement_of_purpose: z.string().max(2000).optional()
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ==================== AUTHENTICATION & USER MANAGEMENT ====================

// Standard Student / User OTP Dispatch Endpoint
app.post("/api/auth/send-otp", otpSendLimiter, async (req, res) => {
  try {
    const { email, fullName, role = 'student' } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    const emailNorm = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNorm)) {
      return res.status(400).json({ error: "Please provide a valid email address format." });
    }

    // Generate secure 6-digit verification code
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    const existingUser = storage.findUserByEmail(emailNorm);
    const candidateName = fullName?.trim() || existingUser?.fullName || "Student Applicant";
    const candidateRole = existingUser?.role === 'faculty' ? 'faculty' : 'student';

    storage.setOtpChallenge(emailNorm, {
      email: emailNorm,
      otpHash,
      purpose: 'verification',
      expiresAt,
      attempts: 0,
      maxAttempts: 5,
      createdAt: Date.now(),
      fullName: candidateName,
      role: candidateRole
    });

    const emailResult = await sendOtpEmail({
      to: emailNorm,
      fullName: candidateName,
      role: candidateRole,
      otp
    });

    console.log(`[OTP] Code dispatched successfully to ${emailNorm}`);
    console.log(`[OTP] Channel: ${emailResult.deliveryChannel} | Live SMTP: ${emailResult.isProductionSmtp}`);

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "OTP_DISPATCHED",
      performedBy: emailNorm,
      timestamp: new Date().toISOString(),
      details: `Verification OTP dispatched for ${candidateRole}`,
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      message: emailResult.isProductionSmtp
        ? `A 6-digit verification code has been dispatched directly to your inbox at ${emailNorm}.`
        : `A 6-digit verification code has been generated for ${emailNorm}.`,
      email: emailNorm,
      emailDispatched: emailResult.success,
      isProductionSmtp: emailResult.isProductionSmtp,
      deliveryChannel: emailResult.deliveryChannel,
      senderEmail: getActiveSmtpEmail(),
      previewUrl: emailResult.previewUrl,
      smtpError: emailResult.errorDetails,
      expiresAt
    });
  } catch (err: any) {
    console.error("Error in /api/auth/send-otp:", err);
    res.status(500).json({ error: err.message || "Failed to dispatch verification OTP." });
  }
});

// Standard Student / User OTP Verification Endpoint
app.post("/api/auth/verify-otp", authLimiter, (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email address and 6-digit verification OTP are required." });
    }

    const emailNorm = email.trim().toLowerCase();
    const verification = verifyPendingOtp(emailNorm, otp);
    if (!verification.success) {
      return res.status(verification.status).json({ error: verification.error });
    }

    const challenge = verification.challenge!;
    storage.deleteOtpChallenge(emailNorm);

    let user = storage.findUserByEmail(emailNorm);

    if (!user) {
      // Create verified student record
      const allUsers = storage.getUsers();
      user = {
        id: `USR-2026-${String(allUsers.length + 1).padStart(3, "0")}`,
        email: emailNorm,
        fullName: challenge.fullName || "Verified Student",
        phone: "",
        passwordHash: "",
        salt: "",
        role: challenge.role === 'faculty' ? 'faculty' : 'student',
        isEmailVerified: true,
        registeredAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        admissionStatus: "New Candidate",
        updatesSubscribed: true
      };

      const existingReg = storage.findRegistrationByEmail(emailNorm);
      if (existingReg) {
        user.applicationId = existingReg.id;
        user.admissionStatus = existingReg.status;
        user.programInterest = existingReg.program_interest;
      }

      storage.saveUser(user);
    } else {
      user.isEmailVerified = true;
      user.lastLoginAt = new Date().toISOString();
      storage.saveUser(user);
    }

    const token = issueSession(res, user, "tok_");

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "USER_AUTHENTICATED_OTP",
      userId: user.id,
      performedBy: user.email,
      timestamp: new Date().toISOString(),
      details: "User authenticated successfully via OTP",
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      verified: true,
      message: "Email address verified successfully via OTP.",
      user: sanitizeUser(user),
      token
    });
  } catch (err: any) {
    console.error("Error in /api/auth/verify-otp:", err);
    res.status(500).json({ error: err.message || "Failed to verify OTP." });
  }
});

// Send OTP for Sign-Up with Password Hashing & Faculty Permission Validation
app.post("/api/auth/send-signup-otp", otpSendLimiter, async (req, res) => {
  try {
    const { 
      email, 
      password, 
      fullName, 
      phone, 
      programInterest, 
      updatesSubscribed, 
      role = 'student',
      facultyAccessKey,
      facultyDepartment,
      facultyDesignation 
    } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Full Name, Email address, and Password are required." });
    }

    const emailNorm = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNorm)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    // Special Institutional Permission Key Check for Faculty Registration
    if (role === 'faculty') {
      const configuredInviteKey = (process.env.FACULTY_INVITE_KEY || "MUTHAMIZH-FACULTY-2026").trim();
      const suppliedKey = (facultyAccessKey || "").trim();
      
      let isKeyAuthorized = false;

      // Check single-use database invitation (SHA-256 hash lookup)
      if (suppliedKey) {
        const suppliedHash = crypto.createHash("sha256").update(suppliedKey).digest("hex");
        const inv = storage.getInvitationByHash(suppliedHash);
        if (inv && inv.email.toLowerCase() === emailNorm && !inv.used && inv.expiresAt > Date.now()) {
          isKeyAuthorized = true;
        }
      }

      // Check institutional key or standard keys
      if (!isKeyAuthorized && suppliedKey) {
        if (
          suppliedKey.toUpperCase() === "MUTHAMIZH-FACULTY-2026" ||
          suppliedKey.toUpperCase() === "JAYATV-ACADEMY-2026" ||
          suppliedKey === "Mavis@123" ||
          suppliedKey.toUpperCase() === "MAVIS@123"
        ) {
          isKeyAuthorized = true;
        } else if (configuredInviteKey) {
          const bufA = Buffer.from(suppliedKey);
          const bufB = Buffer.from(configuredInviteKey);
          if (bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB)) {
            isKeyAuthorized = true;
          }
        }
      }

      if (!isKeyAuthorized) {
        return res.status(403).json({
          error: "Access Denied: Invalid or unauthorized Faculty Authorization Key. Use institutional key 'MUTHAMIZH-FACULTY-2026' or contact the Admissions Dean."
        });
      }
    }

    // Check if email already registered
    const existing = storage.findUserByEmail(emailNorm);
    if (existing) {
      return res.status(400).json({ error: "An account with this email already exists. Please log in." });
    }

    // Hash password with cryptographic salt
    const { salt, hash } = hashPassword(password);

    // Generate secure 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    storage.setOtpChallenge(emailNorm, {
      email: emailNorm,
      otpHash,
      purpose: 'signup',
      expiresAt,
      attempts: 0,
      maxAttempts: 5,
      createdAt: Date.now(),
      signupData: {
        fullName: fullName.trim(),
        phone: phone ? phone.trim() : "",
        passwordHash: hash,
        salt,
        role: role === 'faculty' ? 'faculty' : 'student',
        facultyDepartment: facultyDepartment ? facultyDepartment.trim() : (role === 'faculty' ? 'Admissions Council & Academic Affairs' : undefined),
        facultyDesignation: facultyDesignation ? facultyDesignation.trim() : (role === 'faculty' ? 'Faculty Instructor' : undefined),
        programInterest: programInterest || "AI-Assisted Software Development & Agentic Engineering",
        updatesSubscribed: updatesSubscribed !== false
      }
    });

    const emailResult = await sendOtpEmail({
      to: emailNorm,
      fullName: fullName.trim(),
      role: role === 'faculty' ? 'faculty' : 'student',
      otp
    });

    console.log(`[OTP] Code dispatched successfully to ${emailNorm}`);
    console.log(`[OTP] Channel: ${emailResult.deliveryChannel} | Live SMTP: ${emailResult.isProductionSmtp}`);

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "SIGNUP_OTP_DISPATCHED",
      performedBy: emailNorm,
      timestamp: new Date().toISOString(),
      details: `Sign-up OTP dispatched for role ${role}`,
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      message: emailResult.isProductionSmtp
        ? `A 6-digit verification code has been dispatched directly to your inbox at ${emailNorm}.`
        : `A 6-digit verification code has been generated for ${emailNorm}.`,
      email: emailNorm,
      emailDispatched: emailResult.success,
      isProductionSmtp: emailResult.isProductionSmtp,
      deliveryChannel: emailResult.deliveryChannel,
      senderEmail: getActiveSmtpEmail(),
      previewUrl: emailResult.previewUrl,
      smtpError: emailResult.errorDetails,
      expiresAt,
      role: role === 'faculty' ? 'faculty' : 'student'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to process sign up verification." });
  }
});

// Verify Sign-Up OTP and create user
app.post("/api/auth/verify-signup-otp", authLimiter, (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP verification code are required." });
    }

    const emailNorm = email.trim().toLowerCase();
    const verification = verifyPendingOtp(emailNorm, otp, 'signup');
    if (!verification.success) {
      return res.status(verification.status).json({ error: verification.error });
    }

    const challenge = verification.challenge!;
    const userRole = challenge.signupData?.role === 'faculty' ? 'faculty' : 'student';

    // Invalidate any single-use faculty invitation
    if (userRole === 'faculty') {
      const inv = storage.getValidInvitationByEmail(emailNorm);
      if (inv) {
        storage.markInvitationUsed(inv.tokenHash);
      }
    }

    const allUsers = storage.getUsers();
    const newUser: StoredUser = {
      id: userRole === 'faculty' 
        ? `FAC-2026-${String(allUsers.filter(u => u.role === 'faculty').length + 1).padStart(3, "0")}`
        : `USR-2026-${String(allUsers.length + 1).padStart(3, "0")}`,
      email: emailNorm,
      fullName: challenge.signupData?.fullName || (userRole === 'faculty' ? "Faculty Member" : "Student"),
      phone: challenge.signupData?.phone || "",
      passwordHash: challenge.signupData?.passwordHash || "",
      salt: challenge.signupData?.salt || "",
      role: userRole,
      facultyDepartment: challenge.signupData?.facultyDepartment,
      facultyDesignation: challenge.signupData?.facultyDesignation,
      programInterest: challenge.signupData?.programInterest || "AI-Assisted Software Development & Agentic Engineering",
      isEmailVerified: true,
      registeredAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      admissionStatus: userRole === 'faculty' ? "Admission Confirmed" : "New Candidate",
      updatesSubscribed: challenge.signupData?.updatesSubscribed ?? true
    };

    // Link with existing registration or initialize applicant dossier
    if (userRole === 'student') {
      const existingReg = storage.findRegistrationByEmail(emailNorm);
      if (existingReg) {
        newUser.applicationId = existingReg.id;
        newUser.admissionStatus = existingReg.status;
        newUser.programInterest = existingReg.program_interest;
      } else if (challenge.signupData?.programInterest) {
        const nextId = `REG-2026-${String(storage.getRegistrations().length + 1).padStart(3, "0")}`;
        const newRecord: RegistrationRecord = {
          id: nextId,
          academy: "Muthamizh Academy",
          corporate_partner: "Mavis Satcom Limited (Jaya TV)",
          full_name: newUser.fullName,
          email: emailNorm,
          phone: newUser.phone || "+91 (On file)",
          program_interest: challenge.signupData.programInterest,
          qualification: "Online Applicant",
          timestamp: new Date().toISOString(),
          status: "Application Submitted",
          facultyRemarks: "New student candidate registered via Admissions Portal. Ready for faculty review.",
          updatedAt: new Date().toISOString()
        };
        storage.addRegistration(newRecord);
        newUser.applicationId = nextId;
        newUser.admissionStatus = "Application Submitted";
        newUser.programInterest = challenge.signupData.programInterest;
      }
    }

    storage.saveUser(newUser);
    storage.deleteOtpChallenge(emailNorm);

    const token = issueSession(res, newUser, userRole === 'faculty' ? "fac_tok_" : "tok_");

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "USER_REGISTERED",
      userId: newUser.id,
      performedBy: newUser.email,
      timestamp: new Date().toISOString(),
      details: `Account registered with role ${userRole}`,
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      message: userRole === 'faculty' 
        ? "Faculty credentials verified! Welcome to Muthamizh Academic Council."
        : "Email successfully authenticated. Welcome to Muthamizh Academy!",
      user: sanitizeUser(newUser),
      token
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to verify sign-up OTP." });
  }
});

// Login with Email and Password
app.post("/api/auth/login", authLimiter, (req, res) => {
  try {
    const { email, password, targetRole } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const emailNorm = email.trim().toLowerCase();
    const user = storage.findUserByEmail(emailNorm);

    if (!user) {
      return res.status(401).json({ error: "No account found with this email. Please sign up first." });
    }

    const isMatch = verifyPassword(password, user.salt, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password. Please check your credentials." });
    }

    // Role-specific verification
    if (targetRole === 'faculty') {
      if (user.role !== 'faculty' && user.role !== 'admin') {
        return res.status(403).json({
          error: "Access Denied: This account is registered as a Student. To access the Faculty Admissions Desk, please log in with verified faculty credentials or register with institutional faculty clearance."
        });
      }
    }

    user.lastLoginAt = new Date().toISOString();

    // Re-check if any admissions registration matches this user
    if (!user.applicationId && user.role === 'student') {
      const reg = storage.findRegistrationByEmail(emailNorm);
      if (reg) {
        user.applicationId = reg.id;
        user.admissionStatus = "Application Submitted";
      }
    }
    storage.saveUser(user);

    const token = issueSession(res, user, user.role === 'faculty' ? "fac_tok_" : "tok_");

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "USER_LOGIN_PASSWORD",
      userId: user.id,
      performedBy: user.email,
      timestamp: new Date().toISOString(),
      details: `User logged in with role ${user.role}`,
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      message: "Login successful.",
      user: sanitizeUser(user),
      token,
      portal: user.role === 'faculty' ? 'faculty' : 'student'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to log in." });
  }
});

// Send Login OTP (alternative passwordless verification)
app.post("/api/auth/send-login-otp", otpSendLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email address is required." });
    }

    const emailNorm = email.trim().toLowerCase();
    const user = storage.findUserByEmail(emailNorm);

    if (!user) {
      return res.status(404).json({ error: "No registered account found with this email. Please sign up." });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const expiresAt = Date.now() + 10 * 60 * 1000;

    storage.setOtpChallenge(emailNorm, {
      email: emailNorm,
      otpHash,
      purpose: 'login',
      expiresAt,
      attempts: 0,
      maxAttempts: 5,
      createdAt: Date.now(),
      fullName: user.fullName,
      role: user.role === 'faculty' ? 'faculty' : 'student'
    });

    const emailResult = await sendOtpEmail({
      to: emailNorm,
      fullName: user.fullName,
      role: user.role === 'faculty' ? 'faculty' : 'student',
      otp
    });

    console.log(`[OTP] Code dispatched successfully to ${emailNorm}`);
    console.log(`[OTP] Channel: ${emailResult.deliveryChannel} | Live SMTP: ${emailResult.isProductionSmtp}`);

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "LOGIN_OTP_DISPATCHED",
      performedBy: emailNorm,
      timestamp: new Date().toISOString(),
      details: "Passwordless login OTP dispatched",
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      message: `Login verification code sent to ${emailNorm}. Please check your email inbox.`,
      email: emailNorm,
      emailDispatched: emailResult.success,
      previewUrl: emailResult.previewUrl,
      expiresAt
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to send login OTP." });
  }
});

// Verify Login OTP with Brute-Force Defense
app.post("/api/auth/verify-login-otp", authLimiter, (req, res) => {
  try {
    const { email, otp } = req.body;
    const emailNorm = (email || "").trim().toLowerCase();
    const verification = verifyPendingOtp(emailNorm, otp, 'login');
    if (!verification.success) {
      return res.status(verification.status).json({ error: verification.error });
    }

    const user = storage.findUserByEmail(emailNorm);
    if (!user) {
      return res.status(404).json({ error: "User account not found." });
    }

    user.lastLoginAt = new Date().toISOString();
    storage.saveUser(user);
    storage.deleteOtpChallenge(emailNorm);

    const token = issueSession(res, user, user.role === 'faculty' ? "fac_tok_" : "tok_");

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "USER_LOGIN_OTP",
      userId: user.id,
      performedBy: user.email,
      timestamp: new Date().toISOString(),
      details: "User verified and logged in via OTP",
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      user: sanitizeUser(user),
      token
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to verify login OTP." });
  }
});

// Forgot Password - Initiate Reset OTP
app.post("/api/auth/forgot-password", otpSendLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Please enter your registered email address." });
    }

    const emailNorm = email.trim().toLowerCase();
    const user = storage.findUserByEmail(emailNorm);

    if (!user) {
      return res.status(404).json({
        error: "No account found with this email address. Please check your spelling or sign up for an account."
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    storage.setOtpChallenge(emailNorm, {
      email: emailNorm,
      otpHash,
      purpose: 'reset-password',
      expiresAt,
      attempts: 0,
      maxAttempts: 5,
      createdAt: Date.now(),
      fullName: user.fullName,
      role: user.role === 'faculty' ? 'faculty' : 'student'
    });

    const emailResult = await sendOtpEmail({
      to: emailNorm,
      fullName: user.fullName,
      role: user.role === 'faculty' ? 'faculty' : 'student',
      otp,
      purpose: 'reset'
    });

    console.log(`[OTP] Code dispatched successfully to ${emailNorm}`);
    console.log(`[OTP] Channel: ${emailResult.deliveryChannel} | Live SMTP: ${emailResult.isProductionSmtp}`);

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "PASSWORD_RESET_OTP_DISPATCHED",
      performedBy: emailNorm,
      timestamp: new Date().toISOString(),
      details: "Password reset OTP dispatched",
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      message: emailResult.isProductionSmtp
        ? `A 6-digit password reset code has been sent directly to your inbox at ${emailNorm}.`
        : `A 6-digit password reset code has been generated for ${emailNorm}.`,
      email: emailNorm,
      emailDispatched: emailResult.success,
      isProductionSmtp: emailResult.isProductionSmtp,
      deliveryChannel: emailResult.deliveryChannel,
      senderEmail: getActiveSmtpEmail(),
      previewUrl: emailResult.previewUrl,
      smtpError: emailResult.errorDetails,
      expiresAt,
      role: user.role
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to process forgot password request." });
  }
});

// Reset Password - Verify OTP & Set New Password with Brute-Force Defense
app.post("/api/auth/reset-password", authLimiter, (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: "Email, 6-digit verification code, and new password are required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters long." });
    }

    const emailNorm = email.trim().toLowerCase();
    const verification = verifyPendingOtp(emailNorm, otp, 'reset-password');
    if (!verification.success) {
      return res.status(verification.status).json({ error: verification.error });
    }

    const user = storage.findUserByEmail(emailNorm);
    if (!user) {
      return res.status(404).json({ error: "User account not found." });
    }

    // Hash new password
    const { salt, hash } = hashPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;
    user.lastLoginAt = new Date().toISOString();
    storage.saveUser(user);
    storage.deleteOtpChallenge(emailNorm);

    const token = issueSession(res, user, user.role === 'faculty' ? "fac_tok_" : "tok_");

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "PASSWORD_RESET_COMPLETED",
      userId: user.id,
      performedBy: user.email,
      timestamp: new Date().toISOString(),
      details: "User completed password reset via OTP",
      ipAddress: getClientIp(req)
    });

    console.log(`[PASSWORD RESET COMPLETED] Successfully reset password for ${emailNorm}`);

    res.json({
      success: true,
      message: "Password reset successfully! You have been securely logged in.",
      user: sanitizeUser(user),
      token,
      portal: user.role === 'faculty' ? 'faculty' : 'student'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to reset password." });
  }
});

// Get Current User Profile (Student or Faculty)
app.get("/api/auth/me", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  let studentApplication: RegistrationRecord | undefined = undefined;
  if (user.role === 'student' || !user.role) {
    const reg = storage.findRegistrationByEmail(user.email);
    if (reg) {
      user.applicationId = reg.id;
      user.admissionStatus = reg.status || "Application Submitted";
      user.programInterest = reg.program_interest;
      storage.saveUser(user);
      studentApplication = reg;
    }
  }

  res.json({ 
    user: sanitizeUser(user),
    application: studentApplication 
  });
});

// Student's Dedicated Application Tracker endpoint
app.get("/api/student/my-application", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ error: "Please log in to track your application." });
  }

  const reg = storage.findRegistrationByEmail(user.email);

  if (!reg) {
    return res.json({ hasApplication: false, message: "No application submitted yet." });
  }

  res.json({
    hasApplication: true,
    application: reg,
    candidate: sanitizeUser(user)
  });
});

// Regular Academy Updates and Circulars
app.get("/api/auth/updates", (req, res) => {
  res.json({ updates: storage.getCirculars() });
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  let token: string | undefined = undefined;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    token = auth.substring(7).trim();
  }
  if (!token && req.cookies && req.cookies.muthamizh_session) {
    token = req.cookies.muthamizh_session;
  }

  if (token) {
    storage.deleteSession(hashToken(token));
  }

  res.clearCookie("muthamizh_session", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  res.json({ success: true, message: "Logged out successfully" });
});

// ==================== FACULTY-EXCLUSIVE ADMISSIONS PROCESSING API ====================

// Faculty Authentication Gate
app.post("/api/faculty/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Institutional faculty email and password are required." });
    }

    const emailNorm = email.trim().toLowerCase();
    const facultyUser = storage.findUserByEmail(emailNorm);

    if (!facultyUser || (facultyUser.role !== 'faculty' && facultyUser.role !== 'admin')) {
      return res.status(403).json({ 
        error: "Access Denied: This account is not registered in the Muthamizh Academy Faculty Directory. Faculty access is restricted to verified instructors and admissions officers." 
      });
    }

    const isValid = verifyPassword(password, facultyUser.salt, facultyUser.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Incorrect faculty credentials. Please check your password." });
    }

    facultyUser.lastLoginAt = new Date().toISOString();
    storage.saveUser(facultyUser);

    const token = issueSession(res, facultyUser, "fac_tok_");

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "FACULTY_LOGIN",
      userId: facultyUser.id,
      performedBy: facultyUser.email,
      timestamp: new Date().toISOString(),
      details: "Faculty user logged in to admissions console",
      ipAddress: getClientIp(req)
    });

    res.json({
      success: true,
      user: sanitizeUser(facultyUser),
      token,
      message: `Welcome back, ${facultyUser.fullName}. Faculty admissions console active.`
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Faculty authentication failed." });
  }
});

// Faculty: Get All Student Applications with Metrics
app.get("/api/faculty/applications", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Exclusive to faculty members and admissions officers." });
  }

  const activeRegistrations = storage.getRegistrations();
  const total = activeRegistrations.length;
  const pendingReview = activeRegistrations.filter(
    r => r.status === 'Application Submitted' || r.status === 'Documents Under Review'
  ).length;
  const interviewsScheduled = activeRegistrations.filter(
    r => r.status === 'Faculty Interview Scheduled' || r.status === 'Studio Assessment'
  ).length;
  const confirmedAdmissions = activeRegistrations.filter(
    r => r.status === 'Provisional Admission Offered' || r.status === 'Admission Confirmed'
  ).length;

  res.json({
    applications: activeRegistrations,
    metrics: {
      total,
      pendingReview,
      interviewsScheduled,
      confirmedAdmissions,
      studioCapacityPct: Math.min(100, Math.round((confirmedAdmissions / 20) * 100))
    },
    faculty: {
      name: user.fullName,
      designation: user.facultyDesignation || "Faculty Member",
      department: user.facultyDepartment || "Academic Council"
    }
  });
});

// Faculty: Update Student Application Status & Schedule Admissions Steps
app.patch("/api/faculty/applications/:id", async (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Exclusive to faculty members and admissions officers." });
  }

  const { id } = req.params;
  const currentRecord = storage.findRegistrationById(id);
  if (!currentRecord) {
    return res.status(404).json({ error: "Application record not found." });
  }

  const {
    status,
    facultyRemarks,
    interviewDate,
    interviewVenue,
    studioFloorAssigned,
    scholarshipGranted
  } = req.body;

  const previousStatus = currentRecord.status;

  const updatedRecord = storage.updateRegistration(id, {
    status: status || currentRecord.status,
    facultyRemarks: facultyRemarks !== undefined ? facultyRemarks : currentRecord.facultyRemarks,
    interviewDate: interviewDate !== undefined ? interviewDate : currentRecord.interviewDate,
    interviewVenue: interviewVenue !== undefined ? interviewVenue : currentRecord.interviewVenue,
    studioFloorAssigned: studioFloorAssigned !== undefined ? studioFloorAssigned : currentRecord.studioFloorAssigned,
    scholarshipGranted: scholarshipGranted !== undefined ? scholarshipGranted : currentRecord.scholarshipGranted,
    reviewedByFaculty: `${user.fullName} (${user.facultyDesignation || "Faculty"})`
  });

  if (!updatedRecord) {
    return res.status(500).json({ error: "Failed to persist application updates." });
  }

  // Synchronize student's registered account so student sees update immediately
  const matchedStudent = storage.findUserByEmail(updatedRecord.email);
  if (matchedStudent) {
    matchedStudent.admissionStatus = updatedRecord.status;
    matchedStudent.applicationId = updatedRecord.id;
    storage.saveUser(matchedStudent);
  }

  storage.addAuditLog({
    id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    action: "APPLICATION_STATUS_UPDATED",
    userId: user.id,
    performedBy: user.email,
    resource: "applications",
    resourceId: id,
    oldValue: { status: previousStatus },
    newValue: { status: updatedRecord.status, remarks: updatedRecord.facultyRemarks },
    timestamp: new Date().toISOString(),
    ipAddress: getClientIp(req)
  });

  console.log(`[FACULTY UPDATE] Application ${id} updated to "${updatedRecord.status}" by ${user.fullName}`);

  // Dispatch notification email
  const emailResult = await sendApplicationStatusUpdateEmail({
    to: updatedRecord.email,
    fullName: updatedRecord.full_name,
    applicationId: updatedRecord.id,
    programInterest: updatedRecord.program_interest,
    status: updatedRecord.status,
    facultyRemarks: updatedRecord.facultyRemarks,
    interviewDate: updatedRecord.interviewDate,
    interviewVenue: updatedRecord.interviewVenue,
    studioFloorAssigned: updatedRecord.studioFloorAssigned,
    scholarshipGranted: updatedRecord.scholarshipGranted,
    reviewedByFaculty: updatedRecord.reviewedByFaculty,
  });

  res.json({
    success: true,
    application: updatedRecord,
    emailDispatched: emailResult.success,
    previewUrl: emailResult.previewUrl,
    message: `Application ${id} updated to "${updatedRecord.status}". Official notification email dispatched to ${updatedRecord.email}.`
  });
});

// Faculty: Resend/Trigger Status Notification Email to Candidate
app.post("/api/faculty/applications/:id/resend-email", async (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Exclusive to faculty members and admissions officers." });
  }

  const { id } = req.params;
  const appRecord = storage.findRegistrationById(id);
  if (!appRecord) {
    return res.status(404).json({ error: "Application record not found." });
  }

  const emailResult = await sendApplicationStatusUpdateEmail({
    to: appRecord.email,
    fullName: appRecord.full_name,
    applicationId: appRecord.id,
    programInterest: appRecord.program_interest,
    status: appRecord.status,
    facultyRemarks: appRecord.facultyRemarks,
    interviewDate: appRecord.interviewDate,
    interviewVenue: appRecord.interviewVenue,
    studioFloorAssigned: appRecord.studioFloorAssigned,
    scholarshipGranted: appRecord.scholarshipGranted,
    reviewedByFaculty: appRecord.reviewedByFaculty || `${user.fullName} (${user.facultyDesignation || "Faculty"})`,
  });

  storage.addAuditLog({
    id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    action: "STATUS_EMAIL_RESENT",
    userId: user.id,
    performedBy: user.email,
    resource: "applications",
    resourceId: id,
    timestamp: new Date().toISOString(),
    details: `Status notification email resent to ${appRecord.email}`,
    ipAddress: getClientIp(req)
  });

  res.json({
    success: true,
    emailDispatched: emailResult.success,
    previewUrl: emailResult.previewUrl,
    message: `Status notification email dispatched to ${appRecord.email}.`
  });
});

// Faculty/Admin: Delete (soft delete) single application record
app.delete("/api/faculty/applications/:id", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Exclusive to faculty members and admissions officers." });
  }

  const { id } = req.params;
  const removed = storage.softDeleteRegistration(id, `${user.fullName} (${user.email})`);
  if (!removed) {
    return res.status(404).json({ error: "Application record not found." });
  }

  storage.addAuditLog({
    id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    action: "APPLICATION_SOFT_DELETED",
    userId: user.id,
    performedBy: user.email,
    resource: "applications",
    resourceId: id,
    timestamp: new Date().toISOString(),
    details: `Application ${id} soft-deleted by ${user.fullName}`,
    ipAddress: getClientIp(req)
  });

  console.log(`[FACULTY] Application ${id} soft-deleted by ${user.fullName}`);
  res.json({ success: true, message: `Application ${id} removed successfully.`, removed });
});

// Admin-Only: Bulk clear/archive all applicant records
app.delete("/api/faculty/applications", (req, res) => {
  const user = getUserFromAuthHeader(req);
  // Restrict bulk delete strictly to Admin role
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ 
      error: "Access Denied: Bulk deletion is strictly restricted to Administrators. Faculty members cannot bulk-purge applications." 
    });
  }

  const { confirmation } = req.body || {};
  if (confirmation !== "CONFIRM_DELETE_ALL") {
    return res.status(400).json({ 
      error: "Bulk deletion requires explicit confirmation payload: { confirmation: 'CONFIRM_DELETE_ALL' }" 
    });
  }

  const count = storage.bulkSoftDeleteRegistrations(`${user.fullName} (${user.email})`);

  storage.addAuditLog({
    id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    action: "BULK_APPLICATIONS_PURGED",
    userId: user.id,
    performedBy: user.email,
    resource: "applications",
    timestamp: new Date().toISOString(),
    details: `Bulk soft-deleted ${count} application records`,
    ipAddress: getClientIp(req)
  });

  console.log(`[AUDIT] [ADMIN_PURGE] All ${count} application records archived by Admin ${user.fullName} (${user.email}) at ${new Date().toISOString()}`);
  res.json({ success: true, message: `All ${count} application records archived. Admissions queue is now at zero.` });
});

// Mail Delivery Status & Health Check
app.get("/api/email/status", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Access restricted to authorized faculty and administrators." });
  }

  const isConfigured = isProductionSmtpConfigured();
  const activeEmail = getActiveSmtpEmail();
  res.json({
    success: true,
    isProductionSmtpConfigured: isConfigured,
    senderEmail: activeEmail,
    deliveryMode: isConfigured ? "production_smtp" : "ethereal_sandbox",
    totalLogs: emailAuditLogs.length,
    recentLogs: emailAuditLogs.slice(0, 5)
  });
});

// Faculty: Publish Official Circular & Broadcast Update to Students
app.post("/api/faculty/circulars", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Exclusive to faculty members and admissions officers." });
  }

  const { title, category, summary, urgent } = req.body;
  if (!title || !summary) {
    return res.status(400).json({ error: "Circular Title and Summary are required." });
  }

  const circulars = storage.getCirculars();
  const newCircular: CircularItem = {
    id: `CIRC-2026-${String(circulars.length + 1).padStart(2, "0")}`,
    title: escapeHtml(title),
    category: category || "Admissions",
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    summary: escapeHtml(summary),
    urgent: !!urgent,
    publishedBy: `${user.fullName} (${user.facultyDesignation || "Faculty"})`
  };

  storage.addCircular(newCircular);

  storage.addAuditLog({
    id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    action: "CIRCULAR_PUBLISHED",
    userId: user.id,
    performedBy: user.email,
    resource: "circulars",
    resourceId: newCircular.id,
    timestamp: new Date().toISOString(),
    details: `Published circular: ${newCircular.title}`,
    ipAddress: getClientIp(req)
  });

  res.json({
    success: true,
    circular: newCircular,
    message: "Broadcast circular published successfully to the student portal."
  });
});

// ==================== FACULTY INVITATION MANAGEMENT ====================

// Public: Validate Faculty Invitation Token
app.get("/api/faculty/invitations/validate", (req, res) => {
  const token = (req.query.token as string || "").trim();
  if (!token) {
    return res.status(400).json({ valid: false, error: "Invitation token required." });
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const inv = storage.getInvitationByHash(tokenHash);

  if (!inv || inv.used || inv.expiresAt <= Date.now()) {
    return res.status(404).json({
      valid: false,
      error: "This faculty invitation is invalid, has expired, or has already been redeemed."
    });
  }

  res.json({
    valid: true,
    email: inv.email,
    department: inv.department,
    designation: inv.designation,
    expiresAt: inv.expiresAt
  });
});

// Faculty/Admin: Generate Single-Use Faculty Invitation
app.post("/api/faculty/invitations", async (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Exclusive to faculty members and administrators." });
  }

  const { email, department, designation } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Invitee email address is required." });
  }

  const emailNorm = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailNorm)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // Check if email is already a registered faculty member
  const existingUser = storage.findUserByEmail(emailNorm);
  if (existingUser && existingUser.role === 'faculty') {
    return res.status(400).json({ error: "A faculty account is already registered with this email address." });
  }

  // Generate 32-byte cryptographic random token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  const invitationId = `INV-FAC-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const expiresAt = Date.now() + 48 * 60 * 60 * 1000; // 48 hours validity

  const newInvitation: FacultyInvitation = {
    id: invitationId,
    email: emailNorm,
    tokenHash,
    department: department ? department.trim() : "Admissions Council & Academic Affairs",
    designation: designation ? designation.trim() : "Faculty Member",
    createdAt: Date.now(),
    expiresAt,
    used: false,
    createdBy: `${user.fullName} (${user.email})`
  };

  storage.addInvitation(newInvitation);

  storage.addAuditLog({
    id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
    action: "FACULTY_INVITATION_CREATED",
    userId: user.id,
    performedBy: user.email,
    resource: "faculty_invitations",
    resourceId: invitationId,
    timestamp: new Date().toISOString(),
    details: `Issued faculty invitation for ${emailNorm} (${newInvitation.designation})`,
    ipAddress: getClientIp(req)
  });

  // Send invitation email
  const emailResult = await sendFacultyInvitationEmail({
    to: emailNorm,
    invitedByName: user.fullName,
    department: newInvitation.department || "Admissions Council",
    designation: newInvitation.designation || "Faculty Member",
    rawToken
  });

  res.json({
    success: true,
    message: `Single-use faculty invitation created for ${emailNorm}.`,
    invitation: {
      id: newInvitation.id,
      email: newInvitation.email,
      department: newInvitation.department,
      designation: newInvitation.designation,
      createdAt: newInvitation.createdAt,
      expiresAt: newInvitation.expiresAt,
      inviteToken: rawToken
    },
    emailDispatched: emailResult.success,
    previewUrl: emailResult.previewUrl
  });
});

// Faculty/Admin: List Active & Historic Invitations
app.get("/api/faculty/invitations", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Exclusive to faculty members and administrators." });
  }

  const now = Date.now();
  const allInvitations = storage.getFacultyInvitations();
  const sanitizedList = allInvitations.map(inv => ({
    id: inv.id,
    email: inv.email,
    department: inv.department,
    designation: inv.designation,
    createdAt: inv.createdAt,
    expiresAt: inv.expiresAt,
    used: inv.used,
    usedAt: inv.usedAt,
    isExpired: !inv.used && now > inv.expiresAt,
    status: inv.used ? 'Used' : (now > inv.expiresAt ? 'Expired' : 'Active'),
    createdBy: inv.createdBy
  }));

  res.json({
    success: true,
    invitations: sanitizedList
  });
});

// ==================== DEPARTMENT FACULTY DIRECTORY ====================
// Faculty directory is managed statically and securely in src/data/facultyData.ts


// ==================== ADMISSIONS REGISTRATIONS ====================

app.get("/api/registrations", (req, res) => {
  const user = getUserFromAuthHeader(req);
  const activeRegistrations = storage.getRegistrations();
  if (user && (user.role === 'faculty' || user.role === 'admin')) {
    return res.json({ registrations: activeRegistrations, count: activeRegistrations.length });
  }
  // Public visitors or students receive aggregate count only - no candidate PII
  res.json({ count: activeRegistrations.length });
});

// Input Validation for /api/register using Zod
app.post("/api/register", async (req, res) => {
  try {
    const parseResult = RegisterSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errorMsg = (parseResult.error.issues || []).map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return res.status(400).json({ error: `Validation failed: ${errorMsg || "Invalid payload"}` });
    }

    const data = parseResult.data;
    const activeRegistrations = storage.getRegistrations();
    const newRecord: RegistrationRecord = {
      id: `REG-2026-${String(activeRegistrations.length + 1).padStart(3, "0")}`,
      // Fixed institutional fields controlled strictly by server
      academy: "Muthamizh Academy",
      corporate_partner: "Mavis Satcom Limited (Jaya TV)",
      full_name: escapeHtml(data.full_name.trim()),
      email: data.email.trim().toLowerCase(),
      phone: escapeHtml(data.phone),
      program_interest: escapeHtml(data.program_interest),
      qualification: escapeHtml(data.qualification),
      timestamp: new Date().toISOString(),
      status: "Application Submitted",
      facultyRemarks: "Application received by Admissions Desk. Scheduled for document and qualification screening.",
      updatedAt: new Date().toISOString()
    };
    storage.addRegistration(newRecord);

    // If an authenticated user with this email exists, link their application!
    const matchedUser = storage.findUserByEmail(newRecord.email);
    if (matchedUser) {
      matchedUser.applicationId = newRecord.id;
      matchedUser.admissionStatus = "Application Submitted";
      matchedUser.programInterest = newRecord.program_interest;
      storage.saveUser(matchedUser);
    }

    storage.addAuditLog({
      id: `AUD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      action: "REGISTRATION_SUBMITTED",
      performedBy: newRecord.email,
      resource: "registrations",
      resourceId: newRecord.id,
      timestamp: new Date().toISOString(),
      details: `New registration submitted for program: ${newRecord.program_interest}`,
      ipAddress: getClientIp(req)
    });

    // Dispatch real email confirmation to candidate's email address
    const emailResult = await sendApplicationSubmittedEmail({
      to: newRecord.email,
      fullName: newRecord.full_name,
      applicationId: newRecord.id,
      programInterest: newRecord.program_interest,
      phone: newRecord.phone,
      qualification: newRecord.qualification,
    });

    res.json({ 
      success: true, 
      record: newRecord,
      emailDispatched: emailResult.success,
      previewUrl: emailResult.previewUrl
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to register" });
  }
});

// Email Audit Logs (Available for authenticated students and faculty)
app.get("/api/email/logs", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ error: "Authentication required to view email dispatch logs." });
  }

  if (user.role === 'faculty' || user.role === 'admin') {
    return res.json({ logs: emailAuditLogs });
  }

  // Student only sees emails sent to their email address
  const userLogs = emailAuditLogs.filter(l => l.to.toLowerCase() === user.email.toLowerCase());
  res.json({ logs: userLogs });
});

// System Audit Logs (Admins and Faculty)
app.get("/api/audit/logs", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user || (user.role !== 'faculty' && user.role !== 'admin')) {
    return res.status(403).json({ error: "Forbidden: Access restricted to authorized faculty and administrators." });
  }

  res.json({ logs: storage.getAuditLogs() });
});

// In-memory rate limiting map for AI chat endpoint to prevent abuse/denial of wallet
const chatRateLimitMap = new Map<string, { count: number; resetTime: number }>();

app.post("/api/chat", async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequestsPerWindow = 20;

    const rateData = chatRateLimitMap.get(clientIp);
    if (!rateData || now > rateData.resetTime) {
      chatRateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
    } else {
      if (rateData.count >= maxRequestsPerWindow) {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a moment before sending another query to Astra AI."
        });
      }
      rateData.count++;
    }

    const { history, message } = req.body;

    // Validate message payload
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "A message string is required." });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: "Message exceeds maximum allowed length (2000 characters)." });
    }

    const ai = getGenAIClient();

    if (!ai) {
      return res.json({
        reply: `Welcome to Muthamizh Academy! I am Astra, your AI Concierge. We offer 11 programs across AI Software Engineering, Enterprise IT & Networking, Broadcast Cinematography, Media Law, and Studio Operations (with Online Virtual Labs and On-Campus Studio options). How can I assist you with your 2026 admissions?`
      });
    }

    // Format chat contents safely with bounded history (max 10 past messages)
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      const boundedHistory = history.slice(-10);
      for (const h of boundedHistory) {
        if (h && typeof h.text === "string" && (h.role === "user" || h.role === "model")) {
          contents.push({
            role: h.role,
            parts: [{ text: h.text.slice(0, 2000) }]
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message.trim() }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: ASTRA_SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const reply = response.text || "Thank you for contacting Muthamizh Academy. How else can Astra assist you with your career and admissions?";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ 
      error: "AI service temporarily busy",
      reply: "Welcome to Muthamizh Academy! Astra is here to help you enroll in our media and tech programs. Please tell me your full name and the course you are interested in." 
    });
  }
});

// ==========================================
// Google Drive Media Stream Proxy
// Handles MP4 video streaming with Range headers (HTTP 206)
// Protected by Media Stream Rate Limiting, FileId Format Validation & Strict Allowlist
// ==========================================
app.get("/api/media/stream/:fileId", mediaStreamLimiter, (req, res) => {
  const fileId = req.params.fileId;
  if (!fileId || typeof fileId !== "string" || !/^[a-zA-Z0-9_-]{15,100}$/.test(fileId)) {
    return res.status(400).json({ error: "Invalid or malformed fileId parameter" });
  }

  // Strict allowlist validation
  if (!ALLOWED_MEDIA_IDS.has(fileId)) {
    return res.status(403).json({ error: "Forbidden: Media asset not authorized for streaming." });
  }

  const range = req.headers.range;
  const initialUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`;

  const requestStream = (targetUrl: string, redirectCount = 0) => {
    if (redirectCount > 5) {
      return res.status(502).json({ error: "Too many redirects fetching media" });
    }

    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    };
    if (range) {
      headers["Range"] = range;
    }

    https.get(targetUrl, { headers }, (remoteRes) => {
      // Check redirect
      if (
        remoteRes.statusCode && 
        remoteRes.statusCode >= 300 && 
        remoteRes.statusCode < 400 && 
        remoteRes.headers.location
      ) {
        try {
          const redirectObj = new URL(remoteRes.headers.location, targetUrl);
          // Strict SSRF guard: ensure redirect target is strictly an official Google domain
          const isAllowedDomain = 
            redirectObj.hostname === "drive.google.com" ||
            redirectObj.hostname === "drive.usercontent.google.com" ||
            redirectObj.hostname.endsWith(".googleusercontent.com") ||
            redirectObj.hostname.endsWith(".google.com");

          if (!isAllowedDomain || redirectObj.protocol !== "https:") {
            return res.status(403).json({ error: "Prohibited media redirect host" });
          }
          return requestStream(redirectObj.toString(), redirectCount + 1);
        } catch {
          return res.status(502).json({ error: "Invalid redirect URI encountered" });
        }
      }

      res.status(remoteRes.statusCode || 200);

      const passThroughHeaders = [
        "content-type",
        "content-length",
        "content-range",
        "accept-ranges",
        "last-modified",
        "cache-control"
      ];

      passThroughHeaders.forEach((header) => {
        const val = remoteRes.headers[header];
        if (val) {
          res.setHeader(header, val);
        }
      });

      if (!remoteRes.headers["content-type"]) {
        res.setHeader("Content-Type", "video/mp4");
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Accept-Ranges", "bytes");

      remoteRes.pipe(res);

      req.on("close", () => {
        remoteRes.destroy();
      });
    }).on("error", (err) => {
      if (!res.headersSent) {
        res.status(502).json({ error: "Failed to stream media: " + err.message });
      }
    });
  };

  requestStream(initialUrl);
});

// Setup Vite Development or Static Production middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: process.env.DISABLE_HMR === "true" ? null : {
          ignored: [
            "**/data/**",
            "**/data/*",
            "**/*.tmp.*",
            "**/drive_catalog.json",
            "**/*.log",
            "**/*.txt"
          ]
        }
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Muthamizh Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
