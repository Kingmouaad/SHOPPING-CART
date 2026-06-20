interface CategoryButtonsProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Categorybuttons({ categories, activeCategory, onSelectCategory, onSearch }: CategoryButtonsProps) {
    return (
        <div className="flex flex-wrap gap-2 mt-8 p-1.5 border border-gray-200 rounded-full bg-white shadow-sm items-center justify-center max-w-4xl w-full">
            <div className="px-4 py-2 border-r border-gray-200 mr-2 flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" placeholder="Search..." onChange={onSearch} className="bg-transparent border-none outline-none text-[11px] tracking-widest text-gray-700 w-24 focus:w-40 transition-all duration-300"/>
            </div>
            {categories.map((cat) => (
                <button 
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer
                        ${activeCategory === cat 
                            ? "bg-black text-white shadow-md scale-105" 
                            : "bg-transparent text-gray-500 hover:text-black hover:bg-gray-100"
                        }`}
                >
                    {cat.replace("-", " ")}
                </button>
            ))}
        </div>
    );
}