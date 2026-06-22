import { NavLink } from "react-router";

export default function About() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/about-hero.png" 
                        alt="Luxury Fashion Studio" 
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="relative z-10 text-center px-6 slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-wide drop-shadow-md">Our Story</h1>
                    <p className="text-white/90 text-sm md:text-base tracking-[0.2em] uppercase font-medium max-w-xl mx-auto drop-shadow-sm">
                        Redefining modern luxury through timeless design
                    </p>
                </div>
            </section>

            {/* Content Section 1 */}
            <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-10 leading-snug">
                    A dedication to craftsmanship, <br className="hidden md:block" />
                    quality materials, and quiet elegance.
                </h2>
                <div className="w-12 h-[1px] bg-black mx-auto mb-10"></div>
                <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                    Founded with a vision to create garments that outlast fleeting trends, we believe in the power of simplicity. Every piece in our collection is thoughtfully designed in our studio, where we focus on impeccable tailoring and premium fabrics sourced from the world's most renowned mills.
                </p>
                <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
                    We do not design for the season; we design for a lifetime. Our philosophy revolves around building a wardrobe that is as versatile as it is sophisticated, allowing the wearer to express their individuality with effortless grace.
                </p>
            </section>

            {/* Split Section */}
            <section className="bg-[#fcfcfc] border-t border-gray-100 py-24 md:py-32 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                        <div className="aspect-[4/5] bg-gray-200 overflow-hidden relative">
                            <img 
                                src="/about-hero.png" 
                                alt="Studio Details" 
                                className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex flex-col justify-center slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4 block">Our Commitment</span>
                        <h3 className="text-4xl font-serif text-gray-900 mb-8">Sustainable Elegance</h3>
                        <p className="text-gray-500 text-base leading-relaxed mb-6">
                            Luxury should never come at the expense of our planet. We are committed to ethical production practices, partnering with artisans who share our dedication to environmental responsibility and fair labor.
                        </p>
                        <p className="text-gray-500 text-base leading-relaxed mb-10">
                            By producing in limited runs and prioritizing enduring quality, we aim to reduce waste and offer our clients pieces they will cherish and pass down for generations.
                        </p>
                        
                        <NavLink to="/shop" className="inline-block border-b border-black text-[11px] font-bold tracking-widest uppercase pb-1 w-fit hover:text-gray-500 hover:border-gray-500 transition-colors">
                            Explore the Collection
                        </NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
}