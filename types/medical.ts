export type ReportCategory = 'blood' | 'mri' | 'ct_scan' | 'ecg' | 'liver' | 'kidney' | 'urine' | 'general';

export type ParameterStatus = 'normal' | 'high' | 'low' | 'critical';

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface BloodParameter {
  id: string;
  name: string;
  category: 'Hematology' | 'Metabolic' | 'Lipid' | 'Liver' | 'Kidney' | 'Vitamins' | 'Hormones';
  value: number;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  status: ParameterStatus;
  explanation: string;
  importance: string;
  healthImpact: string;
}

export interface DetectedDisease {
  id: string;
  name: string;
  confidence: number; // percentage e.g. 88
  severity: SeverityLevel;
  description: string;
  symptoms: string[];
  causes: string[];
  lifestyleCauses: string[];
  treatment: string[];
  foodsToEat: string[];
  foodsToAvoid: string[];
  whenToVisitDoctor: string;
  emergencySymptoms: string[];
  references: string[];
  iconName: string;
}

export interface Recommendation {
  id: string;
  category: 'medication' | 'diet' | 'exercise' | 'sleep' | 'hydration';
  title: string;
  description: string;
  disclaimer?: string;
  dosageOrTarget?: string;
  iconName: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  patientName: string;
  date: string;
  category: ReportCategory;
  status: 'Completed' | 'Analyzing' | 'Draft' | 'Flagged';
  overallScore: number; // 0 to 100
  riskScore: number; // 0 to 100
  summary: string;
  detectedDiseases: DetectedDisease[];
  abnormalParameters: BloodParameter[];
  normalParameters: BloodParameter[];
  symptoms: string[];
  riskFactors: string[];
  possibleCauses: string[];
  lifestyleCauses: string[];
  recommendations: Recommendation[];
  followUpTests: string[];
  doctorVisit: {
    recommended: boolean;
    timeframe: string;
    specialistType: string;
    reason: string;
  };
  emergencyWarnings: string[];
  timeline: {
    date: string;
    event: string;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  originalFileName: string;
  fileType: string;
  fileSize: string;
  isFavorite?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'dr_mona';
  content: string;
  timestamp: string;
  quickReplies?: string[];
  attachments?: {
    name: string;
    type: string;
    url?: string;
  }[];
  medicalReferences?: string[];
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  weight: number; // kg
  height: number; // cm
  bloodGroup: string;
  allergies: string[];
  medicalHistory: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'checkup' | 'reminder' | 'alert' | 'report';
  date: string;
  read: boolean;
  actionUrl?: string;
}
