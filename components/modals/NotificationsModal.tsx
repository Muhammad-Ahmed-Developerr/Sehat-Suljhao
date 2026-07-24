'use client';

import React from 'react';
import { NotificationItem } from '@/types/medical';
import { X, Bell, CheckCheck, Calendar, AlertTriangle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'checkup':
        return <Calendar className="w-4 h-4 text-[#00D4FF]" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-[#FF4D4F]" />;
      case 'report':
        return <FileText className="w-4 h-4 text-[#00E676]" />;
      default:
        return <Bell className="w-4 h-4 text-[#FFC107]" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#0E1C2F] border border-white/10 rounded-3xl p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#00D4FF]/10 rounded-xl text-[#00D4FF]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Health Notifications</h3>
                <p className="text-xs text-[#9FB3C8]">Reminders, alerts & reports</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllRead}
                className="text-xs text-[#00D4FF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 text-[#9FB3C8] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-[#9FB3C8] text-sm">
                No notifications right now! You are all caught up.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    notif.read
                      ? 'bg-white/5 border-white/5 opacity-70'
                      : 'bg-[#07121E] border-[#00D4FF]/30 shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h5 className="text-xs font-bold text-white">{notif.title}</h5>
                        <span className="text-[10px] text-[#9FB3C8]">{notif.date}</span>
                      </div>
                      <p className="text-xs text-[#9FB3C8] leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
