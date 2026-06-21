import { useParams, useRouteLoaderData, NavLink } from "react-router";
import { useState, useContext, useEffect } from "react";
import type { Product } from "../types/product";
import Card from "../components/Card";
import { context } from "../main";

export default function ProductPage() {
    const { name } = useParams();
    const data = useRouteLoaderData("Main") as Product[];
    const product = data?.find(p => p.id.toString() === name);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [Like, setLike] = useState<boolean>(false);
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [hasSelectedSize, setHasSelectedSize] = useState<boolean>(false);
    
    const colors = [
        { name: 'Camel', hex: '#c19a6b' },
        { name: 'Navy', hex: '#2c3e50' },
        { name: 'Black', hex: '#1a1a1a' }
    ];
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [hasSelectedColor, setHasSelectedColor] = useState<boolean>(false);
    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    const { cart, setCart } = useContext(context) || { cart: [], setCart: () => {} };

    if (!product) {
        return <div className="h-screen flex items-center justify-center font-serif text-2xl text-gray-500">Product not found</div>;
    }

    
    const suggestedProducts = data?.filter(p => p.category !== product.category).slice(0, 4) || [];

    const addToBag = () => {
        if (setCart) {
            setCart([...cart, { product: product, size: selectedSize, color: selectedColor}]);
        }
    };

    return (
        <>
            {/* First Section: Product Display & Details */}
            <section className="min-h-[calc(100vh-60px)] px-15 py-10 flex flex-col">
                {/* Breadcrumbs */}
                <div className="mb-10 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    <NavLink to="/" className="hover:text-black transition-colors">Home</NavLink>
                    <span className="mx-3">/</span>
                    <NavLink to="/shop" className="hover:text-black transition-colors">Shop</NavLink>
                    <span className="mx-3">/</span>
                    <span className="text-black capitalize">{product.category.replace("-", " ")}</span>
                    <span className="mx-3">/</span>
                    <span className="text-black">{product.title}</span>
                </div>

                <div className="flex flex-row gap-16 w-full flex-1">
                    {/* Column 1: Thumbnails */}
                    <div className="w-[100px] flex flex-col gap-4">
                        {product.images.map((img, idx) => (
                            <img 
                                key={idx}
                                src={img} 
                                alt={`${product.title} thumbnail ${idx + 1}`} 
                                className={`w-full aspect-[3/4] object-cover cursor-pointer transition-all duration-300 ${selectedImage === img ? 'opacity-100 ring-1 ring-black ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>

                    {/* Column 2: Main Image */}
                    <div className="flex-1 bg-[#f6f6f6] flex items-center justify-center p-10 h-[calc(100vh-180px)]">
                        <img 
                            src={selectedImage} 
                            alt={product.title} 
                            className="h-full w-full object-contain mix-blend-multiply"
                        />
                    </div>

                    {/* Column 3: Product Details */}
                    <div className="w-[380px] flex flex-col pt-5">
                        <h1 className="text-5xl font-serif leading-tight text-gray-900 mb-4">{product.title}</h1>
                        <p className="text-2xl tracking-wider text-gray-600 mb-8">${product.price}</p>
                        
                        <div className="flex items-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'text-black' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            ))}
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 ml-3">{Math.floor(Math.random() * 100) + 10} Reviews</span>
                        </div>

                        <p className="text-[13px] leading-relaxed text-gray-500 mb-10">
                            {product.description} A piece designed to anchor a wardrobe for generations.
                        </p>

                        <div className="mb-8 border-t border-b border-gray-100 py-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[11px] font-bold tracking-widest uppercase">Color</span>
                                <span className="text-[11px] text-gray-500 capitalize">{selectedColor.name}</span>
                            </div>
                            <div className="flex gap-3">
                                {colors.map(color => (
                                    <button 
                                        key={color.name}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setHasSelectedColor(true);
                                        }}
                                        className={`w-8 h-8 rounded-md cursor-pointer transition-all duration-300 ${
                                            selectedColor.name === color.name 
                                                ? 'ring-1 ring-offset-2 ring-black opacity-100' 
                                                : `hover:opacity-100 ${hasSelectedColor ? 'opacity-50' : 'opacity-50'}`
                                        }`}
                                        style={{ backgroundColor: color.hex }}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[11px] font-bold tracking-widest uppercase">Size</span>
                                <span className="text-[10px] tracking-widest text-gray-400 border-b border-gray-400 cursor-pointer hover:text-black">Size Guide</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['S', 'M', 'L', 'XL'].map(size => (
                                    <button 
                                        key={size} 
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setHasSelectedSize(true);
                                        }}
                                        className={`border py-3 text-[11px] font-bold tracking-widest cursor-pointer transition-all duration-300 ${
                                            selectedSize === size 
                                                ? 'border-black text-black opacity-100' 
                                                : `border-gray-200 text-gray-400 hover:border-black hover:text-black ${hasSelectedSize ? 'opacity-50' : 'opacity-100'}`
                                        }`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={addToBag}
                            className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors mb-3 cursor-pointer">
                            Add to Bag — ${product.price}
                        </button>
                        
                        <button onClick={() => setLike(!Like)} className="w-full border border-gray-200 py-4 text-[11px] font-bold tracking-widest uppercase text-gray-600 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <svg className="w-4 h-4" fill={Like ? "red" : "none"} stroke={Like ? "red" : "currentColor"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            {Like ? "Wishlisted" : "Save to Wishlist"}
                        </button>
                    </div>
                </div>
            </section>

            {/* Second Section: Suggested Products */}
            <section className="min-h-[50vh] bg-[#fcfcfc] px-15 py-20 border-t border-gray-100 flex flex-col">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-serif text-gray-900 mb-2">Complete Your Look</h2>
                    <p className="text-gray-500 text-sm tracking-wider">Curated recommendations to pair with your selection</p>
                </div>
                
                <div className="grid grid-cols-4 gap-8">
                    {suggestedProducts.map(item => (
                        <Card key={item.id} product={item} display={true} />
                    ))}
                </div>
            </section>
        </>
    );
}