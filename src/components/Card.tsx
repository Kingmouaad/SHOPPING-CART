import type { Product } from "../types/product";
import { useNavigate } from "react-router";

export default function Card({ product, display }: { product: Product, display: boolean }) {
    const navigate = useNavigate();


    return (
        <div className="group cursor-pointer flex flex-col gap-5 " onClick={()=>{
            if(display){
                navigate(`/shop/${product.id}`)
            }else{
                return;
            }}}>
                <img className="group-hover:scale-110 cursor-pointer transition-transform duration-300 " src={product.images[0]} alt={product.title} />
            <div className=" border-t border-gray-300">
                <div>
                <h2 className="text-2xl font-bold tracking-wider">{product.title}</h2>
                {!display && product.category && <p className="text-gray-500 text-sm tracking-wider">{product.category}</p>}
            </div>
            <div className="flex justify-between items-center ">
                <p className="text-2xl font-italic tracking-wider">${product.price}</p>
            {display  && <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer" onClick={()=>{
                navigate(`/shop/${product.id}`)
            }}>Add to Cart</button>
            }
            </div>
            </div>
            
        </div>
    );
}