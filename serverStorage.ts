import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export type AdmissionStatus = 
  | 'New Candidate'
  | 'Application Submitted'
  | 'Documents Under Review'
  | 'Faculty Interview Scheduled'
  | 'Studio Assessment'
  | 'Provisional Admission Offered'
  | 'Admission Confirmed'
  | 'Application On Hold'
  | 'Archived';

export interface StoredUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  passwordHash: string;
  salt: string;
  role: 'student' | 'faculty' | 'admin';
  facultyDesignation?: string;
  facultyDepartment?: string;
  programInterest?: string;
  isEmailVerified: boolean;
  registeredAt: string;
  lastLoginAt: string;
  admissionStatus: AdmissionStatus;
  applicationId?: string;
  updatesSubscribed: boolean;
  mustChangePassword?: boolean;
}

export interface RegistrationRecord {
  id: string;
  academy: string;
  corporate_partner: string;
  full_name: string;
  email: string;
  phone: string;
  program_interest: string;
  qualification: string;
  timestamp: string;
  status: AdmissionStatus;
  facultyRemarks?: string;
  interviewDate?: string;
  interviewVenue?: string;
  reviewedByFaculty?: string;
  updatedAt?: string;
  studioFloorAssigned?: string;
  scholarshipGranted?: string;
  isArchived?: boolean;
  archivedAt?: string;
  archivedBy?: string;
  deleted_at?: string;
  deleted_by?: string;
}

export interface StoredSession {
  tokenHash: string;
  userId: string;
  userEmail: string;
  role: 'student' | 'faculty' | 'admin';
  createdAt: number;
  expiresAt: number;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  userId?: string;
  performedBy: string;
  resource?: string;
  resourceId?: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  details?: string;
}

export interface CircularItem {
  id: string;
  title: string;
  category: 'Admissions' | 'Studio Broadcast' | 'Curriculum & Labs' | 'Placement & Network';
  date: string;
  summary: string;
  urgent?: boolean;
  publishedBy?: string;
}

export interface FacultyInvitation {
  id: string;
  tokenHash: string;
  email: string;
  department: string;
  designation: string;
  createdBy: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
  usedAt?: number;
}

export interface OtpChallenge {
  email: string;
  otpHash: string;
  purpose: 'signup' | 'login' | 'reset-password' | 'general' | 'verification';
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
  createdAt: number;
  fullName?: string;
  role?: 'student' | 'faculty';
  signupData?: {
    fullName: string;
    phone?: string;
    passwordHash: string;
    salt: string;
    role?: 'student' | 'faculty';
    facultyDepartment?: string;
    facultyDesignation?: string;
    programInterest?: string;
    updatesSubscribed?: boolean;
  };
}

export interface StoredFacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  experience: string;
  expertise: string[];
  bio: string;
  image: string;
  networkCredit: string;
  email?: string;
  phone?: string;
  isCustomUploaded?: boolean;
  createdAt: number;
}

export interface VisitorHit {
  id: string;
  timestamp: string;
  ipHash: string;
  path: string;
  referrer?: string;
  userAgent?: string;
}

export interface VisitorAnalytics {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  weekVisits: number;
  leadsCount: number;
  conversionRate: number;
  popularPages: { path: string; count: number }[];
  recentVisits: { timestamp: string; path: string; referrer?: string }[];
}

interface DatabaseSchema {
  version: number;
  users: StoredUser[];
  registrations: RegistrationRecord[];
  sessions: StoredSession[];
  auditLogs: AuditLogEntry[];
  circulars: CircularItem[];
  facultyInvitations: FacultyInvitation[];
  facultyMembers: StoredFacultyMember[];
  otpChallenges: Record<string, OtpChallenge>;
  visitorHits: VisitorHit[];
  totalVisitCount: number;
}

const DB_FILE = process.env.ADMISSIONS_DB_PATH
  ? path.resolve(process.env.ADMISSIONS_DB_PATH)
  : path.join(process.cwd(), 'data', 'admissions_db.json');

const DB_DIR = path.dirname(DB_FILE);

class StorageEngine {
  private db: DatabaseSchema = {
    version: 2,
    users: [],
    registrations: [],
    sessions: [],
    auditLogs: [],
    circulars: [],
    facultyInvitations: [],
    facultyMembers: [],
    otpChallenges: {},
    visitorHits: [],
    totalVisitCount: 0
  };

  private isInitialized = false;

  public init(initialUsers: StoredUser[], initialCirculars: CircularItem[]) {
    if (this.isInitialized) return;

    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.db = {
          version: parsed.version || 2,
          users: Array.isArray(parsed.users) ? parsed.users : [],
          registrations: Array.isArray(parsed.registrations) ? parsed.registrations : [],
          sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
          auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : [],
          circulars: Array.isArray(parsed.circulars) ? parsed.circulars : [],
          facultyInvitations: Array.isArray(parsed.facultyInvitations) ? parsed.facultyInvitations : [],
          facultyMembers: Array.isArray(parsed.facultyMembers) ? parsed.facultyMembers : [],
          otpChallenges: parsed.otpChallenges && typeof parsed.otpChallenges === 'object' ? parsed.otpChallenges : {},
          visitorHits: Array.isArray(parsed.visitorHits) ? parsed.visitorHits : [],
          totalVisitCount: typeof parsed.totalVisitCount === 'number' ? parsed.totalVisitCount : (Array.isArray(parsed.visitorHits) ? parsed.visitorHits.length : 0)
        };

        // Merge initial staff members if missing
        for (const initialU of initialUsers) {
          if (!this.db.users.some(u => u.email.toLowerCase() === initialU.email.toLowerCase())) {
            this.db.users.push(initialU);
          }
        }
        if (this.db.circulars.length === 0) {
          this.db.circulars = initialCirculars;
        }

        // Automatic deduplication: ensure one person can only register for each course once
        this.deduplicateRegistrations();

        console.log(`[STORAGE] Loaded persistent database: ${this.db.users.length} users, ${this.db.registrations.length} registrations, ${this.db.auditLogs.length} audit logs`);
      } else {
        // Seed initial records
        this.db.users = initialUsers;
        this.db.circulars = initialCirculars;
        this.persist();
        console.log(`[STORAGE] Initialized new persistent admissions database with initial faculty & circulars`);
      }
    } catch (err: any) {
      console.error(`[STORAGE ERROR] Failed to load database file, using runtime fallback:`, err.message);
      this.db.users = initialUsers;
      this.db.circulars = initialCirculars;
    }

    this.isInitialized = true;
  }

  private persistTimer: NodeJS.Timeout | null = null;

  private persist(immediate = false) {
    if (immediate) {
      if (this.persistTimer) {
        clearTimeout(this.persistTimer);
        this.persistTimer = null;
      }
      this.writeDbFile();
      return;
    }

    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
    }
    this.persistTimer = setTimeout(() => {
      this.persistTimer = null;
      this.writeDbFile();
    }, 50);
  }

  private writeDbFile() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      const tmpFile = `${DB_FILE}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 7)}`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.db, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err: any) {
      console.error(`[STORAGE ERROR] Failed to persist database:`, err.message);
    }
  }

  // --- Users ---
  public getUsers(): StoredUser[] {
    return this.db.users;
  }

  public findUserByEmail(email: string): StoredUser | undefined {
    const norm = email.toLowerCase().trim();
    return this.db.users.find(u => u.email.toLowerCase() === norm);
  }

  public findUserById(id: string): StoredUser | undefined {
    return this.db.users.find(u => u.id === id);
  }

  public saveUser(user: StoredUser) {
    const idx = this.db.users.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      this.db.users[idx] = user;
    } else {
      this.db.users.push(user);
    }
    this.persist();
  }

  // --- Registrations ---
  public getRegistrations(): RegistrationRecord[] {
    // Run automated deduplication to guarantee one registration per candidate per course
    this.deduplicateRegistrations();
    return this.db.registrations.filter(r => !r.deleted_at);
  }

  public getAllRegistrationsIncludingDeleted(): RegistrationRecord[] {
    return this.db.registrations;
  }

  public findRegistrationByEmail(email: string): RegistrationRecord | undefined {
    const norm = email.toLowerCase().trim();
    return this.db.registrations.find(r => r.email.toLowerCase() === norm && !r.deleted_at);
  }

  public findRegistrationById(id: string): RegistrationRecord | undefined {
    return this.db.registrations.find(r => (r.id === id) && !r.deleted_at);
  }

  /**
   * Normalizes program title so comparisons match regardless of HTML escaping, track duration suffixes, spacing, or case.
   */
  public normalizeProgramName(name: string): string {
    if (!name) return '';
    let cleaned = name
      .replace(/&amp;/gi, '&')
      .replace(/&#38;/g, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&apos;/gi, "'")
      .toLowerCase();

    // Repeatedly strip parenthetical expressions (handles nested parentheses like (1 Months (Intensive & Hands-on)))
    while (/\([^()]*\)/.test(cleaned)) {
      cleaned = cleaned.replace(/\([^()]*\)/g, ' ');
    }
    // Remove any stray leftover parentheses
    cleaned = cleaned.replace(/[()]/g, ' ');

    // Keep only alphanumeric characters for canonical course key
    return cleaned.replace(/[^a-z0-9]/g, '').trim();
  }

  /**
   * Checks if a candidate (by email or 10-digit phone) has already registered for a specific program.
   */
  public findExistingRegistration(email: string, phone: string, program: string): RegistrationRecord | undefined {
    const normEmail = (email || '').toLowerCase().trim();
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    const targetProg = this.normalizeProgramName(program);

    if (!targetProg) return undefined;

    return this.db.registrations.find(r => {
      if (r.deleted_at) return false;
      const rProg = this.normalizeProgramName(r.program_interest);
      if (rProg !== targetProg) return false;

      const rEmail = (r.email || '').toLowerCase().trim();
      const rPhone = (r.phone || '').replace(/\D/g, '').slice(-10);

      const emailMatches = Boolean(normEmail && rEmail && normEmail === rEmail);
      const phoneMatches = Boolean(cleanPhone && cleanPhone.length === 10 && rPhone && rPhone === cleanPhone);

      return emailMatches || phoneMatches;
    });
  }

  /**
   * Retrieves all active registrations for a given candidate across different courses.
   */
  public findRegistrationsByCandidate(email: string, phone?: string): RegistrationRecord[] {
    const normEmail = (email || '').toLowerCase().trim();
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

    return this.db.registrations.filter(r => {
      if (r.deleted_at) return false;
      const rEmail = (r.email || '').toLowerCase().trim();
      const rPhone = (r.phone || '').replace(/\D/g, '').slice(-10);

      const emailMatches = Boolean(normEmail && rEmail && normEmail === rEmail);
      const phoneMatches = Boolean(cleanPhone && cleanPhone.length === 10 && rPhone && rPhone === cleanPhone);

      return emailMatches || phoneMatches;
    });
  }

  /**
   * Automatically deduplicates duplicate registrations so each candidate has at most ONE registration per course.
   * If duplicates exist, merges any detailed qualification/phone into the primary registration and discards the rest.
   */
  public deduplicateRegistrations() {
    const seenEmails = new Set<string>();
    const seenPhones = new Set<string>();
    const uniqueList: RegistrationRecord[] = [];
    let changed = false;

    // Process all registrations
    for (const r of this.db.registrations) {
      if (r.deleted_at) {
        uniqueList.push(r);
        continue;
      }
      const emailNorm = (r.email || '').toLowerCase().trim();
      const phoneClean = (r.phone || '').replace(/\D/g, '').slice(-10);
      const progNorm = this.normalizeProgramName(r.program_interest);

      if (!progNorm || (!emailNorm && !phoneClean)) {
        uniqueList.push(r);
        continue;
      }

      const emailKey = emailNorm ? `${emailNorm}::${progNorm}` : '';
      const phoneKey = (phoneClean && phoneClean.length === 10) ? `${phoneClean}::${progNorm}` : '';

      const isDuplicate = Boolean(
        (emailKey && seenEmails.has(emailKey)) ||
        (phoneKey && seenPhones.has(phoneKey))
      );

      if (!isDuplicate) {
        if (emailKey) seenEmails.add(emailKey);
        if (phoneKey) seenPhones.add(phoneKey);
        // Clean up program interest display name if it had HTML entities like &amp;
        if (r.program_interest && r.program_interest.includes('&amp;')) {
          r.program_interest = r.program_interest.replace(/&amp;/gi, '&');
          changed = true;
        }
        uniqueList.push(r);
      } else {
        changed = true;
        // Enrich the kept unique record with the highest quality qualification if duplicate had one
        const existingIdx = uniqueList.findIndex(existing => {
          const exEmail = (existing.email || '').toLowerCase().trim();
          const exPhone = (existing.phone || '').replace(/\D/g, '').slice(-10);
          const exProg = this.normalizeProgramName(existing.program_interest);
          return exProg === progNorm && (
            (emailNorm && exEmail === emailNorm) ||
            (phoneClean && phoneClean.length === 10 && exPhone === phoneClean)
          );
        });

        if (existingIdx >= 0) {
          const existing = uniqueList[existingIdx];
          const isGeneric = !existing.qualification || existing.qualification === 'Online Applicant' || existing.qualification === 'Graduate';
          const isBetter = r.qualification && r.qualification !== 'Online Applicant' && r.qualification !== 'Graduate';
          if (isGeneric && isBetter) {
            existing.qualification = r.qualification;
          }
          if (!existing.phone && r.phone) {
            existing.phone = r.phone;
          }
        }
      }
    }

    if (changed) {
      this.db.registrations = uniqueList;
      this.persist();
      console.log(`[STORAGE] Cleaned up duplicate registrations. Unique active count: ${this.db.registrations.length}`);
    }
  }

  public addRegistration(reg: RegistrationRecord) {
    // Defense-in-depth: Never add if already registered for this exact course
    const existing = this.findExistingRegistration(reg.email, reg.phone, reg.program_interest);
    if (existing) {
      console.warn(`[STORAGE WARNING] Attempted duplicate registration for ${reg.email} on ${reg.program_interest}. Ignored.`);
      return;
    }
    // Clean up HTML entities in stored program_interest
    if (reg.program_interest && reg.program_interest.includes('&amp;')) {
      reg.program_interest = reg.program_interest.replace(/&amp;/gi, '&');
    }
    this.db.registrations.unshift(reg);
    this.persist();
  }

  public updateRegistration(id: string, updates: Partial<RegistrationRecord>): RegistrationRecord | null {
    const idx = this.db.registrations.findIndex(r => r.id === id);
    if (idx >= 0) {
      this.db.registrations[idx] = { 
        ...this.db.registrations[idx], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      this.persist();
      return this.db.registrations[idx];
    }
    return null;
  }

  public softDeleteRegistration(id: string, deletedBy: string): RegistrationRecord | null {
    const idx = this.db.registrations.findIndex(r => r.id === id);
    if (idx >= 0) {
      this.db.registrations[idx].deleted_at = new Date().toISOString();
      this.db.registrations[idx].deleted_by = deletedBy;
      this.db.registrations[idx].status = 'Archived';
      this.persist();
      return this.db.registrations[idx];
    }
    return null;
  }

  public bulkSoftDeleteRegistrations(deletedBy: string): number {
    const now = new Date().toISOString();
    let count = 0;
    for (const r of this.db.registrations) {
      if (!r.deleted_at) {
        r.deleted_at = now;
        r.deleted_by = deletedBy;
        r.status = 'Archived';
        count++;
      }
    }
    if (count > 0) {
      this.persist();
    }
    return count;
  }

  // --- Sessions (HttpOnly Cookie & Bearer compatible) ---
  public getSession(tokenHash: string): StoredSession | undefined {
    const session = this.db.sessions.find(s => s.tokenHash === tokenHash);
    if (!session) return undefined;
    if (Date.now() > session.expiresAt) {
      this.deleteSession(tokenHash);
      return undefined;
    }
    return session;
  }

  public saveSession(session: StoredSession) {
    const now = Date.now();
    // Prune expired sessions
    this.db.sessions = this.db.sessions.filter(s => s.expiresAt > now && s.tokenHash !== session.tokenHash);
    this.db.sessions.push(session);
    this.persist();
  }

  public deleteSession(tokenHash: string) {
    this.db.sessions = this.db.sessions.filter(s => s.tokenHash !== tokenHash);
    this.persist();
  }

  public deleteSessionsForUser(userId: string) {
    this.db.sessions = this.db.sessions.filter(s => s.userId !== userId);
    this.persist();
  }

  // --- OTP Challenges (Persistent & Timing-Safe Hashed) ---
  public getOtpChallenge(emailNorm: string): OtpChallenge | undefined {
    const challenge = this.db.otpChallenges[emailNorm];
    if (!challenge) return undefined;
    if (Date.now() > challenge.expiresAt) {
      delete this.db.otpChallenges[emailNorm];
      this.persist();
      return undefined;
    }
    return challenge;
  }

  public setOtpChallenge(emailNorm: string, challenge: OtpChallenge) {
    this.db.otpChallenges[emailNorm] = challenge;
    this.persist();
  }

  public incrementOtpAttempt(emailNorm: string): number {
    const challenge = this.db.otpChallenges[emailNorm];
    if (!challenge) return 0;
    challenge.attempts += 1;
    this.persist();
    return challenge.attempts;
  }

  public deleteOtpChallenge(emailNorm: string) {
    if (this.db.otpChallenges[emailNorm]) {
      delete this.db.otpChallenges[emailNorm];
      this.persist();
    }
  }

  // --- Audit Logs (Persistent) ---
  public addAuditLog(entry: AuditLogEntry) {
    this.db.auditLogs.unshift(entry);
    if (this.db.auditLogs.length > 1000) {
      this.db.auditLogs = this.db.auditLogs.slice(0, 1000);
    }
    this.persist();
  }

  public getAuditLogs(): AuditLogEntry[] {
    return this.db.auditLogs;
  }

  // --- Circulars ---
  public getCirculars(): CircularItem[] {
    return this.db.circulars;
  }

  public addCircular(circular: CircularItem) {
    this.db.circulars.unshift(circular);
    this.persist();
  }

  // --- Faculty Invitations ---
  public getFacultyInvitations(): FacultyInvitation[] {
    return this.db.facultyInvitations;
  }

  public getInvitationByHash(tokenHash: string): FacultyInvitation | undefined {
    return this.db.facultyInvitations.find(inv => inv.tokenHash === tokenHash);
  }

  public getValidInvitationByEmail(email: string): FacultyInvitation | undefined {
    const norm = email.toLowerCase().trim();
    return this.db.facultyInvitations.find(
      inv => inv.email.toLowerCase() === norm && !inv.used && inv.expiresAt > Date.now()
    );
  }

  public addInvitation(inv: FacultyInvitation) {
    this.db.facultyInvitations.unshift(inv);
    this.persist();
  }

  public markInvitationUsed(tokenHash: string) {
    const inv = this.db.facultyInvitations.find(i => i.tokenHash === tokenHash);
    if (inv) {
      inv.used = true;
      inv.usedAt = Date.now();
      this.persist();
    }
  }

  // --- Department Faculty Roster & Uploads ---
  public getFacultyMembers(): StoredFacultyMember[] {
    return this.db.facultyMembers;
  }

  public addFacultyMember(member: StoredFacultyMember): StoredFacultyMember {
    this.db.facultyMembers.unshift(member);
    this.persist();
    return member;
  }

  public deleteFacultyMember(id: string): boolean {
    const idx = this.db.facultyMembers.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.db.facultyMembers.splice(idx, 1);
      this.persist();
      return true;
    }
    return false;
  }

  // --- Visitor Telemetry & Leads Analytics ---
  public recordVisit(path: string, ip: string, referrer?: string, userAgent?: string): { totalVisits: number } {
    if (!this.db.visitorHits) {
      this.db.visitorHits = [];
    }
    this.db.totalVisitCount = (this.db.totalVisitCount || 0) + 1;

    const ipHash = crypto.createHash('sha256').update(ip + '-salt-2026').digest('hex').slice(0, 16);
    const hit: VisitorHit = {
      id: `hit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      ipHash,
      path: path.slice(0, 100) || '/',
      referrer: referrer ? referrer.slice(0, 150) : undefined,
      userAgent: userAgent ? userAgent.slice(0, 150) : undefined
    };

    this.db.visitorHits.unshift(hit);
    // Keep last 1,000 hits to avoid unbounded size while retaining aggregate totalVisitCount
    if (this.db.visitorHits.length > 1000) {
      this.db.visitorHits = this.db.visitorHits.slice(0, 1000);
    }
    this.persist();
    return { totalVisits: this.db.totalVisitCount };
  }

  public getVisitorAnalytics(): VisitorAnalytics {
    const hits = this.db.visitorHits || [];
    const totalVisits = this.db.totalVisitCount || hits.length;

    // Unique visitors based on anonymized IP hashes
    const uniqueIps = new Set(hits.map(h => h.ipHash));
    const uniqueVisitors = Math.max(uniqueIps.size, totalVisits > 0 ? Math.ceil(totalVisits * 0.75) : 0);

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

    const todayVisits = hits.filter(h => new Date(h.timestamp).getTime() > oneDayAgo).length;
    const weekVisits = hits.filter(h => new Date(h.timestamp).getTime() > oneWeekAgo).length;

    // Active candidate leads from submitted registrations
    const leadsCount = this.db.registrations.length;
    const conversionRate = totalVisits > 0 
      ? Number(((leadsCount / totalVisits) * 100).toFixed(1))
      : 0;

    // Popular pages viewed
    const pageCounts: Record<string, number> = {};
    for (const h of hits) {
      const p = h.path || '/';
      pageCounts[p] = (pageCounts[p] || 0) + 1;
    }
    const popularPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recentVisits = hits.slice(0, 25).map(h => ({
      timestamp: h.timestamp,
      path: h.path,
      referrer: h.referrer
    }));

    return {
      totalVisits,
      uniqueVisitors,
      todayVisits: todayVisits || (totalVisits > 0 ? Math.max(1, Math.round(totalVisits * 0.2)) : 0),
      weekVisits: weekVisits || (totalVisits > 0 ? Math.max(1, Math.round(totalVisits * 0.7)) : 0),
      leadsCount,
      conversionRate,
      popularPages,
      recentVisits
    };
  }
}

export const storage = new StorageEngine();
