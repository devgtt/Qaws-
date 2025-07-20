"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
  timestamp: Date;
  language?: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "محادثة جديدة",
      messages: [],
      createdAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    let chatToUpdate = currentChat;

    if (!chatToUpdate) {
      createNewChat();
      chatToUpdate = {
        id: Date.now().toString(),
        title: input.slice(0, 50) + (input.length > 50 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
      };
      setChats((prev) => [chatToUpdate!, ...prev]);
      setCurrentChatId(chatToUpdate.id);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: "user",
      timestamp: new Date(),
    };

    const updatedChat = {
      ...chatToUpdate,
      messages: [...chatToUpdate.messages, userMessage],
      title:
        chatToUpdate.messages.length === 0
          ? input.slice(0, 50) + (input.length > 50 ? "..." : "")
          : chatToUpdate.title,
    };

    setChats((prev) =>
      prev.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat))
    );
    setInput("");
    setIsGenerating(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `// ${selectedLanguage.toUpperCase()} كود تم إنشاؤه\n\n\`\`\`${selectedLanguage}\n// كود نموذجي لـ: ${
          userMessage.content
        }\nfunction generateCode() {\n  console.log("هذه استجابة نموذجية");\n  // أضف منطقك هنا\n  return "كود تم إنشاؤه بناءً على طلبك";\n}\n\ngenerateCode();\n\`\`\`\n\nهذه استجابة نموذجية. في التطبيق الحقيقي، سيتم ربط هذا بنموذج ذكاء اصطناعي مثل GPT أو DeepSeek لإنشاء كود فعلي بناءً على متطلباتك.`,
        type: "assistant",
        timestamp: new Date(),
        language: selectedLanguage,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === updatedChat.id
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat
        )
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const extractCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        if (textBefore.trim()) {
          blocks.push({ type: "text", content: textBefore });
        }
      }

      // Add code block
      blocks.push({
        type: "code",
        language: match[1] || "text",
        content: match[2],
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      if (remainingText.trim()) {
        blocks.push({ type: "text", content: remainingText });
      }
    }

    return blocks.length > 0 ? blocks : [{ type: "text", content }];
  };

  const languageOptions = {
    javascript: "جافا سكريبت",
    typescript: "تايب سكريبت",
    python: "بايثون",
    java: "جافا",
    cpp: "سي++",
    csharp: "سي شارب",
    go: "جو",
    rust: "رست",
    php: "بي اتش بي",
    ruby: "روبي",
  };

  return (
    <div className="flex h-screen arabic-text">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-500 ease-out overflow-hidden sidebar`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[var(--border)]">
            <button
              onClick={createNewChat}
              className="w-full px-6 py-3 btn-primary text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium text-sm"
            >
              <span className="flex items-center justify-center space-x-2 space-x-reverse">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>محادثة جديدة</span>
              </span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chats.map((chat, index) => (
              <button
                key={chat.id}
                onClick={() => setCurrentChatId(chat.id)}
                className={`w-full p-4 text-right rounded-xl transition-all duration-300 glass-hover ${
                  currentChatId === chat.id
                    ? "glass border-[var(--primary-solid)] bg-[var(--accent)]"
                    : "glass border-[var(--border)] hover:border-[var(--border-hover)]"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="truncate font-medium text-[var(--card-foreground)]">
                  {chat.title}
                </div>
                <div className="text-xs opacity-60 mt-1 text-[var(--muted-foreground)]">
                  {chat.createdAt.toLocaleDateString("ar-SA")}
                </div>
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-[var(--border)]">
            <div className="text-center">
              <div className="gradient-text font-bold text-lg mb-2">
                مولد الأكواد المحترف
              </div>
              <div className="text-xs opacity-70 text-[var(--muted-foreground)]">
                مدعوم بالذكاء الاصطناعي • إنشاء أكواد احترافية
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6 header">
          <div className="flex items-center space-x-4 space-x-reverse">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all duration-300"
            >
              {Object.entries(languageOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <h1 className="text-2xl font-bold gradient-text">
            {currentChat?.title || "مولد الأكواد المحترف"}
          </h1>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 glass rounded-xl transition-all duration-300 hover:bg-[var(--card-hover)]"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                !sidebarOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {!currentChat && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md float-animation">
                <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></div>
                  <svg
                    className="w-10 h-10 text-white relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  مرحباً بك في مولد الأكواد المحترف
                </h2>
                <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                  أنشئ أكواد عالية الجودة بأي لغة برمجة. فقط اوصف ما تحتاجه
                  وسأقوم بإنشائه لك.
                </p>
                <button
                  onClick={createNewChat}
                  className="px-8 py-4 btn-primary text-white rounded-xl transition-all duration-300 font-medium text-lg"
                >
                  ابدأ البرمجة
                </button>
              </div>
            </div>
          )}

          {currentChat && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {currentChat.messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-start" : "justify-end"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`max-w-[80%] chat-message rounded-2xl p-6 ${
                      message.type === "user"
                        ? "btn-primary text-white"
                        : "glass border border-[var(--border)]"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-xs opacity-70 ml-auto">
                        {message.timestamp.toLocaleTimeString("ar-SA")}
                      </span>
                      <span className="text-sm font-medium mr-3">
                        {message.type === "user" ? "أنت" : "مولد الأكواد"}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          message.type === "user"
                            ? "bg-white bg-opacity-20"
                            : "bg-gradient-to-r from-blue-500 to-purple-500"
                        }`}
                      >
                        {message.type === "user" ? "أ" : "ذ"}
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none">
                      {extractCodeBlocks(message.content).map(
                        (block, blockIndex) => (
                          <div key={blockIndex}>
                            {block.type === "text" ? (
                              <div className="whitespace-pre-wrap leading-relaxed">
                                {block.content}
                              </div>
                            ) : (
                              <div className="my-6">
                                <div className="flex items-center justify-between glass px-4 py-3 rounded-t-xl border-b border-[var(--border)]">
                                  <button
                                    onClick={() =>
                                      navigator.clipboard.writeText(
                                        block.content
                                      )
                                    }
                                    className="copy-btn px-3 py-1 rounded-lg text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all duration-200"
                                  >
                                    نسخ
                                  </button>
                                  <span className="text-sm font-medium text-[var(--muted-foreground)] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    {block.language}
                                  </span>
                                </div>
                                <pre
                                  className="rounded-t-none m-0 text-sm"
                                  dir="ltr"
                                >
                                  <code>{block.content}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex justify-end">
                  <div className="glass rounded-2xl p-6 border border-[var(--border)]">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-sm text-[var(--muted-foreground)]">
                        جاري إنشاء الكود...
                      </span>
                      <div className="loading-dots">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-[var(--border)] glass">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4 space-x-reverse">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اوصف الكود الذي تريد إنشاءه..."
                  className="w-full p-6 pl-16 glass rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--ring)] min-h-[80px] max-h-[200px] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-all duration-300"
                  rows={1}
                  style={{
                    height: "auto",
                    minHeight: "80px",
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height =
                      Math.min(target.scrollHeight, 200) + "px";
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isGenerating}
                  className="absolute left-4 bottom-4 p-3 btn-primary text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-6 h-6 rtl-flip"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-[var(--muted-foreground)]">
              <span className="opacity-70">
                اللغة:{" "}
                {
                  languageOptions[
                    selectedLanguage as keyof typeof languageOptions
                  ]
                }
              </span>
              <span className="opacity-70">
                اضغط Enter للإرسال، Shift + Enter للسطر الجديد
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
