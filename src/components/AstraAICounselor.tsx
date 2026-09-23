import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, RegistrationRecord } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  Bot, Send, X, Sparkles, 
  UserCheck, ShieldCheck, RefreshCw, MessageSquare, 
  GraduationCap, Film, Zap, Radio, ChevronRight, HelpCircle,
  Compass, Scale, Activity, ArrowRight, CheckCircle2,
  Globe, Laptop, Wrench
} from 'lucide-react';

interface AstraAICounselorProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseInterest?: string | null;
  onNewRegistrationSuccess?: (record: RegistrationRecord) => void;
  onOpenApplyModal?: () => void;
}

export const AstraAICounselor: React.FC<AstraAICounselorProps> = ({
  isOpen,
  onClose,
  initialCourseInterest,
  onNewRegistrationSuccess,
  onOpenApplyModal
}) => {
  const [activeMode, setActiveMode] = useState<'chat' | 'matcher' | 'compare'>('chat');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'astra',
      text: `Vanakkam & Welcome! I am Astra, official AI Concierge for Muthamizh Academy (Partnered with Mavis Satcom Ltd / Jaya TV Network). 🎬\n\nI can analyze your creative & technical profile, guide you through our 11 programs (including 100% Online & Virtual Labs), simulate industry career paths, compare syllabi, or complete your 2026 admission registration instantly.`,
      timestamp: new Date()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationTip, setShowNotificationTip] = useState(true);
  const [lastCompletedRegistration, setLastCompletedRegistration] = useState<RegistrationRecord | null>(null);

  // Matcher state
  const [matcherInterests, setMatcherInterests] = useState<string[]>([]);
  const [matcherResult, setMatcherResult] = useState<string | null>(null);

  // Compare state
  const [compareCourseA, setCompareCourseA] = useState(COURSES_DATA[0]?.id || 'ai-agentic-software-engineering');
  const [compareCourseB, setCompareCourseB] = useState(COURSES_DATA[1]?.id || 'enterprise-it-support-network-engineering');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && activeMode === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, activeMode]);

  // Handle initial course prompt if passed
  useEffect(() => {
    if (initialCourseInterest && isOpen) {
      const promptText = `I am interested in learning more and registering for ${initialCourseInterest}. What are the syllabus chapters, fees, online/practical options, and admission steps?`;
      handleSendMessage(promptText);
    }
  }, [initialCourseInterest, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    try {
      // Build history payload for Gemini backend
      const historyPayload = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: historyPayload,
          message: textToSend
        })
      });

      const data = await res.json();
      const rawReply = data.reply || 'Thank you for your response. Astra is ready for your next question!';

      let extractedRecord: RegistrationRecord | undefined = undefined;
      const xmlMatch = rawReply.match(/<registration_data>([\s\S]*?)<\/registration_data>/);

      if (xmlMatch && xmlMatch[1]) {
        try {
          const parsedJson = JSON.parse(xmlMatch[1].trim());
          const regRes = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsedJson)
          });
          const regData = await regRes.json();
          if (regData.success && regData.record) {
            extractedRecord = regData.record;
            setLastCompletedRegistration(extractedRecord);
            if (onNewRegistrationSuccess) {
              onNewRegistrationSuccess(extractedRecord);
            }
          }
        } catch (err) {
          console.error('Failed to parse registration_data XML JSON:', err);
        }
      }

      const astraMsg: ChatMessage = {
        id: `astra-${Date.now()}`,
        sender: 'astra',
        text: rawReply,
        timestamp: new Date(),
        registrationExtracted: extractedRecord
      };

      setMessages(prev => [...prev, astraMsg]);
    } catch (err) {
      console.error('Astra chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `astra-err-${Date.now()}`,
        sender: 'astra',
        text: `Thank you! Muthamizh Academy offers 11 cutting-edge programs in AI Software Engineering, IT Networking, Broadcast Cinematography, and Studio Operations. May I have your full name and contact phone number to complete your admission registration?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const runCourseMatcher = () => {
    let rec = 'AI-Assisted Software Development & Agentic Engineering';
    if (matcherInterests.includes('AI & Agentic Software Development')) {
      rec = 'AI-Assisted Software Development & Agentic Engineering';
    } else if (matcherInterests.includes('Enterprise IT & Cisco Networking')) {
      rec = 'Enterprise IT Support, Cloud Infrastructure & Network Engineering';
    } else if (matcherInterests.includes('Media Law, Ethics & Copyright')) {
      rec = 'Media Law, Journalism Ethics & Digital Media Regulations';
    } else if (matcherInterests.includes('Camera Physics & Lenses')) {
      rec = 'Professional Broadcast Cinematography & Camera Operations';
    } else if (matcherInterests.includes('Live News & Anchoring')) {
      rec = 'Television News Reading, Anchoring & Digital Journalism';
    } else if (matcherInterests.includes('Sound & Video Editing')) {
      rec = 'Broadcast Non-Linear Video Editing & Motion Graphics Suite';
    } else if (matcherInterests.includes('Live PCR Vision Mixing & Directing')) {
      rec = 'Production Control Room (PCR) Direction & Live Vision Mixing';
    } else if (matcherInterests.includes('Satellite & OTT Transmission')) {
      rec = 'Satellite Transmission, RF Engineering & OTT Broadcast Systems';
    }
    setMatcherResult(rec);
  };

  // FLOATING LAUNCHER BUTTON (CLOSED STATE)
  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5">
        {/* Floating Notification Tip */}
        {showNotificationTip && (
          <div className="relative group bg-[#0b100e]/95 backdrop-blur-2xl border border-[#00c878]/40 text-[#f5f7f6] text-xs py-2.5 px-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-[280px] animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00c878] animate-ping shrink-0" />
            <div className="flex-1 text-[11px] font-sans leading-tight">
              <span className="text-[#e6ad54] font-bold block font-mono">ASTRA AI CONCIERGE</span>
              Explore 11 courses, online virtual labs & admissions!
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationTip(false);
              }}
              className="text-[#8a9690] hover:text-[#f5f7f6] transition-colors p-0.5"
              title="Dismiss tip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0b100e] border-r border-b border-[#00c878]/40 rotate-45" />
          </div>
        )}

        {/* Floating Trigger Pill */}
        <button
          onClick={onClose}
          className="relative group bg-[#0b100e] hover:bg-[#121a17] text-white p-2.5 pr-5 rounded-full border border-[#00c878]/50 shadow-[0_10px_35px_rgba(0,200,120,0.35)] hover:shadow-[0_15px_45px_rgba(0,200,120,0.55)] hover:border-[#e6ad54] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
          title="Open Astra AI Counselor"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#00c878] via-[#006b45] to-[#e6ad54] p-[1.5px] shrink-0">
            <div className="w-full h-full rounded-full bg-[#050706] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00c878] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c878] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00c878] border-2 border-[#050706]" />
            </span>
          </div>

          <div className="text-left font-mono">
            <div className="text-xs font-black tracking-wider text-[#00c878] flex items-center gap-1.5">
              <span>ASTRA AI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00c878]/20 text-[#e6ad54] font-bold">2026</span>
            </div>
            <div className="text-[10px] text-[#8a9690] font-sans font-medium">
              Concierge & Admissions
            </div>
          </div>
        </button>
      </div>
    );
  }

  const selectedCourseAObj = COURSES_DATA.find(c => c.id === compareCourseA) || COURSES_DATA[0];
  const selectedCourseBObj = COURSES_DATA.find(c => c.id === compareCourseB) || COURSES_DATA[1];

  // ACTIVE EXPANDED MODAL
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[460px] h-[640px] max-h-[85vh] bg-[#0b100e] border border-[#16241f] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,200,120,0.2)] flex flex-col overflow-hidden font-sans backdrop-blur-2xl animate-in zoom-in-95 duration-200">
      
      {/* Concierge Header */}
      <div className="bg-[#050706] p-4 border-b border-[#16241f] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#00c878] to-[#e6ad54] p-[1.5px]">
            <div className="w-full h-full rounded-full bg-[#0b100e] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00c878]" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00c878] ring-2 ring-[#0b100e]" />
          </div>

          <div>
            <div className="font-bold text-sm text-[#f5f7f6] flex items-center gap-1.5">
              <span>Astra AI Concierge</span>
              <span className="text-[10px] bg-[#00c878]/15 text-[#00c878] px-1.5 py-0.5 rounded font-mono font-bold">ONLINE</span>
            </div>
            <p className="text-[10px] text-[#8a9690] font-mono">
              Muthamizh Academy • Jaya TV Partner
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 text-[#8a9690]">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#050706] border border-[#16241f] hover:bg-[#121a17] text-[#8a9690] hover:text-[#f5f7f6] transition-colors"
            title="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-3 bg-[#050706] border-b border-[#16241f] p-1 text-xs font-mono">
        <button
          onClick={() => setActiveMode('chat')}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 font-bold ${
            activeMode === 'chat'
              ? 'bg-[#121a17] text-[#00c878] shadow border border-[#00c878]/40'
              : 'text-[#8a9690] hover:text-[#f5f7f6]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setActiveMode('matcher')}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 font-bold ${
            activeMode === 'matcher'
              ? 'bg-[#121a17] text-[#e6ad54] shadow border border-[#e6ad54]/40'
              : 'text-[#8a9690] hover:text-[#f5f7f6]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Matcher</span>
        </button>

        <button
          onClick={() => setActiveMode('compare')}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 font-bold ${
            activeMode === 'compare'
              ? 'bg-[#121a17] text-[#00c878] shadow border border-[#00c878]/40'
              : 'text-[#8a9690] hover:text-[#f5f7f6]'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Compare</span>
        </button>
      </div>

      {/* MODE 1: CHAT INTERFACE */}
      {activeMode === 'chat' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Active Admission Progress Banner */}
          {lastCompletedRegistration && (
            <div className="bg-[#00c878]/10 border-b border-[#00c878]/30 px-3 py-2 text-xs flex items-center justify-between text-[#00c878]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00c878]" />
                <span className="font-mono font-bold">Admission ID: {lastCompletedRegistration.id}</span>
              </div>
              <button
                onClick={onOpenApplyModal}
                className="text-[10px] bg-[#00c878] text-[#050706] font-mono font-bold px-2 py-0.5 rounded shadow hover:scale-105 transition-transform"
              >
                View Details
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const displayText = msg.text.replace(/<registration_data>[\s\S]*?<\/registration_data>/g, '');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed shadow-lg ${
                      isUser
                        ? 'bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-medium rounded-tr-xs'
                        : 'bg-[#121a17] border border-[#16241f] text-[#f5f7f6] rounded-tl-xs'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-[#16241f] text-[10px] font-mono font-bold text-[#e6ad54] uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-[#e6ad54]" />
                        <span>Astra AI Concierge</span>
                      </div>
                    )}

                    <div className="whitespace-pre-line text-xs font-normal leading-relaxed">
                      {displayText}
                    </div>

                    {msg.registrationExtracted && (
                      <div className="mt-3 p-3 rounded-xl bg-[#050706] border border-[#00c878]/40 text-[#00c878] space-y-1.5 shadow">
                        <div className="flex items-center gap-2 font-bold text-xs font-mono">
                          <UserCheck className="w-4 h-4" />
                          <span>Admission Registration Confirmed</span>
                        </div>
                        <div className="text-[11px] space-y-1 text-[#8a9690] font-sans">
                          <div>Applicant: <strong className="text-[#f5f7f6]">{msg.registrationExtracted.full_name}</strong></div>
                          <div>Program: <strong className="text-[#e6ad54]">{msg.registrationExtracted.program_interest}</strong></div>
                          <div>Contact: <span className="text-[#00c878]">{msg.registrationExtracted.phone}</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-[#8a9690] mt-1 px-1 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2.5 text-[#8a9690] text-xs p-2">
                <Bot className="w-4 h-4 text-[#e6ad54] animate-spin" />
                <span className="text-[#00c878] font-mono text-[11px]">Astra formulating response...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#050706] border-t border-[#16241f] overflow-x-auto flex gap-1.5">
            <button
              onClick={() => handleSendMessage('Tell me about the AI-Assisted Software Development & Agentic Engineering online course.')}
              className="text-[10px] whitespace-nowrap bg-[#0b100e] hover:bg-[#121a17] text-sky-400 px-3 py-1.5 rounded-xl border border-sky-900/40 font-mono transition-all flex items-center gap-1 shrink-0"
            >
              <Globe className="w-3 h-3 text-sky-400" />
              <span>AI Software Dev (Online)</span>
            </button>

            <button
              onClick={() => handleSendMessage('Tell me about the Enterprise IT Support & Cisco Networking course.')}
              className="text-[10px] whitespace-nowrap bg-[#0b100e] hover:bg-[#121a17] text-[#00c878] px-3 py-1.5 rounded-xl border border-[#16241f] font-mono transition-all flex items-center gap-1 shrink-0"
            >
              <Laptop className="w-3 h-3 text-[#00c878]" />
              <span>IT & Networking Labs</span>
            </button>

            <button
              onClick={() => handleSendMessage('Tell me about Jaya TV live floor camera and PCR training.')}
              className="text-[10px] whitespace-nowrap bg-[#0b100e] hover:bg-[#121a17] text-[#e6ad54] px-3 py-1.5 rounded-xl border border-[#16241f] font-mono transition-all flex items-center gap-1 shrink-0"
            >
              <Radio className="w-3 h-3 text-[#e6ad54]" />
              <span>Jaya TV Studio Floor</span>
            </button>

            <button
              onClick={() => handleSendMessage('I want to register for 2026 admissions now.')}
              className="text-[10px] whitespace-nowrap bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] px-3 py-1.5 rounded-xl font-mono font-bold transition-all flex items-center gap-1 shrink-0"
            >
              <GraduationCap className="w-3 h-3 text-[#050706]" />
              <span>Instant Register</span>
            </button>
          </div>

          {/* Form Input Container */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0b100e] border-t border-[#16241f] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Astra or apply for admissions..."
              className="flex-1 bg-[#050706] text-[#f5f7f6] text-xs px-4 py-2.5 rounded-2xl border border-[#16241f] focus:outline-none focus:border-[#00c878] placeholder:text-[#8a9690]"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-2xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-bold disabled:opacity-40 transition-all shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* MODE 2: SKILL MATCHER */}
      {activeMode === 'matcher' && (
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#e6ad54] uppercase tracking-wider block">
              AI COURSE MATCHER
            </span>
            <h3 className="text-base font-extrabold text-[#f5f7f6] mt-1">
              Find Your Ideal Production or Tech Program
            </h3>
            <p className="text-[#8a9690] text-xs mt-1">
              Select your primary creative and technical interests to get a tailored course recommendation.
            </p>
          </div>

          {/* Interests Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#8a9690]">Select Your Interests:</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                'AI & Agentic Software Development',
                'Enterprise IT & Cisco Networking',
                'Media Law, Ethics & Copyright',
                'Camera Physics & Lenses',
                'Live News & Anchoring',
                'Sound & Video Editing',
                'Live PCR Vision Mixing & Directing',
                'Satellite & OTT Transmission'
              ].map((interest) => {
                const isSelected = matcherInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => {
                      if (isSelected) {
                        setMatcherInterests(matcherInterests.filter(i => i !== interest));
                      } else {
                        setMatcherInterests([...matcherInterests, interest]);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all font-sans font-medium text-[11px] ${
                      isSelected
                        ? 'bg-[#00c878]/20 border-[#00c878] text-[#00c878]'
                        : 'bg-[#121a17] border-[#16241f] text-[#8a9690] hover:text-[#f5f7f6]'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={runCourseMatcher}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-mono font-bold text-xs shadow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Generate Course Recommendation</span>
          </button>

          {matcherResult && (
            <div className="p-4 rounded-2xl bg-[#121a17] border border-[#00c878]/50 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-[#00c878] font-mono font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Recommended Match:</span>
              </div>
              <h4 className="text-sm font-bold text-[#f5f7f6]">
                {matcherResult}
              </h4>
              <button
                onClick={() => {
                  setActiveMode('chat');
                  handleSendMessage(`I used the AI Matcher and matched with ${matcherResult}. Can you guide me through the syllabus and admission registration?`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#050706] hover:bg-[#00c878]/20 text-[#00c878] border border-[#00c878]/40 font-mono font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Ask Astra About This Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: COMPARE PROGRAMS */}
      {activeMode === 'compare' && (
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#00c878] uppercase tracking-wider block">
              SIDE-BY-SIDE PROGRAM COMPARISON
            </span>
            <h3 className="text-base font-extrabold text-[#f5f7f6] mt-1">
              Compare Curricula & Delivery Models
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#8a9690]">Program A:</span>
              <select
                value={compareCourseA}
                onChange={(e) => setCompareCourseA(e.target.value)}
                className="w-full bg-[#121a17] text-[#f5f7f6] p-2.5 rounded-xl border border-[#16241f] focus:outline-none text-[11px]"
              >
                {COURSES_DATA.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#8a9690]">Program B:</span>
              <select
                value={compareCourseB}
                onChange={(e) => setCompareCourseB(e.target.value)}
                className="w-full bg-[#121a17] text-[#f5f7f6] p-2.5 rounded-xl border border-[#16241f] focus:outline-none text-[11px]"
              >
                {COURSES_DATA.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121a17] border border-[#16241f] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#16241f]">
              <span className="font-mono text-[#8a9690]">Duration</span>
              <span className="text-[#f5f7f6] font-bold">{selectedCourseAObj.duration} vs {selectedCourseBObj.duration}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#16241f]">
              <span className="font-mono text-[#8a9690]">Delivery Mode</span>
              <span className="text-[#00c878] font-bold">{selectedCourseAObj.isOnline ? 'Online Labs' : 'Studio Floor'} vs {selectedCourseBObj.isOnline ? 'Online Labs' : 'Studio Floor'}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#16241f]">
              <span className="font-mono text-[#8a9690]">Tuition Fee</span>
              <span className="text-[#e6ad54] font-bold">{selectedCourseAObj.fee} vs {selectedCourseBObj.fee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#8a9690]">Syllabus Modules</span>
              <span className="text-[#f5f7f6] font-bold">5 Chapters Each</span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveMode('chat');
              handleSendMessage(`Can you do an in-depth breakdown comparing "${selectedCourseAObj.title}" vs "${selectedCourseBObj.title}"?`);
            }}
            className="w-full py-3 rounded-xl bg-[#00c878] text-[#050706] font-mono font-bold text-xs shadow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4 text-[#050706]" />
            <span>Ask Astra for In-Depth Analysis</span>
          </button>
        </div>
      )}

    </div>
  );
};
