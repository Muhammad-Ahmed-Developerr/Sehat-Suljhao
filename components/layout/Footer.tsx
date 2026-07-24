import React from 'react';
import { Activity, ShieldCheck, Heart, Sparkles, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ActivePage } from './Navbar';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-[#050D17] border-t border-[rgba(91,231,255,0.12)] pt-12 pb-8 text-[#9FB3C8] text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white font-sans">
                Sehat <span className="text-[#00D4FF]">Suljhao</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Upload your medical reports. Understand your health metrics. Talk with your AI Doctor Assistant Dr. Mona. Powered by Groq Llama-3.3 acceleration.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="cyan" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                Privacy Encrypted
              </Badge>
              <Badge variant="purple" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                Groq Architecture
              </Badge>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h5 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Quick Features
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('upload')} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
                  Upload Medical Report
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
                  AI Report Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('chat')} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
                  Talk to Dr. Mona AI
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('history')} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
                  Report History & Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h5 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Patient Center
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('profile')} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
                  My Health Profile
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('settings')} className="hover:text-[#00D4FF] transition-colors cursor-pointer">
                  Settings & Accessibility
                </button>
              </li>
              <li>
                <a href="#faq" onClick={() => setActivePage('landing')} className="hover:text-[#00D4FF] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Medical Disclaimer Box */}
          <div className="bg-[#0E1C2F] p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[#FFC107] font-semibold text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Important Medical Disclaimer</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#9FB3C8]">
              Sehat Suljhao is an educational healthcare intelligence platform powered by AI. It provides medical report analysis for informational purposes only and does not replace professional medical diagnosis, advice, or treatment from a licensed physician.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9FB3C8]">
          <p>© {new Date().getFullYear()} Sehat Suljhao Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF4D4F] fill-current" />
            <span>for global healthcare accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
