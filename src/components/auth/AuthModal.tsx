import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from '../../data/coursesData';
import { UserProfile } from '../../types';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  AlertCircle 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile, token: string) => void;
  initialMode?: 'signup' | 'login';
  initialRole?: 'student' | 'faculty';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
  initialRole = 'student'
}) => {
  const [mode, setMode] = useState<'signup' | 'login' | 'otp_verify' | 'forgot_password' | 'reset_password'>('login');
  const [selectedRole, setSelectedRole] = useState<'student' | 'faculty'>('student');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [programInterest, setProgramInterest] = useState(COURSES_DATA[0]?.title || 'AI-Assisted Software Development & Agentic Engineering');
  const [updatesSubscribed, setUpdatesSubscribed] = useState(true);

  // Forgot Password / Reset Password states
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Faculty Registration Specific Fields
  const [facultyAccessKey, setFacultyAccessKey] = useState('');
  const [facultyDepartment, setFacultyDepartment] = useState('Admissions Council & Academic Affairs');
  const [facultyDesignation, setFacultyDesignation] = useState('Faculty Instructor');

  // OTP Verification state
  const [otpValue, setOtpValue] = useState('');
  const [isProductionDelivery, setIsProductionDelivery] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [mailPreviewUrl, setMailPreviewUrl] = useState<string | null>(null);
  const [smtpErrorDetails, setSmtpErrorDetails] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const prevIsOpenRef = React.useRef(false);

  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      // Check for an active pending signup verification session
      try {
        const saved = sessionStorage.getItem('muthamizh_pending_signup');
        if (saved) {
          const parsed = JSON.parse(saved);
          const isFresh = parsed && parsed.timestamp && (Date.now() - parsed.timestamp < 15 * 60 * 1000);
          if (isFresh && parsed.email) {
            setEmail(parsed.email);
            if (parsed.fullName) setFullName(parsed.fullName);
            if (parsed.role) setSelectedRole(parsed.role);
            if (parsed.phone) setPhone(parsed.phone);
            setIsProductionDelivery(Boolean(parsed.isProductionDelivery));
            setSenderEmail(parsed.senderEmail || '');
            setMailPreviewUrl(parsed.mailPreviewUrl || null);
            setSmtpErrorDetails(parsed.smtpErrorDetails || null);
            setSuccessMessage(`A 6-digit verification code was dispatched to ${parsed.email}. Please enter it below to complete registration.`);
            setMode('otp_verify');
            prevIsOpenRef.current = true;
            return;
          }
        }
      } catch (e) {}

      setMode(initialMode);
      setSelectedRole(initialRole);
      setErrorMessage(null);
      setSuccessMessage(null);
      setOtpValue('');
    } else if (isOpen) {
      // When already open, do not overwrite if user is in the middle of OTP verification
      if (mode === 'otp_verify' || mode === 'reset_password') {
        return;
      }
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, initialMode, initialRole]);

  // Cooldown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const handleFullNameChange = (val: string) => {
    // Only allow English alphabets and maximum single spaces between words
    const sanitized = val.replace(/[^a-zA-Z\s]/g, '').replace(/\s{2,}/g, ' ').trimStart();
    setFullName(sanitized);
    if (errorMessage) setErrorMessage(null);
  };

  const handlePhoneChange = (val: string) => {
    // Strictly numeric only, max 10 digits
    const sanitized = val.replace(/\D/g, '').slice(0, 10);
    setPhone(sanitized);
    if (errorMessage) setErrorMessage(null);
  };

  // Handle Send Signup OTP
  const handleSendSignupOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedName = fullName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage('Please enter a valid full legal name (at least 2 letters, letters only).');
      return;
    }
    if (!/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(trimmedName)) {
      setErrorMessage('Full name must contain only letters and single spaces between words.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (phone && phone.length !== 10) {
      setErrorMessage('Phone number must contain exactly 10 digits (numbers only).');
      return;
    }

    if (selectedRole === 'faculty' && !facultyAccessKey.trim()) {
      setErrorMessage('Faculty registration requires an Institutional Authorization Key.');
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const res = await fetch('/api/auth/send-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          fullName: trimmedName,
          email: email.trim(),
          password,
          phone: phone.trim(),
          role: selectedRole,
          facultyAccessKey: selectedRole === 'faculty' ? facultyAccessKey.trim() : undefined,
          facultyDepartment: selectedRole === 'faculty' ? facultyDepartment : undefined,
          facultyDesignation: selectedRole === 'faculty' ? facultyDesignation : undefined,
          programInterest: selectedRole === 'student' ? programInterest : undefined,
          updatesSubscribed
        })
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification email');
      }

      setIsProductionDelivery(Boolean(data.isProductionSmtp));
      setSenderEmail(data.senderEmail || '');
      setMailPreviewUrl(data.previewUrl || null);
      setSmtpErrorDetails(data.smtpError || null);
      setSuccessMessage(data.message || `A 6-digit verification code has been dispatched to ${email}.`);
      setResendCooldown(60);
      setMode('otp_verify');

      // Persist pending registration session
      try {
        sessionStorage.setItem('muthamizh_pending_signup', JSON.stringify({
          email: email.trim(),
          fullName: trimmedName,
          role: selectedRole,
          phone: phone.trim(),
          isProductionDelivery: Boolean(data.isProductionSmtp),
          senderEmail: data.senderEmail || '',
          mailPreviewUrl: data.previewUrl || null,
          smtpErrorDetails: data.smtpError || null,
          timestamp: Date.now()
        }));
      } catch (e) {}
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setErrorMessage('Verification request timed out. If running locally, check your connection or try again.');
      } else {
        setErrorMessage(err.message || 'Error initiating mail verification');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password (Request OTP)
  const handleSendForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const targetEmail = resetEmail.trim();
    if (!targetEmail || !targetEmail.includes('@')) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch password reset code.');
      }

      setIsProductionDelivery(Boolean(data.isProductionSmtp));
      setSenderEmail(data.senderEmail || '');
      setMailPreviewUrl(data.previewUrl || null);
      setSuccessMessage(data.message || `Password reset code sent to ${targetEmail}.`);
      setResendCooldown(60);
      setMode('reset_password');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error requesting password reset.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Reset Password (Verify OTP & Set New Password)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const targetEmail = resetEmail.trim();
    if (!targetEmail) {
      setErrorMessage('Please specify your registered email.');
      return;
    }

    if (!resetOtp.trim() || resetOtp.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match. Please re-type your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          otp: resetOtp.trim(),
          newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password.');
      }

      localStorage.setItem('muthamizh_auth_token', data.token);
      localStorage.setItem('muthamizh_auth_user', JSON.stringify(data.user));

      setSuccessMessage('Password successfully reset! Logging you in...');
      setTimeout(() => {
        onAuthSuccess(data.user, data.token);
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error updating password.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!otpValue.trim() || otpValue.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      let res = await fetch('/api/auth/verify-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          email,
          otp: otpValue.trim()
        })
      });

      let data = await res.json();
      if (!res.ok) {
        // Fallback to standard /api/auth/verify-otp
        const fallbackRes = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            email,
            otp: otpValue.trim()
          })
        });
        if (fallbackRes.ok) {
          res = fallbackRes;
          data = await fallbackRes.json();
        } else {
          throw new Error(data.error || 'Invalid or expired OTP code.');
        }
      }
      clearTimeout(timeoutId);

      localStorage.setItem('muthamizh_auth_token', data.token);
      localStorage.setItem('muthamizh_auth_user', JSON.stringify(data.user));
      try {
        sessionStorage.removeItem('muthamizh_pending_signup');
      } catch (e) {}
      
      setSuccessMessage(data.user.role === 'faculty' 
        ? 'Faculty account verified! Opening Faculty Admissions Desk...' 
        : 'Candidate account verified! Opening Student Portal...');

      setTimeout(() => {
        onAuthSuccess(data.user, data.token);
        onClose();
      }, 700);
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setErrorMessage('Verification request timed out. Please retry submitting the code.');
      } else {
        setErrorMessage(err.message || 'Verification failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ 
          email, 
          password,
          targetRole: selectedRole
        })
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      localStorage.setItem('muthamizh_auth_token', data.token);
      localStorage.setItem('muthamizh_auth_user', JSON.stringify(data.user));

      setSuccessMessage(data.user.role === 'faculty' 
        ? 'Welcome, Faculty Member. Directing to Admissions Desk...' 
        : 'Welcome back! Directing to Student Portal...');

      setTimeout(() => {
        onAuthSuccess(data.user, data.token);
        onClose();
      }, 500);
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setErrorMessage('Login request timed out (10s). Check that your localhost server is responding.');
      } else {
        setErrorMessage(err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#070b09] border border-[#16241f] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(0,200,120,0.1)] overflow-hidden my-6">
        
        {/* Top Header Glow Strip */}
        <div className={`h-1.5 w-full transition-colors ${selectedRole === 'faculty' ? 'bg-gradient-to-r from-[#e6ad54] via-[#e6ad54] to-amber-600' : 'bg-gradient-to-r from-[#00c878] via-[#00c878] to-[#e6ad54]'}`} />

        {/* Modal Header */}
        <div className="p-4 sm:p-7 pb-4 flex items-start justify-between border-b border-[#16241f]">
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${
              selectedRole === 'faculty' 
                ? 'bg-[#e6ad54]/15 border-[#e6ad54]/30 text-[#e6ad54]' 
                : 'bg-[#00c878]/15 border-[#00c878]/30 text-[#00c878]'
            }`}>
              {selectedRole === 'faculty' ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-[#e6ad54]" />
                  <span>Faculty & Admissions Council</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-3 h-3 text-[#00c878]" />
                  <span>Student & Candidate Portal</span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#f5f7f6] font-mono">
              {mode === 'otp_verify' 
                ? 'Verify Your Email OTP' 
                : mode === 'forgot_password'
                ? 'Reset Account Password'
                : mode === 'reset_password'
                ? 'Set New Secure Password'
                : mode === 'signup' 
                ? (selectedRole === 'faculty' ? 'Faculty Access Registration' : 'Student Candidate Registration')
                : (selectedRole === 'faculty' ? 'Faculty Admissions Sign In' : 'Student Candidate Sign In')}
            </h2>
            <p className="text-xs text-[#8a9690] leading-relaxed">
              {mode === 'otp_verify' 
                ? 'Enter the 6-digit verification code sent to your email to authenticate.' 
                : mode === 'forgot_password'
                ? 'Enter your registered email address to receive a 6-digit password recovery code.'
                : mode === 'reset_password'
                ? 'Enter the 6-digit verification code sent to your email and specify your new password.'
                : mode === 'signup' 
                ? (selectedRole === 'faculty' ? 'Institutional registration for instructors and admissions officers with permission code.' : 'Sign up to apply, track your live admission stages, and view circulars.')
                : (selectedRole === 'faculty' ? 'Log in with institutional credentials to review candidate applications.' : 'Log in to track your application, interview schedule, and enrolled courses.')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17] transition-colors border border-transparent hover:border-[#16241f]"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs (Signup vs Login) */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="px-6 pt-3 flex gap-2 border-b border-[#16241f]">
            <button
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`pb-3 px-4 text-xs font-mono font-bold transition-all relative ${
                mode === 'login' 
                  ? (selectedRole === 'faculty' ? 'text-[#e6ad54]' : 'text-[#00c878]') 
                  : 'text-[#8a9690] hover:text-[#f5f7f6]'
              }`}
            >
              Sign In / Log In
              {mode === 'login' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${selectedRole === 'faculty' ? 'bg-[#e6ad54]' : 'bg-[#00c878]'}`} />
              )}
            </button>

            <button
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`pb-3 px-4 text-xs font-mono font-bold transition-all relative ${
                mode === 'signup' 
                  ? (selectedRole === 'faculty' ? 'text-[#e6ad54]' : 'text-[#00c878]') 
                  : 'text-[#8a9690] hover:text-[#f5f7f6]'
              }`}
            >
              New User / Register
              {mode === 'signup' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${selectedRole === 'faculty' ? 'bg-[#e6ad54]' : 'bg-[#00c878]'}`} />
              )}
            </button>
          </div>
        )}

        {/* Role Selector: Student vs Faculty (User explicitly selects their portal on login/signup) */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="px-6 pt-4">
            <div className="text-[11px] font-mono text-[#8a9690] uppercase tracking-wider mb-2">
              Select Portal Type:
            </div>
            <div className="grid grid-cols-2 gap-2 bg-[#0b100e] p-1 rounded-2xl border border-[#16241f]">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  setErrorMessage(null);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedRole === 'student'
                    ? 'bg-[#00c878] text-[#050706] shadow-md'
                    : 'text-[#8a9690] hover:text-[#f5f7f6]'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Portal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('faculty');
                  setErrorMessage(null);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedRole === 'faculty'
                    ? 'bg-[#e6ad54] text-[#050706] shadow-md'
                    : 'text-[#8a9690] hover:text-[#e6ad54]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Faculty Portal</span>
              </button>
            </div>
          </div>
        )}

        {/* Status Alerts */}
        <div className="px-6 pt-3">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-[#00c878]/10 border border-[#00c878]/40 text-[#00c878] text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00c878]" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* MODES BODY */}
        <div className="p-6 sm:p-7 pt-4">
          
          {/* ================= MODE 1: SIGN UP ================= */}
          {mode === 'signup' && (
            <form onSubmit={handleSendSignupOtp} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  Full Name (letters & single space)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                    placeholder={selectedRole === 'faculty' ? 'e.g. Dr Meenakshi Sundaram' : 'e.g. Karthik Raja'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] outline-none transition-colors font-sans"
                  />
                </div>
                <p className="text-[10px] text-[#8a9690] mt-1 font-mono">
                  Only alphabets and single spaces between names are permitted.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  {selectedRole === 'faculty' ? 'Faculty Institutional Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'faculty' ? 'faculty.name@muthamizh.ac.in' : 'candidate@example.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Special Permission Key for Faculty */}
              {selectedRole === 'faculty' && (
                <div className="p-4 rounded-2xl bg-[#0e1613] border border-[#e6ad54]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-mono uppercase text-[#e6ad54] font-bold flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#e6ad54]" />
                      <span>Faculty Access Authorization Key</span>
                    </label>
                  </div>

                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#e6ad54] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={facultyAccessKey}
                      onChange={(e) => setFacultyAccessKey(e.target.value)}
                      placeholder="Enter Clearance Key "
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070b09] border border-[#e6ad54]/50 focus:border-[#e6ad54] text-sm text-[#e6ad54] font-mono outline-none transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8a9690]">
                    
                    {!facultyAccessKey && (
                      <button
                        type="button"
                        onClick={() => setFacultyAccessKey("Mavis@123")}
                        className="text-[#e6ad54] hover:underline cursor-pointer"
                      >
                       
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-[#8a9690] leading-relaxed">
                    Faculty clearance authorizes official candidate evaluation, interview bay allocation, and circular dispatch.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8a9690] mb-1">
                        Academic Department
                      </label>
                      <select
                        value={facultyDepartment}
                        onChange={(e) => setFacultyDepartment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#070b09] border border-[#16241f] text-xs text-[#f5f7f6] outline-none"
                      >
                        <option value="Admissions Council & Academic Affairs">Admissions Council</option>
                        <option value="Department of Visual Media & Cinematography">Visual Media & Cinematography</option>
                        <option value="School of Computing & AI Engineering">Computing & AI Engineering</option>
                        <option value="PCR Direction & Broadcast Playout">PCR Direction & Broadcast Playout</option>
                        <option value="Television Newsroom & Journalism">Newsroom & Journalism</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8a9690] mb-1">
                        Designation / Title
                      </label>
                      <input
                        type="text"
                        value={facultyDesignation}
                        onChange={(e) => setFacultyDesignation(e.target.value)}
                        placeholder="e.g. Senior Lecturer / Producer"
                        className="w-full px-3 py-2 rounded-xl bg-[#070b09] border border-[#16241f] text-xs text-[#f5f7f6] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a9690] hover:text-[#f5f7f6]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  Phone Number (10 digits numeric)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="9840000000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] outline-none transition-colors font-mono"
                  />
                </div>
                <p className="text-[10px] text-[#8a9690] mt-1 font-mono">
                  Enter 10 numeric digits only. Letters and special characters are restricted.
                </p>
              </div>

              {/* Program of Interest (for student only) */}
              {selectedRole === 'student' && (
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                    Primary Program of Interest
                  </label>
                  <select
                    value={programInterest}
                    onChange={(e) => setProgramInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-xs text-[#f5f7f6] outline-none transition-colors font-sans"
                  >
                    {COURSES_DATA.map((course) => (
                      <option key={course.id} value={course.title} className="bg-[#070b09] text-white">
                        {course.title} ({course.duration})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Regular Updates Subscription */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0b100e] border border-[#16241f]">
                <input
                  type="checkbox"
                  id="updates"
                  checked={updatesSubscribed}
                  onChange={(e) => setUpdatesSubscribed(e.target.checked)}
                  className="mt-0.5 rounded border-[#16241f] bg-[#070b09] text-[#00c878] focus:ring-[#00c878]"
                />
                <label htmlFor="updates" className="text-xs text-[#8a9690] leading-snug cursor-pointer">
                  Receive real-time notifications for admissions, evaluation results, and official broadcasts.
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50 ${
                  selectedRole === 'faculty'
                    ? 'bg-[#e6ad54] hover:bg-[#e6ad54]/90 text-[#050706] shadow-[0_4px_15px_rgba(230,173,84,0.3)]'
                    : 'bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] shadow-[0_4px_15px_rgba(0,200,120,0.3)]'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#050706]" />
                    <span>Processing Authorization...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#050706]" />
                    <span>Send Verification Code (Mail OTP)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-[#8a9690] hover:text-[#00c878] transition-colors font-mono"
                >
                  Already registered? <span className="underline">Sign In here</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= MODE 2: OTP VERIFICATION ================= */}
          {mode === 'otp_verify' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] text-center space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                  selectedRole === 'faculty' ? 'bg-[#e6ad54]/15 border border-[#e6ad54]/30 text-[#e6ad54]' : 'bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878]'
                }`}>
                  <Mail className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-xs text-[#8a9690]">
                  Enter the 6-digit verification code dispatched to:
                </div>
                <div className={`text-sm font-mono font-bold ${selectedRole === 'faculty' ? 'text-[#e6ad54]' : 'text-[#00c878]'}`}>
                  {email}
                </div>
                <div className="text-[10px] font-mono text-[#8a9690]">
                  Role: <span className="uppercase text-white font-bold">{selectedRole}</span>
                </div>
              </div>

              {/* Mail Dispatch Status Card */}
              <div className="p-3.5 rounded-2xl bg-[#121a17] border border-[#16241f] space-y-2.5 text-left">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f5f7f6]">
                    <span className="w-2 h-2 rounded-full bg-[#00c878] animate-ping" />
                    <span className="text-[#00c878] font-bold">
                      Official Code Dispatched
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8a9690]">Code valid 10m</span>
                </div>

                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  Verification code dispatched to <strong className="text-[#f5f7f6] font-mono">{email}</strong> from Muthamizh Academy Admissions (<span className="text-[#00c878] font-mono">{senderEmail || 'development.mavissatcom@gmail.com'}</span>). Please check your inbox or spam folder.
                </p>

                {mailPreviewUrl && (
                  <div className="pt-2 border-t border-[#16241f] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#8a9690]">Admissions Copy:</span>
                    <a
                      href={mailPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00c878] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>View Dispatched Notification</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-2 text-center">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className={`w-full py-3 text-center text-2xl tracking-[0.5em] font-mono font-bold rounded-xl bg-[#0b100e] border border-[#16241f] outline-none transition-colors ${
                    selectedRole === 'faculty' ? 'focus:border-[#e6ad54] text-[#e6ad54]' : 'focus:border-[#00c878] text-[#00c878]'
                  }`}
                />
              </div>

              {/* Submit Verification */}
              <button
                type="submit"
                disabled={loading || otpValue.length !== 6}
                className={`w-full py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50 ${
                  selectedRole === 'faculty'
                    ? 'bg-[#e6ad54] hover:bg-[#e6ad54]/90 text-[#050706] shadow-[0_4px_15px_rgba(230,173,84,0.3)]'
                    : 'bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] shadow-[0_4px_15px_rgba(0,200,120,0.3)]'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#050706]" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#050706]" />
                    <span>Verify & Enter {selectedRole === 'faculty' ? 'Faculty Desk' : 'Student Portal'}</span>
                  </>
                )}
              </button>

              {/* Resend and Back actions */}
              <div className="flex items-center justify-between text-xs font-mono text-[#8a9690] pt-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sessionStorage.removeItem('muthamizh_pending_signup');
                    } catch (e) {}
                    setMode('signup');
                  }}
                  className="hover:text-[#f5f7f6] underline cursor-pointer"
                >
                  Edit Information
                </button>

                <button
                  type="button"
                  disabled={resendCooldown > 0}
                  onClick={handleSendSignupOtp}
                  className={`hover:text-[#00c878] ${resendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : 'underline'}`}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                </button>
              </div>

            </form>
          )}

          {/* ================= MODE 3: LOG IN ================= */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  {selectedRole === 'faculty' ? 'Faculty Institutional Email' : 'Student Registered Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'faculty' ? 'dean.admissions@muthamizh.ac.in' : 'student@muthamizh.ac.in'}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] text-sm text-[#f5f7f6] outline-none transition-colors ${
                      selectedRole === 'faculty' ? 'focus:border-[#e6ad54]' : 'focus:border-[#00c878]'
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#8a9690]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot_password');
                      setResetEmail(email || '');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[11px] font-mono text-[#00c878] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] text-sm text-[#f5f7f6] outline-none transition-colors ${
                      selectedRole === 'faculty' ? 'focus:border-[#e6ad54]' : 'focus:border-[#00c878]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a9690] hover:text-[#f5f7f6]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50 ${
                  selectedRole === 'faculty'
                    ? 'bg-[#e6ad54] hover:bg-[#e6ad54]/90 text-[#050706] shadow-[0_4px_15px_rgba(230,173,84,0.3)]'
                    : 'bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] shadow-[0_4px_15px_rgba(0,200,120,0.3)]'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#050706]" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    {selectedRole === 'faculty' ? <ShieldCheck className="w-4 h-4 text-[#050706]" /> : <GraduationCap className="w-4 h-4 text-[#050706]" />}
                    <span>{selectedRole === 'faculty' ? 'Log In to Faculty Desk' : 'Log In to Student Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-xs text-[#8a9690] hover:text-[#00c878] transition-colors font-mono"
                >
                  New to Muthamizh Academy? <span className="underline">Register an account</span>
                </button>
              </div>

            </form>
          )}

          {/* ================= MODE 4: FORGOT PASSWORD ================= */}
          {mode === 'forgot_password' && (
            <form onSubmit={handleSendForgotPassword} className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] text-left space-y-1.5">
                <div className="text-xs font-mono font-bold text-[#f5f7f6] flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#00c878]" />
                  <span>Account Password Recovery</span>
                </div>
                <p className="text-xs text-[#8a9690] leading-relaxed">
                  Enter your registered institutional or student email address. We will verify your account and dispatch a 6-digit recovery OTP code.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="e.g. dean.admissions@muthamizh.ac.in or student@muthamizh.ac.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50 bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] shadow-[0_4px_15px_rgba(0,200,120,0.3)]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#050706]" />
                    <span>Sending Recovery Code...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#050706]" />
                    <span>Send Password Reset Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-xs text-[#8a9690] hover:text-[#00c878] transition-colors font-mono"
                >
                  ← Remember your password? <span className="underline">Back to Sign In</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= MODE 5: RESET PASSWORD ================= */}
          {mode === 'reset_password' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] text-center space-y-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878]">
                  <KeyRound className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-xs text-[#8a9690]">
                  Enter the 6-digit recovery code dispatched to:
                </div>
                <div className="text-sm font-mono font-bold text-[#00c878]">
                  {resetEmail}
                </div>
              </div>

              {/* Mail Dispatch Notification */}
              <div className="p-3.5 rounded-2xl bg-[#121a17] border border-[#16241f] space-y-2 text-left">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f5f7f6]">
                    <span className="w-2 h-2 rounded-full bg-[#00c878] animate-ping" />
                    <span className="text-[#00c878] font-bold">
                      Recovery Code Dispatched
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8a9690]">Valid for 10m</span>
                </div>
              </div>

              {/* 6-Digit Code */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] font-mono tracking-widest outline-none transition-colors"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  New Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a new strong password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a9690] hover:text-[#f5f7f6]"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8a9690] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-type your new password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b100e] border border-[#16241f] focus:border-[#00c878] text-sm text-[#f5f7f6] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50 bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] shadow-[0_4px_15px_rgba(0,200,120,0.3)]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#050706]" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#050706]" />
                    <span>Save New Password & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-xs text-[#8a9690] hover:text-[#00c878] transition-colors font-mono"
                >
                  ← Cancel and return to <span className="underline">Sign In</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer with Guest Option */}
        <div className="p-4 px-6 bg-[#050706] border-t border-[#16241f] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8a9690]">
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00c878]" />
            Mail OTP & Scrypt Encryption Standard
          </span>

          <button
            type="button"
            onClick={onClose}
            className="text-[#8a9690] hover:text-[#f5f7f6] underline hover:no-underline transition-colors"
          >
            Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
};
