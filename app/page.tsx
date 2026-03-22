import Hero from "./components/Hero";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <main>
        <Hero />
        <TechStack />
      </main>
    </div>
  );
}
