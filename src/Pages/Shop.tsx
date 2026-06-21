import { NavLink, useRouteLoaderData } from "react-router";
import type { Product } from "../types/product";
import Card from "../components/Card";
import { useState } from "react";
import Categorybuttons from "../components/Categorybuttons";

export default function Shop() {
    const data = useRouteLoaderData("Main") as Product[];
    const [filteredProducts, setFilteredProducts] = useState(data);
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = ["all", ...Array.from(new Set(data.map(p => p.category)))];

    const filteringCategories = (category: string) => {
        setActiveCategory(category);
        if(category === "all"){
            setFilteredProducts(data);
        }else{
           setFilteredProducts(data.filter(product => product.category === category));
        }
    }

    const numofproducts = filteredProducts.length;
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        if(searchValue === ""){
            setFilteredProducts(data.filter(product => product.title.toLowerCase().includes(searchValue)));
        }else{
            setFilteredProducts(filteredProducts.filter(product => product.title.toLowerCase().includes(searchValue)));
        }
        
    }
    return (
        <div className="px-15 py-20">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-5 mb-15 flex flex-col items-center">
                <h1 className="text-4xl font-serif font-italic mb-2 tracking-widest">The Collection</h1>
                <div className="flex  text-sm text-gray-500">
                    A curated selection of timeless essentials for the modern wardrobe.
                </div>
                <Categorybuttons 
                    categories={categories} 
                    activeCategory={activeCategory} 
                    onSelectCategory={filteringCategories} 
                    onSearch={onSearch}
                />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <Card key={product.id} product={product} display={true} />
                ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center gap-2 mt-15">
                <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">1</button>
               
            </div>
        </div>
    );
}

