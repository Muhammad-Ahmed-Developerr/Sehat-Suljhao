'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Brain, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { simulateGroqReportAnalysis } from '@/lib/groqArchitecture';
import { ActivePage } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';

interface AILoadingPageProps {
  setActivePage: (page: ActivePage) => void;
  fileInfo?: { name: string; type: string; size: string } | null;
}

export const AILoadingPage: React.FC<AILoadingPageProps> = ({
  setActivePage,
  fileInfo
}) => {
  const [currentStep, setCurrentStep] = useState('Initializing Multi-Modal AI Document Reader...');
  const [progress, setProgress] = useState(10);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function runAnalysis() {
      // Create dummy file if not provided
      const dummyFile = new File(['mock content'], fileInfo?.name || 'Medical_Report.pdf');

      await simulateGroqReportAnalysis(dummyFile, (step, pct) => {
        if (isMounted) {
          setCurrentStep(step);
          setProgress(pct);
        }
      });

      if (isMounted) {
        setCompleted(true);
        // Auto-navigate after brief pause
        setTimeout(() => {
          setActivePage('dashboard');
        }, 1200);
      }
    }

    runAnalysis();

    return () => {
      isMounted = false;
    };
  }, [fileInfo, setActivePage]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-xl mx-auto px-4 text-center space-y-8">
      {/* Animated Brain Scanning Ring */}
      <div className="relative flex items-center justify-center">
        {/* Glowing pulsing background ring */}
        <div className="absolute w-44 h-44 rounded-full bg-[#00D4FF]/20 animate-pulse-glow" />
        <div className="absolute w-56 h-56 rounded-full border border-[#00D4FF]/30 animate-spin" style={{ animationDuration: '10s' }} />

        <div className="relative w-32 h-32 rounded-3xl bg-[#0E1C2F] border-2 border-[#00D4FF] flex items-center justify-center shadow-[0_0_50px_rgba(0,212,255,0.4)] overflow-hidden">
          {/* Scanline effect */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent animate-scanline" />
          <Brain className="w-16 h-16 text-[#00D4FF] animate-pulse" />
        </div>
      </div>

      {/* Text Status */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1C2F] border border-[#00D4FF]/30 text-xs text-[#00D4FF] font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq Llama-3.3 70B Medical Model</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {completed ? 'AI Report Analysis Complete!' : 'Analyzing Medical Report...'}
        </h2>

        <p className="text-sm font-medium text-[#00D4FF] h-6 animate-pulse">
          {currentStep}
        </p>

        <p className="text-xs text-[#9FB3C8]">
          File: <span className="text-white font-semibold">{fileInfo?.name || 'Comprehensive_Panel_July2026.pdf'}</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#9FB3C8]">
          <span>Scanning Parameters</span>
          <span className="font-bold text-[#00D4FF]">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0088FF] to-[#00E676] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Manual Skip Button if user wants instant view */}
      <div className="pt-4">
        <Button
          variant="glass"
          size="sm"
          icon={<CheckCircle2 className="w-4 h-4 text-[#00E676]" />}
          onClick={() => setActivePage('dashboard')}
        >
          Skip Waiting & Open Dashboard
        </Button>
      </div>
    </div>
  );
};
