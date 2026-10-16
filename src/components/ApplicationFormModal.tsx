import React, { useState, useEffect } from 'react';
import { RegistrationRecord, UserProfile } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  X, Send, CheckCircle2, GraduationCap, Phone, Mail, User, 
  MapPin, Calendar, Heart, ShieldCheck, ArrowRight, ArrowLeft,
  FileText, Briefcase, CheckSquare, Award, AlertCircle, Copy, Printer
} from 'lucide-react';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationSuccess: (record: RegistrationRecord) => void;
  initialProgramInterest?: string;
  currentUser?: UserProfile | null;
}

export const EDUCATION_QUALIFICATION_OPTIONS = [
  'Higher Secondary / 12th Standard',
  'Diploma',
  'ITI / Vocational Qualification',
  "Undergraduate / Bachelor's Degree",
  "Postgraduate / Master's Degree",
  'M.Phil.',
  'Ph.D. / Doctorate',
  'Other'
];

export const GENERAL_EDUCATION_QUALIFICATIONS = [
  {
    category: "School & Technical Diploma",
    options: [
      "Higher Secondary / 12th Standard",
      "Diploma",
      "ITI / Vocational Qualification"
    ]
  },
  {
    category: "Higher Degrees",
    options: [
      "Undergraduate / Bachelor's Degree",
      "Postgraduate / Master's Degree",
      "M.Phil.",
      "Ph.D. / Doctorate",
      "Other"
    ]
  }
];

export const CONSENT_DECLARATION_TEXT = `Please read the following Consent and Declaration carefully before submitting this form:

1. I hereby state that I am undergoing training for News Reader / News Presenter through the Muthamizh Academy training programme/course.

2. I understand and acknowledge that, during the training period, any news-reading sessions, recordings, photographs, or videos in which I participate are intended solely for training, practice, skill development, and evaluation purposes.

3. I further understand and acknowledge that my participation in such news-reading sessions, recordings, photographs, or videos does not constitute or guarantee employment, a job offer, appointment, or any assurance of future employment with the training institute, television channel, media organisation, or any other organisation.

4. I understand that the primary purpose of this training is to improve my skills in news reading, pronunciation, voice modulation, presentation, camera presence, news delivery, and other related professional skills.

5. I confirm that I have read, understood, and accepted the above terms and conditions. I am providing this consent voluntarily and of my own free will, without any pressure or coercion.`;

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose,
  onRegistrationSuccess,
  initialProgramInterest,
  currentUser
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'Male',
    marital_status: 'Unmarried',
    dob: '',
    address: '',
    district: '',
    state: 'Tamil Nadu',
    pincode: '',
    email: '',
    phone: '',
    alternate_phone: '',
    program_interest: initialProgramInterest || COURSES_DATA[0]?.title || 'News Reader / News Presenter Certification',
    qualification: "Undergraduate / Bachelor's Degree",
    custom_qualification: '',
    experience: '',
    consent_agreed: false,
    signature_name: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRecord, setSuccessRecord] = useState<RegistrationRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccessRecord(null);
      setErrorMessage(null);
      setCurrentStep(1);
      setFormData(prev => ({
        ...prev,
        full_name: currentUser?.fullName || prev.full_name || '',
        email: currentUser?.email || prev.email || '',
        phone: currentUser?.phone || prev.phone || '',
        signature_name: currentUser?.fullName || prev.signature_name || '',
        program_interest: initialProgramInterest || prev.program_interest
      }));
    }
  }, [isOpen, initialProgramInterest, currentUser]);

  if (!isOpen) return null;

  // Validation helpers
  const handleNameChange = (val: string) => {
    const sanitized = val.replace(/[^a-zA-Z\s]/g, '').replace(/\s{2,}/g, ' ').trimStart();
    setFormData(prev => ({ ...prev, full_name: sanitized }));
    if (errorMessage) setErrorMessage(null);
  };

  const handlePhoneChange = (field: 'phone' | 'alternate_phone', val: string) => {
    const sanitized = val.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    if (errorMessage) setErrorMessage(null);
  };

  const handlePincodeChange = (val: string) => {
    const sanitized = val.replace(/\D/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, pincode: sanitized }));
    if (errorMessage) setErrorMessage(null);
  };

  const validateStep = (stepNumber: 1 | 2 | 3 | 4): boolean => {
    setErrorMessage(null);

    if (stepNumber === 1) {
      const trimmedName = formData.full_name.trim();
      if (!trimmedName || trimmedName.length < 2) {
        setErrorMessage("Please enter your full legal name (at least 2 letters).");
        return false;
      }
      if (!/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(trimmedName)) {
        setErrorMessage("Full name must contain letters only with single spaces.");
        return false;
      }
      if (!formData.gender) {
        setErrorMessage("Please select your gender.");
        return false;
      }
      if (!formData.marital_status) {
        setErrorMessage("Please select your marital status.");
        return false;
      }
      if (!formData.dob) {
        setErrorMessage("Please select your Date of Birth.");
        return false;
      }
      return true;
    }

    if (stepNumber === 2) {
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMessage("Please enter a valid email address.");
        return false;
      }
      if (formData.phone.length !== 10) {
        setErrorMessage("Primary phone number must contain exactly 10 digits.");
        return false;
      }
      if (formData.alternate_phone && formData.alternate_phone.length > 0 && formData.alternate_phone.length !== 10) {
        setErrorMessage("Alternate phone number must contain 10 digits if provided.");
        return false;
      }
      if (!formData.address.trim() || formData.address.trim().length < 5) {
        setErrorMessage("Please enter your complete residential address.");
        return false;
      }
      if (!formData.district.trim() || formData.district.trim().length < 2) {
        setErrorMessage("Please enter your district name.");
        return false;
      }
      if (!formData.state.trim() || formData.state.trim().length < 2) {
        setErrorMessage("Please enter your state.");
        return false;
      }
      if (formData.pincode.length !== 6) {
        setErrorMessage("Please enter a valid 6-digit postal PIN code.");
        return false;
      }
      return true;
    }

    if (stepNumber === 3) {
      if (!formData.program_interest) {
        setErrorMessage("Please select your program / workshop of interest.");
        return false;
      }
      if (!formData.qualification) {
        setErrorMessage("Please select your education qualification.");
        return false;
      }
      if (formData.qualification === 'Other' && !formData.custom_qualification.trim()) {
        setErrorMessage("Please specify your custom qualification title.");
        return false;
      }
      return true;
    }

    if (stepNumber === 4) {
      if (!formData.consent_agreed) {
        setErrorMessage("You must agree to the Consent & Declaration to submit your application.");
        return false;
      }
      const trimmedSignature = formData.signature_name.trim();
      if (!trimmedSignature || trimmedSignature.length < 2) {
        setErrorMessage("Please type your full name in the signature field to confirm your consent.");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        // Auto-fill signature name with full_name if empty
        if (currentStep === 3 && !formData.signature_name) {
          setFormData(prev => ({ ...prev, signature_name: prev.full_name }));
        }
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      }
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      return;
    }

    const resolvedQualification = 
      formData.qualification === 'Other' && formData.custom_qualification.trim()
        ? `Other: ${formData.custom_qualification.trim()}`
        : formData.qualification;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          academy: 'Muthamizh Academy',
          corporate_partner: 'Mavis Satcom Limited (Jaya TV)',
          full_name: formData.full_name.trim(),
          gender: formData.gender,
          marital_status: formData.marital_status,
          dob: formData.dob,
          address: formData.address.trim(),
          district: formData.district.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          alternate_phone: formData.alternate_phone ? formData.alternate_phone.trim() : undefined,
          program_interest: formData.program_interest,
          qualification: resolvedQualification,
          experience: formData.experience.trim() || undefined,
          consent_agreed: formData.consent_agreed,
          signature_name: formData.signature_name.trim()
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

  const handleCopyId = () => {
    if (successRecord?.id) {
      navigator.clipboard.writeText(successRecord.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const stepLabels = [
    { num: 1, label: 'Personal', icon: User },
    { num: 2, label: 'Address & Contact', icon: MapPin },
    { num: 3, label: 'Education & Track', icon: GraduationCap },
    { num: 4, label: 'Consent & Sign', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#050706]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0b100e] border border-[#16241f] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_45px_rgba(0,200,120,0.15)] p-5 sm:p-8 space-y-5 max-h-[94vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#16241f] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c878] animate-ping" />
              <span className="text-[11px] font-mono font-bold text-[#e6ad54] uppercase tracking-wider">
                MUTHAMIZH ACADEMY • OFFICIAL APPLICATION FORM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#f5f7f6] mt-1 font-sans">
              Candidate Admission Registration 2026
            </h2>
            <p className="text-xs text-[#8a9690] mt-0.5">
              Muthamizh Academy of Cinema & Fine Arts in alliance with Mavis Satcom Limited (Jaya TV Network)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17] transition-colors shrink-0"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {successRecord ? (
          <div className="py-6 text-center space-y-5 animate-in fade-in font-sans">
            <div className="w-16 h-16 rounded-2xl bg-[#00c878]/20 text-[#00c878] border border-[#00c878]/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,200,120,0.2)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#00c878]/10 text-[#00c878] border border-[#00c878]/30 text-xs font-mono font-bold mb-2">
                APPLICATION SUBMITTED SUCCESSFULLY
              </span>
              <h3 className="text-2xl font-extrabold text-[#f5f7f6]">
                Welcome to Muthamizh Academy!
              </h3>
              <p className="text-xs text-[#8a9690] mt-1.5 max-w-lg mx-auto">
                Your admission application is officially registered. Our admissions board and faculty committee have received your documents and declaration.
              </p>
            </div>

            {/* Official Admission Slip */}
            <div className="p-5 rounded-2xl bg-[#070b09] border border-[#16241f] text-left text-xs space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-[#16241f] pb-3">
                <div>
                  <span className="text-[10px] text-[#8a9690] block uppercase">Application Reference Number</span>
                  <span className="text-base font-extrabold text-[#e6ad54]">{successRecord.id}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="px-2.5 py-1.5 rounded-lg bg-[#121a17] hover:bg-[#1a2822] text-xs text-[#00c878] border border-[#00c878]/30 flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8a9690] block text-[10px]">CANDIDATE NAME</span>
                  <span className="text-[#f5f7f6] font-bold">{successRecord.full_name}</span>
                </div>
                <div>
                  <span className="text-[#8a9690] block text-[10px]">PROGRAM APPLIED</span>
                  <span className="text-[#00c878] font-bold">{successRecord.program_interest}</span>
                </div>
                <div>
                  <span className="text-[#8a9690] block text-[10px]">PRIMARY CONTACT</span>
                  <span className="text-[#f5f7f6]">{successRecord.phone} • {successRecord.email}</span>
                </div>
                <div>
                  <span className="text-[#8a9690] block text-[10px]">LOCATION / RESIDENCE</span>
                  <span className="text-[#f5f7f6]">{successRecord.district || 'Tamil Nadu'}, {successRecord.state || 'India'} ({successRecord.pincode || '—'})</span>
                </div>
                <div>
                  <span className="text-[#8a9690] block text-[10px]">QUALIFICATION</span>
                  <span className="text-[#f5f7f6]">{successRecord.qualification}</span>
                </div>
                <div>
                  <span className="text-[#8a9690] block text-[10px]">DIGITAL SIGNATURE</span>
                  <span className="text-[#00c878] font-bold">{successRecord.signature_name || successRecord.full_name} (Consent Verified)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#16241f] text-[11px] text-[#8a9690] flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-[#00c878] shrink-0" />
                <span>Consent & Declaration voluntary acceptance logged on {new Date(successRecord.timestamp).toLocaleDateString()}.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-[#121a17] hover:bg-[#18241f] text-[#f5f7f6] border border-[#16241f] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4 text-[#8a9690]" />
                <span>Print Application Slip</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSuccessRecord(null);
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-mono font-bold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Return to Academy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Application Form */
          <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
            {/* Step Progress Indicators */}
            <div className="grid grid-cols-4 gap-2 border-b border-[#16241f] pb-4">
              {stepLabels.map(({ num, label, icon: Icon }) => {
                const isCurrent = currentStep === num;
                const isPast = currentStep > num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      if (num < currentStep || validateStep(currentStep)) {
                        setCurrentStep(num as 1 | 2 | 3 | 4);
                      }
                    }}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2 rounded-xl text-center sm:text-left transition-all ${
                      isCurrent 
                        ? 'bg-[#00c878]/15 border border-[#00c878] text-[#00c878]' 
                        : isPast
                        ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/30'
                        : 'bg-[#070b09] text-[#8a9690] border border-[#16241f]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isCurrent ? 'bg-[#00c878] text-[#050706]' : isPast ? 'bg-[#00c878]/30 text-[#00c878]' : 'bg-[#16241f] text-[#8a9690]'
                    }`}>
                      {isPast ? '✓' : num}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase truncate">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-[#261010] border border-[#ef4444]/60 text-[#ef4444] font-mono text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ef4444]" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Verified Candidate Status */}
            {currentUser && (
              <div className="p-2.5 rounded-xl bg-[#00c878]/10 border border-[#00c878]/30 flex items-center gap-2 text-xs text-[#00c878] font-mono">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#00c878]" />
                <span>
                  Candidate Profile: <strong>{currentUser.fullName}</strong> ({currentUser.email})
                </span>
              </div>
            )}

            {/* ================= STEP 1: PERSONAL INFORMATION ================= */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#16241f] pb-2">
                  <h3 className="text-sm font-bold text-[#f5f7f6] uppercase tracking-wider font-mono flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00c878]" />
                    <span>1. Personal Information</span>
                  </h3>
                  <p className="text-[11px] text-[#8a9690]">
                    Enter your official details as recorded in identification documents.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono font-bold text-[#f5f7f6]">
                      Full Name <span className="text-[#ef4444]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#8a9690]">
                      Alphabets & single space only
                    </span>
                  </div>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Senthil Kumar"
                      className="w-full bg-[#050706] text-[#f5f7f6] pl-10 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                    />
                  </div>
                </div>

                {/* Gender (Google Form Question: Gender - Male / Female / Other) */}
                <div>
                  <label className="block font-mono font-bold text-[#f5f7f6] mb-1.5">
                    Gender <span className="text-[#ef4444]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setFormData({ ...formData, gender: g })}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-bold transition-all text-center ${
                          formData.gender === g
                            ? 'bg-[#00c878]/15 border-[#00c878] text-[#00c878] shadow-[0_0_15px_rgba(0,200,120,0.15)]'
                            : 'bg-[#050706] border-[#16241f] text-[#8a9690] hover:border-[#8a9690]/40 hover:text-[#f5f7f6]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marital Status (Google Form Question: Marital Status - Married / Unmarried) */}
                <div>
                  <label className="block font-mono font-bold text-[#f5f7f6] mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#e6ad54]" />
                    <span>Marital Status <span className="text-[#ef4444]">*</span></span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['Married', 'Unmarried'].map((ms) => (
                      <button
                        type="button"
                        key={ms}
                        onClick={() => setFormData({ ...formData, marital_status: ms })}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-bold transition-all text-center ${
                          formData.marital_status === ms
                            ? 'bg-[#e6ad54]/15 border-[#e6ad54] text-[#e6ad54] shadow-[0_0_15px_rgba(230,173,84,0.15)]'
                            : 'bg-[#050706] border-[#16241f] text-[#8a9690] hover:border-[#8a9690]/40 hover:text-[#f5f7f6]'
                        }`}
                      >
                        {ms}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date of Birth (Google Form Question: Date of Birth) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono font-bold text-[#f5f7f6] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00c878]" />
                      <span>Date of Birth <span className="text-[#ef4444]">*</span></span>
                    </label>
                    <span className="text-[10px] font-mono text-[#8a9690]">
                      Format: DD/MM/YYYY
                    </span>
                  </div>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] font-mono"
                  />
                </div>
              </div>
            )}

            {/* ================= STEP 2: CONTACT & ADDRESS ================= */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#16241f] pb-2">
                  <h3 className="text-sm font-bold text-[#f5f7f6] uppercase tracking-wider font-mono flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00c878]" />
                    <span>2. Contact & Residential Details</span>
                  </h3>
                  <p className="text-[11px] text-[#8a9690]">
                    Provide your contact information for admission dispatch and official correspondence.
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-mono font-bold text-[#f5f7f6] mb-1.5">
                    Email Address <span className="text-[#ef4444]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. senthil.k@gmail.com"
                      className="w-full bg-[#050706] text-[#f5f7f6] pl-10 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                    />
                  </div>
                </div>

                {/* Phone & Alternate Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-mono font-bold text-[#f5f7f6]">
                        Phone Number <span className="text-[#ef4444]">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-[#8a9690]">
                        {formData.phone.length}/10
                      </span>
                    </div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange('phone', e.target.value)}
                        placeholder="e.g. 9840183192"
                        className="w-full bg-[#050706] text-[#f5f7f6] pl-10 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-mono font-bold text-[#f5f7f6]">
                        Alternate Number
                      </label>
                      <span className="text-[10px] font-mono text-[#8a9690]">
                        Optional ({formData.alternate_phone.length}/10)
                      </span>
                    </div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.alternate_phone}
                        onChange={(e) => handlePhoneChange('alternate_phone', e.target.value)}
                        placeholder="e.g. 9444102938"
                        className="w-full bg-[#050706] text-[#f5f7f6] pl-10 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                      />
                    </div>
                  </div>
                </div>

                {/* Residential Address */}
                <div>
                  <label className="block font-mono font-bold text-[#f5f7f6] mb-1.5">
                    Address (Permanent / Residential) <span className="text-[#ef4444]">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Door No, Street name, Area, Landmark"
                    className="w-full bg-[#050706] text-[#f5f7f6] p-3 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] text-xs resize-none"
                  />
                </div>

                {/* District, State, PIN Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono font-bold text-[#f5f7f6] mb-1.5">
                      District <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="e.g. Chennai"
                      className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-[#f5f7f6] mb-1.5">
                      State <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="e.g. Tamil Nadu"
                      className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-mono font-bold text-[#f5f7f6]">
                        PIN Code <span className="text-[#ef4444]">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-[#8a9690]">
                        {formData.pincode.length}/6
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="e.g. 600032"
                      className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3: EDUCATION & EXPERIENCE ================= */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#16241f] pb-2">
                  <h3 className="text-sm font-bold text-[#f5f7f6] uppercase tracking-wider font-mono flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#00c878]" />
                    <span>3. Education & Professional Background</span>
                  </h3>
                  <p className="text-[11px] text-[#8a9690]">
                    Select the program you wish to enrol in and outline your prior academic & industry experience.
                  </p>
                </div>

                {/* Program of Interest */}
                <div>
                  <label className="block font-mono font-bold text-[#f5f7f6] mb-1.5">
                    Program / Course of Interest <span className="text-[#ef4444]">*</span>
                  </label>
                  <select
                    value={formData.program_interest}
                    onChange={(e) => setFormData({ ...formData, program_interest: e.target.value })}
                    className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] text-xs font-mono"
                  >
                    {COURSES_DATA.map(course => {
                      if (course.durationTracks && course.durationTracks.length > 0) {
                        return (
                          <optgroup key={course.id} label={`${course.title} (Tracks)`}>
                            <option value={course.title}>
                              {course.title} (General Admission)
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
                          {course.title} ({course.duration} {course.isOnline ? '• Online' : ''})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Education Qualification (From Google Form Options) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono font-bold text-[#f5f7f6]">
                      Education Qualification <span className="text-[#ef4444]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#8a9690]">
                      Highest obtained
                    </span>
                  </div>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] text-xs font-mono"
                  >
                    {EDUCATION_QUALIFICATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* Other Qualification write-in */}
                  {formData.qualification === 'Other' && (
                    <div className="mt-2.5 space-y-1">
                      <input
                        type="text"
                        required
                        value={formData.custom_qualification}
                        onChange={(e) => setFormData({ ...formData, custom_qualification: e.target.value })}
                        placeholder="Please specify your degree / qualification (e.g., M.Sc Electronic Media)"
                        className="w-full bg-[#050706] text-[#f5f7f6] px-3 py-2 rounded-xl border border-[#00c878]/60 focus:outline-none focus:border-[#00c878] text-xs font-mono placeholder:text-[#8a9690]"
                      />
                      <p className="text-[10px] text-[#8a9690] font-mono">
                        Specify institution or degree title.
                      </p>
                    </div>
                  )}
                </div>

                {/* Professional Experience (Google Form: "Please list your relevant work experience, Starting with the most recent.") */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono font-bold text-[#f5f7f6] flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#e6ad54]" />
                      <span>Professional Experience</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#8a9690]">
                      Optional (Fresher if none)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Please list your relevant work experience, starting with the most recent (e.g. Media intern at Sun TV / IT Engineer / Fresher)"
                    className="w-full bg-[#050706] text-[#f5f7f6] p-3 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] text-xs resize-none"
                  />
                  <p className="text-[10px] text-[#8a9690] mt-1 font-mono">
                    Please list company name, role, duration, or write "Fresher / None".
                  </p>
                </div>
              </div>
            )}

            {/* ================= STEP 4: CONSENT & DECLARATION ================= */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-[#16241f] pb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#e6ad54]" />
                    <h3 className="text-sm font-bold text-[#f5f7f6] uppercase tracking-wider font-mono">
                      4. Consent & Declaration
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#8a9690]">
                    Please read the official consent policy carefully before executing digital verification.
                  </p>
                </div>

                {/* Exact Google Form Legal Terms Card */}
                <div className="p-4 rounded-2xl bg-[#070b09] border border-[#16241f] text-xs text-[#cbd5e1] space-y-3 font-sans leading-relaxed max-h-56 overflow-y-auto pr-2">
                  <div className="font-mono text-[11px] font-bold text-[#e6ad54] uppercase tracking-wider border-b border-[#16241f] pb-1.5">
                    Terms of Practical Training & Media Evaluation
                  </div>
                  
                  <p className="text-[11px] text-[#8a9690]">
                    Please read the following Consent and Declaration carefully before submitting this form:
                  </p>

                  <div className="space-y-2 text-[11px] text-[#cbd5e1]">
                    <p>
                      <strong>1.</strong> I hereby state that I am undergoing training for <strong>News Reader / News Presenter</strong> (or selected applied track: <em>{formData.program_interest}</em>) through the <strong>Muthamizh Academy</strong> training programme/course.
                    </p>
                    <p>
                      <strong>2.</strong> I understand and acknowledge that, during the training period, any news-reading sessions, recordings, photographs, or videos in which I participate are intended solely for training, practice, skill development, and evaluation purposes.
                    </p>
                    <p>
                      <strong>3.</strong> I further understand and acknowledge that my participation in such news-reading sessions, recordings, photographs, or videos does not constitute or guarantee employment, a job offer, appointment, or any assurance of future employment with the training institute, television channel, media organisation, or any other organisation.
                    </p>
                    <p>
                      <strong>4.</strong> I understand that the primary purpose of this training is to improve my skills in news reading, pronunciation, voice modulation, presentation, camera presence, news delivery, and other related professional skills.
                    </p>
                    <p>
                      <strong>5.</strong> I confirm that I have read, understood, and accepted the above terms and conditions. I am providing this consent voluntarily and of my own free will, without any pressure or coercion.
                    </p>
                  </div>
                </div>

                {/* Consent and Declaration Checkbox (Google Form Item 14) */}
                <div className="p-3.5 rounded-2xl bg-[#070b09] border border-[#16241f] hover:border-[#00c878]/40 transition-colors">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.consent_agreed}
                      onChange={(e) => setFormData({ ...formData, consent_agreed: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-[#16241f] bg-[#050706] text-[#00c878] focus:ring-[#00c878] accent-[#00c878] shrink-0"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#f5f7f6]">
                        I confirm that I have read, understood, and voluntarily accepted the above Consent and Declaration. <span className="text-[#ef4444]">*</span>
                      </span>
                      <p className="text-[10px] text-[#8a9690] mt-0.5 font-mono">
                        Official acceptance registered with digital timestamp upon form submission.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Type Your Full Name to Confirm Your Consent (Google Form Item 15) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono font-bold text-[#f5f7f6]">
                      Type Your Full Name to Confirm Your Consent <span className="text-[#ef4444]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#8a9690]">
                      Digital signature confirmation
                    </span>
                  </div>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.signature_name}
                      onChange={(e) => setFormData({ ...formData, signature_name: e.target.value })}
                      placeholder="Type your full legal name as digital signature"
                      className="w-full bg-[#050706] text-[#f5f7f6] pl-10 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-[#8a9690] mt-1 font-mono">
                    By typing your name, you certify this acts as your legally binding digital consent signature.
                  </p>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-3 border-t border-[#16241f] flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#18241f] text-[#8a9690] hover:text-[#f5f7f6] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-lg hover:scale-[1.02] transition-all ml-auto"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-mono text-xs font-extrabold flex items-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all ml-auto disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Recording Application...' : 'Submit Official Application'}</span>
                </button>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
