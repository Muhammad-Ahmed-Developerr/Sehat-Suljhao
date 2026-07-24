'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCode2,
  Trash2,
  Zap,
  Activity,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ReportCategory } from '@/types/medical';
import { ActivePage } from '@/components/layout/Navbar';

interface UploadPageProps {
  setActivePage: (page: ActivePage) => void;
  onStartAnalysis: (file: File | { name: string; type: string; size: string }) => void;
  onLoadSampleReport: (sampleId: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({
  setActivePage,
  onStartAnalysis,
  onLoadSampleReport
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | 'any'>('any');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    type: string;
    size: string;
    rawFile?: File;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: { id: ReportCategory | 'any'; label: string; desc: string }[] = [
    { id: 'any', label: '✨ Any Medical Report / Auto-Detect', desc: 'Accepts all PDFs, Images, Doctor Notes, Scans & Lab Results' },
    { id: 'blood', label: 'Blood & Metabolic Panel', desc: 'CBC, Lipid, Diabetes, Thyroid, Liver/Kidney' },
    { id: 'mri', label: 'MRI Diagnostic Scan', desc: 'Brain, Spine, Joint, Abdominal MRI' },
    { id: 'ct_scan', label: 'CT Scan & Radiology', desc: 'Chest CT, Abdominal, Soft Tissue, X-Ray' },
    { id: 'ecg', label: 'ECG / EKG Waveform', desc: 'Heart Rhythm, Cardiac Voltage, Echo' },
    { id: 'urine', label: 'Urine & Renal Test', desc: 'Urinalysis, Microalbumin, Electrolytes' },
    { id: 'general', label: 'Prescription & Summaries', desc: 'Discharge Summary, Doctor Notes, Allergy, Clinic Slips' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        type: file.type || 'Document File',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        rawFile: file
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        type: file.type || 'Document File',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        rawFile: file
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
          AI Multi-Modal Parser
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Upload Your <span className="gradient-text">Medical Report</span>
        </h1>
        <p className="text-sm sm:text-base text-[#9FB3C8] max-w-xl mx-auto">
          Upload any PDF, photo image, or scan. Dr. Mona AI will extract all blood parameters, detect risk factors, and prepare a plain-language analysis.
        </p>
      </div>

      {/* 1-Click Sample Pre-loads */}
      <div className="glass-panel p-5 rounded-2xl border border-[#00D4FF]/30 space-y-3 bg-[#0E1C2F]/90">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FFC107]" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Want to test right now? Try a 1-Click Sample Report
            </h4>
          </div>
          <Badge variant="purple" size="sm">Pre-Loaded</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => {
              onLoadSampleReport('rep-001');
              setActivePage('loading');
            }}
            className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all text-left flex items-center justify-between cursor-pointer group"
          >
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00D4FF]">
                📊 Sample Metabolic & Lipid Blood Panel
              </p>
              <p className="text-[10px] text-[#9FB3C8]">
                Glucose 118 mg/dL, ALT 54 U/L, LDL 142 mg/dL
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#00D4FF] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              onLoadSampleReport('rep-002');
              setActivePage('loading');
            }}
            className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all text-left flex items-center justify-between cursor-pointer group"
          >
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00D4FF]">
                🦴 Sample Lumbar Spine MRI Scan Report
              </p>
              <p className="text-[10px] text-[#9FB3C8]">
                L4-L5 Disc Bulge, Spine Dehydration
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#00D4FF] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Select Category Grid */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-white uppercase tracking-wider block">
          1. Select Report Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00D4FF]/15 border-[#00D4FF] text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                    : 'bg-[#0E1C2F] border-white/10 text-[#9FB3C8] hover:border-white/30'
                }`}
              >
                <p className="text-xs font-bold text-white mb-0.5">{cat.label}</p>
                <p className="text-[10px] text-[#9FB3C8] leading-tight">{cat.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Drag & Drop Zone */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-white uppercase tracking-wider block">
          2. Drop or Select File
        </label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="*/*,.pdf,.png,.jpg,.jpeg,.dicom,.txt,.doc,.docx,.heic,.webp"
          className="hidden"
        />

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer relative overflow-hidden ${
            dragActive
              ? 'border-[#00D4FF] bg-[#00D4FF]/10 scale-[1.01]'
              : 'border-white/20 bg-[#0E1C2F]/80 hover:border-[#00D4FF]/50 hover:bg-[#0E1C2F]'
          }`}
        >
          <div className="max-w-md mx-auto space-y-4 pointer-events-none">
            <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center mx-auto text-[#00D4FF]">
              <Upload className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Drag & Drop ANY Medical Report Here
              </h3>
              <p className="text-xs text-[#9FB3C8] mt-1">
                Upload any blood test, MRI, CT scan, prescription, discharge summary, or clinic slip
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['ANY FILE', 'PDF', 'JPEG/PNG', 'DOCX', 'DICOM', 'Max 50MB'].map((ext, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-[#9FB3C8]"
                >
                  {ext}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded File Preview Card */}
      {uploadedFile && (
        <Card className="p-5 border-[#00D4FF]/40 bg-[#07121E] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#00D4FF]/10 rounded-xl text-[#00D4FF]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{uploadedFile.name}</h4>
                <p className="text-xs text-[#9FB3C8]">
                  {uploadedFile.type} • {uploadedFile.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="normal" icon={<CheckCircle2 className="w-3 h-3" />}>
                Ready for AI Scan
              </Badge>
              <button
                onClick={() => setUploadedFile(null)}
                className="p-2 text-[#FF4D4F] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#9FB3C8]">
              <ShieldCheck className="w-4 h-4 text-[#00E676]" />
              <span>Processed locally in encrypted browser memory.</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={<Sparkles className="w-5 h-5" />}
              onClick={() => {
                onStartAnalysis(uploadedFile);
                setActivePage('loading');
              }}
              className="w-full sm:w-auto"
            >
              Analyze Report with Dr. Mona AI
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
