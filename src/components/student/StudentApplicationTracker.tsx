import React, { useState, useEffect } from 'react';
import { UserProfile, RegistrationRecord, AdmissionStatus } from '../../types';
import { 
  ShieldCheck, 
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
  ArrowRight,
  Tv,
  GraduationCap
} from 'lucide-react';

interface StudentApplicationTrackerProps {
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenApplyModal: () => void;
  onClose?: () => void;
}

const MILESTONES: { key: AdmissionStatus; label: string; step: number; desc: string }[] = [
  { key: 'Application Submitted', label: 'Applied', step: 1, desc: 'Application & profile submitted' },
  { key: 'Documents Under Review', label: 'Screening', step: 2, desc: 'Academic credentials verified by Faculty' },
  { key: 'Faculty Interview Scheduled', label: 'Interview Call', step: 3, desc: 'Faculty panel interaction scheduled' },
  { key: 'Studio Assessment', label: 'Studio Test', step: 4, desc: 'Hands-on studio / lab evaluation' },
  { key: 'Provisional Admission Offered', label: 'Seat Reserved', step: 5, desc: 'Offer letter & cohort roll assigned' },
  { key: 'Admission Confirmed', label: 'Enrolled', step: 6, desc: 'Studio badge issued & induction ready' }
];

function getStepNumber(status?: AdmissionStatus): number {
  switch (status) {
    case 'New Candidate': return 0;
    case 'Application Submitted': return 1;
    case 'Documents Under Review': return 2;
    case 'Faculty Interview Scheduled': return 3;
    case 'Studio Assessment': return 4;
    case 'Provisional Admission Offered': return 5;
    case 'Admission Confirmed': return 6;
    case 'Application On Hold': return 2;
    default: return 1;
  }
}

export const StudentApplicationTracker: React.FC<StudentApplicationTrackerProps> = ({
  currentUser,
  onOpenAuthModal,
  onOpenApplyModal,
  onClose
}) => {
  const [application, setApplication] = useState<RegistrationRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const fetchApplicationData = async () => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch('/api/student/my-application', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.hasApplication && data.application) {
          setApplication(data.application);
        }
      }
    } catch (err) {
      console.error('Error fetching application data:', err);
    } finally {
      setLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchApplicationData();
    }
  }, [currentUser]);

  const currentStep = getStepNumber(application?.status || currentUser?.admissionStatus);

  if (!currentUser) {
    return (
      <div className="bg-[#0b100e] border border-[#16241f] rounded-3xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#00c878]/10 border border-[#00c878]/30 flex items-center justify-center mx-auto mb-4 text-[#00c878]">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#f5f7f6] mb-2 font-mono">
          Student Admission Tracker
        </h3>
        <p className="text-sm text-[#8a9690] mb-6 max-w-md mx-auto">
          Log in with your registered candidate email or create an account to view real-time faculty evaluation updates, interview slots, and studio floor passes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenAuthModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-bold text-sm font-mono shadow-lg transition-all"
          >
            Sign In to Track Application
          </button>
          <button
            onClick={onOpenApplyModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#00c878]/40 font-bold text-sm font-mono transition-all"
          >
            Apply for 2026 Cohort
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b100e] border border-[#16241f] rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00c878]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#16241f]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00c878]/15 text-[#00c878] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 border border-[#00c878]/30">
              <Radio className="w-2.5 h-2.5 animate-pulse text-[#00c878]" />
              Live Faculty Synchronized
            </span>
            <span className="text-[11px] font-mono text-[#8a9690]">
              Synced at {lastRefreshed}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#f5f7f6] flex items-center gap-2 font-mono">
            <span>Admission Progress Desk</span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-[#121a17] text-[#e6ad54] border border-[#e6ad54]/30 font-mono font-normal">
              {application?.id || currentUser.applicationId || 'New Applicant'}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchApplicationData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] border border-[#16241f] text-[#8a9690] hover:text-[#00c878] transition-colors"
            title="Refresh Status"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#00c878]' : ''}`} />
          </button>
          {!application && (
            <button
              onClick={onOpenApplyModal}
              className="px-4 py-2 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-bold text-xs font-mono transition-all"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>

      {/* Candidate Overview Card */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#070b09] p-4 rounded-2xl border border-[#16241f]">
          <div className="text-[11px] font-mono text-[#8a9690] mb-1">Candidate Profile</div>
          <div className="font-bold text-[#f5f7f6] text-base">{currentUser.fullName}</div>
          <div className="text-xs text-[#8a9690] truncate">{currentUser.email}</div>
          {currentUser.phone && <div className="text-xs text-[#8a9690] font-mono mt-0.5">{currentUser.phone}</div>}
        </div>

        <div className="bg-[#070b09] p-4 rounded-2xl border border-[#16241f]">
          <div className="text-[11px] font-mono text-[#8a9690] mb-1">Enrolled Track / Interest</div>
          <div className="font-bold text-[#00c878] text-sm leading-snug">
            {application?.program_interest || currentUser.programInterest || 'AI-Assisted Software Development'}
          </div>
          <div className="text-[11px] text-[#8a9690] mt-1 font-mono">
            Partner: Mavis Satcom Limited (Jaya TV)
          </div>
        </div>

        <div className="bg-[#070b09] p-4 rounded-2xl border border-[#00c878]/30 relative overflow-hidden">
          <div className="text-[11px] font-mono text-[#8a9690] mb-1">Current Admission Status</div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00c878]/20 text-[#00c878] font-mono font-bold text-sm border border-[#00c878]/40">
            <CheckCircle2 className="w-4 h-4" />
            <span>{application?.status || currentUser.admissionStatus || 'Application Submitted'}</span>
          </div>
          {application?.reviewedByFaculty && (
            <div className="text-[10px] text-[#8a9690] mt-2 font-mono truncate">
              Evaluated by: {application.reviewedByFaculty}
            </div>
          )}
        </div>
      </div>

      {/* Visual Milestone Progress Tracker */}
      <div className="mt-8 bg-[#070b09] p-5 sm:p-6 rounded-2xl border border-[#16241f]">
        <div className="text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider mb-6 flex items-center justify-between">
          <span>Admissions Lifecycle Milestones</span>
          <span className="text-[#8a9690] font-normal">Step {currentStep} of 6</span>
        </div>

        <div className="relative">
          {/* Progress Connecting Line */}
          <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-[#121a17] z-0">
            <div 
              className="h-full bg-gradient-to-r from-[#00c878] to-[#e6ad54] transition-all duration-700"
              style={{ width: `${Math.min(100, Math.max(10, ((currentStep - 1) / 5) * 100))}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
            {MILESTONES.map((item, idx) => {
              const isPast = currentStep > item.step;
              const isCurrent = currentStep === item.step;
              const isUpcoming = currentStep < item.step;

              return (
                <div key={item.key} className="text-center group">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                    isPast 
                      ? 'bg-[#00c878] text-[#050706] shadow-[0_0_15px_rgba(0,200,120,0.4)]'
                      : isCurrent
                      ? 'bg-[#e6ad54] text-[#050706] ring-4 ring-[#e6ad54]/30 shadow-[0_0_20px_rgba(230,173,84,0.5)] animate-pulse'
                      : 'bg-[#121a17] text-[#8a9690] border border-[#16241f]'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                  </div>
                  <div className={`text-xs font-bold mt-2.5 font-mono ${
                    isCurrent ? 'text-[#e6ad54]' : isPast ? 'text-[#00c878]' : 'text-[#8a9690]'
                  }`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-[#8a9690] mt-0.5 hidden sm:block leading-tight">
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Faculty Directives & Remarks Panel */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Faculty Reviewer Remarks */}
        <div className="bg-[#070b09] p-5 rounded-2xl border border-[#16241f] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00c878] uppercase tracking-wider mb-3">
              <UserCheck className="w-4 h-4" />
              <span>Official Faculty Reviewer Notes</span>
            </div>
            <p className="text-sm text-[#f5f7f6] leading-relaxed bg-[#121a17] p-3.5 rounded-xl border border-[#16241f] italic">
              "{application?.facultyRemarks || 'Application is currently queued for initial faculty committee review. Check back regularly for scheduled interview rounds.'}"
            </p>
          </div>
          {application?.updatedAt && (
            <div className="text-[10px] font-mono text-[#8a9690] mt-3 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#00c878]" />
              <span>Last updated by Faculty on {new Date(application.updatedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Schedule & Floor Pass Card */}
        <div className="bg-[#070b09] p-5 rounded-2xl border border-[#16241f] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Interview & Floor Access Pass</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#121a17] p-3 rounded-xl border border-[#16241f]">
              <span className="text-[#8a9690] text-[10px] font-mono block">Scheduled Date & Time</span>
              <span className="font-bold text-[#f5f7f6] mt-0.5 block">
                {application?.interviewDate || 'To be announced'}
              </span>
            </div>

            <div className="bg-[#121a17] p-3 rounded-xl border border-[#16241f]">
              <span className="text-[#8a9690] text-[10px] font-mono block">Interview Venue / Mode</span>
              <span className="font-bold text-[#f5f7f6] mt-0.5 block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#00c878] shrink-0" />
                <span className="truncate">{application?.interviewVenue || 'Virtual Lab / Jaya TV Floor A'}</span>
              </span>
            </div>

            <div className="bg-[#121a17] p-3 rounded-xl border border-[#16241f]">
              <span className="text-[#8a9690] text-[10px] font-mono block">Assigned Studio Floor / Rig</span>
              <span className="font-bold text-[#00c878] mt-0.5 block flex items-center gap-1">
                <Tv className="w-3 h-3 text-[#00c878] shrink-0" />
                <span className="truncate">{application?.studioFloorAssigned || 'Floor A PCR & Chroma Floor'}</span>
              </span>
            </div>

            <div className="bg-[#121a17] p-3 rounded-xl border border-[#16241f]">
              <span className="text-[#8a9690] text-[10px] font-mono block">Media Fellowship / Scholarship</span>
              <span className="font-bold text-[#e6ad54] mt-0.5 block flex items-center gap-1">
                <Award className="w-3 h-3 text-[#e6ad54] shrink-0" />
                <span className="truncate">{application?.scholarshipGranted || 'Under Merit Review'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Instructions banner */}
      <div className="mt-6 p-4 rounded-2xl bg-[#121a17] border border-[#16241f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8a9690]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e6ad54] shrink-0" />
          <span>Need assistance preparing for your faculty interview or studio assessment?</span>
        </div>
        <a
          href="tel:+919840183192"
          className="text-[#00c878] font-bold font-mono hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Call Admissions Helpdesk (+91 9840183192)</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
