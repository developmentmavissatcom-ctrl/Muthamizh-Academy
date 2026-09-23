import React, { useState, useEffect } from 'react';
import { UserProfile, CircularUpdate, RegistrationRecord } from '../../types';
import { 
  X, 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  GraduationCap, 
  Bell, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  ExternalLink, 
  ArrowRight,
  Tv,
  Radio,
  Sparkles,
  MapPin,
  Award,
  UserCheck
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  onOpenApplyModal: (programTitle?: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onOpenApplyModal
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'updates'>('status');
  const [circulars, setCirculars] = useState<CircularUpdate[]>([]);
  const [loadingCirculars, setLoadingCirculars] = useState(false);
  const [applicationData, setApplicationData] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCirculars();
      fetchApplication();
    }
  }, [isOpen]);

  const fetchApplication = async () => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (!token) return;
    try {
      const res = await fetch('/api/student/my-application', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.hasApplication && data.application) {
          setApplicationData(data.application);
        }
      }
    } catch (err) {
      console.error('Failed to load student application:', err);
    }
  };

  const fetchCirculars = async () => {
    setLoadingCirculars(true);
    try {
      const res = await fetch('/api/auth/updates');
      const data = await res.json();
      if (data.updates) {
        setCirculars(data.updates);
      }
    } catch (err) {
      console.error('Failed to load circular updates:', err);
    } finally {
      setLoadingCirculars(false);
    }
  };

  if (!isOpen || !user) return null;

  // Visual status step indices
  const statusSteps = [
    { title: 'Account Verified', desc: 'Mail OTP authenticated' },
    { title: 'Application Submitted', desc: user.applicationId ? `ID: ${user.applicationId}` : 'Awaiting submission' },
    { title: 'Screening & Documents', desc: 'Portfolio review' },
    { title: 'Studio Induction', desc: 'Jaya TV Floor Access' }
  ];

  const getCurrentStepIndex = () => {
    if (!user.applicationId) return 0;
    if (user.admissionStatus === 'New Candidate') return 1;
    if (user.admissionStatus === 'Application Submitted') return 1;
    if (user.admissionStatus === 'Documents Under Review') return 2;
    if (user.admissionStatus === 'Interview Scheduled') return 2;
    if (user.admissionStatus === 'Admission Confirmed') return 3;
    return 1;
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#070b09] border border-[#16241f] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(0,200,120,0.1)] overflow-hidden my-6">
        
        {/* Top Header Banner */}
        <div className="h-2 w-full bg-gradient-to-r from-[#00c878] via-[#00c878] to-[#e6ad54]" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 pb-4 flex items-start justify-between border-b border-[#16241f]">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#121a17] border border-[#00c878]/30 flex items-center justify-center text-[#00c878] font-mono text-xl font-extrabold shadow-md">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#f5f7f6] font-mono">
                  {user.fullName}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878] text-[10px] font-mono font-bold">
                  <ShieldCheck className="w-3 h-3 text-[#00c878]" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-[#8a9690] flex items-center gap-2 mt-0.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-[#00c878]" /> {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17] transition-colors border border-transparent hover:border-[#16241f]"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 flex gap-2 border-b border-[#16241f] bg-[#0b100e]/40">
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 px-4 text-xs font-mono font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'status' ? 'text-[#00c878]' : 'text-[#8a9690] hover:text-[#f5f7f6]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Admission & Registration Status</span>
            {activeTab === 'status' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c878] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`py-3 px-4 text-xs font-mono font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'updates' ? 'text-[#00c878]' : 'text-[#8a9690] hover:text-[#f5f7f6]'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Regular Academy Updates ({circulars.length})</span>
            {activeTab === 'updates' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c878] rounded-full" />
            )}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: ADMISSION & REGISTRATION STATUS */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              
              {/* Registration Card */}
              <div className="p-5 rounded-2xl bg-[#0b100e] border border-[#16241f] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#16241f] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#8a9690] uppercase block">
                      Application Reference
                    </span>
                    <span className="text-base font-mono font-bold text-[#00c878]">
                      {user.applicationId || 'Not Yet Applied'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#8a9690] uppercase block">
                      Current Cohort Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#00c878] animate-pulse" />
                      {user.admissionStatus || 'Candidate Registered'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#8a9690] block text-[11px] font-mono">Specialization Interest:</span>
                    <span className="text-[#f5f7f6] font-semibold">
                      {user.programInterest || 'AI-Assisted Software Development'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#8a9690] block text-[11px] font-mono">Affiliation:</span>
                    <span className="text-[#f5f7f6] font-semibold">
                      Mavis Satcom Ltd / Jaya TV Network
                    </span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase text-[#8a9690] block mb-3">
                    Admissions Progress Timeline
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {statusSteps.map((step, idx) => {
                      const isComplete = idx < currentStep;
                      const isCurrent = idx === currentStep;

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isCurrent
                              ? 'bg-[#121a17] border-[#00c878] shadow-[0_0_15px_rgba(0,200,120,0.15)]'
                              : isComplete
                              ? 'bg-[#050706] border-[#00c878]/40 text-[#8a9690]'
                              : 'bg-[#050706] border-[#16241f] text-[#55635c]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {isComplete ? (
                              <CheckCircle2 className="w-4 h-4 text-[#00c878]" />
                            ) : isCurrent ? (
                              <span className="w-2 h-2 rounded-full bg-[#00c878] animate-ping" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-[#33423b]" />
                            )}
                            <span className="text-[10px] font-mono font-bold">
                              Step 0{idx + 1}
                            </span>
                          </div>
                          <div className={`text-xs font-bold leading-tight ${isCurrent ? 'text-[#00c878]' : isComplete ? 'text-[#f5f7f6]' : 'text-[#8a9690]'}`}>
                            {step.title}
                          </div>
                          <div className="text-[10px] text-[#8a9690] mt-1 font-mono">
                            {step.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Faculty Evaluation & Directives Card */}
                {applicationData && (
                  <div className="pt-3 border-t border-[#16241f] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider">
                        <UserCheck className="w-4 h-4 text-[#e6ad54]" />
                        <span>Faculty Review & Interview Directive</span>
                      </div>
                      {applicationData.reviewedByFaculty && (
                        <span className="text-[10px] text-[#8a9690] font-mono">
                          Reviewer: {applicationData.reviewedByFaculty}
                        </span>
                      )}
                    </div>

                    {applicationData.facultyRemarks && (
                      <div className="p-3.5 rounded-xl bg-[#070b09] border border-[#16241f] text-xs text-[#f5f7f6] italic">
                        "{applicationData.facultyRemarks}"
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-[#070b09] p-2.5 rounded-xl border border-[#16241f]">
                        <span className="text-[#8a9690] text-[10px] block">Interview Schedule:</span>
                        <span className="font-bold text-[#f5f7f6]">
                          {applicationData.interviewDate || 'Slot allocation in progress'}
                        </span>
                      </div>

                      <div className="bg-[#070b09] p-2.5 rounded-xl border border-[#16241f]">
                        <span className="text-[#8a9690] text-[10px] block">Venue / Floor:</span>
                        <span className="font-bold text-[#00c878] flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-[#00c878]" />
                          <span>{applicationData.interviewVenue || 'Studio Floor A / Virtual Lab'}</span>
                        </span>
                      </div>

                      {applicationData.studioFloorAssigned && (
                        <div className="bg-[#070b09] p-2.5 rounded-xl border border-[#16241f]">
                          <span className="text-[#8a9690] text-[10px] block">Studio Floor Pass:</span>
                          <span className="font-bold text-[#00c878] flex items-center gap-1 truncate">
                            <Tv className="w-3 h-3 text-[#00c878]" />
                            <span>{applicationData.studioFloorAssigned}</span>
                          </span>
                        </div>
                      )}

                      {applicationData.scholarshipGranted && (
                        <div className="bg-[#070b09] p-2.5 rounded-xl border border-[#16241f]">
                          <span className="text-[#8a9690] text-[10px] block">Media Fellowship:</span>
                          <span className="font-bold text-[#e6ad54] flex items-center gap-1 truncate">
                            <Award className="w-3 h-3 text-[#e6ad54]" />
                            <span>{applicationData.scholarshipGranted}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Banner */}
              {!user.applicationId ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#121a17] to-[#0b100e] border border-[#00c878]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-sm font-bold text-[#f5f7f6] font-mono flex items-center justify-center sm:justify-start gap-2">
                      <GraduationCap className="w-4 h-4 text-[#00c878]" />
                      <span>Ready to formalize your 2026 application?</span>
                    </div>
                    <p className="text-xs text-[#8a9690]">
                      Your verified account information will be automatically pre-filled in the admissions form.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenApplyModal(user.programInterest);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#00c878] hover:bg-[#00e087] text-[#050706] font-extrabold text-xs font-mono transition-all shadow-md shrink-0 flex items-center gap-1.5"
                  >
                    <span>Submit Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-[#8a9690]">
                    Need to apply for an additional diploma or short-term program?
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenApplyModal();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#121a17] hover:bg-[#182420] text-[#00c878] border border-[#00c878]/40 font-mono text-xs font-bold transition-colors"
                  >
                    Apply for Another Program
                  </button>
                </div>
              )}

              {/* Security & Credentials Info */}
              <div className="p-3.5 rounded-xl bg-[#050706] border border-[#16241f] flex items-center justify-between text-xs text-[#8a9690] font-mono">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00c878]" />
                  Password Protection: Scrypt Salted Hash Enabled
                </span>
                <span>ID: {user.id}</span>
              </div>

            </div>
          )}

          {/* TAB 2: REGULAR ACADEMY UPDATES & CIRCULARS */}
          {activeTab === 'updates' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#8a9690] pb-1">
                <span>Official Announcements for 2026 Batch</span>
                <span className="text-[#00c878] flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> Live Broadcast Feed
                </span>
              </div>

              {loadingCirculars ? (
                <div className="text-center py-8 text-xs font-mono text-[#8a9690]">
                  Loading regular updates...
                </div>
              ) : circulars.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#8a9690]">
                  No circulars at this moment. Check back soon!
                </div>
              ) : (
                circulars.map((circ) => (
                  <div
                    key={circ.id}
                    className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] hover:border-[#00c878]/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {circ.urgent && (
                          <span className="px-2 py-0.5 rounded-md bg-red-950/60 border border-red-800 text-red-300 text-[10px] font-mono font-bold uppercase">
                            Urgent Notice
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-[#121a17] text-[#00c878] text-[10px] font-mono">
                          {circ.category}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#8a9690]">
                        {circ.date}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#f5f7f6] font-mono">
                      {circ.title}
                    </h4>

                    <p className="text-xs text-[#8a9690] leading-relaxed">
                      {circ.summary}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Modal Footer with Sign Out */}
        <div className="p-4 px-6 bg-[#050706] border-t border-[#16241f] flex items-center justify-between">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors p-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Candidate Account</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#0b100e] hover:bg-[#121a17] border border-[#16241f] text-xs font-mono text-[#f5f7f6] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
