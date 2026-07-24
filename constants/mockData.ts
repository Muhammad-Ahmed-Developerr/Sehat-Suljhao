import { MedicalReport, PatientProfile, ChatMessage, NotificationItem } from '@/types/medical';

export const INITIAL_PATIENT_PROFILE: PatientProfile = {
  name: 'Alex Morgan',
  age: 38,
  gender: 'Male',
  weight: 78,
  height: 178,
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Sulfa Drugs', 'Pollen'],
  medicalHistory: [
    'Mild Primary Hypertension (2023)',
    'Seasonal Allergic Rhinitis',
    'Family history of Type 2 Diabetes'
  ],
  emergencyContact: {
    name: 'Sarah Morgan',
    relation: 'Spouse',
    phone: '+1 (555) 382-9102'
  }
};

export const SAMPLE_REPORTS: MedicalReport[] = [
  {
    id: 'rep-001',
    title: 'Comprehensive Metabolic & Lipid Panel',
    patientName: 'Alex Morgan',
    date: '2026-07-20',
    category: 'blood',
    status: 'Completed',
    overallScore: 78,
    riskScore: 32,
    summary: 'The blood panel reveals mild metabolic strain, characterized by elevated fasting blood glucose (118 mg/dL) and borderline high LDL cholesterol (142 mg/dL). Liver enzymes ALT/AST show slight elevation indicative of early metabolic fat accumulation (NAFLD Stage 1). Kidney function markers and blood counts remain in optimal healthy ranges.',
    detectedDiseases: [
      {
        id: 'dis-1',
        name: 'Pre-Diabetes / Impaired Fasting Glucose',
        confidence: 89,
        severity: 'Moderate',
        description: 'Fasting blood sugar level is higher than normal (118 mg/dL) but not yet high enough to be classified as type 2 diabetes. With early lifestyle modifications, this condition can be fully reversed.',
        symptoms: ['Increased thirst', 'Occasional fatigue after carbohydrate-rich meals', 'Slow wound healing', 'Mild brain fog'],
        causes: ['Insulin resistance', 'Sedentary desk activity', 'High glycemic intake', 'Genetic predisposition'],
        lifestyleCauses: ['Late-night snacking', 'Low dietary fiber', 'Excess refined carbohydrates', 'Elevated cortisol/stress'],
        treatment: [
          'Dietary glycemic index management',
          '30 minutes of aerobic exercise daily',
          'Weight optimization (target loss of 3-5 kg)',
          'Continuous Glucose Monitoring (CGM) if recommended by doctor'
        ],
        foodsToEat: ['Leafy greens', 'Avocados', 'Quinoa', 'Chia seeds', 'Wild salmon', 'Berries'],
        foodsToAvoid: ['Sugary beverages', 'Refined white bread', 'Ultra-processed snacks', 'Trans-fats'],
        whenToVisitDoctor: 'Schedule an endocrinology consult within 14 days for HbA1c verification.',
        emergencySymptoms: ['Blurred vision', 'Extreme drowsiness', 'Extreme thirst with rapid weight loss'],
        references: [
          'American Diabetes Association Guidelines 2026',
          'Journal of Clinical Endocrinology & Metabolism'
        ],
        iconName: 'Activity'
      },
      {
        id: 'dis-2',
        name: 'Early Non-Alcoholic Fatty Liver (NAFLD Stage 1)',
        confidence: 82,
        severity: 'Moderate',
        description: 'ALT (54 U/L) and AST (42 U/L) elevation alongside elevated triglycerides suggest early hepatic lipid accumulation. This is completely reversible at this stage.',
        symptoms: ['Mild right upper quadrant abdominal discomfort', 'General fatigue', 'Feeling of fullness'],
        causes: ['Metabolic syndrome', 'Caloric surplus', 'Visceral adiposity'],
        lifestyleCauses: ['High fructose intake', 'Insufficient physical exercise', 'Irregular sleep cycle'],
        treatment: [
          'Mediterranean diet adoption',
          'Omega-3 fatty acid supplementation',
          'Aerobic & resistance exercise combo',
          'Abstinence from alcohol for 60 days'
        ],
        foodsToEat: ['Olive oil', 'Walnuts', 'Green tea', 'Garlic', 'Cruciferous vegetables'],
        foodsToAvoid: ['High-fructose corn syrup', 'Fried foods', 'Red meat excesses', 'Alcohol'],
        whenToVisitDoctor: 'Consult a hepatologist or gastroenterologist within 30 days.',
        emergencySymptoms: ['Severe abdominal pain', 'Jaundice (yellowing of eyes/skin)', 'Dark tea-colored urine'],
        references: [
          'AASLD Practice Guidance on NAFLD 2025',
          'Lancet Gastroenterology & Hepatology'
        ],
        iconName: 'ShieldAlert'
      },
      {
        id: 'dis-3',
        name: 'Hypercholesterolemia (Borderline Elevated LDL)',
        confidence: 76,
        severity: 'Low',
        description: 'LDL cholesterol is at 142 mg/dL. While HDL is healthy (52 mg/dL), lowering LDL reduces 10-year cardiovascular risk significantly.',
        symptoms: ['Usually asymptomatic; identified strictly via blood testing.'],
        causes: ['Saturated fat dietary ratio', 'ApoB particle clearance rate'],
        lifestyleCauses: ['Processed dairy', 'Low soluble fiber intake'],
        treatment: ['Plant sterol intake', 'Increased soluble oats fiber', 'Cardio exercise'],
        foodsToEat: ['Oats', 'Lentils', 'Almonds', 'Apples', 'Flaxseeds'],
        foodsToAvoid: ['Butter', 'Palm oil', 'Processed sausages', 'Heavy cream'],
        whenToVisitDoctor: 'Review at your annual health checkup.',
        emergencySymptoms: ['Sudden chest pain or pressure', 'Shortness of breath', 'Left arm numbness'],
        references: ['ACC/AHA Cholesterol Clinical Practice Guidelines'],
        iconName: 'HeartPulse'
      }
    ],
    abnormalParameters: [
      {
        id: 'p-1',
        name: 'Fasting Glucose',
        category: 'Metabolic',
        value: 118,
        unit: 'mg/dL',
        normalRange: { min: 70, max: 99 },
        status: 'high',
        explanation: 'Fasting glucose represents blood sugar levels after 8+ hours without food. 118 mg/dL places you in the impaired fasting range (100–125 mg/dL).',
        importance: 'Primary marker for insulin sensitivity and metabolic health.',
        healthImpact: 'Persistent elevation increases risk of vascular stiffness and type 2 diabetes.'
      },
      {
        id: 'p-2',
        name: 'ALT (Alanine Aminotransferase)',
        category: 'Liver',
        value: 54,
        unit: 'U/L',
        normalRange: { min: 7, max: 45 },
        status: 'high',
        explanation: 'ALT is an enzyme predominantly found inside liver cells. When liver cells experience mild stress or fat deposit, ALT spills into the bloodstream.',
        importance: 'Most sensitive biomarker for liver cellular inflammation.',
        healthImpact: 'Indicates reversible liver cell stress.'
      },
      {
        id: 'p-3',
        name: 'LDL Cholesterol',
        category: 'Lipid',
        value: 142,
        unit: 'mg/dL',
        normalRange: { min: 50, max: 100 },
        status: 'high',
        explanation: 'Low-Density Lipoprotein transports lipid particles. 142 mg/dL is categorized as borderline elevated.',
        importance: 'Key factor in arterial plaque development.',
        healthImpact: 'Elevated numbers slowly contribute to endothelial arterial wall buildup over time.'
      },
      {
        id: 'p-4',
        name: 'Triglycerides',
        category: 'Lipid',
        value: 185,
        unit: 'mg/dL',
        normalRange: { min: 30, max: 150 },
        status: 'high',
        explanation: 'Triglycerides reflect unused calories converted into lipid stores circulating in plasma.',
        importance: 'Complements cholesterol markers in assessing vascular risk.',
        healthImpact: 'Elevated when carbohydrate or sugar intake exceeds immediate muscle glycogen storage.'
      }
    ],
    normalParameters: [
      {
        id: 'p-5',
        name: 'Hemoglobin',
        category: 'Hematology',
        value: 15.2,
        unit: 'g/dL',
        normalRange: { min: 13.8, max: 17.2 },
        status: 'normal',
        explanation: 'Hemoglobin carries oxygen from your lungs to tissues throughout your body.',
        importance: 'Ensures cellular energy oxygenation.',
        healthImpact: 'Optimal oxygen-carrying capacity; no signs of anemia.'
      },
      {
        id: 'p-6',
        name: 'White Blood Cells (WBC)',
        category: 'Hematology',
        value: 6.8,
        unit: 'x10^3/µL',
        normalRange: { min: 4.5, max: 11.0 },
        status: 'normal',
        explanation: 'WBC count reflects your immune defense system balance.',
        importance: 'Detects active infection or immune suppression.',
        healthImpact: 'Healthy immune system baseline with no active systemic infection.'
      },
      {
        id: 'p-7',
        name: 'Creatinine',
        category: 'Kidney',
        value: 0.92,
        unit: 'mg/dL',
        normalRange: { min: 0.74, max: 1.35 },
        status: 'normal',
        explanation: 'Creatinine is a waste product filtered by healthy kidney glomeruli.',
        importance: 'Primary marker for kidney filtration capacity (eGFR ~102 mL/min).',
        healthImpact: 'Excellent renal health and adequate fluid filtration.'
      },
      {
        id: 'p-8',
        name: 'Platelets',
        category: 'Hematology',
        value: 265,
        unit: 'x10^3/µL',
        normalRange: { min: 150, max: 450 },
        status: 'normal',
        explanation: 'Platelets are specialized blood cell fragments responsible for healthy blood clotting.',
        importance: 'Prevents excess bleeding or abnormal clot formation.',
        healthImpact: 'Optimal clotting potential.'
      },
      {
        id: 'p-9',
        name: 'Vitamin D (25-OH)',
        category: 'Vitamins',
        value: 36,
        unit: 'ng/mL',
        normalRange: { min: 30, max: 100 },
        status: 'normal',
        explanation: 'Essential fat-soluble hormone precursor for bone mineralization and immune modulation.',
        importance: 'Supports calcium absorption and T-cell activation.',
        healthImpact: 'Sufficient status; continue current sunlight exposure or maintenance intake.'
      }
    ],
    symptoms: [
      'Post-meal sluggishness or mild energy dips',
      'Mild abdominal fullness after dinner',
      'Infrequent mild sleep disturbance'
    ],
    riskFactors: [
      'Desk job with >7 hours daily sedentary posture',
      'Family history of maternal type 2 diabetes',
      'High proportion of refined dinner carbohydrates'
    ],
    possibleCauses: [
      'Slight calorie surplus over recent months',
      'Suboptimal hepatic fat clearance rate',
      'Mild circadian sleep irregularity'
    ],
    lifestyleCauses: [
      'Consuming sweet treats or sodas late in the evening',
      'Skipping post-meal walking walks',
      'Inadequate deep hydration (<1.5L daily)'
    ],
    recommendations: [
      {
        id: 'rec-1',
        category: 'medication',
        title: 'Berberine HCI or Milk Thistle Extract (Consult Physician)',
        description: 'Natural insulin-sensitizing herbal extracts often discussed with physicians for supporting glucose transporter 4 (GLUT4) activity and hepatoprotection.',
        disclaimer: 'Always consult your primary care doctor before starting any botanical or prescription compound.',
        dosageOrTarget: 'Subject to medical advice (typically 500mg before primary meals)',
        iconName: 'Pill'
      },
      {
        id: 'rec-2',
        category: 'diet',
        title: 'Low Glycemic Mediterranean Fiber Protocol',
        description: 'Replace white rice and refined flour with legumes, quinoa, and cruciferous vegetables. Incorporate 30g daily fiber.',
        dosageOrTarget: '30-35g Fiber Daily / Max 25g added sugars',
        iconName: 'Utensils'
      },
      {
        id: 'rec-3',
        category: 'exercise',
        title: '15-Minute Post-Meal Zone 2 Walks',
        description: 'Walking briskly for 10-15 minutes after lunch and dinner utilizes GLUT4 transporters to shuttle glucose into muscles without requiring spike in insulin.',
        dosageOrTarget: '10,000 steps daily + 3x weekly strength training',
        iconName: 'Dumbbell'
      },
      {
        id: 'rec-4',
        category: 'hydration',
        title: 'Hydration Target: 2.8 Liters Daily',
        description: 'Proper hydration supports kidney clearance and hepatic enzyme balance.',
        dosageOrTarget: '2.8 Liters / Day',
        iconName: 'Droplets'
      },
      {
        id: 'rec-5',
        category: 'sleep',
        title: 'Circadian Sleep Alignment',
        description: 'Consistent 7.5 - 8 hours sleep schedule reduces cortisol spikes that trigger morning gluconeogenesis.',
        dosageOrTarget: '7.5 - 8 Hours per night',
        iconName: 'Moon'
      }
    ],
    followUpTests: [
      'HbA1c Blood Test (in 6-8 weeks)',
      'Repeat Liver Function Panel (ALT/AST in 60 days)',
      'Fasting Insulin & HOMA-IR Index',
      'Abdominal Ultrasound (Liver fat grading if ALT remains >50)'
    ],
    doctorVisit: {
      recommended: true,
      timeframe: 'Within 14-21 days',
      specialistType: 'Primary Care Physician / Endocrinologist',
      reason: 'To confirm impaired fasting glucose status via HbA1c and discuss metabolic protocol.'
    },
    emergencyWarnings: [
      'Seek urgent medical evaluation if you experience persistent severe chest tightness, sudden shortness of breath, acute upper abdominal pain, or jaundice.'
    ],
    timeline: [
      { date: '2026-07-20', event: 'Blood Panel Sample Collected', impact: 'neutral' },
      { date: '2026-07-21', event: 'Mona Doctor AI Multi-Model Scan Completed', impact: 'positive' },
      { date: '2026-08-15', event: 'Scheduled 30-Day Checkpoint for Fasting Sugar', impact: 'neutral' },
      { date: '2026-09-20', event: 'Target Repeat HbA1c & ALT Follow-up Test', impact: 'positive' }
    ],
    originalFileName: 'Alex_Morgan_Comprehensive_Panel_July2026.pdf',
    fileType: 'PDF Document',
    fileSize: '2.4 MB',
    isFavorite: true
  },
  {
    id: 'rep-002',
    title: 'Lumbar Spine MRI Diagnostic Scan',
    patientName: 'Alex Morgan',
    date: '2026-05-14',
    category: 'mri',
    status: 'Completed',
    overallScore: 84,
    riskScore: 22,
    summary: 'MRI scan shows mild L4-L5 disc desiccation with minor posterior bulging without severe nerve root impingement. Spinal canal caliber remains within normal limits.',
    detectedDiseases: [
      {
        id: 'dis-10',
        name: 'Mild L4-L5 Intervertebral Disc Bulge',
        confidence: 92,
        severity: 'Low',
        description: 'Minor protrusion of disc material at L4-L5 level without central canal stenosis.',
        symptoms: ['Mild lower back stiffness after prolonged sitting'],
        causes: ['Postural stress', 'Mild lumbar hydration loss'],
        lifestyleCauses: ['Sedentary chair posture', 'Improper heavy lifting technique'],
        treatment: ['Core stabilization physical therapy', 'McKenzie lumbar extension exercises'],
        foodsToEat: ['Anti-inflammatory turmeric', 'Bone broth', 'Magnesium-rich foods'],
        foodsToAvoid: ['Inflammatory processed oils'],
        whenToVisitDoctor: 'Routine follow-up if lower back aching persists.',
        emergencySymptoms: ['Sudden loss of bowel or bladder control (Cauda Equina Syndrome)', 'Severe leg weakness'],
        references: ['Spine Journal Imaging Protocols 2025'],
        iconName: 'Activity'
      }
    ],
    abnormalParameters: [],
    normalParameters: [],
    symptoms: ['Lower back dull ache after 4 hours desk work'],
    riskFactors: ['Prolonged sitting without lumbar support'],
    possibleCauses: ['Postural compression over time'],
    lifestyleCauses: ['Lack of daily hamstrings and hip flexor stretching'],
    recommendations: [
      {
        id: 'rec-10',
        category: 'exercise',
        title: 'Core & Glute Rehabilitation Protocol',
        description: 'Bird-dog, side planks, and cat-cow stretches 15 mins daily.',
        dosageOrTarget: 'Daily 15 mins',
        iconName: 'Dumbbell'
      }
    ],
    followUpTests: ['Physical Therapy Baseline Evaluation'],
    doctorVisit: {
      recommended: false,
      timeframe: 'As needed',
      specialistType: 'Physical Therapist / Orthopedic Specialist',
      reason: 'Postural posture correction and core strength baseline.'
    },
    emergencyWarnings: [
      'Numbness spreading down both legs or urinary incontinence requires emergency room evaluation.'
    ],
    timeline: [
      { date: '2026-05-14', event: 'Lumbar MRI Performed', impact: 'neutral' }
    ],
    originalFileName: 'Lumbar_Spine_MRI_Scan_May2026.dicom',
    fileType: 'DICOM Image File',
    fileSize: '48.2 MB',
    isFavorite: false
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'dr_mona',
    content: `Hello Alex! 👋 I'm **Dr. Mona**, your AI Doctor assistant. 

I've reviewed your latest **Comprehensive Metabolic & Lipid Panel (July 20, 2026)**. Overall, your health score is **78/100**, which is solid! However, I noticed a couple of early metabolic flags we should address proactively:

1. **Fasting Glucose (118 mg/dL)** — Indicates mild impaired fasting glucose (pre-diabetes range).
2. **Liver Enzymes (ALT 54 U/L)** — Suggests early reversible hepatic fat accumulation (NAFLD Stage 1).

The great news is both of these are **100% reversible** with targeted lifestyle choices and nutritional focus! How can I assist you today?`,
    timestamp: '10:30 AM',
    quickReplies: [
      'What does my fasting glucose of 118 mg/dL mean?',
      'How can I reverse early fatty liver (ALT 54)?',
      'What foods should I eat to lower LDL cholesterol?',
      'Can anxiety or stress affect my blood test numbers?',
      'Explain my report like I am 10 years old.'
    ]
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Follow-up Checkup Reminder',
    message: 'It is recommended to schedule your fasting glucose & HbA1c re-test in 3 weeks.',
    type: 'checkup',
    date: '10 mins ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Hydration Target Reached',
    message: 'Great job logging 2.5L of water today! Keep supporting your kidney & liver health.',
    type: 'reminder',
    date: '2 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'AI Analysis Completed',
    message: 'Comprehensive Metabolic & Lipid Panel was successfully scanned by Dr. Mona AI.',
    type: 'report',
    date: 'Yesterday',
    read: true
  }
];

export const FAQ_LIST = [
  {
    question: 'How does Mona Doctor AI analyze medical reports?',
    answer: 'Mona Doctor AI utilizes multi-modal AI medical scanning (powered by advanced LLM architectures like Llama 3.3 70B & Vision models). It parses raw text, table parameters, and medical imaging text from PDFs, JPEGs, DICOMs, and camera photos. It extracts values, compares them against clinical standard reference ranges, and maps them to medical literature for instant, actionable insights.'
  },
  {
    question: 'Is my uploaded medical data safe and private?',
    answer: 'Yes! Mona Doctor AI is built with strict privacy-by-design. Your files are processed securely in local encrypted memory buffers. We do not store or sell your sensitive medical records to third parties.'
  },
  {
    question: 'Can Mona Doctor AI replace my primary doctor?',
    answer: 'No. Mona Doctor AI is designed as an intelligent educational co-pilot to help you understand complex medical terminology, prepare for doctor appointments, and adopt preventive health habits. It does NOT provide formal medical diagnoses or replace licensed physicians.'
  },
  {
    question: 'What types of medical reports can I upload?',
    answer: 'You can upload Blood Reports (CBC, Lipid Panel, Metabolic Panel, Thyroid, Hormones, Liver/Kidney Function), MRI Scan Reports, CT Scan Summaries, ECG Graphs, Urine Reports, Ultrasound Summaries, and clinical doctor prescription notes.'
  },
  {
    question: 'How does Dr. Mona AI Chat answer questions?',
    answer: 'Dr. Mona uses clinical reasoning models trained on evidence-based medical research. She cross-references your uploaded blood parameters and health profile to give hyper-personalized, empathetic, and clear explanations in plain language.'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Mona Doctor AI caught my pre-diabetes early when my routine blood work came back. Dr. Mona explained every number in plain terms and gave me a 60-day action plan that dropped my fasting glucose back into normal range!',
    author: 'David K.',
    role: 'Verified Patient',
    score: 98,
    avatarSeed: 'david'
  },
  {
    quote: 'As a physician, I am impressed by how Mona Doctor AI empowers patients to understand their lab results before their consults. Patients arrive informed, calm, and ready to take action.',
    author: 'Dr. Elena Rostova, MD',
    role: 'Consulting Cardiologist',
    score: 99,
    avatarSeed: 'elena'
  },
  {
    quote: 'The speed is unbelievable. I dragged my 8-page hospital discharge summary into the app, and within 5 seconds I had a clear breakdown of abnormal flags, risks, and next steps.',
    author: 'Samantha Lee',
    role: 'Patient & Runner',
    score: 97,
    avatarSeed: 'samantha'
  }
];

export const MOCK_DOCTORS_LIST = [
  {
    name: 'Dr. Mona Al-Hassan, MD',
    specialty: 'Chief AI Clinical Officer & Internal Medicine Specialist',
    hospital: 'Mona Health AI Institute',
    rating: 4.98,
    reviews: 1420,
    available: 'Online Now',
    image: 'https://picsum.photos/seed/drmona/200/200'
  },
  {
    name: 'Dr. Marcus Vance, MD',
    specialty: 'Endocrinology & Metabolic Diseases',
    hospital: 'Johns Hopkins Medical Center',
    rating: 4.95,
    reviews: 890,
    available: 'Next: Tomorrow, 10:00 AM',
    image: 'https://picsum.photos/seed/drmarcus/200/200'
  },
  {
    name: 'Dr. Sarah Jenkins, MD',
    specialty: 'Hepatology & Gastroenterology',
    hospital: 'Stanford Health Care',
    rating: 4.92,
    reviews: 640,
    available: 'Next: Friday, 2:30 PM',
    image: 'https://picsum.photos/seed/drsarah/200/200'
  }
];
