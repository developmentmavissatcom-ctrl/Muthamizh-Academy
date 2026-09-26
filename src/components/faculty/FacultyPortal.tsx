import React, { useState, useEffect } from 'react';
import { UserProfile, RegistrationRecord, AdmissionStatus, CircularUpdate } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  UserCheck, 
  Radio, 
  RefreshCw, 
  Sparkles, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ChevronRight, 
  Edit3, 
  Send, 
  Lock, 
  LogIn, 
  LogOut, 
  GraduationCap, 
  Tv, 
  Camera, 
  Phone, 
  Mail, 
  Check, 
  X,
  ExternalLink,
  Download,
  Building,
  ArrowLeft,
  ArrowRight,
  Trash2,
  UserPlus,
  Copy,
  KeyRound
} from 'lucide-react';

interface FacultyPortalProps {
  currentUser: UserProfile | null;
  onFacultyLoginSuccess: (user: UserProfile) => void;
  onFacultyLogout: () => void;
  onSwitchToStudentView: () => void;
  onNavigateToFacultyTab?: () => void;
}

const ADMISSION_STATUSES: AdmissionStatus[] = [
  'Application Submitted',
  'Documents Under Review',
  'Faculty Interview Scheduled',
  'Studio Assessment',
  'Provisional Admission Offered',
  'Admission Confirmed',
  'Application On Hold'
];

export const FacultyPortal: React.FC<FacultyPortalProps> = ({
  currentUser,
  onFacultyLoginSuccess,
  onFacultyLogout,
  onSwitchToStudentView,
  onNavigateToFacultyTab
}) => {
  const isFaculty = currentUser && (currentUser.role === 'faculty' || currentUser.role === 'admin');

  // Faculty Gate Login State
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Faculty Workspace State
  const [applications, setApplications] = useState<RegistrationRecord[]>([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    pendingReview: 0,
    interviewsScheduled: 0,
    confirmedAdmissions: 0,
    studioCapacityPct: 35
  });
  const [loadingApps, setLoadingApps] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');

  // Selected Application for Editing
  const [selectedApp, setSelectedApp] = useState<RegistrationRecord | null>(null);
  const [editStatus, setEditStatus] = useState<AdmissionStatus>('Documents Under Review');
  const [editRemarks, setEditRemarks] = useState('');
  const [editInterviewDate, setEditInterviewDate] = useState('');
  const [editInterviewVenue, setEditInterviewVenue] = useState('');
  const [editStudioFloor, setEditStudioFloor] = useState('');
  const [editScholarship, setEditScholarship] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
  const [editFeedbackMessage, setEditFeedbackMessage] = useState('');
  const [lastDeliveredEmailUrl, setLastDeliveredEmailUrl] = useState<string | null>(null);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  // Email Audit Logs state
  const [emailLogsModalOpen, setEmailLogsModalOpen] = useState(false);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [loadingEmailLogs, setLoadingEmailLogs] = useState(false);

  // Circular Publisher Modal State
  const [circularModalOpen, setCircularModalOpen] = useState(false);
  const [circularTitle, setCircularTitle] = useState('');
  const [circularCategory, setCircularCategory] = useState<'Admissions' | 'Studio Broadcast' | 'Curriculum & Labs' | 'Placement & Network'>('Admissions');
  const [circularSummary, setCircularSummary] = useState('');
  const [circularUrgent, setCircularUrgent] = useState(false);
  const [publishingCircular, setPublishingCircular] = useState(false);
  const [circularFeedback, setCircularFeedback] = useState('');

  // Faculty Invitations Management State
  const [invitationsModalOpen, setInvitationsModalOpen] = useState(false);
  const [invitationsList, setInvitationsList] = useState<any[]>([]);
  const [loadingInvitations, setLoadingInvitations] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteDepartment, setInviteDepartment] = useState('Academic Council & Studio Operations');
  const [inviteDesignation, setInviteDesignation] = useState('Faculty Instructor');
  const [invitingFaculty, setInvitingFaculty] = useState(false);
  const [inviteFeedback, setInviteFeedback] = useState('');
  const [generatedInviteToken, setGeneratedInviteToken] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  const fetchInvitations = async () => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (!token) return;
    setLoadingInvitations(true);
    try {
      const res = await fetch('/api/faculty/invitations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInvitationsList(data.invitations || []);
      }
    } catch (err) {
      console.error('Failed to load faculty invitations:', err);
    } finally {
      setLoadingInvitations(false);
    }
  };

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) {
      setInviteFeedback('Please provide a valid email address.');
      return;
    }
    const token = localStorage.getItem('muthamizh_auth_token');
    if (!token) return;

    setInvitingFaculty(true);
    setInviteFeedback('');
    setGeneratedInviteToken(null);
    try {
      const res = await fetch('/api/faculty/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: inviteEmail.trim(),
          department: inviteDepartment.trim(),
          designation: inviteDesignation.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setInviteFeedback(data.error || 'Failed to generate invitation.');
        return;
      }
      setInviteFeedback(`Invitation successfully generated and dispatched to ${inviteEmail}!`);
      if (data.invitation?.inviteToken) {
        setGeneratedInviteToken(data.invitation.inviteToken);
      }
      setInviteEmail('');
      await fetchInvitations();
    } catch (err: any) {
      setInviteFeedback(err.message || 'Network error.');
    } finally {
      setInvitingFaculty(false);
    }
  };

  // Fetch applications if user is faculty
  const fetchApplications = async () => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (!token) return;

    setLoadingApps(true);
    try {
      const res = await fetch('/api/faculty/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
        if (data.metrics) {
          setMetrics(data.metrics);
        }
      } else {
        console.error('Failed to load faculty applications');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    if (isFaculty) {
      fetchApplications();
    }
  }, [isFaculty]);

  // Handle Faculty Login
  const handleFacultyLogin = async (e?: React.FormEvent, overrideEmail?: string, overridePass?: string) => {
    if (e) e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const emailToUse = overrideEmail || facultyEmail;
    const passToUse = overridePass || facultyPassword;

    try {
      const res = await fetch('/api/faculty/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToUse, password: passToUse })
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Authentication failed. Please verify credentials.');
        return;
      }

      localStorage.setItem('muthamizh_auth_token', data.token);
      localStorage.setItem('muthamizh_auth_user', JSON.stringify(data.user));
      onFacultyLoginSuccess(data.user);
    } catch (err: any) {
      setLoginError(err.message || 'Server communication error.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Open Application Evaluation Modal
  const handleOpenEdit = (app: RegistrationRecord) => {
    setSelectedApp(app);
    setEditStatus(app.status || 'Documents Under Review');
    setEditRemarks(app.facultyRemarks || '');
    setEditInterviewDate(app.interviewDate || '');
    setEditInterviewVenue(app.interviewVenue || 'Jaya TV Studio Floor A / PCR Suite');
    setEditStudioFloor(app.studioFloorAssigned || 'Studio Floor A & Lab 01');
    setEditScholarship(app.scholarshipGranted || '');
    setEditFeedbackMessage('');
    setLastDeliveredEmailUrl(null);
  };

  // Fetch email audit logs
  const fetchEmailLogs = async () => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (!token) return;
    setLoadingEmailLogs(true);
    try {
      const res = await fetch('/api/email/logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEmailLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Error fetching email logs:', err);
    } finally {
      setLoadingEmailLogs(false);
    }
  };

  // Resend/Trigger status email directly
  const handleResendStatusEmail = async (appId: string, candidateEmail: string) => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (!token) return;
    setSendingEmailId(appId);
    try {
      const res = await fetch(`/api/faculty/applications/${appId}/resend-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setEditFeedbackMessage(`Status notification email transmitted to ${candidateEmail}!`);
        if (data.previewUrl) {
          setLastDeliveredEmailUrl(data.previewUrl);
        }
      } else {
        setEditFeedbackMessage(data.error || 'Failed to dispatch email.');
      }
    } catch (err: any) {
      setEditFeedbackMessage(err.message || 'Error transmitting email.');
    } finally {
      setSendingEmailId(null);
    }
  };

  // Save Application Changes
  const handleSaveAppEdit = async () => {
    if (!selectedApp) return;
    setSavingEdit(true);
    setEditFeedbackMessage('');
    setLastDeliveredEmailUrl(null);

    const token = localStorage.getItem('muthamizh_auth_token');
    try {
      const res = await fetch(`/api/faculty/applications/${selectedApp.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: editStatus,
          facultyRemarks: editRemarks,
          interviewDate: editInterviewDate,
          interviewVenue: editInterviewVenue,
          studioFloorAssigned: editStudioFloor,
          scholarshipGranted: editScholarship
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setEditFeedbackMessage(data.error || 'Failed to update application.');
        return;
      }

      setEditFeedbackMessage(data.message || `Candidate updated & official notification email dispatched to ${selectedApp.email}!`);
      if (data.previewUrl) {
        setLastDeliveredEmailUrl(data.previewUrl);
      }
      // Refresh local list
      await fetchApplications();
    } catch (err: any) {
      setEditFeedbackMessage(err.message || 'Network error.');
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete Single Application Record
  const handleDeleteApplication = async (id: string) => {
    if (!window.confirm(`Are you sure you want to remove application ${id}?`)) return;
    const token = localStorage.getItem('muthamizh_auth_token');
    try {
      const res = await fetch(`/api/faculty/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        if (selectedApp?.id === id) setSelectedApp(null);
        await fetchApplications();
      }
    } catch (err) {
      console.error('Failed to delete application:', err);
    }
  };

  // Clear All Application Records (Reset Queue to Zero)
  const handleClearAllApplications = async () => {
    if (!window.confirm('Reset admissions queue to zero? All current applicant records will be permanently cleared.')) return;
    const token = localStorage.getItem('muthamizh_auth_token');
    try {
      const res = await fetch('/api/faculty/applications', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ confirmation: 'CONFIRM_DELETE_ALL' })
      });
      if (res.ok) {
        setSelectedApp(null);
        await fetchApplications();
      }
    } catch (err) {
      console.error('Failed to clear applications:', err);
    }
  };

  // Publish Circular
  const handlePublishCircular = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularTitle.trim() || !circularSummary.trim()) return;

    setPublishingCircular(true);
    setCircularFeedback('');
    const token = localStorage.getItem('muthamizh_auth_token');

    try {
      const res = await fetch('/api/faculty/circulars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: circularTitle,
          category: circularCategory,
          summary: circularSummary,
          urgent: circularUrgent
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setCircularFeedback(data.error || 'Failed to publish.');
        return;
      }

      setCircularFeedback('Circular published to student portal!');
      setCircularTitle('');
      setCircularSummary('');
      setTimeout(() => {
        setCircularModalOpen(false);
        setCircularFeedback('');
      }, 1000);
    } catch (err: any) {
      setCircularFeedback(err.message || 'Network error.');
    } finally {
      setPublishingCircular(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Application ID", "Name", "Email", "Phone", "Program", "Status", "Faculty Remarks", "Interview Date", "Venue", "Studio Floor", "Scholarship"];
    const rows = applications.map(a => [
      `"${a.id}"`,
      `"${a.full_name}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.program_interest}"`,
      `"${a.status || 'Application Submitted'}"`,
      `"${(a.facultyRemarks || '').replace(/"/g, '""')}"`,
      `"${a.interviewDate || ''}"`,
      `"${a.interviewVenue || ''}"`,
      `"${a.studioFloorAssigned || ''}"`,
      `"${a.scholarshipGranted || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Muthamizh_Admissions_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program_interest.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesProgram = programFilter === 'all' || app.program_interest === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Unique programs in data
  const uniquePrograms = Array.from(new Set(applications.map(a => a.program_interest)));

  // ==========================================
  // VIEW 1: EXCLUSIVE FACULTY ACCESS GATE (If not logged in as faculty)
  // ==========================================
  if (!isFaculty) {
    return (
      <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-[#0b100e] border border-[#16241f] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e6ad54]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6ad54]/15 text-[#e6ad54] text-xs font-mono font-bold mb-4 border border-[#e6ad54]/30 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-[#e6ad54]" />
              Restricted Faculty Domain
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#f5f7f6] font-mono tracking-tight">
              Faculty Admissions Desk
            </h1>
            <p className="text-sm text-[#8a9690] mt-2 max-w-md mx-auto">
              Exclusive academic council portal for evaluating candidate portfolios, scheduling studio interviews, assigning broadcast floors, and finalizing 2026 cohort admissions.
            </p>
          </div>

          {/* Student Account Warning if already logged in as a student */}
          {currentUser && currentUser.role === 'student' && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-3 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Logged in as Student ({currentUser.fullName}):</span> Faculty processing features are restricted to authorized academy instructors and admissions officers. Please authenticate below or sign out.
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onFacultyLogout) onFacultyLogout();
                      else {
                        localStorage.removeItem('muthamizh_auth_token');
                        localStorage.removeItem('muthamizh_auth_user');
                        window.location.reload();
                      }
                    }}
                    className="text-[11px] font-mono font-bold text-rose-300 hover:text-rose-200 underline"
                  >
                    Sign Out of Current Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs font-mono">
              {loginError}
            </div>
          )}

          {/* Faculty Credentials Form */}
          <form onSubmit={handleFacultyLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#8a9690] mb-1.5">
                Faculty Institutional Email (@muthamizh.ac.in)
              </label>
              <input
                type="email"
                value={facultyEmail}
                onChange={(e) => setFacultyEmail(e.target.value)}
                placeholder="faculty.name@muthamizh.ac.in"
                className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#e6ad54] rounded-xl px-4 py-3 text-sm text-[#f5f7f6] placeholder-[#8a9690]/40 outline-none font-mono transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8a9690] mb-1.5">
                Faculty Secret Access Key / Password
              </label>
              <input
                type="password"
                value={facultyPassword}
                onChange={(e) => setFacultyPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#e6ad54] rounded-xl px-4 py-3 text-sm text-[#f5f7f6] placeholder-[#8a9690]/40 outline-none font-mono transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-[#e6ad54] hover:bg-[#e6ad54]/90 text-[#050706] font-bold text-sm font-mono shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loginLoading ? 'Authenticating...' : 'Sign In to Faculty Workspace'}</span>
            </button>
          </form>

          {/* Switch back to Student View Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToStudentView}
              className="text-xs font-mono text-[#8a9690] hover:text-[#00c878] transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Student Courses & Campus Experience</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FULL FACULTY WORKSPACE & ADMISSION PROCESSING DESK
  // ==========================================
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Faculty Identity & Quick Control Bar */}
      <div className="bg-[#0b100e] border border-[#16241f] rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e6ad54]/15 border border-[#e6ad54]/40 flex items-center justify-center text-[#e6ad54] font-bold text-xl font-mono shadow-inner">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e6ad54]/20 text-[#e6ad54] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#e6ad54]/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#e6ad54]" />
                  Faculty & Admissions Council
                </span>
                <span className="text-xs font-mono text-[#8a9690] hidden sm:inline">
                  {currentUser.facultyDepartment || "Academic Operations"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#f5f7f6] font-mono">
                {currentUser.fullName}
              </h1>
              <div className="text-xs text-[#8a9690] font-mono mt-0.5">
                {currentUser.facultyDesignation || "Admissions Committee Member"} • {currentUser.email}
              </div>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex flex-wrap items-center gap-3">
            {onNavigateToFacultyTab && (
              <button
                onClick={onNavigateToFacultyTab}
                className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#00c878]/40 hover:border-[#00c878] text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
                title="View Faculty Directory across News & IT Departments"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#00c878]" />
                <span>View Faculty Directory</span>
              </button>
            )}

            <button
              onClick={() => {
                fetchInvitations();
                setInvitationsModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono font-bold transition-all flex items-center gap-2"
              title="Issue Single-Use Faculty Clearances & Manage Onboarding"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Faculty Invitations</span>
            </button>

            <button
              onClick={() => {
                fetchEmailLogs();
                setEmailLogsModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#00c878]/40 hover:border-[#00c878] text-xs font-mono font-bold transition-all flex items-center gap-2"
              title="View Dispatched Notification Emails and SMTP Status"
            >
              <Mail className="w-3.5 h-3.5 text-[#00c878]" />
              <span>Mail Audit Logs</span>
            </button>

            <button
              onClick={() => setCircularModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#e6ad54] border border-[#e6ad54]/40 hover:border-[#e6ad54] text-xs font-mono font-bold transition-all flex items-center gap-2"
              title="Publish Notice to Students"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Circular</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#00c878]/40 hover:border-[#00c878] text-xs font-mono font-bold transition-all flex items-center gap-2"
              title="Download Applications CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Roster (CSV)</span>
            </button>

            <button
              onClick={onSwitchToStudentView}
              className="px-4 py-2.5 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] text-xs font-mono font-bold shadow-lg transition-all flex items-center gap-1.5"
              title="View Website as Student"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Student View</span>
            </button>

            <button
              onClick={() => {
                if (onFacultyLogout) {
                  onFacultyLogout();
                } else {
                  localStorage.removeItem('muthamizh_auth_token');
                  localStorage.removeItem('muthamizh_auth_user');
                  localStorage.setItem('muthamizh_portal_mode', 'student');
                  window.location.reload();
                }
              }}
              className="px-3.5 py-2.5 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 hover:text-rose-100 border border-rose-800/50 hover:border-rose-600 transition-all flex items-center gap-2 font-mono text-xs font-bold"
              title="Sign Out of Faculty Admissions Desk"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Real-time Telemetry Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-[#16241f]">
          <div className="bg-[#070b09] p-3.5 rounded-2xl border border-[#16241f]">
            <div className="text-[10px] font-mono text-[#8a9690] uppercase tracking-wider">Total Applicants</div>
            <div className="text-2xl font-black text-[#f5f7f6] font-mono mt-1">{metrics.total}</div>
            <div className="text-[10px] text-[#00c878] font-mono mt-0.5">2026 Admissions</div>
          </div>

          <div className="bg-[#070b09] p-3.5 rounded-2xl border border-[#16241f]">
            <div className="text-[10px] font-mono text-[#8a9690] uppercase tracking-wider">Pending Screening</div>
            <div className="text-2xl font-black text-[#e6ad54] font-mono mt-1">{metrics.pendingReview}</div>
            <div className="text-[10px] text-[#8a9690] font-mono mt-0.5">Docs Under Review</div>
          </div>

          <div className="bg-[#070b09] p-3.5 rounded-2xl border border-[#16241f]">
            <div className="text-[10px] font-mono text-[#8a9690] uppercase tracking-wider">Interviews & Tests</div>
            <div className="text-2xl font-black text-sky-400 font-mono mt-1">{metrics.interviewsScheduled}</div>
            <div className="text-[10px] text-[#8a9690] font-mono mt-0.5">Floor Assessment</div>
          </div>

          <div className="bg-[#070b09] p-3.5 rounded-2xl border border-[#16241f]">
            <div className="text-[10px] font-mono text-[#8a9690] uppercase tracking-wider">Offers Confirmed</div>
            <div className="text-2xl font-black text-[#00c878] font-mono mt-1">{metrics.confirmedAdmissions}</div>
            <div className="text-[10px] text-[#00c878] font-mono mt-0.5">Seats Enrolled</div>
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-1 bg-[#070b09] p-3.5 rounded-2xl border border-[#16241f]">
            <div className="text-[10px] font-mono text-[#8a9690] uppercase tracking-wider">Studio Capacity</div>
            <div className="text-2xl font-black text-[#f5f7f6] font-mono mt-1">{metrics.studioCapacityPct}%</div>
            <div className="w-full bg-[#121a17] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#00c878] to-[#e6ad54] h-full rounded-full" 
                style={{ width: `${metrics.studioCapacityPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Management Section */}
      <div className="bg-[#0b100e] border border-[#16241f] rounded-3xl p-4 sm:p-8 shadow-2xl space-y-6">
        
        {/* Controls Bar: Search & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#f5f7f6] font-mono flex items-center gap-2">
              <span>Candidate Applications Directory</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#121a17] text-[#00c878] border border-[#16241f] font-normal">
                {filteredApps.length} of {applications.length} Listed
              </span>
            </h2>
            <p className="text-xs text-[#8a9690] mt-0.5">
              Select an applicant to review their portfolio, schedule faculty interviews, and issue studio floor passes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate, email, ID..."
                className="bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl pl-9 pr-4 py-2 text-xs text-[#f5f7f6] placeholder-[#8a9690]/50 outline-none font-mono w-60 sm:w-72"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3 py-2 text-xs text-[#f5f7f6] font-mono outline-none"
            >
              <option value="all">All Statuses</option>
              {ADMISSION_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Program Filter */}
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3 py-2 text-xs text-[#f5f7f6] font-mono outline-none max-w-[200px] truncate"
            >
              <option value="all">All Academic Tracks</option>
              {uniquePrograms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <button
              onClick={fetchApplications}
              className="p-2.5 rounded-xl bg-[#070b09] hover:bg-[#121a17] border border-[#16241f] text-[#8a9690] hover:text-[#00c878] transition-colors"
              title="Reload Roster"
            >
              <RefreshCw className={`w-4 h-4 ${loadingApps ? 'animate-spin text-[#00c878]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Applications Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#070b09] text-[#8a9690] border-b border-[#16241f] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Application ID</th>
                <th className="py-3.5 px-4">Candidate & Contact</th>
                <th className="py-3.5 px-4">Academic Program</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4">Faculty Interview / Venue</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#16241f]">
              {filteredApps.map((app) => (
                <tr 
                  key={app.id}
                  className="hover:bg-[#121a17]/60 transition-colors group"
                >
                  <td className="py-4 px-4 font-bold text-[#00c878]">
                    {app.id}
                    <div className="text-[10px] text-[#8a9690] font-normal mt-0.5">
                      {new Date(app.timestamp).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-[#f5f7f6] text-sm">{app.full_name}</div>
                    <div className="text-[#8a9690] flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#8a9690]" /> {app.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#8a9690]" /> {app.phone}</span>
                    </div>
                    <div className="text-[10px] text-[#8a9690] mt-0.5">
                      Qualification: <span className="text-[#f5f7f6]">{app.qualification}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 max-w-xs">
                    <div className="font-semibold text-[#f5f7f6] truncate" title={app.program_interest}>
                      {app.program_interest}
                    </div>
                    <div className="text-[10px] text-[#8a9690] mt-0.5">
                      Mavis Satcom / Jaya TV Partnered
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                      app.status === 'Admission Confirmed'
                        ? 'bg-[#00c878]/15 text-[#00c878] border-[#00c878]/40'
                        : app.status === 'Provisional Admission Offered'
                        ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40'
                        : app.status === 'Faculty Interview Scheduled' || app.status === 'Studio Assessment'
                        ? 'bg-sky-950/50 text-sky-300 border-sky-800/40'
                        : app.status === 'Documents Under Review'
                        ? 'bg-[#e6ad54]/15 text-[#e6ad54] border-[#e6ad54]/40'
                        : 'bg-[#121a17] text-[#8a9690] border-[#16241f]'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{app.status || 'Application Submitted'}</span>
                    </span>

                    {app.reviewedByFaculty && (
                      <div className="text-[9px] text-[#8a9690] mt-1 truncate max-w-[160px]">
                        Reviewed by: {app.reviewedByFaculty}
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    {app.interviewDate ? (
                      <div className="space-y-0.5">
                        <div className="text-[#f5f7f6] font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#e6ad54]" />
                          <span>{app.interviewDate}</span>
                        </div>
                        <div className="text-[10px] text-[#8a9690] flex items-center gap-1 truncate max-w-[180px]">
                          <MapPin className="w-3 h-3 text-[#00c878]" />
                          <span>{app.interviewVenue || 'Studio Floor A'}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[#8a9690] italic">Not scheduled yet</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleResendStatusEmail(app.id, app.email)}
                        disabled={sendingEmailId === app.id}
                        className="px-2.5 py-1.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#00c878] border border-[#16241f] hover:border-[#00c878]/50 text-xs font-mono transition-all flex items-center gap-1.5"
                        title="Transmit Official Status Email to Candidate"
                      >
                        <Mail className={`w-3.5 h-3.5 ${sendingEmailId === app.id ? 'animate-spin text-[#00c878]' : 'text-[#8a9690]'}`} />
                        <span className="hidden xl:inline text-[11px] font-bold">Mail Status</span>
                      </button>

                      <button
                        onClick={() => handleOpenEdit(app)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#121a17] hover:bg-[#00c878] text-[#00c878] hover:text-[#050706] border border-[#00c878]/40 hover:border-[#00c878] font-bold text-xs transition-all flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Evaluate</span>
                      </button>

                      <button
                        onClick={() => handleDeleteApplication(app.id)}
                        className="p-2 rounded-xl bg-[#121a17] hover:bg-rose-950/40 text-[#8a9690] hover:text-rose-400 border border-[#16241f] hover:border-rose-900/60 text-xs transition-all"
                        title={`Delete application ${app.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3 px-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#00c878]/10 border border-[#00c878]/20 flex items-center justify-center mx-auto text-[#00c878]">
                        <Users className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-[#f5f7f6] font-mono">
                        Admissions Queue Initialized (0 Applicants)
                      </h4>
                      <p className="text-xs text-[#8a9690] leading-relaxed">
                        All simulated applicant records have been cleared. As real prospective students register or submit applications online, their official dossiers will appear here in real time for faculty evaluation, studio scheduling, and status tracking.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8a9690]">
                    No candidates found matching the active search and filter criteria.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          MODAL: PROCESS ADMISSION & EVALUATE CANDIDATE
          ========================================== */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0b100e] border border-[#16241f] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#16241f]">
              <div>
                <span className="text-[10px] font-mono text-[#e6ad54] uppercase tracking-wider font-bold">
                  Academic Admission Processing Desk
                </span>
                <h3 className="text-xl font-black text-[#f5f7f6] font-mono mt-0.5">
                  Evaluate: {selectedApp.full_name} ({selectedApp.id})
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editFeedbackMessage && (
              <div className="p-3.5 rounded-xl bg-[#00c878]/15 border border-[#00c878]/40 text-[#00c878] text-xs font-mono">
                {editFeedbackMessage}
              </div>
            )}

            {lastDeliveredEmailUrl && (
              <div className="p-3.5 rounded-2xl bg-[#121a17] border border-[#00c878]/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00c878]">
                  <CheckCircle2 className="w-4 h-4 text-[#00c878]" />
                  <span>Email delivered via SMTP to candidate's mailbox</span>
                </div>
                <a
                  href={lastDeliveredEmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#00c878] text-[#050706] font-mono font-bold text-xs hover:scale-105 transition-transform flex items-center gap-1 shrink-0"
                >
                  <span>Open Delivered Email Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Candidate Metadata Summary */}
            <div className="grid grid-cols-2 gap-3 bg-[#070b09] p-4 rounded-2xl border border-[#16241f] text-xs font-mono">
              <div>
                <span className="text-[#8a9690] block text-[10px]">Contact Info:</span>
                <span className="text-[#f5f7f6] font-bold">{selectedApp.email}</span>
                <div className="text-[#8a9690]">{selectedApp.phone}</div>
              </div>
              <div>
                <span className="text-[#8a9690] block text-[10px]">Track & Qualification:</span>
                <span className="text-[#00c878] font-bold block truncate">{selectedApp.program_interest}</span>
                <span className="text-[#8a9690]">{selectedApp.qualification}</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs font-mono">
              
              {/* Status Selector */}
              <div>
                <label className="block text-[#8a9690] mb-1.5 font-bold">
                  Update Candidate Admission Lifecycle Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as AdmissionStatus)}
                  className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-4 py-3 text-sm text-[#f5f7f6] outline-none"
                >
                  {ADMISSION_STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Faculty Remarks (Visible to Student) */}
              <div>
                <label className="block text-[#8a9690] mb-1.5 font-bold">
                  Official Faculty Evaluation Remarks & Guidance (Visible in Student Tracker)
                </label>
                <textarea
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                  rows={3}
                  placeholder="e.g., Portfolio evaluated with distinction. Recommended for Studio Floor A PCR rotation and entrance interview."
                  className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl p-3 text-xs text-[#f5f7f6] placeholder-[#8a9690]/40 outline-none"
                />
              </div>

              {/* Interview Scheduling Date & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8a9690] mb-1 font-bold">
                    Interview / Assessment Date & Time
                  </label>
                  <input
                    type="text"
                    value={editInterviewDate}
                    onChange={(e) => setEditInterviewDate(e.target.value)}
                    placeholder="e.g., March 18, 2026 - 10:30 AM"
                    className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f7f6] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8a9690] mb-1 font-bold">
                    Interview Venue / Floor
                  </label>
                  <input
                    type="text"
                    value={editInterviewVenue}
                    onChange={(e) => setEditInterviewVenue(e.target.value)}
                    placeholder="e.g., Jaya TV Studio Floor A / Virtual Lab 1"
                    className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f7f6] outline-none"
                  />
                </div>
              </div>

              {/* Assigned Floor & Scholarship */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8a9690] mb-1 font-bold">
                    Assigned Studio Floor / Rig Pass
                  </label>
                  <input
                    type="text"
                    value={editStudioFloor}
                    onChange={(e) => setEditStudioFloor(e.target.value)}
                    placeholder="e.g., Floor A PCR & Chroma Lab"
                    className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f7f6] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8a9690] mb-1 font-bold">
                    Mavis Satcom Media Fellowship / Scholarship
                  </label>
                  <input
                    type="text"
                    value={editScholarship}
                    onChange={(e) => setEditScholarship(e.target.value)}
                    placeholder="e.g., 25% Academic Fellowship Granted"
                    className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f7f6] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#16241f]">
              <button
                type="button"
                onClick={() => handleResendStatusEmail(selectedApp.id, selectedApp.email)}
                disabled={sendingEmailId === selectedApp.id}
                className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#e6ad54] border border-[#e6ad54]/40 hover:border-[#e6ad54] text-xs font-mono transition-colors flex items-center gap-1.5"
                title="Send current status notification email to candidate"
              >
                <Mail className={`w-3.5 h-3.5 ${sendingEmailId === selectedApp.id ? 'animate-spin' : ''}`} />
                <span>{sendingEmailId === selectedApp.id ? 'Transmitting Email...' : 'Send Status Email Now'}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDeleteApplication(selectedApp.id)}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-400 border border-rose-900/50 text-xs font-mono transition-colors flex items-center gap-1.5"
                  title="Remove this applicant dossier"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] text-xs font-mono transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={savingEdit}
                  onClick={handleSaveAppEdit}
                  className="px-6 py-2.5 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-bold text-xs font-mono shadow-lg transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{savingEdit ? 'Dispatching Decision...' : 'Commit & Notify Student'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: BROADCAST CIRCULAR PUBLISHER
          ========================================== */}
      {circularModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0b100e] border border-[#16241f] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#16241f]">
              <div>
                <span className="text-[10px] font-mono text-[#00c878] uppercase tracking-wider font-bold">
                  Broadcast Circular Desk
                </span>
                <h3 className="text-xl font-black text-[#f5f7f6] font-mono">
                  Publish Notice to Students
                </h3>
              </div>
              <button
                onClick={() => setCircularModalOpen(false)}
                className="p-2 rounded-xl bg-[#121a17] text-[#8a9690] hover:text-[#f5f7f6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {circularFeedback && (
              <div className="p-3 rounded-xl bg-[#00c878]/20 text-[#00c878] text-xs font-mono">
                {circularFeedback}
              </div>
            )}

            <form onSubmit={handlePublishCircular} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#8a9690] mb-1">Circular Title</label>
                <input
                  type="text"
                  value={circularTitle}
                  onChange={(e) => setCircularTitle(e.target.value)}
                  placeholder="e.g., Studio Assessment Floor A Schedule Released"
                  className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f7f6] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8a9690] mb-1">Category</label>
                  <select
                    value={circularCategory}
                    onChange={(e) => setCircularCategory(e.target.value as any)}
                    className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl px-3 py-2.5 text-xs text-[#f5f7f6] outline-none"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Studio Broadcast">Studio Broadcast</option>
                    <option value="Curriculum & Labs">Curriculum & Labs</option>
                    <option value="Placement & Network">Placement & Network</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-[#f5f7f6]">
                    <input
                      type="checkbox"
                      checked={circularUrgent}
                      onChange={(e) => setCircularUrgent(e.target.checked)}
                      className="rounded bg-[#070b09] border-[#16241f] text-[#e6ad54] focus:ring-0 w-4 h-4"
                    />
                    <span className="text-xs">Mark as High Priority / Urgent</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[#8a9690] mb-1">Summary / Directive Details</label>
                <textarea
                  value={circularSummary}
                  onChange={(e) => setCircularSummary(e.target.value)}
                  rows={4}
                  placeholder="Detailed circular notice body..."
                  className="w-full bg-[#070b09] border border-[#16241f] focus:border-[#00c878] rounded-xl p-3 text-xs text-[#f5f7f6] outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#16241f]">
                <button
                  type="button"
                  onClick={() => setCircularModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#121a17] text-[#8a9690]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={publishingCircular}
                  className="px-5 py-2 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-bold text-xs shadow-lg transition-all"
                >
                  {publishingCircular ? 'Publishing...' : 'Dispatch Broadcast'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: EMAIL AUDIT & TRANSMISSION LOGS
          ========================================== */}
      {emailLogsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#0b100e] border border-[#16241f] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#16241f]">
              <div>
                <span className="text-[10px] font-mono text-[#00c878] uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00c878] animate-ping" />
                  Live Academic Email Delivery System
                </span>
                <h3 className="text-xl font-black text-[#f5f7f6] font-mono mt-0.5">
                  SMTP Transmission Audit Logs
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchEmailLogs}
                  disabled={loadingEmailLogs}
                  className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#16241f]"
                  title="Refresh Logs"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingEmailLogs ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => setEmailLogsModalOpen(false)}
                  className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-banner */}
            <div className="p-3.5 rounded-2xl bg-[#121a17] border border-[#16241f] text-xs font-mono text-[#8a9690] flex items-center justify-between">
              <div>
                Real-time delivery records for OTP verification codes, application submissions, and faculty admission status updates.
              </div>
              <div className="text-[#00c878] font-bold text-[11px] shrink-0 ml-4">
                Total Dispatches: {emailLogs.length}
              </div>
            </div>

            {/* Logs Table / List */}
            {loadingEmailLogs ? (
              <div className="py-12 text-center text-[#8a9690] font-mono text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#00c878]" />
                <span>Loading delivery logs...</span>
              </div>
            ) : emailLogs.length === 0 ? (
              <div className="py-12 text-center text-[#8a9690] font-mono text-xs">
                No emails dispatched yet in this runtime session.
              </div>
            ) : (
              <div className="space-y-3">
                {emailLogs.map((log: any, idx: number) => (
                  <div
                    key={log.id || idx}
                    className="p-4 rounded-2xl bg-[#070b09] border border-[#16241f] hover:border-[#00c878]/30 transition-all font-mono text-xs space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          log.type === 'OTP_VERIFICATION' ? 'bg-[#e6ad54]/15 text-[#e6ad54] border border-[#e6ad54]/30' :
                          log.type === 'APPLICATION_SUBMITTED' ? 'bg-blue-900/30 text-blue-300 border border-blue-700/40' :
                          'bg-[#00c878]/15 text-[#00c878] border border-[#00c878]/30'
                        }`}>
                          {log.type.replace('_', ' ')}
                        </span>
                        <span className="text-[#f5f7f6] font-bold">{log.to}</span>
                      </div>
                      <div className="text-[10px] text-[#8a9690]">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} • {new Date(log.timestamp).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="text-[#8a9690] text-[11px] truncate">
                      Subject: <span className="text-[#f5f7f6] font-semibold">{log.subject}</span>
                    </div>

                    <div className="pt-2 border-t border-[#16241f] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#00c878]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Transmitted via SMTP Transport</span>
                      </div>
                      {log.previewUrl && (
                        <a
                          href={log.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-[#121a17] hover:bg-[#00c878] text-[#00c878] hover:text-[#050706] border border-[#00c878]/40 hover:border-[#00c878] text-[11px] font-bold transition-all flex items-center gap-1"
                        >
                          <span>View Delivered Mail HTML</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-[#16241f]">
              <button
                type="button"
                onClick={() => setEmailLogsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] font-mono text-xs transition-colors"
              >
                Close Audit Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Invitations & Onboarding Modal */}
      {invitationsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#070b09] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#16241f]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f5f7f6]">Faculty Provisioning & Invitations</h3>
                  <p className="text-xs font-mono text-[#8a9690]">
                    Issue single-use cryptographically hashed clearance tokens for new academic faculty.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchInvitations}
                  disabled={loadingInvitations}
                  className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-cyan-400 border border-[#16241f]"
                  title="Refresh Invitations"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingInvitations ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => setInvitationsModalOpen(false)}
                  className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content area: Invite Form + Invitations Roster */}
            <div className="space-y-6 overflow-y-auto pr-1">
              {/* Form: Dispatch New Invitation */}
              <form onSubmit={handleCreateInvitation} className="p-5 rounded-2xl bg-[#0b120f] border border-[#16241f] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  <KeyRound className="w-4 h-4" />
                  <span>Issue New Faculty Clearance</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8a9690] mb-1">Colleague Email</label>
                    <input
                      type="email"
                      required
                      placeholder="prof.name@muthamizh.ac.in"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121a17] border border-[#16241f] text-[#f5f7f6] text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8a9690] mb-1">Department</label>
                    <input
                      type="text"
                      placeholder="e.g. Broadcast Cinematography"
                      value={inviteDepartment}
                      onChange={(e) => setInviteDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121a17] border border-[#16241f] text-[#f5f7f6] text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8a9690] mb-1">Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Faculty Instructor"
                      value={inviteDesignation}
                      onChange={(e) => setInviteDesignation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121a17] border border-[#16241f] text-[#f5f7f6] text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] font-mono text-[#8a9690]">
                    Generates 32-byte cryptographic token, records SHA-256 hash, and emails invitee.
                  </div>
                  <button
                    type="submit"
                    disabled={invitingFaculty}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black text-xs font-mono font-bold transition-all flex items-center gap-2"
                  >
                    {invitingFaculty ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Dispatch Invitation</span>
                  </button>
                </div>

                {inviteFeedback && (
                  <div className="p-3 rounded-xl bg-[#121a17] border border-[#16241f] text-xs font-mono text-cyan-300">
                    {inviteFeedback}
                  </div>
                )}

                {generatedInviteToken && (
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
                    <div className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      Single-Use Clearance Key Generated (Valid 48 Hours)
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-[#070b09] p-2.5 rounded-lg border border-cyan-500/20">
                      <code className="text-xs font-mono text-cyan-200 break-all select-all">
                        {generatedInviteToken}
                      </code>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedInviteToken);
                          setCopiedToken(true);
                          setTimeout(() => setCopiedToken(false), 2000);
                        }}
                        className="px-3 py-1.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono shrink-0 flex items-center gap-1.5"
                      >
                        {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedToken ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {/* Roster: Issued Invitations */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-[#8a9690] uppercase tracking-wider">
                    Issued Clearance Keys ({invitationsList.length})
                  </div>
                </div>

                {loadingInvitations ? (
                  <div className="p-8 text-center text-xs font-mono text-[#8a9690]">
                    Loading invitations...
                  </div>
                ) : invitationsList.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-[#8a9690] border border-dashed border-[#16241f] rounded-2xl">
                    No faculty invitations issued yet. Use the form above to invite academic colleagues.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {invitationsList.map((inv) => (
                      <div
                        key={inv.id}
                        className="p-3.5 rounded-xl bg-[#0b120f] border border-[#16241f] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                      >
                        <div className="space-y-0.5">
                          <div className="text-[#f5f7f6] font-bold flex items-center gap-2">
                            <span>{inv.email}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inv.status === 'Active'
                                ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/40'
                                : inv.status === 'Used'
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                                : 'bg-rose-950/60 text-rose-400 border border-rose-500/40'
                            }`}>
                              {inv.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#8a9690]">
                            {inv.designation} • {inv.department}
                          </div>
                        </div>

                        <div className="text-right text-[10px] text-[#8a9690]">
                          <div>Issued: {new Date(inv.createdAt).toLocaleDateString()}</div>
                          <div>Expires: {new Date(inv.expiresAt).toLocaleDateString()}</div>
                          {inv.usedAt && <div className="text-emerald-400">Redeemed: {new Date(inv.usedAt).toLocaleDateString()}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-[#16241f]">
              <button
                type="button"
                onClick={() => setInvitationsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] font-mono text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
