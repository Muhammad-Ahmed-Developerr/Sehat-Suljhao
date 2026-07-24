import React from 'react';

interface RiskIndicatorProps {
  score: number; // 0 to 100
  label?: string;
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  score,
  label = 'Risk Assessment'
}) => {
  const getRiskLabel = (val: number) => {
    if (val <= 25) return { text: 'Low Risk', color: 'text-[#00E676]', bg: 'bg-[#00E676]' };
    if (val <= 55) return { text: 'Moderate Risk', color: 'text-[#FFC107]', bg: 'bg-[#FFC107]' };
    if (val <= 80) return { text: 'Elevated Risk', color: 'text-[#FF9100]', bg: 'bg-[#FF9100]' };
    return { text: 'High Risk', color: 'text-[#FF4D4F]', bg: 'bg-[#FF4D4F]' };
  };

  const risk = getRiskLabel(score);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-[#9FB3C8] font-medium">{label}</span>
        <span className={`font-bold ${risk.color}`}>
          {risk.text} ({score}%)
        </span>
      </div>
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 relative">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${risk.bg}`}
          style={{ width: `${Math.min(Math.max(score, 5), 100)}%` }}
        />
      </div>
    </div>
  );
};
