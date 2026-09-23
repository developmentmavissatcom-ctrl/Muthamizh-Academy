# Implementation Plan - Phase 2 Comprehensive Production Security Hardening

## Security Threat Model

### Component Overview
Muthamizh Academy Admissions 2026 Portal (collaborating with Jaya TV / Mavis Satcom Limited). Monolithic Node.js/Express backend (`server.ts`, `serverEmail.ts`, `serverStorage.ts`) and React Vite frontend. Provides course catalog, AI admissions counseling ("Astra"), student registration, faculty admissions review desk, circular broadcast system, and transactional email dispatch.

### Entry Points and Untrusted Inputs
| Entry Point | Type | Trusted? | Validation & Throttling |
|---|---|---|---|
| `POST /api/auth/send-otp` | HTTP API | No | Normalized email regex, 3/email/15m rate limit, no faculty role self-promotion |
| `POST /api/auth/verify-otp` | HTTP API | No | Expiry, 5-attempt brute-force limit, timing-safe buffer comparison |
| `POST /api/auth/send-signup-otp` | HTTP API | No | Single-use invitation validation for faculty, 3/email/15m rate limit |
| `POST /api/auth/verify-signup-otp` | HTTP API | No | Expiry, 5-attempt brute-force limit, timing-safe buffer comparison |
| `POST /api/auth/login` | HTTP API | No | Email, password verification, 5 attempts/account/15m rate limit |
| `POST /api/faculty/login` | HTTP API | No | Email, password, role check, 5 attempts/account+IP/15m rate limit |
| `POST /api/auth/forgot-password` | HTTP API | No | Email presence, 3/email/30m rate limit |
| `POST /api/auth/reset-password` | HTTP API | No | Expiry, 5-attempt brute-force limit, timing-safe buffer comparison |
| `GET /api/registrations` | HTTP API | No | Auth check: restricted to faculty/admin; public returns count only |
| `POST /api/register` | HTTP API | No | Full name, phone, program, qualification validation, 5/IP/hour, duplicate email check, immutable institutional fields |
| `GET /api/email/status` | HTTP API | No | Auth check: restricted to faculty/admin |
| `GET /api/email/logs` | HTTP API | No | Auth check: students receive redacted status items only (no previewUrl/PII) |
| `POST /api/chat` | HTTP API | No | Message length limit, history truncation, 20 req/min per-IP rate limit |
| `GET /api/media/stream/:fileId` | HTTP API | No | FileId regex pattern, strict Google Drive domain redirect allow-list |
| `DELETE /api/faculty/applications` | HTTP API | No | Dean/Admin exclusive role, confirmation token, soft archive, persistent audit log |

### Trust Boundaries and Auth Assumptions
- **Authentication**: Dual HttpOnly/Secure/SameSite cookie and Bearer session token validation, mapped to expiring server-side session records (24-hour lifetime).
- **Authorization**: Granular RBAC (`student`, `faculty`, `admin`). Bulk operations and system status strictly require Dean/Admin privileges.
- **Data Persistence Boundary**: Decoupled persistent JSON storage engine (`data/db.json`) with atomic file writes preventing operational data loss on container restart.
- **Session Security**: Session tokens are hashed with SHA-256 before storage; token expiration checked on every API invocation.

### Sensitive Data Paths
| Data Type | Source | Destination | Protection |
|---|---|---|---|
| Student PII | Registration Form / Persistent Store | Faculty Console | Role-gated APIs; public endpoint returns only aggregate counts; email logs redacted for students |
| Passwords & Salts | Client Request | Server Scrypt | Individual random 16-byte salt per user; independent hashes for seeded faculty |
| OTP Codes | Server `crypto.randomInt` | Email recipient | Expiry (10m), 5-attempt limit, timing-safe buffer matching, zero console/log output, zero API response disclosure |
| SMTP Credentials | Environment Variables | Nodemailer Transporter | Strict server-side only; mandatory TLS `rejectUnauthorized: true` with zero insecure bypasses |
| Session Identifiers | Server crypto | HttpOnly Cookie / Header | Stored as SHA-256 hash in session store; 24h expiration; wiped on logout |

### Privileged Actions
| Action | Location | Guard |
|---|---|---|
| Read all applicant PII | `server.ts: GET /api/registrations` | Active session with role `faculty` or `admin` |
| View email delivery status & audit | `server.ts: GET /api/email/status` | Active session with role `faculty` or `admin` |
| Bulk delete / archive applicants | `server.ts: DELETE /api/faculty/applications` | Dean/Admin role + explicit confirmation + persistent audit entry |
| Register faculty member | `server.ts: POST /api/auth/send-signup-otp` | Single-use invitation token validated against `facultyInvitationsStore` |

### Priority Review Areas
1. Complete removal of OTP code output in all server logs (`console.log`).
2. OTP brute-force protection (max 5 attempts, timingSafeEqual comparison, challenge deletion on threshold).
3. Granular rate limiting across all auth endpoints using Express `trust proxy` and `req.ip`.
4. HttpOnly cookie and expiring session store implementation.
5. Email logs PII minimization for students (suppress previewUrl and internal message IDs).
6. Unique salts and hashes for all seeded faculty accounts.
7. File-backed persistent storage engine (`data/db.json`) with atomic write updates.
8. Registration validation, duplicate protection, and non-colliding application IDs.
9. Dean-only authorization and soft-archiving on bulk application deletion.
10. Global request body size limitation (`100kb`) and Helmet security headers with CSP.
11. Enforcement of strict SMTP TLS (`rejectUnauthorized: true`).

## Verification Plan

### Security Verification
- **Security Scan**: Inspect all newly created and modified files for common CWE vulnerabilities (XSS, injection, exposed secrets, missing auth boundaries). Resolve any detected issues immediately.
- **Security Audit**: Audit the implementation against the component's threat model (`## Security Threat Model`). Document all findings, dispositions, and remediations in `walkthrough.md` using the `generate-security-audit-report` skill.

