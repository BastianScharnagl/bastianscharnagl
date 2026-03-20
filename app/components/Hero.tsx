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
                    Bastian Scharnagl
                </p>

                <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for partner logos or tech stack icons could go here to reinforce 'company' feel */}
                </div>
            </div>
        </section>
    );
};

export default Hero;
