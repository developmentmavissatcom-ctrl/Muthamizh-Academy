import React, { useState, useEffect } from 'react';
import { RegistrationRecord, UserProfile } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  X, Send, CheckCircle2, GraduationCap, Phone, Mail, User, 
  BookOpen, Sparkles, Radio, ShieldCheck, ArrowRight, Activity,
  Globe, Laptop
} from 'lucide-react';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationSuccess: (record: RegistrationRecord) => void;
  initialProgramInterest?: string;
  currentUser?: UserProfile | null;
}

export const GENERAL_EDUCATION_QUALIFICATIONS = [
  {
    category: "School & Technical Diploma",
    options: [
      "Higher Secondary (10+2 / HSC / CBSE / ICSE)",
      "Diploma in Film & Television Production / Media",
      "Diploma in Engineering / Polytechnic (3 Years)",
      "Vocational / ITI Certification"
    ]
  },
  {
    category: "Undergraduate Degrees (Bachelors)",
    options: [
      "B.Sc - Visual Communication / Electronic Media",
      "B.Sc - Computer Science / IT / AI / Data Science",
      "B.Sc - Mathematics / Physics / Science Stream",
      "B.A - Journalism & Mass Communication",
      "B.A - English / Tamil Literature / Fine Arts",
      "B.E. / B.Tech - Computer Science & Engineering / IT",
      "B.E. / B.Tech - ECE / EEE / Mechanical / Other Engineering",
      "BCA - Bachelor of Computer Applications",
      "B.Com - General / Corporate Secretaryship / Finance",
      "BBA - Business Administration / Management",
      "Bachelor Degree - Any Other Discipline"
    ]
  },
  {
    category: "Postgraduate Degrees (Masters)",
    options: [
      "M.Sc - Visual Media / Electronic Media / Broadcasting",
      "M.Sc - Computer Science / Information Technology",
      "M.A - Mass Communication / Journalism / Media",
      "M.E. / M.Tech / MCA",
      "MBA - Media Management / Business Administration",
      "Postgraduate Degree - Any Other Stream"
    ]
  },
  {
    category: "Professional & Industry Experience",
    options: [
      "Working Media Professional (Broadcasting / Studio Operations)",
      "Working Software / Technology Professional",
      "Freelance Content Creator / Filmmaker / Designer",
      "Other Educational Qualification"
    ]
  }
];

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose,
  onRegistrationSuccess,
  initialProgramInterest,
  currentUser
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    program_interest: initialProgramInterest || COURSES_DATA[0]?.title || 'AI-Assisted Software Development & Agentic Engineering',
    qualification: GENERAL_EDUCATION_QUALIFICATIONS[1].options[0]
  });

  const [customQualification, setCustomQualification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRecord, setSuccessRecord] = useState<RegistrationRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSuccessRecord(null);
      setErrorMessage(null);
      setFormData(prev => ({
        ...prev,
        full_name: currentUser?.fullName || prev.full_name || '',
        email: currentUser?.email || prev.email || '',
        phone: currentUser?.phone || prev.phone || '',
        program_interest: initialProgramInterest || prev.program_interest
      }));
    }
  }, [isOpen, initialProgramInterest, currentUser]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    // Only allow English alphabets and single spaces between words
    const sanitized = val.replace(/[^a-zA-Z\s]/g, '').replace(/\s{2,}/g, ' ').trimStart();
    setFormData(prev => ({ ...prev, full_name: sanitized }));
    if (errorMessage) setErrorMessage(null);
  };

  const handlePhoneChange = (val: string) => {
    // Strictly numeric only, max 10 digits
    const sanitized = val.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: sanitized }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = formData.full_name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("Please enter a valid legal full name (at least 2 letters, letters only).");
      return;
    }

    if (!/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(trimmedName)) {
      setErrorMessage("Full name must contain only letters with single spaces between words.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (formData.phone.length !== 10) {
      setErrorMessage("Phone number must contain exactly 10 digits (numbers only).");
      return;
    }

    const resolvedQualification = 
      formData.qualification === 'Other Educational Qualification' && customQualification.trim()
        ? `Other: ${customQualification.trim()}`
        : formData.qualification;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          academy: 'Muthamizh Academy',
          corporate_partner: 'Mavis Satcom Limited (Jaya TV)',
          full_name: trimmedName,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          program_interest: formData.program_interest,
          qualification: resolvedQualification
        })
      });

      const data = await res.json();
      if (data.success && data.record) {
        setSuccessRecord(data.record);
        onRegistrationSuccess(data.record);
      } else {
        setErrorMessage(data.error || "Failed to submit admission application.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to connect to admissions server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050706]/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b100e] border border-[#16241f] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(0,200,120,0.15)] p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#16241f] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c878] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider">
                MUTHAMIZH ACADEMY ADMISSIONS 2026
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#f5f7f6] mt-1 font-sans">
              Official Candidate Registration
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {successRecord ? (
          <div className="py-6 text-center space-y-4 animate-in fade-in font-sans">
            <div className="w-16 h-16 rounded-2xl bg-[#00c878]/20 text-[#00c878] border border-[#00c878]/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,200,120,0.2)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#f5f7f6]">Application Verified & Registered!</h3>
              <p className="text-xs text-[#8a9690] mt-1">
                Your admission file number is <strong className="text-[#e6ad54] font-mono">{successRecord.id}</strong>. Our counselors will reach out via Phone/WhatsApp for studio tour and batch onboarding.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#050706] border border-[#16241f] text-left text-xs space-y-1.5 text-[#8a9690] font-sans">
              <div><strong className="text-[#f5f7f6]">Candidate:</strong> {successRecord.full_name}</div>
              <div><strong className="text-[#e6ad54]">Selected Program:</strong> {successRecord.program_interest}</div>
              <div><strong className="text-[#00c878]">Qualification:</strong> {successRecord.qualification}</div>
              <div><strong className="text-[#f5f7f6]">Contact Number:</strong> {successRecord.phone} • {successRecord.email}</div>
            </div>

            <button
              onClick={() => {
                setSuccessRecord(null);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-mono font-bold text-xs shadow hover:scale-[1.02] transition-all"
            >
              Done & Return to Studios
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-[#1f1111] border border-[#ef4444]/40 text-[#ef4444] font-mono text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}
            {currentUser && (
              <div className="p-2.5 rounded-xl bg-[#00c878]/10 border border-[#00c878]/30 flex items-center gap-2 text-xs text-[#00c878] font-mono">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#00c878]" />
                <span>Verified Candidate: <strong>{currentUser.fullName}</strong> ({currentUser.email})</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono font-bold text-[#f5f7f6]">
                  Full Legal Name <span className="text-[#ef4444]">*</span>
                </label>
                <span className="text-[10px] font-mono text-[#8a9690]">
                  Letters & single space only
                </span>
              </div>
              <div className="relative">
                <User className="w-4 h-4 text-[#8a9690] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Karthik Raja"
                  className="w-full bg-[#050706] text-[#f5f7f6] pl-9 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-mono font-bold text-[#f5f7f6] mb-1">
                Email Address <span className="text-[#ef4444]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8a9690] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. karthik@example.com"
                  className="w-full bg-[#050706] text-[#f5f7f6] pl-9 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono font-bold text-[#f5f7f6]">
                  Phone / WhatsApp Contact <span className="text-[#ef4444]">*</span>
                </label>
                <span className="text-[10px] font-mono text-[#8a9690]">
                  10 digits numeric only ({formData.phone.length}/10)
                </span>
              </div>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8a9690] absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="e.g. 9840183192"
                  className="w-full bg-[#050706] text-[#f5f7f6] pl-9 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                />
              </div>
            </div>

            {/* Program Interest */}
            <div>
              <label className="block font-mono font-bold text-[#f5f7f6] mb-1">
                Interested Production / Online Program
              </label>
              <select
                value={formData.program_interest}
                onChange={(e) => setFormData({ ...formData, program_interest: e.target.value })}
                className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] text-xs font-mono"
              >
                {COURSES_DATA.map(course => {
                  if (course.durationTracks && course.durationTracks.length > 0) {
                    return (
                      <optgroup key={course.id} label={`${course.title} (3 Duration Tracks)`}>
                        <option value={course.title}>
                          {course.title} (General)
                        </option>
                        {course.durationTracks.map(track => (
                          <option key={track.id} value={`${course.title} (${track.durationLabel})`}>
                            ↳ {track.durationLabel} Track ({track.schedule} • {track.fee})
                          </option>
                        ))}
                      </optgroup>
                    );
                  }
                  return (
                    <option key={course.id} value={course.title}>
                      {course.title} ({course.duration} {course.isOnline ? '• Online Labs' : ''})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Qualification Dropdown */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono font-bold text-[#f5f7f6] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#00c878]" />
                  <span>Educational Background <span className="text-[#ef4444]">*</span></span>
                </label>
                <span className="text-[10px] font-mono text-[#8a9690]">
                  Highest qualification
                </span>
              </div>
              <div className="relative">
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] text-xs font-mono"
                >
                  {GENERAL_EDUCATION_QUALIFICATIONS.map((group) => (
                    <optgroup 
                      key={group.category} 
                      label={group.category}
                      className="bg-[#0b100e] text-[#e6ad54] font-bold"
                    >
                      {group.options.map((opt) => (
                        <option 
                          key={opt} 
                          value={opt}
                          className="bg-[#050706] text-[#f5f7f6] font-normal"
                        >
                          {opt}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {formData.qualification === 'Other Educational Qualification' && (
                <div className="mt-2 space-y-1">
                  <input
                    type="text"
                    required
                    value={customQualification}
                    onChange={(e) => setCustomQualification(e.target.value)}
                    placeholder="Specify your degree / qualification (e.g. M.Phil / Fine Arts Diploma)"
                    className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2 rounded-xl border border-[#00c878]/60 focus:outline-none focus:border-[#00c878] text-xs font-mono placeholder:text-[#8a9690]"
                  />
                  <p className="text-[10px] text-[#8a9690] font-mono">
                    Please provide your specific discipline or institution title.
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-mono font-extrabold text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording Application...' : 'Submit Admission Registration'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
