import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const GROQ_KEY = process.env.GROQ_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { messages, reportContext } = await req.json();

    const groq = new Groq({ apiKey: GROQ_KEY });

    const systemMessage = {
      role: 'system' as const,
      content: `You are Dr. Mona, a compassionate, highly skilled, and professional AI Medical Assistant on the "Sehat Suljhao" platform.

CRITICAL LANGUAGE MANDATE:
- You MUST ALWAYS speak and answer in natural, fluent ROMAN URDU (Urdu written in Roman/English alphabet, e.g. "Aap ki report ke mutabiq aap ke blood test results...").
- DO NOT use Hindi vocabulary or Hindi Devanagari transliterated terms.
  * NEVER use: "swasthya", "parinaam", "sampark", "samagri", "margdarshan", "adhik", "dhyan rahein", "bhaag".
  * ALWAYS use Roman Urdu equivalents: "sehat", "nateeja / results", "raabta / mashwara", "maloomat", "rahnumai", "ziyada", "khayal rakhein", "hissa".
- Keep responses warm, professional, easy to understand, and well-structured with clear bullet points.
- Always include a polite reminder in Roman Urdu that your advice is for guidance and patient should consult a licensed doctor.

${reportContext ? `Patient's Current Report Context:\n${reportContext}` : ''}`
    };

    const formattedMessages = [
      systemMessage,
      ...(messages || []).map((m: any) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.content
      }))
    ];

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMessages,
      temperature: 0.3,
      max_tokens: 1024
    });

    const reply = response.choices[0]?.message?.content || 'Aap ki report aur sawal ko samajhne ke baad main aap ki poori madad ke liye tayyar hoon. Baraye meharbani apne sawal ko wazeh karein.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Groq Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate AI response from Dr. Mona',
        details: error?.message || String(error)
      },
      { status: 500 }
    );
  }
}

