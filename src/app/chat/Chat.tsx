'use client';

import { useEffect, useRef, useState } from 'react';
import { PaperPlaneIcon, StopIcon } from '@radix-ui/react-icons';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat({ onFirstInteraction }: { onFirstInteraction: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onFirstInteraction();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    textareaRef.current?.style.setProperty('height', 'auto');
    setIsLoading(true);

    const fullReply = `Here's a test reply to: "${userMessage.content}"`;
    const replyId = (Date.now() + 1).toString();

    setMessages((prev) => [...prev, { id: replyId, role: 'assistant', content: '' }]);

    let i = 0;
    intervalRef.current = setInterval(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === replyId ? { ...msg, content: fullReply.slice(0, i + 1) } : msg
        )
      );
      i++;
      if (i === fullReply.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsLoading(false);
      }
    }, 8);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full relative">
      {/* Chat scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-44 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="flex w-full justify-center">
            <div
              className={`w-full max-w-3xl flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } items-start gap-2`}
            >
              {message.role === 'assistant' && (
                <img
                  src="/bot-icon.png"
                  alt="Bot"
                  className="h-10 w-10 rounded-full mt-1"
                />
              )}
              <div
                className={`inline-block text-sm break-words max-w-[70%] ${
                  message.role === 'user'
                    ? 'px-5 py-3 bg-white text-gray-900 rounded-2xl border border-gray-200 shadow-md'
                    : 'text-gray-900 mt-3'
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Chat input fixed at bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-lightGreen z-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 pb-4 pt-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 p-4 border border-gray-300 bg-white rounded-2xl shadow-md w-full"
          >
            <textarea
              ref={textareaRef}
              className="flex-1 resize-none border-none bg-transparent outline-none text-base text-gray-900 placeholder:text-gray-400 max-h-48 min-h-[72px] leading-relaxed py-2 overflow-y-auto"
              value={input}
              placeholder="Send a message..."
              onChange={(e) => {
                setInput(e.target.value);
                if (textareaRef.current) {
                  textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={3}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={isLoading ? handleStop : handleSubmit}
              className="p-3 rounded-full bg-accent text-white hover:bg-green-700 transition disabled:opacity-50"
            >
              {isLoading ? (
                <StopIcon className="h-5 w-5" />
              ) : (
                <PaperPlaneIcon className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
