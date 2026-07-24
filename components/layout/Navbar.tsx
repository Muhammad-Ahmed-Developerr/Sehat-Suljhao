'use client';

import React, { useState } from 'react';
import {
  Activity,
  Upload,
  LayoutDashboard,
  MessageSquareHeart,
  History,
  User,
  Settings,
  Bell,
  Sparkles,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export type ActivePage =
  | 'landing'
  | 'upload'
  | 'loading'
  | 'dashboard'
  | 'chat'
  | 'history'
  | 'profile'
  | 'settings';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  unreadNotificationsCount = 2,
  onOpenNotifications
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Home', icon: <Activity className="w-4 h-4" /> },
    { id: 'upload', label: 'Upload Report', icon: <Upload className="w-4 h-4" /> },
    { id: 'dashboard', label: 'AI Report', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'chat', label: 'Dr. Mona AI', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07121E]/80 backdrop-blur-xl border-b border-[rgba(91,231,255,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00D4FF] via-[#5BE7FF] to-[#0E1C2F] p-[2px] shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#07121E] rounded-[14px] flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#00D4FF]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-sans">
                Sehat <span className="text-[#00D4FF]">Suljhao</span>
              </span>
              <Badge variant="purple" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                Groq Powered
              </Badge>
            </div>
            <p className="text-[11px] text-[#9FB3C8] hidden sm:block">
              Smart AI Medical Intelligence
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0E1C2F]/80 p-1.5 rounded-2xl border border-white/10">
          {navItems.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#07121E] shadow-[0_2px_12px_rgba(0,212,255,0.3)]'
                    : 'text-[#9FB3C8] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Action Area */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-xl bg-[#0E1C2F] border border-white/10 text-[#9FB3C8] hover:text-white hover:border-[#00D4FF]/40 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4D4F] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Quick Upload CTA */}
          <Button
            variant="primary"
            size="sm"
            icon={<Upload className="w-4 h-4" />}
            onClick={() => setActivePage('upload')}
            className="hidden sm:inline-flex"
          >
            Analyze Report
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#0E1C2F] border border-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07121E] border-b border-white/10 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activePage === item.id
                  ? 'bg-[#00D4FF] text-[#07121E]'
                  : 'text-[#9FB3C8] hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full"
              icon={<Upload className="w-4 h-4" />}
              onClick={() => {
                setActivePage('upload');
                setMobileMenuOpen(false);
              }}
            >
              Upload Medical Report
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
