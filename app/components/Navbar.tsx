import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
            <div className="glass flex items-center gap-8 px-8 py-3 rounded-full">
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
                {/* <Link href="/assistant" className="text-sm font-medium hover:text-primary transition-colors underline decoration-primary/50 underline-offset-4">Assistant</Link> */}
                <Link href="/projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</Link>
                <Link href="/cycling" className="text-sm font-medium hover:text-primary transition-colors">Cycling</Link>
                <Link href="/reading" className="text-sm font-medium hover:text-primary transition-colors underline decoration-primary/50 underline-offset-4">Reading</Link>
                <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
