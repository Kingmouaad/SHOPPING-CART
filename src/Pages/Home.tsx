import { NavLink, useRouteLoaderData, useNavigate } from "react-router";
import type { Product } from "../types/product";
import Card from "../components/Card";
import { ArrowRight } from "lucide-react";

export default function Home() {
    const toShop= useNavigate();
    const data = useRouteLoaderData("Main") as Product[];
    const featuredArrivals = Object.values(
        data.reduce<Record<string, Product>>((acc, product) => {
            if (Object.keys(acc).length === 4) return acc;
            if (!acc[product.category]) {
                acc[product.category] = product;
            }
            return acc;
        }, {})
    );


    return (
        <>
        <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/home-hero.png" 
                    alt="New Collection" 
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-6 mb-10 text-white px-6 mt-16 slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif tracking-widest drop-shadow-lg">NEW COLLECTION</h1>
                <p className="text-sm md:text-lg lg:text-xl tracking-[0.2em] font-medium drop-shadow-md uppercase">Discover the latest trends in fashion</p>
            </div>
            <div className="relative z-10 flex flex-col gap-5 slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <button 
                    onClick={() => toShop("/shop")}
                    className="bg-white text-black px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer shadow-xl"
                >
                    Shop Now
                </button>
            </div>
        </section>

      
        <section className="flex flex-col gap-8 px-6 md:px-12 lg:px-15 py-16 md:py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 slide-up">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-serif font-italic tracking-wider">Featured Arrivals</h1>
                    <p className="text-gray-500 text-sm tracking-wider">Discover our latest collection of new arrivals</p>
                </div>
                <button className="group relative flex items-center gap-2 text-black cursor-pointer py-1 font-semibold text-sm tracking-wider" onClick={() => toShop("/shop")}>
                    Shop Now 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {featuredArrivals.map((product, index) => (
                    <div key={product.id} className="slide-up" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
                        <Card product={product} display={false} />
                    </div>
                ))}
            </div>
        </section>

          {/* Philosophy Section */}
        <section className="bg-[#fcfcfc] min-h-[80vh] flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-15 py-16 lg:py-10 gap-16 lg:gap-10 overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-start gap-6 slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">The Philosophy</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.2] lg:leading-[1.1] text-gray-900">Substance,<br/>Craft, and<br/>Restraint.</h2>
                <p className="text-gray-500 max-w-md leading-relaxed text-sm md:text-[15px] mt-2">
                    We believe in a "less but better" approach to design. Our collections are born from a philosophy that prioritizes impeccable materials and architectural precision over loud branding. Every piece is an investment in timeless elegance.
                </p>
                <NavLink to="/about" className="font-bold text-[10px] md:text-[11px] tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer mt-4">Read Our Story</NavLink>
            </div>
            <div className="flex-1 relative w-full h-[60vh] lg:h-[80%] flex justify-center lg:justify-end items-center slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <img src="/philosophy.png" alt="Philosophy" className="w-full lg:w-[90%] h-full object-cover object-center shadow-lg" />
                <div className="absolute left-4 lg:left-0 bottom-4 lg:bottom-[10%] bg-white w-32 h-32 md:w-48 md:h-48 flex flex-col items-center justify-center font-serif text-gray-400 shadow-xl p-2 md:p-3">
                    <div className="border border-gray-200 w-full h-full flex flex-col items-center justify-center">
                        <span className="text-sm md:text-xl tracking-widest mb-1">EST.</span>
                        <span className="text-xl md:text-3xl tracking-widest">2024</span>
                    </div>
                </div>
            </div>
        </section>

        </>
        
    ); 
}

export async function fetchLuxuryProductsloader() {
    const luxuryCategories = ['mens-pants', 'mens-watches', 'mens-shirts', 'mens-shoes', 'sunglasses', 'fragrances'];


    const responses = await Promise.all(
        luxuryCategories.map(category =>
            fetch(`https://dummyjson.com/products/category/${category}`).then(res => res.json())
        )
    );

    // Extract the products from each response and flatten them into one list
    const mixedLuxuryFeed = responses.flatMap(result => result.products);
    const objectproduct = mixedLuxuryFeed.map(product => {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            rating: product.rating,
            images: product.images,
            
        }
    })
     console.log("Your custom luxury catalog:", objectproduct);
    return objectproduct;


}

