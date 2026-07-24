'use client';

import React, { useState } from 'react';
import {
  Upload,
  MessageSquareHeart,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Brain,
  Search,
  Heart,
  Star,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { FAQ_LIST, TESTIMONIALS, MOCK_DOCTORS_LIST } from '@/constants/mockData';
import Image from 'next/image';
import { ActivePage } from '@/components/layout/Navbar';
import { motion } from 'motion/react';

interface LandingPageProps {
  setActivePage: (page: ActivePage) => void;
  onSelectSampleReport?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActivePage,
  onSelectSampleReport
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        {/* Glow backdrop blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient opacity-80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E1C2F] border border-[#00D4FF]/30 shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                <span className="text-xs font-bold text-[#00D4FF] tracking-wide">
                  Next-Gen Healthcare AI • Powered by Llama-3.3 70B
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Upload your medical reports.{' '}
                <span className="gradient-text">Understand your health.</span> Talk with your AI Doctor.
              </h1>

              <p className="text-base sm:text-lg text-[#9FB3C8] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform complex medical jargon, lab blood tests, MRI scans, and diagnostic summaries into clear, plain-language insights, disease risk factors, and actionable lifestyle plans.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Upload className="w-5 h-5" />}
                  onClick={() => setActivePage('upload')}
                  className="w-full sm:w-auto"
                >
                  Upload Medical Report
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  icon={<MessageSquareHeart className="w-5 h-5 text-[#00D4FF]" />}
                  onClick={() => setActivePage('chat')}
                  className="w-full sm:w-auto"
                >
                  Talk with Dr. Mona AI
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    if (onSelectSampleReport) onSelectSampleReport();
                    setActivePage('dashboard');
                  }}
                  className="w-full sm:w-auto text-[#00D4FF]"
                >
                  Explore Sample AI Report
                </Button>
              </div>

              {/* Security badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-[#9FB3C8]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                  100% Private & Encrypted
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#FFC107]" />
                  Instant &lt; 10s AI Processing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D4FF]" />
                  98.4% Parameter Precision
                </span>
              </div>
            </div>

            {/* Hero Right Visual: Interactive AI Doctor & Report Preview Card */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <Card className="border-[#00D4FF]/30 p-6 space-y-5 glow-cyan">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-[#00D4FF]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Blood & Metabolic Panel</h3>
                        <p className="text-xs text-[#9FB3C8]">Patient: Alex Morgan • AI Scan Complete</p>
                      </div>
                    </div>
                    <Badge variant="normal">Health Score: 78/100</Badge>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-white font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#FFC107]" />
                        Fasting Glucose: 118 mg/dL
                      </div>
                      <Badge variant="high">Impaired Fasting</Badge>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-white font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#FFC107]" />
                        ALT Liver Enzyme: 54 U/L
                      </div>
                      <Badge variant="high">Early NAFLD Stage 1</Badge>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-white font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#00E676]" />
                        Hemoglobin & Kidney Function
                      </div>
                      <Badge variant="normal">Optimal Normal</Badge>
                    </div>
                  </div>

                  {/* Mini Dr. Mona AI Quote */}
                  <div className="bg-[#07121E] p-3.5 rounded-xl border border-[#00D4FF]/20 flex items-start gap-3 text-xs">
                    <div className="w-8 h-8 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] font-bold shrink-0">
                      M
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px] mb-0.5">Dr. Mona AI Note:</p>
                      <p className="text-[#9FB3C8] leading-relaxed">
                        &quot;Both flagged parameters are 100% reversible within 60 days via 15-min post-meal walking and fiber optimization!&quot;
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      if (onSelectSampleReport) onSelectSampleReport();
                      setActivePage('dashboard');
                    }}
                  >
                    View Full Interactive Report
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-[#00D4FF]">100,000+</h3>
            <p className="text-xs text-[#9FB3C8] mt-1 font-medium">Reports Scanned & Analyzed</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-[#00E676]">98.4%</h3>
            <p className="text-xs text-[#9FB3C8] mt-1 font-medium">Lab Parameter Extraction Accuracy</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-[#5BE7FF]">&lt; 10s</h3>
            <p className="text-xs text-[#9FB3C8] mt-1 font-medium">Average Processing Time</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-[#FFC107]">24 / 7</h3>
            <p className="text-xs text-[#9FB3C8] mt-1 font-medium">Dr. Mona AI Availability</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="cyan">Seamless Workflow</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            How Sehat Suljhao Works
          </h2>
          <p className="text-sm text-[#9FB3C8] max-w-xl mx-auto">
            From raw medical PDFs to actionable, plain-language clinical insights in four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Upload Report',
              desc: 'Upload PDF, JPEG, PNG, or DICOM files of blood work, MRI, CT, or ECG scans.',
              icon: <Upload className="w-6 h-6 text-[#00D4FF]" />
            },
            {
              step: '02',
              title: 'Multi-Model AI Scan',
              desc: 'Llama-3.3 70B & Vision models extract every numeric parameter & reference range.',
              icon: <Brain className="w-6 h-6 text-[#C084FC]" />
            },
            {
              step: '03',
              title: 'Disease Risk Mapping',
              desc: 'Identifies possible condition flags, root causes, and reversible lifestyle markers.',
              icon: <Search className="w-6 h-6 text-[#FFC107]" />
            },
            {
              step: '04',
              title: 'Dr. Mona Consult',
              desc: 'Chat with your AI doctor to ask questions, review diets, and plan follow-ups.',
              icon: <MessageSquareHeart className="w-6 h-6 text-[#00E676]" />
            }
          ].map((item, idx) => (
            <Card key={idx} className="relative p-6 space-y-4 border-white/10 hover:border-[#00D4FF]/40">
              <span className="text-3xl font-black text-white/10 absolute top-4 right-4 font-mono">
                {item.step}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-[#9FB3C8] leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="purple">Core Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Advanced Healthcare Intelligence Platform
          </h2>
          <p className="text-sm text-[#9FB3C8] max-w-2xl mx-auto">
            Packed with specialized medical tools to give you total clarity over your health records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="p-6 md:col-span-2 space-y-4 border-[#00D4FF]/30">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Universal Medical Report Parser</h3>
            <p className="text-xs text-[#9FB3C8] leading-relaxed max-w-xl">
              Supports Blood Tests (CBC, Lipid, Metabolic, Liver, Kidney, Thyroid), Lumbar & Brain MRIs, Chest CT Scans, ECG waveforms, and Urine analysis. Parses messy doctor writing and varied lab layout formats automatically.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['PDF', 'JPEG', 'PNG', 'DICOM', 'CBC', 'Lipid Panel', 'CT Scan', 'MRI', 'ECG'].map((tag, i) => (
                <Badge key={i} variant="cyan" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="p-6 space-y-4 border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 text-[#00E676] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Reversible Health Disease Flags</h3>
            <p className="text-xs text-[#9FB3C8] leading-relaxed">
              Detects early pre-diabetes, early NAFLD stage 1, borderline hypercholesterolemia, and vitamin deficiencies before they become chronic conditions.
            </p>
          </Card>

          {/* Card 3 */}
          <Card className="p-6 space-y-4 border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#FFC107]/10 text-[#FFC107] flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Dr. Mona AI Consultation</h3>
            <p className="text-xs text-[#9FB3C8] leading-relaxed">
              An empathetic 24/7 physician assistant that speaks plain language, answers unlimited follow-ups, and explains reports to adults or kids!
            </p>
          </Card>

          {/* Card 4 */}
          <Card className="p-6 md:col-span-2 space-y-4 border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#C084FC]/10 text-[#C084FC] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Personalized Recommendations & Diet Plans</h3>
            <p className="text-xs text-[#9FB3C8] leading-relaxed max-w-xl">
              Generates post-meal walking protocols, targeted fiber guidelines, hydration trackers, sleep alignment recommendations, and doctor visit schedules.
            </p>
          </Card>
        </div>
      </section>

      {/* Doctors Advisory Council */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="cyan">Clinical Standards</Badge>
          <h2 className="text-3xl font-black text-white">Guided by Medical Advisory Experts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_DOCTORS_LIST.map((doc, idx) => (
            <Card key={idx} className="p-5 flex items-center gap-4 border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden shrink-0 border border-white/20 relative">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{doc.name}</h4>
                <p className="text-xs text-[#00D4FF] font-medium">{doc.specialty}</p>
                <p className="text-[11px] text-[#9FB3C8] mt-0.5">{doc.hospital}</p>
                <div className="flex items-center gap-1 text-[10px] text-[#FFC107] mt-1 font-semibold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{doc.rating} ({doc.reviews} reviews)</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="normal">User Stories</Badge>
          <h2 className="text-3xl font-black text-white">What Patients & Doctors Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <Card key={idx} className="p-6 space-y-4 border-white/10">
              <div className="flex items-center gap-1 text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#9FB3C8] leading-relaxed italic">&quot;{item.quote}&quot;</p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-white">{item.author}</h5>
                  <p className="text-[11px] text-[#00D4FF]">{item.role}</p>
                </div>
                <Badge variant="cyan">{item.score}% Satisfied</Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="cyan">FAQ</Badge>
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <Card
                key={idx}
                className="p-5 border-white/10 hover:border-[#00D4FF]/30 transition-all cursor-pointer"
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-bold text-white text-sm sm:text-base">{faq.question}</h4>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#00D4FF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#9FB3C8] shrink-0" />
                  )}
                </div>
                {isOpen && (
                  <p className="text-xs text-[#9FB3C8] leading-relaxed pt-3 border-t border-white/10 mt-3">
                    {faq.answer}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#00D4FF]/40 text-center space-y-6 relative overflow-hidden bg-gradient-to-r from-[#0E1C2F] via-[#07121E] to-[#0E1C2F]">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to understand your health reports in seconds?
            </h2>
            <p className="text-sm text-[#9FB3C8]">
              Upload any medical document now or talk directly with Dr. Mona AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                icon={<Upload className="w-5 h-5" />}
                onClick={() => setActivePage('upload')}
              >
                Upload Medical Report Now
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<MessageSquareHeart className="w-5 h-5 text-[#00D4FF]" />}
                onClick={() => setActivePage('chat')}
              >
                Talk with Dr. Mona
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
