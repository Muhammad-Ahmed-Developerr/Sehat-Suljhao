'use client';

import React, { useState } from 'react';
import { Navbar, ActivePage } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LandingPage } from '@/components/sections/LandingPage';
import { UploadPage } from '@/components/sections/UploadPage';
import { AILoadingPage } from '@/components/sections/AILoadingPage';
import { AIDashboardPage } from '@/components/sections/AIDashboardPage';
import { DrMonaChatPage } from '@/components/sections/DrMonaChatPage';
import { HistoryPage } from '@/components/sections/HistoryPage';
import { ProfilePage } from '@/components/sections/ProfilePage';
import { SettingsPage } from '@/components/sections/SettingsPage';
import { DiseaseDetailModal } from '@/components/modals/DiseaseDetailModal';
import { NotificationsModal } from '@/components/modals/NotificationsModal';
import {
  SAMPLE_REPORTS,
  INITIAL_PATIENT_PROFILE,
  MOCK_NOTIFICATIONS
} from '@/constants/mockData';
import { MedicalReport, PatientProfile, DetectedDisease } from '@/types/medical';

export default function Home() {
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [reports, setReports] = useState<MedicalReport[]>(SAMPLE_REPORTS);
  const [currentReport, setCurrentReport] = useState<MedicalReport>(SAMPLE_REPORTS[0]);
  const [patientProfile, setPatientProfile] = useState<PatientProfile>(INITIAL_PATIENT_PROFILE);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<DetectedDisease | null>(null);
  const [activeChatTopic, setActiveChatTopic] = useState<string>('');
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{
    name: string;
    type: string;
    size: string;
  } | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleStartAnalysis = (file: File | { name: string; type: string; size: string }) => {
    const fileName = file.name;
    const fileSizeStr = 'size' in file && typeof file.size === 'string'
      ? file.size
      : `${((file as File).size / (1024 * 1024)).toFixed(2)} MB`;
    const fileType = file.type || 'Document';

    const info = { name: fileName, type: fileType, size: fileSizeStr };
    setUploadedFileInfo(info);

    // Create new mock report if uploaded
    const newReport: MedicalReport = {
      ...SAMPLE_REPORTS[0],
      id: `rep-${Date.now()}`,
      title: `AI Analysis - ${fileName}`,
      date: new Date().toISOString().split('T')[0],
      originalFileName: fileName,
      fileSize: fileSizeStr
    };
    setReports((prev) => [newReport, ...prev]);
    setCurrentReport(newReport);
  };

  const handleLoadSampleReport = (sampleId: string) => {
    const found = SAMPLE_REPORTS.find((r) => r.id === sampleId) || SAMPLE_REPORTS[0];
    setCurrentReport(found);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07121E] text-white selection:bg-[#00D4FF] selection:text-[#07121E] relative overflow-x-hidden">
      {/* Ambient Background Orbs */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#00D4FF20] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#5BE7FF10] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main Page View Container */}
      <main className="flex-1">
        {activePage === 'landing' && (
          <LandingPage
            setActivePage={setActivePage}
            onSelectSampleReport={() => setCurrentReport(SAMPLE_REPORTS[0])}
          />
        )}

        {activePage === 'upload' && (
          <UploadPage
            setActivePage={setActivePage}
            onStartAnalysis={handleStartAnalysis}
            onLoadSampleReport={handleLoadSampleReport}
          />
        )}

        {activePage === 'loading' && (
          <AILoadingPage
            setActivePage={setActivePage}
            fileInfo={uploadedFileInfo}
          />
        )}

        {activePage === 'dashboard' && (
          <AIDashboardPage
            report={currentReport}
            setActivePage={setActivePage}
            onSelectDiseaseModal={(disease) => setSelectedDisease(disease)}
            onConsultDrMonaWithTopic={(topic) => {
              setActiveChatTopic(topic);
              setActivePage('chat');
            }}
          />
        )}

        {activePage === 'chat' && (
          <DrMonaChatPage initialTopic={activeChatTopic} />
        )}

        {activePage === 'history' && (
          <HistoryPage
            reports={reports}
            setActivePage={setActivePage}
            onSelectReport={(rep) => setCurrentReport(rep)}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            profile={patientProfile}
            onUpdateProfile={(p) => setPatientProfile(p)}
          />
        )}

        {activePage === 'settings' && <SettingsPage />}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Modals */}
      <DiseaseDetailModal
        disease={selectedDisease}
        onClose={() => setSelectedDisease(null)}
        onConsultDrMona={(diseaseName) => {
          setActiveChatTopic(diseaseName);
          setActivePage('chat');
        }}
      />

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />
    </div>
  );
}
