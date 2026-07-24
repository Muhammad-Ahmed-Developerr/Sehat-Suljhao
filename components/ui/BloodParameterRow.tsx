'use client';

import React, { useState } from 'react';
import { BloodParameter } from '@/types/medical';
import { Badge, statusToBadgeVariant } from './Badge';
import { ChevronDown, ChevronUp, Info, CircleHelp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BloodParameterRowProps {
  param: BloodParameter;
}

export const BloodParameterRow: React.FC<BloodParameterRowProps> = ({ param }) => {
  const [expanded, setExpanded] = useState(false);

  // Calculate percentage along scale
  const min = param.normalRange.min * 0.5;
  const max = param.normalRange.max * 1.5;
  const totalRange = max - min;
  const valPos = Math.min(Math.max(((param.value - min) / totalRange) * 100, 5), 95);
  const normalMinPos = Math.min(Math.max(((param.normalRange.min - min) / totalRange) * 100, 10), 85);
  const normalMaxPos = Math.min(Math.max(((param.normalRange.max - min) / totalRange) * 100, normalMinPos + 10), 90);

  return (
    <div className="border border-white/10 rounded-xl bg-[#0E1C2F]/80 p-4 transition-all hover:border-[#00D4FF]/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title & Category */}
        <div className="flex items-start gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h5 className="font-semibold text-white text-base">{param.name}</h5>
              <Badge variant={statusToBadgeVariant(param.status)}>
                {param.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-[#9FB3C8] mt-0.5">{param.category} Panel</p>
          </div>
        </div>

        {/* Value Spectrum Visualization */}
        <div className="flex-1 max-w-xs mx-auto w-full px-2">
          <div className="flex items-center justify-between text-[10px] text-[#9FB3C8] mb-1">
            <span>{param.normalRange.min} {param.unit}</span>
            <span className="font-bold text-white text-sm">
              {param.value} <span className="text-xs font-normal text-[#9FB3C8]">{param.unit}</span>
            </span>
            <span>{param.normalRange.max} {param.unit}</span>
          </div>

          <div className="relative h-2 w-full bg-white/10 rounded-full">
            {/* Normal Range Box */}
            <div
              className="absolute top-0 bottom-0 bg-[#00E676]/25 border-x border-[#00E676]/50"
              style={{ left: `${normalMinPos}%`, width: `${normalMaxPos - normalMinPos}%` }}
            />
            {/* Current Value Marker Pin */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]"
              style={{ left: `${valPos}%` }}
            />
          </div>
        </div>

        {/* Action Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-[#00D4FF] hover:text-[#5BE7FF] font-medium transition-colors cursor-pointer self-end sm:self-center"
        >
          <span>{expanded ? 'Hide AI Details' : 'AI Explanation'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Explanation Area */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5 text-[#00D4FF] font-semibold mb-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>AI Explanation</span>
                </div>
                <p className="text-[#9FB3C8] leading-relaxed">{param.explanation}</p>
              </div>

              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5 text-[#00E676] font-semibold mb-1">
                  <CircleHelp className="w-3.5 h-3.5" />
                  <span>Biological Importance</span>
                </div>
                <p className="text-[#9FB3C8] leading-relaxed">{param.importance}</p>
              </div>

              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5 text-[#FFC107] font-semibold mb-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Health Impact</span>
                </div>
                <p className="text-[#9FB3C8] leading-relaxed">{param.healthImpact}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
