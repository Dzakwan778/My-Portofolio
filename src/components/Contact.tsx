import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CHANNELS_DATA, PERSONAL_INFO } from "../data";
import { UserMessage } from "../types";
import LucideIcon from "./LucideIcon";

export default function Contact() {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load and sync messages from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wanma2_messages");
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage access failed", e);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMsg: UserMessage = {
        id: "msg-" + Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      };

      const updated = [newMsg, ...messages].slice(0, 5); // Kept top 5 latest
      setMessages(updated);
      try {
        localStorage.setItem("wanma2_messages", JSON.stringify(updated));
      } catch (err) {
        console.error("Store item error", err);
      }

      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 5000);
    }, 1200);
  };

  const clearMessages = () => {
    setMessages([]);
    try {
      localStorage.removeItem("wanma2_messages");
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black pb-36 scroll-mt-20">
      {/* Dynamic diagonal gradient glow in background */}
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-red-955/5 blur-[150px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-950/50 rounded-full mb-4">
            <LucideIcon name="MessageSquareText" className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">SPEC: TRANSMIT_SEC_05</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-transparent mt-4 rounded-full mx-auto" />
          <p className="text-zinc-500 text-sm mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Reach out to establish professional connections, propose custom vehicle dashboard designs, or host a competitive lobby match.
          </p>
        </div>

        {/* 2 Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Direct Channels lists */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <LucideIcon name="Zap" className="w-5 h-5 text-red-500" />
              <span>Direct Linkups</span>
            </h3>

            {CHANNELS_DATA.map((channel) => {
              const isCopied = copiedId === channel.id;
              return (
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  key={channel.id}
                  className={`p-6 rounded-3xl backdrop-blur-md relative overflow-hidden transition-all duration-300 ${
                    channel.primary
                      ? "bg-gradient-to-br from-red-950/40 via-red-900/10 to-transparent border border-red-500/25 shadow-lg shadow-red-950/15"
                      : "bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Brand Logo Sphere */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        channel.primary
                          ? "bg-gradient-to-br from-red-600 to-rose-600 text-white"
                          : "bg-zinc-900 text-zinc-400"
                      }`}>
                        <LucideIcon name={channel.iconName} className="w-5 h-5" />
                      </div>

                      {/* Display texts */}
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{channel.name}</p>
                        <p className="text-white text-base font-bold mt-0.5 font-mono">{channel.value}</p>
                      </div>
                    </div>

                    {/* Copy and Launch triggers */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(channel.value, channel.id)}
                        className={`p-2 rounded-xl text-xs transition-all pointer-events-auto cursor-pointer ${
                          isCopied
                            ? "bg-emerald-950/20 text-emerald-400 border border-emerald-900/30"
                            : "bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-400 hover:text-white"
                        }`}
                        title="Copy to Clipboard"
                      >
                        <LucideIcon name={isCopied ? "Check" : "Copy"} className="w-4 h-4" />
                      </button>

                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl text-xs transition-all ${
                          channel.primary
                            ? "bg-red-500 hover:bg-red-600 border border-red-400/20 text-white shadow-md"
                            : "bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-400 hover:text-white"
                        }`}
                        title={`Open ${channel.name}`}
                      >
                        <LucideIcon name="ArrowUpRight" className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {channel.primary && (
                    <div className="mt-4 pt-4 border-t border-red-950/40 flex items-center justify-between text-xs text-red-400/80">
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider">
                        <LucideIcon name="Phone" className="w-3 h-3 animate-bounce" />
                        PREFERED CHANNEL
                      </span>
                      <span className="font-semibold text-[10px]">Instant Whatsapp Direct Link</span>
                    </div>
                  )}

                </motion.div>
              );
            })}
          </div>

          {/* Column 2: Interactive Message Board */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            <div className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <LucideIcon name="Braces" className="w-5 h-5 text-red-500" />
                  <span>Transmit Local Message</span>
                </h3>

                {/* Main Submit Form */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Driver"
                        className="w-full bg-zinc-950 border border-zinc-900 focus:border-red-500/40 rounded-xl px-4 py-3 text-xs text-shading-300 text-white outline-none transition-all placeholder-zinc-700"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-zinc-950 border border-zinc-900 focus:border-red-500/40 rounded-xl px-4 py-3 text-xs text-shading-300 text-white outline-none transition-all placeholder-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Message Content</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hi WanMa2! I love your automotive and custom code project synergy. Let's build together..."
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-red-500/40 rounded-xl px-4 py-3 text-xs text-shading-300 text-white outline-none transition-all placeholder-zinc-700 resize-none h-24"
                    />
                  </div>

                  {/* Submission triggers */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto relative group overflow-hidden rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-red-950/20 hover:brightness-115 active:scale-95 transition-all text-center shrink-0 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                          <span>TRANSMITTING...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>Submit Message</span>
                          <LucideIcon name="Sparkles" className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </button>
                  </div>
                </form>

                {/* Sent confirmation notification card */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5"
                    >
                      <LucideIcon name="Check" className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                      <div>
                        <p className="font-bold">Transmission Complete!</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Your message has been stored in local diagnostics (LocalStorage) logs successfully below.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LIVE Submissions Board / Local Storage Terminal logs */}
              <div className="mt-8 border-t border-zinc-900/80 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold">WANMA2_DB_COMM_LOGS</span>
                  </div>

                  {messages.length > 0 && (
                    <button
                      onClick={clearMessages}
                      className="text-[9px] font-mono uppercase tracking-wider text-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      Flush Logs
                    </button>
                  )}
                </div>

                {messages.length === 0 ? (
                  <div className="bg-[#030303] border border-zinc-900 rounded-2xl p-6 text-center select-none">
                    <LucideIcon name="Database" className="w-6 h-6 text-zinc-800 mx-auto mb-2" />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">Lobby Message Stack Empty</p>
                    <p className="text-[9px] text-zinc-500 mt-1 max-w-xs mx-auto">Write your first post inside the form above to trigger real-time telemetry logs.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className="bg-[#030303] border border-zinc-900 rounded-xl p-3 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <LucideIcon name="User" className="w-3 h-3 text-red-500" />
                            {m.name}
                          </span>
                          <span className="text-[8px] font-mono text-zinc-600">{m.timestamp}</span>
                        </div>
                        <p className="text-zinc-400 text-xs mt-1.5 font-light pl-4.5 italic leading-relaxed">
                          "{m.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
