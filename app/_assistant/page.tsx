'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const AssistantPage = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm Bastian's digital assistant. I can tell you about his research in AI, his background in Mechanical Engineering, or his project history. What would you like to know?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate response based on Bastian's info
        setTimeout(() => {
            let response = "That's an interesting question! Bastian is currently focusing on Intelligent and Learning Systems at Hof University. He has a unique perspective spanning from Mechanical Engineering to AI.";

            const lowerInput = input.toLowerCase();
            if (lowerInput.includes('research') || lowerInput.includes('hof')) {
                response = "Bastian's research at Hof University (iisys) focuses on Intelligent and Learning Systems. He's particularly interested in bridging software intelligence with mechanical applications.";
            } else if (lowerInput.includes('education') || lowerInput.includes('dresden')) {
                response = "Bastian studied Mechanical Engineering at the Technical University of Dresden from 2015 to 2020. This foundation helps him understand the physical systems that AI often controls.";
            } else if (lowerInput.includes('projects') || lowerInput.includes('work')) {
                response = "Some of Bastian's key projects include evaluating 5G for road rollers, creating AI-driven damage detection for vehicles, and developing an IoT 'Bandage Assistant'.";
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response
            }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-32 pb-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Portfolio <span className="text-gradient">Assistant</span></h1>
                        <p className="text-zinc-500 text-sm">Ask anything about Bastian's expertise</p>
                    </div>
                    <Link href="/" className="text-sm font-medium text-primary hover:underline">
                        ← Back to Portfolio
                    </Link>
                </div>

                <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col mb-6">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-foreground rounded-tl-none'
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none animate-pulse">
                                    Bastian's assistant is thinking...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t border-border-color bg-card-bg/30">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about my research, projects, or background..."
                                className="flex-1 bg-white dark:bg-zinc-900 border border-border-color rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                    {['Research at Hof', 'Dresden Education', '5G Projects', 'AI Expertise'].map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setInput(suggestion)}
                            className="text-xs font-medium px-4 py-2 rounded-full border border-border-color hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AssistantPage;
