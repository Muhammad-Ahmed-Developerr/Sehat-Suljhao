'use client';

import React, { useState } from 'react';
import { PatientProfile } from '@/types/medical';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, Phone, ShieldAlert, Heart, Activity, Edit3, Save } from 'lucide-react';

interface ProfilePageProps {
  profile: PatientProfile;
  onUpdateProfile: (profile: PatientProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PatientProfile>(profile);

  // BMI Calculation
  const heightMeters = formData.height / 100;
  const bmi = (formData.weight / (heightMeters * heightMeters)).toFixed(1);

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-[#FFC107]' };
    if (val < 25) return { label: 'Healthy Weight', color: 'text-[#00E676]' };
    if (val < 30) return { label: 'Overweight', color: 'text-[#FFC107]' };
    return { label: 'Obese', color: 'text-[#FF4D4F]' };
  };

  const bmiCat = getBmiCategory(parseFloat(bmi));

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Patient Profile & Health Vitals</h1>
            <p className="text-xs text-[#9FB3C8]">
              Personal metrics, baseline medical history & emergency contacts
            </p>
          </div>
        </div>

        <Button
          variant={isEditing ? 'primary' : 'secondary'}
          size="sm"
          icon={isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Patient Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <Card className="p-6 md:col-span-2 space-y-4 border-white/10">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="font-bold text-white text-base">Basic Health Metrics</h3>
            <Badge variant="cyan">Blood Group: {formData.bloodGroup}</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-[#9FB3C8]">Full Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#07121E] border border-[#00D4FF] rounded-lg p-1.5 text-white mt-1"
                />
              ) : (
                <p className="font-bold text-white text-sm mt-0.5">{formData.name}</p>
              )}
            </div>

            <div>
              <p className="text-[#9FB3C8]">Age</p>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#07121E] border border-[#00D4FF] rounded-lg p-1.5 text-white mt-1"
                />
              ) : (
                <p className="font-bold text-white text-sm mt-0.5">{formData.age} Years</p>
              )}
            </div>

            <div>
              <p className="text-[#9FB3C8]">Gender</p>
              <p className="font-bold text-white text-sm mt-0.5">{formData.gender}</p>
            </div>

            <div>
              <p className="text-[#9FB3C8]">Weight (kg)</p>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#07121E] border border-[#00D4FF] rounded-lg p-1.5 text-white mt-1"
                />
              ) : (
                <p className="font-bold text-white text-sm mt-0.5">{formData.weight} kg</p>
              )}
            </div>

            <div>
              <p className="text-[#9FB3C8]">Height (cm)</p>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#07121E] border border-[#00D4FF] rounded-lg p-1.5 text-white mt-1"
                />
              ) : (
                <p className="font-bold text-white text-sm mt-0.5">{formData.height} cm</p>
              )}
            </div>

            <div>
              <p className="text-[#9FB3C8]">Calculated BMI</p>
              <p className={`font-bold text-sm mt-0.5 ${bmiCat.color}`}>
                {bmi} ({bmiCat.label})
              </p>
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-6 border-[#FF4D4F]/30 bg-[#0E1C2F] space-y-4">
          <div className="flex items-center gap-2 text-[#FF4D4F] font-bold text-sm">
            <Phone className="w-4 h-4" /> Emergency Contact
          </div>
          <div className="space-y-2 text-xs">
            <p className="text-[#9FB3C8]">Contact Name:</p>
            <p className="font-bold text-white text-sm">{formData.emergencyContact.name}</p>
            <p className="text-[#9FB3C8]">Relation: {formData.emergencyContact.relation}</p>
            <p className="font-mono text-[#00D4FF] text-sm pt-1">{formData.emergencyContact.phone}</p>
          </div>
        </Card>
      </div>

      {/* Allergies & Medical History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-[#FF4D4F] font-bold text-sm">
            <ShieldAlert className="w-4 h-4" /> Known Allergies
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {formData.allergies.map((alg, i) => (
              <Badge key={i} variant="critical">
                {alg}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-[#00D4FF] font-bold text-sm">
            <Activity className="w-4 h-4" /> Medical History Baseline
          </div>
          <ul className="space-y-2 text-xs text-[#9FB3C8]">
            {formData.medicalHistory.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
