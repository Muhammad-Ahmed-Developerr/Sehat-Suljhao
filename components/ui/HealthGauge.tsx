'use client';

import React from 'react';
import { motion } from 'motion/react';

interface HealthGaugeProps {
  score: number; // 0 - 100
  title?: string;
  subtitle?: string;
  size?: number; // SVG circle px
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({
  score,
  title = 'Health Score',
  subtitle = 'Optimal',
  size = 180
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#00E676', glow: 'rgba(0, 230, 118, 0.4)', text: 'text-[#00E676]' };
    if (s >= 60) return { stroke: '#00D4FF', glow: 'rgba(0, 212, 255, 0.4)', text: 'text-[#00D4FF]' };
    if (s >= 40) return { stroke: '#FFC107', glow: 'rgba(255, 193, 7, 0.4)', text: 'text-[#FFC107]' };
    return { stroke: '#FF4D4F', glow: 'rgba(255, 77, 79, 0.4)', text: 'text-[#FF4D4F]' };
  };

  const theme = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background track */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            style={{ filter: `drop-shadow(0px 0px 8px ${theme.glow})` }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            className={`text-4xl font-black tracking-tight ${theme.text}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {score}
          </motion.span>
          <span className="text-xs uppercase font-bold tracking-widest text-[#9FB3C8] mt-0.5">/100</span>
        </div>
      </div>

      <div className="text-center mt-3">
        <h4 className="text-sm font-semibold text-white tracking-wide">{title}</h4>
        <p className={`text-xs font-medium ${theme.text} mt-0.5`}>{subtitle}</p>
      </div>
    </div>
  );
};
