'use client';

import React from 'react';
import { DetectedDisease } from '@/types/medical';
import { Badge, statusToBadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Utensils,
  BookOpen,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiseaseDetailModalProps {
  disease: DetectedDisease | null;
  onClose: () => void;
  onConsultDrMona?: (diseaseName: string) => void;
}

export const DiseaseDetailModal: React.FC<DiseaseDetailModalProps> = ({
  disease,
  onClose,
  onConsultDrMona
}) => {
  if (!disease) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl my-8 bg-[#0E1C2F] border border-[#00D4FF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,212,255,0.2)] max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-[#9FB3C8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 pr-10 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center shrink-0">
              <Activity className="w-7 h-7 text-[#00D4FF]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant={statusToBadgeVariant(disease.severity)}>
                  {disease.severity} Severity
                </Badge>
                <Badge variant="purple">
                  {disease.confidence}% AI Confidence
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{disease.name}</h2>
            </div>
          </div>

          {/* Overview Description */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-6">
            <p className="text-sm text-[#9FB3C8] leading-relaxed">{disease.description}</p>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Detected Symptoms */}
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                <AlertCircle className="w-4 h-4 text-[#FFC107]" />
                Common Symptoms
              </h4>
              <ul className="space-y-1.5 text-xs text-[#9FB3C8]">
                {disease.symptoms.map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] mt-1 shrink-0" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Root Causes */}
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                <Zap className="w-4 h-4 text-[#00D4FF]" />
                Possible Causes & Triggers
              </h4>
              <ul className="space-y-1.5 text-xs text-[#9FB3C8]">
                {disease.causes.concat(disease.lifestyleCauses).map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-1 shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Foods to Eat vs Foods to Avoid */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 mb-6">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <Utensils className="w-4 h-4 text-[#00E676]" />
              Nutritional Guidance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[rgba(0,230,118,0.08)] p-3.5 rounded-xl border border-[rgba(0,230,118,0.2)]">
                <h5 className="font-bold text-[#00E676] mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Recommended Foods
                </h5>
                <ul className="space-y-1 text-[#9FB3C8]">
                  {disease.foodsToEat.map((food, i) => (
                    <li key={i}>• {food}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[rgba(255,77,79,0.08)] p-3.5 rounded-xl border border-[rgba(255,77,79,0.2)]">
                <h5 className="font-bold text-[#FF4D4F] mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Foods to Limit / Avoid
                </h5>
                <ul className="space-y-1 text-[#9FB3C8]">
                  {disease.foodsToAvoid.map((food, i) => (
                    <li key={i}>• {food}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* When to Visit Doctor & Red Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#07121E] p-4 rounded-2xl border border-[#00D4FF]/30">
              <h5 className="flex items-center gap-2 text-xs font-bold text-[#00D4FF] mb-2">
                <Stethoscope className="w-4 h-4" /> Doctor Consultation Advice
              </h5>
              <p className="text-xs text-[#9FB3C8] leading-relaxed">{disease.whenToVisitDoctor}</p>
            </div>

            <div className="bg-[#07121E] p-4 rounded-2xl border border-[#FF4D4F]/30">
              <h5 className="flex items-center gap-2 text-xs font-bold text-[#FF4D4F] mb-2">
                <ShieldAlert className="w-4 h-4" /> Emergency Warning Symptoms
              </h5>
              <ul className="space-y-1 text-xs text-[#9FB3C8]">
                {disease.emergencySymptoms.map((em, i) => (
                  <li key={i}>⚠️ {em}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Medical References */}
          {disease.references.length > 0 && (
            <div className="border-t border-white/10 pt-4 mb-6">
              <h5 className="flex items-center gap-1.5 text-xs font-bold text-[#9FB3C8] mb-2">
                <BookOpen className="w-3.5 h-3.5 text-[#00D4FF]" /> Clinical Research References
              </h5>
              <ul className="text-[11px] text-[#9FB3C8]/80 space-y-1">
                {disease.references.map((ref, idx) => (
                  <li key={idx}>• {ref}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" onClick={onClose}>
              Close Window
            </Button>
            {onConsultDrMona && (
              <Button
                variant="primary"
                icon={<Stethoscope className="w-4 h-4" />}
                onClick={() => {
                  onClose();
                  onConsultDrMona(disease.name);
                }}
              >
                Ask Dr. Mona about {disease.name}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
