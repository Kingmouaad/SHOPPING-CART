import { useRouteLoaderData } from "react-router";
import type { Product } from "../types/product";
import Card from "../components/Card";
import { useState } from "react";
import Categorybuttons from "../components/Categorybuttons";

export default function Shop() {
    const data = useRouteLoaderData("Main") as Product[];
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["all", ...Array.from(new Set(data.map(p => p.category)))];

    const filteringCategories = (category: string) => {
        setActiveCategory(category);
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    // Fixed: Compute filtered products based on both search and category
    const filteredProducts = data.filter(product => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="px-6 md:px-12 lg:px-15 py-12 md:py-20">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-5 mb-10 md:mb-15 flex flex-col items-center slide-up">
                <h1 className="text-3xl md:text-4xl font-serif font-italic mb-2 tracking-widest text-center">The Collection</h1>
                <div className="flex text-xs md:text-sm text-gray-500 text-center px-4">
                    A curated selection of timeless essentials for the modern wardrobe.
                </div>
                <div className="w-full flex justify-center">
                    <Categorybuttons 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        onSelectCategory={filteringCategories} 
                        onSearch={onSearch}
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div key={product.id} className="slide-up" style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}>
                            <Card product={product} display={true} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 slide-up">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <p className="tracking-widest uppercase text-sm">No products found</p>
                    </div>
                )}
            </div>

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
                <div className="flex justify-center gap-2 mt-12 md:mt-15 slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                    <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-sm">1</button>
                </div>
            )}
        </div>
    );
}

