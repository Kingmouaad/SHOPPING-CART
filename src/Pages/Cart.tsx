import { useContext, useState, useEffect } from "react";
import { context } from "../main";
import { NavLink, useNavigate } from "react-router";

export default function Cart() {
    const { cart, setCart } = useContext(context) || { cart: [], setCart: () => {} };
    const [quantities, setQuantities] = useState<number[]>([]);
    const [shippingMethod, setShippingMethod] = useState<string>("standard");
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length !== quantities.length) {
            setQuantities(cart.map(() => 1));
        }
    }, [cart]);

    const updateQuantity = (index: number, delta: number) => {
        const newQuantities = [...quantities];
        const newQ = newQuantities[index] + delta;
        if (newQ > 0) {
            newQuantities[index] = newQ;
            setQuantities(newQuantities);
        }
    };

    const removeItem = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        
        const newQuantities = [...quantities];
        newQuantities.splice(index, 1);
        setQuantities(newQuantities);
    };

    const subtotal = cart.reduce((total: number, item: any, index: number) => {
        const price = item.product ? item.product.price : item.price || 0;
        return total + (price * (quantities[index] || 1));
    }, 0);

    const shippingCost = shippingMethod === "express" ? 25 : 0;
    const total = subtotal + shippingCost;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCart([]);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate("/");
        }, 3000);
    };

    if (showSuccess) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
                <div className="bg-[#f6f6f6] px-12 py-10 rounded-sm text-center animate-fade-in">
                    <svg className="w-16 h-16 mx-auto mb-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-3xl font-serif mb-3 text-gray-900">Order Placed Successfully</h2>
                    <p className="text-sm text-gray-500 tracking-wide">Thank you for your purchase. Redirecting...</p>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-serif mb-6 text-gray-900">Your Bag is Empty</h1>
                <NavLink to="/shop" className="text-[11px] font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                    Continue Shopping
                </NavLink>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
            {/* Left Column: Cart Items */}
            <div className="flex-1">
                <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-10">
                    <h1 className="text-4xl font-serif text-gray-900">Your Bag</h1>
                    <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">{cart.length} ITEMS</span>
                </div>

                <div className="flex flex-col gap-10">
                    {cart.map((item: any, idx: number) => {
                        const product = item.product || item;
                        const price2 = product.price*quantities[idx];
                        return (
                            <div key={idx} className="flex gap-8 pb-10 border-b border-gray-100">
                                <div className="w-36 bg-[#f6f6f6] flex items-center justify-center p-2">
                                    <img src={product.images?.[0] || ''} alt={product.title} className="w-full aspect-[3/4] object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1 flex flex-col py-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif text-xl text-gray-900">{product.title}</h3>
                                        <span className="text-sm font-bold text-gray-900">${price2}</span>
                                    </div>
                                    <div className="text-[13px] text-gray-500 space-y-1 mb-auto">
                                        <p>Color: <span className="capitalize">{item.color?.name || 'Default'}</span></p>
                                        <p>Size: {item.size || 'M'}</p>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex items-center border border-gray-200 w-fit">
                                            <button type="button" onClick={() => updateQuantity(idx, -1)} className="px-4 py-2 text-gray-400 hover:text-black transition-colors cursor-pointer">−</button>
                                            <span className="px-3 text-[13px] font-medium">{quantities[idx] || 1}</span>
                                            <button type="button" onClick={() => updateQuantity(idx, 1)} className="px-4 py-2 text-gray-400 hover:text-black transition-colors cursor-pointer">+</button>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => removeItem(idx)}
                                            className="text-[10px] font-bold tracking-widest text-gray-400 uppercase border-b border-transparent hover:text-black hover:border-black transition-all cursor-pointer">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-[#fafafa] p-6 flex items-center gap-4 mt-8">
                    <svg className="w-6 h-6 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8.514a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0015.586 2H14v2" />
                        <circle cx="8" cy="18" r="2" strokeWidth="1.5" />
                        <circle cx="16" cy="18" r="2" strokeWidth="1.5" />
                    </svg>
                    <p className="text-[13px] text-gray-500">Complimentary standard shipping and returns on all orders over $500.</p>
                </div>
            </div>

            {/* Right Column: Order Summary & Form */}
            <div className="w-full lg:w-[420px]">
                <div className="border border-gray-200 p-8 mb-8">
                    <h2 className="text-[11px] font-bold tracking-widest uppercase mb-6 text-gray-900">Order Summary</h2>
                    
                    <div className="space-y-4 text-[13px] text-gray-600 mb-8">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{shippingCost === 0 ? 'Calculated next' : `$${shippingCost.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span>—</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-5 flex justify-between items-center">
                        <span className="font-serif text-xl text-gray-900">Total</span>
                        <span className="font-serif text-xl text-gray-900">${total.toFixed(2)}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <h3 className="font-serif text-xl text-gray-900 mb-6">Shipping Address</h3>
                    <div className="space-y-3 mb-10">
                        <input required type="email" placeholder="Email Address" className="w-full border border-gray-200 px-4 py-3.5 text-[13px] focus:border-black outline-none transition-colors" />
                        <div className="grid grid-cols-2 gap-3">
                            <input required type="text" placeholder="First Name" className="w-full border border-gray-200 px-4 py-3.5 text-[13px] focus:border-black outline-none transition-colors" />
                            <input required type="text" placeholder="Last Name" className="w-full border border-gray-200 px-4 py-3.5 text-[13px] focus:border-black outline-none transition-colors" />
                        </div>
                        <input required type="text" placeholder="Street Address" className="w-full border border-gray-200 px-4 py-3.5 text-[13px] focus:border-black outline-none transition-colors" />
                        <div className="grid grid-cols-2 gap-3">
                            <input required type="text" placeholder="City" className="w-full border border-gray-200 px-4 py-3.5 text-[13px] focus:border-black outline-none transition-colors" />
                            <select className="w-full border border-gray-200 px-4 py-3.5 text-[13px] text-gray-500 focus:border-black outline-none transition-colors bg-white appearance-none cursor-pointer">
                                <option value="">State</option>
                                <option value="CA">California</option>
                                <option value="NY">New York</option>
                                <option value="TX">Texas</option>
                            </select>
                        </div>
                    </div>

                    <h3 className="font-serif text-xl text-gray-900 mb-6">Shipping Method</h3>
                    <div className="space-y-3 mb-10">
                        <label className={`flex justify-between items-center border ${shippingMethod === 'standard' ? 'border-black bg-[#fafafa]' : 'border-gray-200'} p-5 cursor-pointer transition-colors`}>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="radio" 
                                    name="shipping" 
                                    value="standard" 
                                    checked={shippingMethod === 'standard'} 
                                    onChange={() => setShippingMethod('standard')}
                                    className="accent-black w-4 h-4 cursor-pointer"
                                />
                                <span className="text-[13px] text-gray-900 font-medium">Standard (3-5 Business Days)</span>
                            </div>
                            <span className="text-[13px] font-bold text-gray-900">Free</span>
                        </label>

                        <label className={`flex justify-between items-center border ${shippingMethod === 'express' ? 'border-black bg-[#fafafa]' : 'border-gray-200'} p-5 cursor-pointer transition-colors`}>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="radio" 
                                    name="shipping" 
                                    value="express" 
                                    checked={shippingMethod === 'express'} 
                                    onChange={() => setShippingMethod('express')}
                                    className="accent-black w-4 h-4 cursor-pointer"
                                />
                                <span className="text-[13px] text-gray-900 font-medium">Express (1-2 Business Days)</span>
                            </div>
                            <span className="text-[13px] font-bold text-gray-900">$25.00</span>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-5 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer">
                        Complete Order
                    </button>
                </form>
            </div>
        </div>
    );
}