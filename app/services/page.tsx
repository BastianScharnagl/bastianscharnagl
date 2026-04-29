export default function Services() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="fixed inset-0 -z-10">
                <img 
                    src="/backgrounds/bg_service.png" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-30"
                />
            <div className="absolute inset-0 bg-background/80" />
            </div>
            <h1 className="text-4xl font-bold mb-8">Services</h1>
            <div className="grid gap-6">
                <div className="p-6 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Application Development</h2>
                    <p className="text-gray-600">Custom applications built with modern technologies.</p>
                </div>
                <div className="p-6 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Machine Learning Integration</h2>
                    <p className="text-gray-600">Integration with Computer Vision, Machine Learning, and third-party services.</p>
                </div>
                <div className="p-6 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Consulting</h2>
                    <p className="text-gray-600">Technical consulting for enterprises.</p>
                </div>
            </div>
        </div>
    );
}