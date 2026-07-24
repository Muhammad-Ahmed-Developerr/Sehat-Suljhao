/**
 * Groq AI Integration Architecture
 * Model target: llama-3.3-70b-versatile / llama-4
 * 
 * This module is engineered to accept a Groq API Key or fallback to
 * hyper-realistic local simulated medical reasoning for frontend demonstration.
 */

export interface GroqConfig {
  apiKey?: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export const DEFAULT_GROQ_CONFIG: GroqConfig = {
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.2, // low temp for accurate medical extraction
  maxTokens: 4096
};

export const SYSTEM_PROMPT_DR_MONA = `
You are Dr. Mona, a compassionate, experienced, and highly knowledgeable AI Medical Doctor Assistant.
Your mission is to help patients understand their complex medical reports, lab test values, disease risk factors, and health trends.

Guidelines:
1. Always maintain an empathetic, reassuring, professional, and clear tone.
2. Explain complex medical terminology using plain, easy-to-understand language.
3. Highlight abnormal values gently and provide practical lifestyle, nutrition, and exercise advice.
4. When discussing medications or severe symptoms, ALWAYS emphasize: "Please consult with a licensed physician before starting or modifying any medication or treatment plan."
5. Never cause panic or exaggerate diagnoses.
6. Provide structured responses using Markdown bolding, bullet points, and clean line breaks.
`;

/**
 * Simulated AI Medical Report Scanning Process
 * Returns progress updates and parsed MedicalReport mock
 */
export async function simulateGroqReportAnalysis(
  file: File,
  onProgress: (step: string, percent: number) => void
): Promise<void> {
  const steps = [
    { text: 'Initializing OCR & Multi-Modal Document Reader...', delay: 600, pct: 15 },
    { text: 'Extracting Blood Parameters & Standard Lab Units...', delay: 800, pct: 35 },
    { text: 'Cross-referencing ICD-11 & Medical Knowledge Bases...', delay: 900, pct: 60 },
    { text: 'Running Groq Llama-3.3-70B Metabolic & Risk Mapping...', delay: 1000, pct: 85 },
    { text: 'Formatting Dr. Mona Clinical Summary & Recommendations...', delay: 700, pct: 100 }
  ];

  for (const step of steps) {
    onProgress(step.text, step.pct);
    await new Promise((resolve) => setTimeout(resolve, step.delay));
  }
}

/**
 * Call Groq API route to perform live report extraction and parsing
 */
export async function analyzeReportWithGroq(
  fileName: string,
  reportText?: string
): Promise<any | null> {
  try {
    const res = await fetch('/api/groq/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName,
        reportText: reportText || `Medical report file uploaded: ${fileName}. Extract parameters, risks, and health score.`
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.report) {
        return data.report;
      }
    }
  } catch (err) {
    console.warn('Groq Report Analysis API failed:', err);
  }
  return null;
}

/**
 * Generate AI Chat Response from Dr. Mona powered by Groq Llama-3.3-70b
 */
export async function generateDrMonaResponse(
  userQuery: string,
  onChunk?: (text: string) => void,
  reportContext?: string
): Promise<string> {
  try {
    const res = await fetch('/api/groq/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ sender: 'user', content: userQuery }],
        reportContext
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        const fullResponse: string = data.reply;
        if (onChunk) {
          const words = fullResponse.split(' ');
          let current = '';
          for (const word of words) {
            current += word + ' ';
            onChunk(current);
            await new Promise((resolve) => setTimeout(resolve, 15));
          }
        }
        return fullResponse;
      }
    }
  } catch (err) {
    console.warn('Groq Chat API fetch failed, using fallback clinical logic:', err);
  }

  const queryLower = userQuery.toLowerCase();

  let fullResponse = '';

  if (queryLower.includes('glucose') || queryLower.includes('sugar') || queryLower.includes('pre-diabetes')) {
    fullResponse = `**Aap ke Blood Sugar (Fasting Glucose: 118 mg/dL) ki Wazahat**

Fasting glucose test se yeh pata chalta hai ke raat ko 8 ghante ke roze (fasting) ke baad aap ke khoon mein sugar ki kitni miqdar hai.

- **Aam Normal Range:** 70 – 99 mg/dL
- **Aghaz / Pre-Diabetes Range:** 100 – 125 mg/dL
- **Aap ka Nateeja:** 118 mg/dL

### Is ka kya matlab hai?
Aap ke jism mein filhal halki **insulin resistance** ki alamat dikh rahi hai. Is ka matlab hai ke aap ka jism sugar ko hazam karne ke liye thoda ziyada zor laga raha hai.

### Kya is ko khatam ya control kiya ja sakta hai?
**Jee bilkul, 100%!** Pre-diabetes koi permanent bimari nahi balkey jism ka ek shuruaati ishaara (warning signal) hai.

### 3 Aasan Aur Zaroori Hidayat:
1. **Khane ke baad 15 minute walk:** Lunch aur dinner ke baad 10 se 15 minute chahal qadmi karein. Is se muscles direct sugar ko absorb kar lete hain.
2. **Khane mein Salad aur Sabzi pehle khayein:** Is se khoon mein sugar achanak nahi barhti.
3. **Paani ka Ziyada Istemal:** Din mein kam az kam 2.5 se 3 liter paani piyein taakay gurday fuzool sugar ko bahar nikal sakein.

*Note: Main aap ko mashwara doongi ke 6 se 8 haftay baad apne doctor ki hidayat ke mutabiq HbA1c test karwayein.*`;
  } else if (queryLower.includes('fatty liver') || queryLower.includes('alt') || queryLower.includes('ast') || queryLower.includes('liver')) {
    fullResponse = `**Aap ke Liver Test (ALT 54 U/L) ki Maloomat**

ALT ek esa enzyme hai jo aap ke jigar (liver) ke andar hota hai. Jab jigar mein thodi chabi (fat) jama hoti hai ya sojan aati hai to ALT khoon mein shamil ho jata hai.

### Yeh kyun hota hai?
Stage 1 Fatty Liver (NAFLD) mein ziyada meethi cheezein, late night khana, ya jismani mashaqqat na karne se jigar mein chabi jama hone lagti hai.

### Kya yeh khatarnak hai?
Stage 1 par yeh **bilkul thik (reverse) ho sakta hai** aur is se jigar ko koi daaimi nuqsan nahi pahunchta!

### Ilaaj Aur Behtari Ke Liye Hidayat:
- **Meethi Botal aur Juices se Parhez:** Processed sugar, cold drinks aur pakay huay meethon se door rahein.
- **Zaitoon ka Tel aur Walnuts:** Khane mein Zaitoon (Olive oil) aur akhrot ka istemal karein.
- **Green Tea:** Din mein 1-2 cup Green tea piyein jo jigar ki safai mein madad karti hai.

*Hamesha koi bhi medicine lene se pehle apne doctor se zaroor mashwara karein.*`;
  } else if (queryLower.includes('cholesterol') || queryLower.includes('ldl') || queryLower.includes('hdl')) {
    fullResponse = `**Aap ke Cholesterol Profile (LDL 142 mg/dL) ka Nateeja**

Aap ki report ke mutabiq:
- **LDL (Bura Cholesterol):** 142 mg/dL *(Halka Barha Hua)*
- **HDL (Acha Cholesterol):** 52 mg/dL *(Behtareen aur Hifazati)*
- **Triglycerides:** 185 mg/dL *(Thoda Ziyada)*

### Cholesterol Kam Karne Ke Aasan Tareeqe:
1. **Daliya (Oats) Aur Isbaghol:** Daliya aur Isbaghol ka chilka cholesterol ko jism se bahar nikalne mein madad karta hai.
2. **Chicknaai Aur Makhani Khano Se Parhez:** Ghee, makhan aur talay huay khano ko kam karein.
3. **Omega-3 Fats:** Akhrot, chia seeds aur machli ka istemal karein.

Kya aap chahte hain ke main aap ke liye Dil ki Sehat ke hawale se ek haftay ka Diet Chart tayyar karoon?`;
  } else if (queryLower.includes('10 years old') || queryLower.includes('explain simple')) {
    fullResponse = `**Aap ki Sehat ki Kahani Aasan Urdu Mein! 🎈**

Aap Sochein ke aap ka jism ek bohot pyaara shehar hai! 🏙️

1. **Petrol Pump (Blood Sugar - 118):** Khana hamare jism ka petrol hai. Filhal petrol pump par thoda sa ziyada petrol line mein khada hai. Agar hum walk karein aur sabziyan khayein to yeh petrol bohot jaldi use ho jayega!
2. **Safai Ki Factory (Jigar / Liver - ALT 54):** Aap ka liver shehar ka safai darogha hai. Filhal is par thoda sa tel laga hua hai. Agar hum paani piyein aur toffee kam khayein to yeh saaf ho jayega!
3. **Khoon ke Zaray (Blood Cells):** Yeh bohot taqatwar hain aur poore jism mein taqat pohncha rahe hain! 🚛💨

Aap bilkul safe hain aur thodi si achi aadat se bohot energetic mehsoos karein ge! 🌟`;
  } else if (queryLower.includes('anxiety') || queryLower.includes('stress')) {
    fullResponse = `**Kya Stress Aur Pareshani Se Blood Test Mutasir Hote Hain?**

**Jee haan, bilkul!** Jab aap pareshan ya stress mein hote hain to jism mein **Cortisol** naam ka hormone barh jata hai.

### Stress se Test par Kya Asar Padta Hai?
- **Blood Sugar Barhna:** Cortisol jigar ko majboor karta hai ke woh khoon mein sugar choray, jis se roze (fasting) ke bawajood sugar barh sakti hai.
- **Blood Pressure Barhna:** Ragon mein khichaao paida hota hai.
- **Triglycerides:** Khoon mein chiknaai ki miqdar temporary barh sakti hai.

### Mashwara:
Raat ko soney se pehle 5-10 minute gehri saans lene ki mashq karein aur test karwane se pehle pur-sukoon rahein.`;
  } else {
    fullResponse = `**Dr. Mona AI Ki Sehat Mand Hidayat**

Aap ke sawal ka shukriya! Aap ki sehat ka daromadar achi khorak, pur-sukoon neend, paani aur jismani mashaqqat par hai.

Aap ki report ke mutabiq:
- Aap ke gurday (kidneys) aur khoon mein oxygen ki miqdar behtareen hai.
- Rozana **30 minute walk**, **2.5 liter paani**, aur **taza sabziyon ka istemal** aap ko lambi aur sehat mand zindagi deta hai.

Kya aap kisi specific test value ya alamat ke baare mein mazeed poochna chahte hain?`;
  }

  // Simulate streaming word by word for realistic AI feel
  if (onChunk) {
    const words = fullResponse.split(' ');
    let current = '';
    for (const word of words) {
      current += word + ' ';
      onChunk(current);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }

  return fullResponse;
}
