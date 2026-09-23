-- Muthamizh Academy of Cinema and Fine Arts (MACFA) & Mavis Satcom Limited (Jaya TV)
-- Admissions 2026 Production Relational Database Schema (PostgreSQL 15+)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Students, Faculty, System Administrators)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
    faculty_designation VARCHAR(255),
    faculty_department VARCHAR(255),
    is_email_verified BOOLEAN DEFAULT FALSE,
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    program_interest VARCHAR(255),
    admission_status VARCHAR(64) DEFAULT 'Received',
    updates_subscribed BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. Admissions Applications Table
CREATE TABLE IF NOT EXISTS admissions_applications (
    id VARCHAR(64) PRIMARY KEY,
    application_id VARCHAR(64) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    program_interest VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    statement_of_purpose TEXT,
    status VARCHAR(64) NOT NULL DEFAULT 'Received' CHECK (status IN ('Received', 'Screening', 'Interview Scheduled', 'Admission Confirmed', 'Waitlisted', 'Archived')),
    status_remarks TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    academy VARCHAR(255) NOT NULL DEFAULT 'Muthamizh Academy of Cinema and Fine Arts (MACFA)',
    corporate_partner VARCHAR(255) NOT NULL DEFAULT 'Mavis Satcom Limited (Jaya TV Network)',
    is_archived BOOLEAN DEFAULT FALSE,
    archived_at TIMESTAMPTZ,
    archived_by VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_apps_email ON admissions_applications(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_apps_status ON admissions_applications(status);
CREATE INDEX IF NOT EXISTS idx_apps_archived ON admissions_applications(is_archived);

-- 3. Expiring Sessions Table (Replaces localStorage tokens)
CREATE TABLE IF NOT EXISTS user_sessions (
    token_hash VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(32) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON user_sessions(expires_at);

-- 4. OTP Verification Challenges Table
CREATE TABLE IF NOT EXISTS otp_challenges (
    email VARCHAR(255) PRIMARY KEY,
    otp_hash VARCHAR(64) NOT NULL,
    purpose VARCHAR(32) NOT NULL,
    attempts INT NOT NULL DEFAULT 0,
    expires_at TIMESTAMPTZ NOT NULL,
    metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_otp_expires_at ON otp_challenges(expires_at);

-- 5. Institutional Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    action VARCHAR(128) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    performed_by_name VARCHAR(255),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    details TEXT NOT NULL,
    ip_address VARCHAR(64)
);

CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);

-- 6. Faculty Invitations (Single-use tokens)
CREATE TABLE IF NOT EXISTS faculty_invitations (
    id VARCHAR(64) PRIMARY KEY,
    invite_token VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    invited_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMPTZ
);
