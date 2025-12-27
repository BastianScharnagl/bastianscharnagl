'use client';

import React from 'react';
import Link from 'next/link';

const ReadingPage = () => {
    interface Book {
        author?: string;
        title?: string;
        link?: string;
        title_german?: string;
        subtitle_german?: string;
        link_german?: string;
        title_english?: string;
        subtitle_english?: string;
        link_english?: string;
    }

    const books: Book[] = [
        { author: 'Nassim Nicholas Taleb', title: 'Incerto', link: 'https://amzn.to/3YeBAq3' },
        { author: 'Nassim Nicholas Taleb', title_german: 'Narren des Zufalls', subtitle_german: 'Die unterschätzte Rolle des Zufalls in unserem Leben', link_german: 'https://amzn.to/4pW1mvr', title_english: 'Fooled by Randomness', subtitle_english: 'The Hidden Role of Chance in Life and in the Markets', link_english: 'https://amzn.to/4pWeK2F' },
        { author: 'Nassim Nicholas Taleb', title_german: 'Der Schwarze Schwan', subtitle_german: 'Die Macht höchst unwahrscheinlicher Ereignisse', link_german: 'https://amzn.to/45qg0Tm', title_english: 'The Black Swan', subtitle_english: 'The Impact of the Highly Improbable', link_english: 'https://amzn.to/4pe6Kck' },
        { author: 'Nassim Nicholas Taleb', title_german: 'Antifragilität', subtitle_german: 'Anleitung für eine Welt, die wir nicht verstehen', link_german: 'https://amzn.to/45qg0Tm', title_english: 'Antifragile', subtitle_english: 'Things that Gain from Disorder', link_english: 'https://amzn.to/49a4WLk' },
        { author: 'Nassim Nicholas Taleb', title_german: 'Das Risiko und sein Preis', subtitle_german: 'Skin in the Game', link_german: 'https://amzn.to/4s6ZW2G', title_english: 'Skin in the Game', subtitle_english: 'Hidden Asymmetries in Daily Life', link_english: 'https://amzn.to/4azdE8n' },
    ];

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-4 overflow-hidden relative">
            <main className="max-w-4xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Reading <span className="text-gradient">List</span>
                    </h1>
                    <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto">
                        A collection of books that have influenced my thinking on systems, probability, and research.
                        <br />
                        <span className="text-xs opacity-50 mt-4 block">* Links are affiliate referrals that support my research.</span>
                    </p>
                </div>

                <div className="grid gap-6">
                    {books.map((book, i) => (
                        <div
                            key={i}
                            className="glass p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary/50 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                    {i + 1}
                                </div>
                                <div>
                                    {book.author && (
                                        <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">{book.author}</p>
                                    )}
                                    <h3 className="text-xl font-bold transition-colors">
                                        {'title' in book ? book.title : book.title_english}
                                    </h3>
                                    {('subtitle_english' in book && book.subtitle_english) && (
                                        <p className="text-zinc-500 text-sm font-medium italic mb-1">{book.subtitle_english}</p>
                                    )}
                                    {'title_german' in book && (book.title_german !== book.title_english || book.subtitle_german) && (
                                        <div className="flex flex-col border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 mt-2">
                                            <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">German Edition</p>
                                            <p className="text-zinc-500 text-sm font-bold">{book.title_german}</p>
                                            {book.subtitle_german && (
                                                <p className="text-zinc-400 text-xs italic">{book.subtitle_german}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {'link' in book ? (
                                    <a
                                        href={book.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 rounded-xl bg-primary/10 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                                    >
                                        View on Amazon
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                ) : (
                                    <>
                                        <a
                                            href={book.link_english}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 rounded-xl bg-blue-500/10 text-blue-600 text-sm font-bold hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2"
                                        >
                                            English
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                        <a
                                            href={book.link_german}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 rounded-xl bg-green-500/10 text-green-600 text-sm font-bold hover:bg-green-500 hover:text-white transition-all flex items-center gap-2"
                                        >
                                            Deutsch
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ReadingPage;
