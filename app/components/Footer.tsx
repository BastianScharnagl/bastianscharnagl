'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="py-12 px-4 border-t border-border-color bg-background">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xl font-bold">
                    Bastian Scharnagl
                </div>
                <div className="text-zinc-500 dark:text-zinc-500 text-sm">
                    © {new Date().getFullYear()} Bastian Scharnagl.
                </div>
                <div className="flex gap-8">
                    <Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
