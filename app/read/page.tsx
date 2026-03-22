'use client';

import React from 'react';
import Link from 'next/link';
import Script
 from 'next/script';
const ReadingPage = () => {
    const collections = [
        {
            author: 'Nassim Nicholas Taleb',
            title: 'INCERTO',
            image: 'https://www.fooledbyrandomness.com/INCERTO.jpg',
            books: 'Fooled by Randomness, The Black Swan, The Bed of Procrustes, Antifragile, Skin in the Game',
            description: "An investigation of opacity, luck, uncertainty, probability, human error, risk, and decision-making in a world we don't understand.",
            link: 'https://www.fooledbyrandomness.com',
            linkText: 'Visit fooledbyrandomness.com',
            color: 'text-green-600',
            bg: 'bg-green-500/10',
            btnBg: 'bg-green-600'
        },
        {
            author: 'Jordan B. Peterson',
            title: 'Meaning & Chaos',
            image: 'https://www.jordanbpeterson.com/wp-content/uploads/2023/07/001-12-Rules-for-Life-An-Antidote-to-Chaos-1-672x1024-1.jpg',
            books: 'Maps of Meaning, 12 Rules for Life, Beyond Order, We who wrestle with God',
            description: "An exploration of psychology, mythology, and philosophy, focusing on the balance between order and chaos and the importance of individual responsibility.",
            link: 'https://www.jordanbpeterson.com',
            linkText: 'Visit jordanbpeterson.com',
            color: 'text-blue-600',
            bg: 'bg-blue-500/10',
            btnBg: 'bg-blue-600'
        },
        {
            author: 'Robert Greene',
            title: 'Power & Strategy',
            image: 'https://powerseductionandwar.com/wp-content/uploads/2024/02/The-Laws-of-Human-Nature-1.jpg',
            books: 'The 48 Laws of Power, The Art of Seduction, The 33 Strategies of War, Mastery, The Laws of Human Nature',
            description: "A deep dive into the laws of power, strategy, human behavior, and the path to mastery, distilling historical wisdom into practical guides.",
            link: 'https://powerseductionandwar.com',
            linkText: 'Visit powerseductionandwar.com',
            color: 'text-red-600',
            bg: 'bg-red-500/10',
            btnBg: 'bg-red-600'
        }
    ];

    return (
            <div className="min-h-screen bg-background flex flex-col pt-32 pb-24 px-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-green-500/5 to-transparent -z-10" />

                <main className="flex-1 max-w-6xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-yellow-500/20 shadow-xl shadow-yellow-500/10">
                                <img
                                    src="/bastianscharnagl_goodreads.jpg"
                                    alt={`Bastian Scharnagl`}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <div>
                            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-widest rounded-full">Reader Profile</span>
                            </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    Life sharping my <span className="text-yellow-500">Mind</span>
                                </h1>
                            </div>
                        </div>
                        <a
                            href="https://www.goodreads.com/bastianscharnagl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-yellow-500 text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2 mx-auto md:mx-0"
                        >
                            Connect on Goodreads
                        </a>
                    </div>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Reading List
                        </h1>
                        <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto">
                            A collection of books that have influenced my thinking on systems, probability, and research.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {collections.map((item, index) => (
                            <div key={index} className="glass p-12 rounded-[2.5rem] flex flex-col items-center text-center gap-8 group hover:border-primary/50 transition-all max-w-2xl mx-auto w-full">
                                <div className={`w-20 h-20 rounded-3xl ${item.bg} flex items-center justify-center ${item.color} font-bold shrink-0 text-3xl`}>
                                    {index + 1}
                                </div>
                                <div>
                                    <p className={`${item.color} text-xs font-black uppercase tracking-[0.2em] mb-3`}>{item.author}</p>
                                    <h3 className="text-4xl font-bold transition-colors mb-4">
                                        {item.title}
                                    </h3>
                                    <img
                                        src={`${item.image}`}
                                        alt={`${item.title} cover`}
                                        className="w-48 h-64 object-cover rounded-lg mb-6 mx-auto"
                                    />
                                    <p className="text-zinc-500 text-lg font-medium italic mb-6">
                                        {item.books}
                                    </p>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                                        {item.description}
                                    </p>

                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 px-8 py-3 rounded-full ${item.btnBg} text-white font-bold hover:opacity-90 transition-all hover:scale-105`}
                                    >
                                        {item.linkText}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        
    );
};

export default ReadingPage;
