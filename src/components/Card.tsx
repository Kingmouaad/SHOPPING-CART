import type { Product } from "../types/product";

export default function Card({ product, display }: { product: Product, display: boolean }) {

    return (
        <div className="flex flex-col gap-5">
            <img src={product.images[0]} alt={product.title} />
            <div>
                <div>
                <h2 className="text-2xl font-bold tracking-wider">{product.title}</h2>
                {product.category && <p className="text-gray-500 text-sm tracking-wider">{product.category}</p>}
            </div>
            
            <p className="text-2xl font-bold tracking-wider">${product.price}</p>
            {display  && <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">Add to Cart</button>
            }
            </div>
            
        </div>
    );
}