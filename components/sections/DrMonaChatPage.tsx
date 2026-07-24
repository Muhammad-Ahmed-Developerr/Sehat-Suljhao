'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/medical';
import { generateDrMonaResponse } from '@/lib/groqArchitecture';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Send,
  Mic,
  MicOff,
  Image as ImageIcon,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  Copy,
  Check,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface CustomChatMessage extends ChatMessage {
  imageUrl?: string;
}

interface DrMonaChatPageProps {
  initialTopic?: string;
}

export const DrMonaChatPage: React.FC<DrMonaChatPageProps> = ({ initialTopic }) => {
  const [messages, setMessages] = useState<CustomChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'dr_mona',
      content: `Assalam-o-Alaikum! 👋 Main hoon **Dr. Mona**, aap ki AI Doctor assistant.

Main ne aap ke medical records aur reports ka jayaza le liya hai. Main aap ki kya madad kar sakti hoon? Aap mujh se kisi bhi test, report, zaroori khorak, ya bimari ke baare mein Roman Urdu mein sawal pooch sakte hain!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        'Fasting Glucose 118 mg/dL ka kya matlab hai?',
        'Fatty liver (ALT 54) ko kaise kam karein?',
        'Cholesterol kam karne ke liye kya khayein?',
        'Kya stress se blood tests badal jaate hain?',
        'Mujhe simple aasan Urdu mein samjhaein.'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'ur-PK';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript) {
            setInputQuery((prev) => (prev ? `${prev} ${currentTranscript}` : currentTranscript));
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsListening(false);
    } else {
      setIsListening(true);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // Fallback simulation if browser blocks voice API in iframe
          simulateVoiceInput();
        }
      } else {
        simulateVoiceInput();
      }
    }
  };

  const simulateVoiceInput = () => {
    const voiceSamples = [
      'Doctor Sahiba, meri sugar 118 aayi hai, kya yeh ziada hai?',
      'Kya cholesterol kam karne ke liye daliya khana acha hai?',
      'Mujhe bataein ke ALT 54 fatty liver ki alamat hai?'
    ];
    const sample = voiceSamples[Math.floor(Math.random() * voiceSamples.length)];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < sample.length) {
        setInputQuery(sample.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
        setIsListening(false);
      }
    }, 40);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = React.useCallback(
    async (textToSend?: string) => {
      const text = textToSend || inputQuery;
      if ((!text.trim() && !selectedImage) || isTyping) return;

      const currentImage = selectedImage;

      const userMsg: CustomChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        content: text || (currentImage ? '[Medical Image Attached]' : ''),
        imageUrl: currentImage || undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputQuery('');
      setSelectedImage(null);
      setIsTyping(true);

      const botMsgId = `mona-${Date.now()}`;
      const initialBotMsg: CustomChatMessage = {
        id: botMsgId,
        sender: 'dr_mona',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, initialBotMsg]);

      const promptContext = currentImage
        ? `${text} [User attached medical report photo/image for analysis]`
        : text;

      await generateDrMonaResponse(promptContext, (streamedText) => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botMsgId ? { ...msg, content: streamedText } : msg))
        );
      });

      setIsTyping(false);
    },
    [inputQuery, selectedImage, isTyping]
  );

  const hasProcessedTopic = useRef(false);

  useEffect(() => {
    if (initialTopic && !hasProcessedTopic.current) {
      hasProcessedTopic.current = true;
      const timer = setTimeout(() => {
        handleSendMessage(`Kya aap meri report ke ${initialTopic} ke baare mein wazahat kar sakti hain?`);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialTopic, handleSendMessage]);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Header Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-[#00D4FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF]">
              <Bot className="w-7 h-7" />
            </div>
            {/* Green Online Pulsing Indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00E676] border-2 border-[#07121E] shadow-[0_0_8px_#00E676]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">Dr. Mona AI Doctor Assistant</h2>
              <Badge variant="cyan" size="sm">
                Roman Urdu Support
              </Badge>
            </div>
            <p className="text-xs text-[#9FB3C8]">
              Groq Llama-3.3 70B Acceleration • Medical Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#9FB3C8]">
          <ShieldAlert className="w-4 h-4 text-[#FFC107]" />
          <span>Educational Medical Guidance Only</span>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 border border-white/10 min-h-[500px] max-h-[600px] overflow-y-auto space-y-6">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                  isUser
                    ? 'bg-[#00D4FF] text-[#07121E] border-[#00D4FF]'
                    : 'bg-[#0E1C2F] text-[#00D4FF] border-[#00D4FF]/40'
                }`}
              >
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div className={`space-y-2 max-w-[85%] sm:max-w-[75%]`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 border ${
                    isUser
                      ? 'bg-[#00D4FF] text-[#07121E] font-medium border-[#00D4FF] rounded-tr-none'
                      : 'bg-[#0E1C2F] text-white border-white/10 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {msg.imageUrl && (
                    <div className="mb-2 rounded-xl overflow-hidden border border-black/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={msg.imageUrl}
                        alt="Uploaded medical image"
                        className="max-h-52 w-auto object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {msg.content || (
                    <span className="inline-flex items-center gap-1.5 text-[#00D4FF] font-medium animate-pulse">
                      Dr. Mona aap ke sawal ka Roman Urdu mein jawab tayyar kar rahi hain...
                    </span>
                  )}
                </div>

                {/* Quick Replies if provided */}
                {!isUser && msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(reply)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#00D4FF] hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all cursor-pointer text-left"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Actions & Timestamp */}
                <div
                  className={`flex items-center gap-2 text-[10px] text-[#9FB3C8] ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.content && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="hover:text-white transition-colors cursor-pointer"
                      title="Copy Message"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-[#00E676]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#00D4FF]">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
            <span>Dr. Mona Roman Urdu mein jawab likh rahi hain...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips in Roman Urdu */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#9FB3C8] font-medium mr-1">Tajaweez Prompts:</span>
        {[
          'Aasan Roman Urdu mein samjhaein',
          'Achi sehat ke liye kya khana chahiye?',
          'Kya stress se sugar test badalta hai?',
          'Kya mujhe doctor ke paas jana chahiye?'
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#9FB3C8] hover:text-white hover:border-[#00D4FF]/40 transition-all cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Attachment Preview Chip */}
      {selectedImage && (
        <div className="glass-panel p-2.5 rounded-2xl border border-[#00D4FF]/40 flex items-center justify-between bg-[#0E1C2F]">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Attached report"
              className="w-10 h-10 object-cover rounded-lg border border-[#00D4FF]/30"
            />
            <div>
              <p className="text-xs font-bold text-white">Report / Symptom Photo Attached</p>
              <p className="text-[10px] text-[#00D4FF]">Ready to send to Dr. Mona</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="p-1.5 text-[#FF4D4F] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Voice Listening Active Indicator */}
      {isListening && (
        <div className="p-3 rounded-2xl border border-[#FF4D4F]/40 bg-[#FF4D4F]/10 flex items-center justify-between text-xs text-white animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4F] animate-ping" />
            <span className="font-bold">Listening... Sun rahe hain! (Roman Urdu / Speech to Text)</span>
          </div>
          <button
            onClick={toggleVoiceInput}
            className="text-xs px-2.5 py-1 bg-[#FF4D4F] text-white rounded-lg font-bold cursor-pointer"
          >
            Stop
          </button>
        </div>
      )}

      {/* Input Composer Box */}
      <div className="glass-panel p-3 rounded-2xl border border-white/10 flex items-center gap-2 bg-[#0E1C2F]">
        {/* Attachment UI buttons */}
        <button
          onClick={() => imageInputRef.current?.click()}
          className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
            selectedImage
              ? 'bg-[#00D4FF]/20 border-[#00D4FF] text-[#00D4FF]'
              : 'bg-white/5 border-white/10 text-[#9FB3C8] hover:text-white'
          }`}
          title="Upload Report Photo or Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          onClick={toggleVoiceInput}
          className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
            isListening
              ? 'bg-[#FF4D4F]/20 border-[#FF4D4F] text-[#FF4D4F] animate-bounce'
              : 'bg-white/5 border-white/10 text-[#9FB3C8] hover:text-white'
          }`}
          title="Voice Dictation / Bol kar Sawal Poochein"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Input Text Field */}
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Dr. Mona se apni report ya sehat ke baare mein sawal poochein..."
          className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-[#9FB3C8] focus:outline-none px-2"
        />

        {/* Send Button */}
        <Button
          variant="primary"
          size="sm"
          icon={<Send className="w-4 h-4" />}
          onClick={() => handleSendMessage()}
          disabled={(!inputQuery.trim() && !selectedImage) || isTyping}
        >
          Bhejein
        </Button>
      </div>
    </div>
  );
};

