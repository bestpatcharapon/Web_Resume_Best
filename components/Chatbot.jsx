"use client";

import { useEffect, useRef, useState } from "react";

const BOT_AVATAR = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9 7H4l3.5 5L6 17l6-3 6 3-1.5-5L20 7h-5L12 2z" />
  </svg>
);

const USER_AVATAR = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SUGGESTIONS = [
  { prompt: "Best ทำอะไรบ้าง?", label: "Best ทำอะไรบ้าง?" },
  { prompt: "ทักษะของ Best มีอะไรบ้าง?", label: "ทักษะ" },
  { prompt: "ประสบการณ์ทำงานของ Best?", label: "ประสบการณ์" },
];

const GREETING = "สวัสดีครับ! ผม Best Bot AI ผู้ช่วยประจำ Portfolio ของ Best นะครับ ถามอะไรได้เลย!";

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatBotMessage(text) {
  let content = escapeHtml(text);
  content = content.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>'
  );
  content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  content = content.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return content;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    const onOutsideClick = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", onOutsideClick);
    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onOutsideClick);
    };
  }, [isOpen]);

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.result || "เกิดข้อผิดพลาด ลองใหม่นะ 😅" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "ไม่สามารถเชื่อมต่อได้ ลองใหม่นะครับ 😅" },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="chatbot-widget" id="chatbotWidget" ref={widgetRef}>
      <button
        className="chatbot-toggle"
        id="chatbotToggle"
        title="Chat with AI Assistant"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="chat-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ display: isOpen ? "none" : "block" }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg
          className="close-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span className="chatbot-badge" id="chatbotBadge">AI</span>
      </button>

      <div className={`chatbot-window ${isOpen ? "open" : ""}`} id="chatbotWindow">
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L9 7H4l3.5 5L6 17l6-3 6 3-1.5-5L20 7h-5L12 2z" />
              </svg>
            </div>
            <div>
              <h3>Best AI</h3>
              <span className="chatbot-status">
                <span className="status-dot"></span>
                Online
              </span>
            </div>
          </div>
          <button className="chatbot-close" id="chatbotClose" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages" id="chatbotMessages" ref={messagesRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <div className={`message-avatar ${msg.sender === "user" ? "user-avatar" : "bot-avatar"}`}>
                {msg.sender === "user" ? USER_AVATAR : BOT_AVATAR}
              </div>
              {msg.sender === "bot" ? (
                <div
                  className="message-bubble"
                  dangerouslySetInnerHTML={{ __html: formatBotMessage(msg.text) }}
                />
              ) : (
                <div className="message-bubble">{msg.text}</div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot-message typing-message">
              <div className="message-avatar bot-avatar">{BOT_AVATAR}</div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="chatbot-input-area">
          {showSuggestions && (
            <div className="chatbot-suggestions" id="chatbotSuggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s.prompt} className="suggestion-chip" onClick={() => sendMessage(s.prompt)}>
                  {s.label}
                </button>
              ))}
            </div>
          )}
          <form
            className="chatbot-form"
            id="chatbotForm"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              className="chatbot-input"
              id="chatbotInput"
              placeholder="ถาม AI เกี่ยวกับ Best..."
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />
            <button type="submit" className="chatbot-send" id="chatbotSend" disabled={isLoading}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
