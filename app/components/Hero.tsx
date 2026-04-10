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
        </section>
    );
};

export default Hero;
