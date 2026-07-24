import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const GROQ_KEY = process.env.GROQ_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { reportText, fileName, fileType } = await req.json();

    const groq = new Groq({ apiKey: GROQ_KEY });

    const prompt = `Analyze the following medical report content and return a JSON object summarizing the health findings, score, detected diseases/conditions, parameters, and actionable recommendations.

File Name: ${fileName || 'Medical_Report.pdf'}
Report Raw Content/Description: ${reportText || 'Comprehensive Blood Panel & Metabolic Function Report'}

Return ONLY raw valid JSON (no markdown ticks, no surrounding code blocks) matching this schema:
{
  "title": "string (e.g. Comprehensive Metabolic & Blood Analysis)",
  "category": "blood | mri | ct_scan | ecg | liver | kidney | urine | general",
  "overallScore": number (0 to 100),
  "riskScore": number (0 to 100),
  "summary": "string (clear 2-3 sentence clinical summary)",
  "detectedDiseases": [
    {
      "id": "string",
      "name": "string",
      "confidence": number (e.g. 92),
      "severity": "Low | Moderate | High | Critical",
      "description": "string",
      "symptoms": ["string"],
      "causes": ["string"],
      "lifestyleCauses": ["string"],
      "treatment": ["string"],
      "foodsToEat": ["string"],
      "foodsToAvoid": ["string"],
      "whenToVisitDoctor": "string",
      "emergencySymptoms": ["string"],
      "references": ["string"],
      "iconName": "Activity"
    }
  ],
  "abnormalParameters": [
    {
      "id": "string",
      "name": "string",
      "category": "Hematology | Metabolic | Lipid | Liver | Kidney | Vitamins | Hormones",
      "value": number,
      "unit": "string",
      "normalRange": { "min": number, "max": number },
      "status": "high | low | critical",
      "explanation": "string",
      "importance": "string",
      "healthImpact": "string"
    }
  ],
  "normalParameters": [
    {
      "id": "string",
      "name": "string",
      "category": "Hematology | Metabolic | Lipid | Liver | Kidney | Vitamins | Hormones",
      "value": number,
      "unit": "string",
      "normalRange": { "min": number, "max": number },
      "status": "normal",
      "explanation": "string",
      "importance": "string",
      "healthImpact": "string"
    }
  ],
  "symptoms": ["string"],
  "riskFactors": ["string"],
  "possibleCauses": ["string"],
  "lifestyleCauses": ["string"],
  "recommendations": [
    {
      "id": "string",
      "category": "medication | diet | exercise | sleep | hydration",
      "title": "string",
      "description": "string",
      "dosageOrTarget": "string",
      "iconName": "Pill"
    }
  ],
  "followUpTests": ["string"],
  "doctorVisit": {
    "recommended": boolean,
    "timeframe": "string",
    "specialistType": "string",
    "reason": "string"
  },
  "emergencyWarnings": ["string"]
}`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert clinical AI engine on Sehat Suljhao. Always respond with strict, raw valid JSON matching the requested schema.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const rawContent = response.choices[0]?.message?.content || '{}';
    const parsedData = JSON.parse(rawContent);

    return NextResponse.json({ report: parsedData });
  } catch (error: any) {
    console.error('Groq Analyze API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze report using Groq AI engine',
        details: error?.message || String(error)
      },
      { status: 500 }
    );
  }
}
