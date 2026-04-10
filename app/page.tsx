import Hero from "./components/Hero";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <img 
          src="/backgrounds/bg_home.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <main>
        <Hero />
      </main>
    </div>
  );
}
