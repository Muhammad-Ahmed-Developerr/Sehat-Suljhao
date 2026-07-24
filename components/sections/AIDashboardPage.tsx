'use client';

import React, { useState } from 'react';
import { MedicalReport, BloodParameter, DetectedDisease } from '@/types/medical';
import { HealthGauge } from '@/components/ui/HealthGauge';
import { RiskIndicator } from '@/components/ui/RiskIndicator';
import { Badge, statusToBadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BloodParameterRow } from '@/components/ui/BloodParameterRow';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  MessageSquareHeart,
  Pill,
  Utensils,
  Dumbbell,
  Droplets,
  Moon,
  Calendar,
  Stethoscope,
  Share2,
  Download,
  Search,
  Zap,
  Info,
  Sparkles,
  Heart
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { ActivePage } from '@/components/layout/Navbar';

interface AIDashboardPageProps {
  report: MedicalReport;
  setActivePage: (page: ActivePage) => void;
  onSelectDiseaseModal: (disease: DetectedDisease) => void;
  onConsultDrMonaWithTopic?: (topic: string) => void;
}

export const AIDashboardPage: React.FC<AIDashboardPageProps> = ({
  report,
  setActivePage,
  onSelectDiseaseModal,
  onConsultDrMonaWithTopic
}) => {
  const [paramTab, setParamTab] = useState<'all' | 'abnormal' | 'normal'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Combine parameters
  const allParams = [...report.abnormalParameters, ...report.normalParameters];

  // Filter logic
  const filteredParams = allParams.filter((param) => {
    if (paramTab === 'abnormal' && param.status === 'normal') return false;
    if (paramTab === 'normal' && param.status !== 'normal') return false;
    if (categoryFilter !== 'All' && param.category !== categoryFilter) return false;
    if (searchTerm && !param.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const categories = ['All', 'Metabolic', 'Lipid', 'Liver', 'Kidney', 'Hematology', 'Vitamins'];

  // Recharts data for Blood Parameter Overview Bar Chart
  const chartData = allParams.map((p) => ({
    name: p.name,
    value: p.value,
    status: p.status,
    unit: p.unit
  }));

  // Recharts Pie Data for Parameter Distribution
  const pieData = [
    { name: 'Normal Parameters', value: report.normalParameters.length, color: '#00E676' },
    { name: 'Abnormal Flags', value: report.abnormalParameters.length, color: '#FFC107' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Banner & Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#00D4FF]/30 space-y-6 relative overflow-hidden bg-gradient-to-r from-[#0E1C2F] via-[#07121E] to-[#0E1C2F]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
                AI Medical Scan Complete
              </Badge>
              <Badge variant="purple">{report.category.toUpperCase()} REPORT</Badge>
              <span className="text-xs text-[#9FB3C8]">
                Processed on {report.date}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">{report.title}</h1>
            <p className="text-xs sm:text-sm text-[#9FB3C8]">
              Patient: <span className="text-white font-semibold">{report.patientName}</span> • Source: {report.originalFileName} ({report.fileSize})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={() => alert('Medical Report Summary exported to PDF!')}
            >
              Export PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<MessageSquareHeart className="w-4 h-4" />}
              onClick={() => {
                if (onConsultDrMonaWithTopic) onConsultDrMonaWithTopic(report.title);
                setActivePage('chat');
              }}
            >
              Ask Dr. Mona AI
            </Button>
          </div>
        </div>

        {/* Overall Health Scores & Risk Meters Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          {/* Health Gauge */}
          <div className="md:col-span-4 flex justify-center bg-black/20 p-6 rounded-2xl border border-white/5">
            <HealthGauge
              score={report.overallScore}
              title="Overall Health Index"
              subtitle={report.overallScore >= 75 ? 'Good Condition with Reversible Flags' : 'Requires Attention'}
            />
          </div>

          {/* Clinical Executive Summary & Risk Indicators */}
          <div className="md:col-span-8 space-y-4">
            <div className="bg-[#07121E] p-5 rounded-2xl border border-[#00D4FF]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#00D4FF] font-bold text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4" /> Dr. Mona Executive Clinical Summary
              </div>
              <p className="text-xs sm:text-sm text-[#9FB3C8] leading-relaxed">
                {report.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <RiskIndicator score={report.riskScore} label="Systemic Disease Risk Meter" />
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#9FB3C8]">Parameters Flagged</p>
                  <p className="text-lg font-bold text-[#FFC107]">
                    {report.abnormalParameters.length} Attention Flags
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9FB3C8]">Normal Range</p>
                  <p className="text-lg font-bold text-[#00E676]">
                    {report.normalParameters.length} Optimal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detected Diseases & Conditions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FFC107]" />
              Possible Diseases & Health Conditions Detected ({report.detectedDiseases.length})
            </h2>
            <p className="text-xs text-[#9FB3C8]">
              Click any condition card to view full symptoms, cause breakdowns, and diet guides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.detectedDiseases.map((disease) => (
            <Card
              key={disease.id}
              onClick={() => onSelectDiseaseModal(disease)}
              className="p-5 border-white/10 hover:border-[#00D4FF] hover:bg-[#0E1C2F]/90 cursor-pointer space-y-4 transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <Badge variant={statusToBadgeVariant(disease.severity)}>
                  {disease.severity} Severity
                </Badge>
                <Badge variant="purple">{disease.confidence}% Confidence</Badge>
              </div>

              <div>
                <h3 className="font-bold text-white text-base group-hover:text-[#00D4FF] transition-colors flex items-center justify-between">
                  <span>{disease.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[#9FB3C8] line-clamp-2 mt-1.5 leading-relaxed">
                  {disease.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-[#00D4FF] font-medium flex items-center gap-1">
                <span>View Full Disease Breakdown</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Blood Parameter Visual Chart & Detailed Table */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#00D4FF]" />
              Blood & Lab Parameters Explorer
            </h2>
            <p className="text-xs text-[#9FB3C8]">
              Interactive reference ranges, AI value explanations, and biological impact cards.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#9FB3C8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search parameters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#0E1C2F] border border-white/10 rounded-xl text-xs text-white placeholder-[#9FB3C8] focus:outline-none focus:border-[#00D4FF]"
            />
          </div>
        </div>

        {/* Recharts Analytics Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-8 p-5 border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Parameter Values Spectrum Chart
            </h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#9FB3C8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9FB3C8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0E1C2F', borderColor: '#00D4FF', borderRadius: '12px' }}
                    itemStyle={{ color: '#00D4FF' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.status === 'normal' ? '#00E676' : '#FFC107'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="lg:col-span-4 p-5 border-white/10 flex flex-col items-center justify-center space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-center">
              Normal vs Abnormal Distribution
            </h4>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0E1C2F', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-[#00E676]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E676]" /> {report.normalParameters.length} Normal
              </span>
              <span className="flex items-center gap-1.5 text-[#FFC107]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" /> {report.abnormalParameters.length} Attention
              </span>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setParamTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                paramTab === 'all'
                  ? 'bg-[#00D4FF] text-[#07121E]'
                  : 'bg-white/5 text-[#9FB3C8] hover:text-white'
              }`}
            >
              All Parameters ({allParams.length})
            </button>
            <button
              onClick={() => setParamTab('abnormal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                paramTab === 'abnormal'
                  ? 'bg-[#FFC107] text-[#07121E]'
                  : 'bg-white/5 text-[#9FB3C8] hover:text-white'
              }`}
            >
              Abnormal Flags ({report.abnormalParameters.length})
            </button>
            <button
              onClick={() => setParamTab('normal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                paramTab === 'normal'
                  ? 'bg-[#00E676] text-[#07121E]'
                  : 'bg-white/5 text-[#9FB3C8] hover:text-white'
              }`}
            >
              Normal Range ({report.normalParameters.length})
            </button>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <span className="text-xs text-[#9FB3C8] mr-1 hidden sm:inline">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40'
                    : 'text-[#9FB3C8] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Parameters List */}
        <div className="space-y-3">
          {filteredParams.length === 0 ? (
            <div className="text-center py-8 text-[#9FB3C8] text-xs">
              No matching blood parameters found for these filters.
            </div>
          ) : (
            filteredParams.map((param) => (
              <BloodParameterRow key={param.id} param={param} />
            ))
          )}
        </div>
      </div>

      {/* AI Recommendations & Lifestyle Protocol Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00D4FF]" />
            Personalized Reversal Protocol & Recommendations
          </h2>
          <p className="text-xs text-[#9FB3C8]">
            Evidence-based recommendations tailored to your fasting sugar and liver enzyme baseline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {report.recommendations.map((rec) => {
            const getIcon = (cat: string) => {
              switch (cat) {
                case 'medication':
                  return <Pill className="w-5 h-5 text-[#FFC107]" />;
                case 'diet':
                  return <Utensils className="w-5 h-5 text-[#00E676]" />;
                case 'exercise':
                  return <Dumbbell className="w-5 h-5 text-[#00D4FF]" />;
                case 'hydration':
                  return <Droplets className="w-5 h-5 text-[#5BE7FF]" />;
                default:
                  return <Moon className="w-5 h-5 text-[#C084FC]" />;
              }
            };

            return (
              <Card key={rec.id} className="p-5 border-white/10 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {getIcon(rec.category)}
                    </div>
                    <div>
                      <Badge variant="cyan" size="sm">
                        {rec.category.toUpperCase()}
                      </Badge>
                      <h4 className="font-bold text-white text-sm mt-1">{rec.title}</h4>
                    </div>
                  </div>
                  {rec.dosageOrTarget && (
                    <span className="text-[11px] font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-1 rounded-md border border-[#00D4FF]/20 shrink-0">
                      {rec.dosageOrTarget}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#9FB3C8] leading-relaxed">{rec.description}</p>

                {rec.disclaimer && (
                  <div className="p-2.5 bg-[#FFC107]/10 rounded-lg border border-[#FFC107]/30 text-[11px] text-[#FFC107] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{rec.disclaimer}</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Follow-up Roadmap & Doctor Consultation Schedule */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#00D4FF]/10 text-[#00D4FF]">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Follow-up Clinical Roadmap</h3>
              <p className="text-xs text-[#9FB3C8]">Recommended doctor consult timeframe & follow-up tests</p>
            </div>
          </div>
          <Badge variant="high">Doctor Consult Recommended</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#07121E] p-5 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-[#00D4FF] uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Next Doctor Visit
            </h4>
            <p className="text-sm font-bold text-white">
              {report.doctorVisit.specialistType}
            </p>
            <p className="text-xs text-[#9FB3C8] leading-relaxed">
              <span className="text-white font-semibold">Timeframe:</span> {report.doctorVisit.timeframe}
            </p>
            <p className="text-xs text-[#9FB3C8] leading-relaxed">
              <span className="text-white font-semibold">Reason:</span> {report.doctorVisit.reason}
            </p>
          </div>

          <div className="bg-[#07121E] p-5 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-[#00E676] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Follow-up Diagnostic Tests
            </h4>
            <ul className="space-y-1.5 text-xs text-[#9FB3C8]">
              {report.followUpTests.map((test, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
