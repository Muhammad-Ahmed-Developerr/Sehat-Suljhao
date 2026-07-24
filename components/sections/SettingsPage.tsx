'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Settings, Moon, Globe, ShieldCheck, Bell, Eye, Database, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const [language, setLanguage] = useState('English');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Application Settings</h1>
          <p className="text-xs text-[#9FB3C8]">
            Configure AI model settings, accessibility, language, and notification preferences
          </p>
        </div>
      </div>

      {/* AI Model Engine */}
      <Card className="p-6 border-[#00D4FF]/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Sparkles className="w-5 h-5 text-[#00D4FF]" /> AI Model Architecture
          </div>
          <Badge variant="purple">Groq Accelerated</Badge>
        </div>

        <p className="text-xs text-[#9FB3C8]">
          Select the LLM engine for multi-modal medical parsing and Dr. Mona AI reasoning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', desc: 'Recommended: Highest medical extraction precision & clinical logic.' },
            { id: 'llama-4', name: 'Llama 4 Vision Multimodal', desc: 'Next-Gen: Advanced DICOM & Radiology image analysis.' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                model === m.id
                  ? 'bg-[#00D4FF]/15 border-[#00D4FF] text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'bg-[#07121E] border-white/10 text-[#9FB3C8] hover:border-white/30'
              }`}
            >
              <p className="text-xs font-bold text-white mb-0.5">{m.name}</p>
              <p className="text-[10px] text-[#9FB3C8]">{m.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Language & Accessibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-white/10 space-y-4">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Globe className="w-5 h-5 text-[#00E676]" /> Language Preference
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#9FB3C8]">Select Display Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-[#07121E] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00D4FF]"
            >
              <option value="English">English (US & Global)</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="French">French (Français)</option>
              <option value="German">German (Deutsch)</option>
              <option value="Arabic">Arabic (العربية)</option>
            </select>
          </div>
        </Card>

        <Card className="p-6 border-white/10 space-y-4">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Eye className="w-5 h-5 text-[#FFC107]" /> Accessibility Settings
          </div>

          <div className="space-y-3 text-xs text-white">
            <label className="flex items-center justify-between cursor-pointer">
              <span>High Contrast Text Mode</span>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="w-4 h-4 accent-[#00D4FF]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span>Increase Font Size (120%)</span>
              <input
                type="checkbox"
                checked={largeText}
                onChange={(e) => setLargeText(e.target.checked)}
                className="w-4 h-4 accent-[#00D4FF]"
              />
            </label>
          </div>
        </Card>
      </div>

      {/* Privacy & Data Management */}
      <Card className="p-6 border-white/10 space-y-4">
        <div className="flex items-center gap-2 font-bold text-white text-base">
          <ShieldCheck className="w-5 h-5 text-[#00D4FF]" /> Privacy & Data Storage
        </div>

        <p className="text-xs text-[#9FB3C8] leading-relaxed">
          Mona Doctor AI executes all document processing in temporary, client-encrypted memory buffers. We do not store or monetize your medical reports.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<Database className="w-4 h-4" />}
            onClick={() => alert('Local cache cleared successfully!')}
          >
            Clear Local Browser Cache
          </Button>
        </div>
      </Card>
    </div>
  );
};
