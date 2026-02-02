'use client';

import React from 'react';
import Experience from '../components/Experience';
import TechStack from '../components/TechStack';

import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24 overflow-hidden relative">
            <main className="w-full">
                <div className="flex flex-col items-center mb-12 px-4">
                    <div className="relative w-40 h-40 mb-8 rounded-full overflow-hidden border-4 border-primary/20 animate-fade-in shadow-xl">
                        <Image
                            src="/profile.jpg"
                            alt="Bastian Scharnagl"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                        About Me
                    </h1>
                </div>

                <div className="space-y-0">
                    <Experience />
                    <TechStack />
                </div>
            </main>
        </div>
    );
};

export default AboutPage;
