'use client';

import { useEffect, useState } from 'react';

interface ChatSession {
  id: number;
  timestamp: string;
  messages: string[];
}

export default function Chat() {
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(false);

  // Load chat sessions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('chatSessions');
    if (stored) {
      const parsed: ChatSession[] = JSON.parse(stored);
      setSessions(parsed);
      setCurrentSession(parsed[parsed.length - 1] || null); // Show latest by default
    }
  }, []);

  // Save chat sessions when they update
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = `You: ${input}`;
    const updatedSession = {
      ...currentSession!,
      messages: [...(currentSession?.messages || []), userMessage],
    };
    setCurrentSession(updatedSession);
    setLoading(true);

    try {
      // Simulate an API call (replace this with a real one)
      const res = await fetch('https://api.example.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMessage = `Bot: ${data.reply}`;
      updatedSession.messages.push(botMessage);
    } catch (error) {
      updatedSession.messages.push('Bot: Sorry, something went wrong.');
    }

    // Save to sessions
    const updatedSessions = sessions.map((s) =>
      s.id === updatedSession.id ? updatedSession : s
    );
    setSessions(updatedSessions);
    setCurrentSession(updatedSession);
    setInput('');
    setLoading(false);
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      messages: [],
    };
    setSessions((prev) => [...prev, newSession]);
    setCurrentSession(newSession);
  };

  const handleSelectSession = (id: number) => {
    const session = sessions.find((s) => s.id === id);
    if (session) setCurrentSession(session);
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-accent">Ask the AI</h2>
        <button
          onClick={handleNewChat}
          className="text-sm text-accent hover:underline"
        >
          + New Chat
        </button>
      </div>

      {/* Sidebar for past chats */}
      {sessions.length > 0 && (
        <div className="flex gap-4">
          <aside className="w-1/4 border-r pr-4">
            <h3 className="text-sm font-semibold mb-2">Past Conversations</h3>
            <ul className="space-y-2 text-sm text-textMain">
              {sessions.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleSelectSession(s.id)}
                    className={`w-full text-left hover:text-accent ${
                      currentSession?.id === s.id ? 'font-bold text-accent' : ''
                    }`}
                  >
                    {s.timestamp}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Chatbox */}
          <section className="w-3/4">
            {currentSession ? (
              <>
                <div className="space-y-2 max-h-64 overflow-y-auto border p-2 rounded bg-gray-50 mb-4">
                  {currentSession.messages.length === 0 ? (
                    <p className="text-gray-400 italic">No messages yet.</p>
                  ) : (
                    currentSession.messages.map((msg, idx) => (
                      <p key={idx} className="text-gray-700">{msg}</p>
                    ))
                  )}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 border p-2 rounded"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-accent text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </>
            ) : (
              <p className="text-gray-500 italic">Select a conversation or start a new chat.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
