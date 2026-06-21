import type { Product } from "../types/product";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { context } from "../main";

export default function Card({ product, display }: { product: Product, display: boolean }) {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(context) || { cart: [], setCart: () => {} };

    function addtobag(){
        setCart([...cart, product]);
    }


    return (
        <div className="group cursor-pointer flex flex-col gap-5 " >
                <img onClick={()=>{
            if(display){
                navigate(`/shop/${product.id}`)
            }else{
                return;
            }}} className="group-hover:scale-110 cursor-pointer transition-transform duration-300 " src={product.images[0]} alt={product.title} />
            <div className=" border-t border-gray-300">
                <div>
                <h2 className="text-2xl font-bold tracking-wider" >{product.title}</h2>
                {!display && product.category && <p className="text-gray-500 text-sm tracking-wider">{product.category}</p>}
            </div>
            <div className="flex justify-between items-center ">
                <p className="text-2xl font-italic tracking-wider">${product.price}</p>
            {display  && <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer" onClick={()=>{
                addtobag();
            }}>Add to Cart</button>
            }
            </div>
            </div>
            
        </div>
    );
}