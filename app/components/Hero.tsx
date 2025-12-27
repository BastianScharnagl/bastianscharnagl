'use client';

import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
            <div className="relative w-40 h-40 mb-8 rounded-full overflow-hidden border-4 border-primary/20 animate-fade-in">
                <Image
                    src="/profile.jpg"
                    alt="Bastian Scharnagl"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="text-center max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                    Bastian <span className="text-gradient">Scharnagl</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium mb-8">
                    Research Assistant in Intelligent & Learning Systems
                </p>
                <p className="text-lg text-zinc-500 dark:text-zinc-500 mb-10 leading-relaxed">
                    Bridging the gap between Mechanical Engineering and Artificial Intelligence.
                    Currently focused on intelligent systems and software development at Hof University.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/projects"
                        className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-all hover:scale-105"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-3 border border-border-color rounded-full font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
