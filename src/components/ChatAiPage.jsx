import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Zap, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatAiPage = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to SheFund AI! Ask anything about your finances, goals, or chamas. You can also press the mic to talk." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef(null);

  // Setup Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error("Web Speech API is not supported by this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput(prevInput => prevInput + finalTranscript);
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => console.error('Speech recognition error:', event.error);

    recognitionRef.current = recognition;
  }, []);

  // Build a short personal finance context summary from dashboard data
  const getPersonalFinanceContext = () => {
    // Example: Replace with dynamic data if available
    return [
      "Personal Finance Context:",
      "- Total Balance: KES 85,230",
      "- Financial Goals:",
      "    • Sewing Machine: KES 35,000 saved of 50,000 goal",
      "    • Education Fund: KES 120,000 saved of 250,000 goal",
      "    • Emergency Fund: KES 45,000 saved of 75,000 goal",
      "- Chamas:",
      "    • Nairobi Business Queens (Member, KES 5,000 due)",
      "    • Kilimani Young Mothers (Treasurer, KES 2,000 due)",
      "- Credit Score: 680",
      "- Achievements: Saver Pro, Chama Star, Budget Master"
    ].join('\n');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    const contextSummary = getPersonalFinanceContext();
    let extraPrompt = "";
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("invest") || lowerInput.includes("stock") || lowerInput.includes("mmf")) {
      extraPrompt = "Give 3 real-life Kenyan investment options for this profile, with pros and cons.";
    } else if (lowerInput.includes("save") || lowerInput.includes("saving") || lowerInput.includes("mali")) {
      extraPrompt = "Recommend saving methods or digital platforms (like Safaricom’s Mali or MMFs) suitable for low-income earners.";
    }
    const fullPrompt = `${contextSummary}\n\nUser question: ${input}${extraPrompt ? `\n${extraPrompt}` : ""}`;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    try {
      const response = await fetch("http://localhost:5000/api/ai/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          model: "gpt-3.5-turbo"
        })
      });
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "No response.";
      if (voiceEnabled) speak(aiReply);
      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch (err) {
      setError("Failed to get AI response.");
    }
    setLoading(false);
  };

  // Text-to-speech function
  const speak = (text) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle listening
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-white to-purple-300 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-end mb-2">
          <button
            className={`px-3 py-1 rounded ${voiceEnabled ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'} font-semibold text-sm`}
            onClick={() => {
              if (voiceEnabled && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel(); // Stop speech immediately
              }
              setVoiceEnabled(v => !v);
            }}
            title={voiceEnabled ? 'Turn off AI voice' : 'Turn on AI voice'}
          >
            {voiceEnabled ? '🔊 Voice On' : '🔇 Voice Off'}
          </button>
        </div>
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-pink-600 hover:text-pink-700">
          <ArrowLeft className="mr-2" /> Back
        </button>
  <h2 className="text-2xl font-bold text-pink-600 mb-4">SheFund AI Chat</h2>
        <div className="h-96 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.role === "user" ? "bg-pink-100 text-right" : "bg-indigo-100 text-left"}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="Type your question..."
            className="flex-1 pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-transparent transition"
            disabled={loading}
          />
          <button
            type="button"
            onClick={toggleListening}
            className={`bg-white border ${isListening ? 'border-pink-500' : 'border-gray-300'} text-pink-500 font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center`}
            title={isListening ? "Listening..." : "Start voice input"}
            disabled={loading}
          >
            <Mic className={isListening ? "animate-pulse" : ""} />
          </button>
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            <Zap />
          </button>
        </div>
        {isListening && <div className="text-pink-500 mt-2 text-sm">Listening... Speak now!</div>}
      </div>
    </div>
  );
};

export default ChatAiPage;
