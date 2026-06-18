import { ShoppingBag } from "lucide-react";
import { NavLink } from "react-router";


export default function Nav() {

    return (
        <nav className="h-[60px] flex flex-row justify-between items-center px-15 py-5 border-b border-gray-200">
           <div className="flex flex-row gap-8">
             <NavLink to="/">{({isActive}) =>  <span className={`text-sm tracking-wide uppercase transition-colors ${isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"}`}>Home</span> }</NavLink>
            <NavLink to="/about">{({isActive}) =>  <span className={`text-sm tracking-wide uppercase transition-colors ${isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"}`}>About</span> }</NavLink>
            <NavLink to="/shop">{({isActive}) =>  <span className={`text-sm tracking-wide uppercase transition-colors ${isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"}`}>Shop</span> }</NavLink>
           </div>

           <div className="font-extrabold text-2xl tracking-widest">LUXE</div>

            <NavLink to="/cart">{({isActive}) => <ShoppingBag className={`transition-colors ${isActive ? "text-black" : "text-gray-500 hover:text-black"}`} size={22} /> }</NavLink>
        </nav>


    )
}
