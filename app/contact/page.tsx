'use client';

const ContactPage = () => {

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-4 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

            <main className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have a project in mind, a research proposal, or just want to discuss the future of AI and engineering?
                        I'm always open to new opportunities and collaborations.
                    </p>
                </div>

                <div className="flex justify-center">
                    {/* Contact Info */}
                    <div className="w-full max-w-2xl space-y-8">
                        <div className="glass p-8 md:p-12 rounded-[2.5rem] space-y-10 text-center">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8 underline underline-offset-8 decoration-primary/30">Contact Details</h3>
                                <div className="flex flex-col items-center space-y-8">
                                    <a href="mailto:bastian.scharnagl@gmail.com" className="flex flex-col items-center gap-4 group">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-primary shadow-lg shadow-primary/5">
                                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 font-medium uppercase mb-1">Email</p>
                                            <p className="text-xl font-bold group-hover:text-primary transition-colors">bastian.scharnagl@gmail.com</p>
                                        </div>
                                    </a>

                                    <div className="flex flex-wrap justify-center gap-12 pt-4">
                                        <a href="https://linkedin.com/in/bastianscharnagl" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600 shadow-lg shadow-blue-600/5">
                                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500 font-medium uppercase mb-1">LinkedIn</p>
                                                <p className="font-bold group-hover:text-blue-600 transition-colors">Bastian Scharnagl</p>
                                            </div>
                                        </a>

                                        <a href="https://github.com/BastianScharnagl" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-900/10 dark:bg-zinc-100/10 flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all text-zinc-900 dark:text-zinc-100 shadow-lg">
                                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.103.79 2.222v3.293c0 .319.22.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500 font-medium uppercase mb-1">GitHub</p>
                                                <p className="font-bold group-hover:text-primary transition-colors">@BastianScharnagl</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
