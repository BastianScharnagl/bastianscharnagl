'use client';

import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
            <div className="relative w-48 h-48 mb-10 rounded-3xl overflow-hidden glass border border-white/20 animate-fade-in shadow-2xl">
                <Image
                    src="/bs.png"
                    alt="Bastian Scharnagl Logo"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="text-center max-w-3xl">
                <p className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-300 font-medium mb-8 leading-tight">
                    Solutions
                </p>
                <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-400 mb-12 leading-relaxed">
                    "I offer comprehensive solutions in embedded software development, traditional software engineering, computer vision, machine learning, and generative AI. Leveraging my technical expertise, I support companies in developing innovative systems and intelligent applications."
                </p>
            </div>
        </section>
    );
};

export default Hero;
