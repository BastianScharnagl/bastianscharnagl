'use client';

import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-24 px-4 bg-card-bg/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400">
                        <p>
                            My journey began in the field of <strong>Mechanical Engineering</strong> at the Technical University of Dresden.
                            During my studies, I discovered a passion for the intersection of hardware and software,
                            which led me into the world of IoT and Embedded Systems.
                        </p>
                        <p>
                            Today, as a <strong>Research Assistant</strong> at Hof University, I explore the boundless
                            possibilities of Intelligent and Learning Systems. My work involves developing software that
                            brings machine intelligence to real-world applications.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass p-6 rounded-2xl text-center">
                            <div className="text-primary text-3xl font-bold mb-2">5+</div>
                            <div className="text-sm font-medium">Years Engineering</div>
                        </div>
                        <div className="glass p-6 rounded-2xl text-center">
                            <div className="text-accent text-3xl font-bold mb-2">AI</div>
                            <div className="text-sm font-medium">Focused Research</div>
                        </div>
                        <div className="glass p-6 rounded-2xl text-center">
                            <div className="text-primary text-3xl font-bold mb-2">IoT</div>
                            <div className="text-sm font-medium">Expertise</div>
                        </div>
                        <div className="glass p-6 rounded-2xl text-center">
                            <div className="text-accent text-3xl font-bold mb-2">FEA</div>
                            <div className="text-sm font-medium">Mech. Analysis</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
