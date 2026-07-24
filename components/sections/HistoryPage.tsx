'use client';

import React, { useState } from 'react';
import { MedicalReport } from '@/types/medical';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Search,
  Calendar,
  FileText,
  Star,
  ChevronRight,
  Activity,
  History,
  Trash2,
  Filter
} from 'lucide-react';
import { ActivePage } from '@/components/layout/Navbar';

interface HistoryPageProps {
  reports: MedicalReport[];
  setActivePage: (page: ActivePage) => void;
  onSelectReport: (report: MedicalReport) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  reports,
  setActivePage,
  onSelectReport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'blood' | 'mri' | 'favorite'>('all');

  const filteredReports = reports.filter((rep) => {
    if (categoryFilter === 'blood' && rep.category !== 'blood') return false;
    if (categoryFilter === 'mri' && rep.category !== 'mri') return false;
    if (categoryFilter === 'favorite' && !rep.isFavorite) return false;
    if (searchTerm && !rep.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-5 h-5 text-[#00D4FF]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">Report Archives & Timeline</h1>
          </div>
          <p className="text-xs text-[#9FB3C8]">
            Access past AI medical analysis records, health scores, and follow-up timelines.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<FileText className="w-4 h-4" />}
          onClick={() => setActivePage('upload')}
        >
          Upload New Report
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9FB3C8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#07121E] border border-white/10 rounded-xl text-xs text-white placeholder-[#9FB3C8] focus:outline-none focus:border-[#00D4FF]"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'blood', label: 'Blood Panels' },
            { id: 'mri', label: 'MRI Scans' },
            { id: 'favorite', label: 'Starred Favorites' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === tab.id
                  ? 'bg-[#00D4FF] text-[#07121E]'
                  : 'bg-white/5 text-[#9FB3C8] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
            <FileText className="w-12 h-12 text-[#9FB3C8] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-white">No reports found</h3>
            <p className="text-xs text-[#9FB3C8]">
              Try clearing search filters or upload a new medical report.
            </p>
          </div>
        ) : (
          filteredReports.map((rep) => (
            <Card
              key={rep.id}
              className="p-5 border-white/10 hover:border-[#00D4FF] transition-all cursor-pointer group"
              onClick={() => {
                onSelectReport(rep);
                setActivePage('dashboard');
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white text-base group-hover:text-[#00D4FF] transition-colors">
                        {rep.title}
                      </h3>
                      <Badge variant="cyan">{rep.category.toUpperCase()}</Badge>
                      {rep.isFavorite && (
                        <Star className="w-4 h-4 text-[#FFC107] fill-current" />
                      )}
                    </div>

                    <p className="text-xs text-[#9FB3C8] line-clamp-1">
                      {rep.summary}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-[#9FB3C8] pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {rep.date}
                      </span>
                      <span>• {rep.originalFileName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-[#9FB3C8]">Health Score</p>
                    <p className="text-lg font-black text-[#00E676]">{rep.overallScore}/100</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#00D4FF] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
