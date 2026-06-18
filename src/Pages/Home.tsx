import { NavLink, useLoaderData, useNavigate } from "react-router";
import type { Product } from "../types/product";
import Card from "../components/Card";
import { ArrowRight } from "lucide-react";

export default function Home() {
    const toShop= useNavigate();
    const data = useLoaderData<Product[]>();
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
        <section className="bg-[url('/hero.jpg')] bg-contain bg-no-repeat bg-center h-screen flex flex-col justify-center items-center text-center">
            <div className="flex flex-col gap-5 mb-5">
                <h1 className="text-5xl font-bold tracking-widest">NEW COLLECTION</h1>
                <p className="text-xl tracking-wider">Discover the latest trends in fashion</p>
            </div>
            <div className="flex flex-col gap-5">
                <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">Shop Now</button>
            </div>
        </section>

      
        <section className="flex flex-col gap-5    px-15 py-10 ">
            <div className=" flex  justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-italic tracking-wider">Featured Arrivals</h1>
                    <p className="text-gray-500 text-sm tracking-wider">Discover our latest collection of new arrivals</p>
                </div>
                <button className="group relative flex items-center gap-2 text-black cursor-pointer py-1 font-semibold text-sm tracking-wider" onClick={() => toShop("/shop")}>
                    Shop Now 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {featuredArrivals.map(product => (
                    <Card key={product.id} product={product} display={false} />
                ))}
            </div>
        </section>

          {/* Philosophy Section */}
        <section className="bg-[#fcfcfc] h-screen flex flex-row items-center px-15 py-10 gap-10 overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-start gap-6 ">
                <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">The Philosophy</span>
                <h2 className="text-6xl font-serif leading-[1.1] text-gray-900">Substance,<br/>Craft, and<br/>Restraint.</h2>
                <p className="text-gray-500 max-w-md leading-relaxed text-[15px] mt-2">
                    We believe in a "less but better" approach to design. Our collections are born from a philosophy that prioritizes impeccable materials and architectural precision over loud branding. Every piece is an investment in timeless elegance.
                </p>
                <NavLink to="/about" className="font-bold text-[11px] tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer mt-4">Read Our Story</NavLink>
             
            </div>
            <div className="flex-1 relative h-[80%] flex justify-end items-center ">
                <img src="/philosophy.png" alt="Philosophy" className="w-[90%] h-full object-cover object-center shadow-lg" />
                <div className="absolute left-[0px] bottom-[10%] bg-white w-48 h-48 flex flex-col items-center justify-center font-serif text-gray-400 shadow-xl p-3">
                    <div className="border border-gray-200 w-full h-full flex flex-col items-center justify-center">
                        <span className="text-xl tracking-widest mb-1">EST.</span>
                        <span className="text-3xl tracking-widest">2024</span>
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

