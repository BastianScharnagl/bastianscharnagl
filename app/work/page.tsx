import Experience from "@/app/components/Experience";
import TechStack from "../components/TechStack";

const WorkingPage = () => {

    return (
        <div className="min-h-screen bg-background flex flex-col pt-32 pb-24 px-4 overflow-hidden relative">
            <div className="fixed inset-0 -z-10">
                <img 
                    src="/backgrounds/bg_work.png" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-background/80" />
            </div>
            
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/5 to-transparent -z-10" />

            <main className="flex-1 max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-blue-500/20 shadow-xl shadow-blue-500/10">
                            <img
                                src="/bastianscharnagl_linkedin.jpg"
                                alt={`Bastian Scharnagl`}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div>
                        <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full">Professional Profile</span>
                        </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                Life finding <span className="text-blue-500">Solutions</span>
                            </h1>
                        </div>
                    </div>
                    <a
                        href="https://www.linkedin.com/in/bastianscharnagl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 mx-auto md:mx-0"
                    >
                        Connect on LinkedIn
                    </a>
                </div>
                <Experience />  
                <TechStack />
            </main>
        </div>
            
    );
};

export default WorkingPage;