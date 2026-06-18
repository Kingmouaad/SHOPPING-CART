import { ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t-2 border-gray-200 px-15 py-10 flex justify-between items-start w-full">
            <div className="flex flex-col gap-10">
                <h4 className="font-bold">LUXE</h4>
                <p className=" text-sm text-gray-500 tracking-wider">© 2026 LUXE. All rights reserved.</p>    
            </div>
            <div className="flex flex-col gap-3">  
                    <p className="text-sm text-gray-500 tracking-wider">Privacy Policy</p>
                    <p className="text-sm text-gray-500 tracking-wider">Terms of Service</p>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-500 tracking-wider">Shipping & Returns</p>
                <p className="text-sm text-gray-500 tracking-wider">Sustainibility</p>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-500 tracking-wider">Contact</p>
                <div className="flex flex-col  gap-3">
                    <label htmlFor="email" className="font-bold text-black tracking-wider">Join the List</label>
                    <div className="flex flex-row">

                    <input className="border-none focus:outline-none text-gray-500 tracking-wider" type="email" id="email" placeholder="Enter your email" />
                    <ArrowRight className="text-gray-500"/>
                    </div>
                </div>
            </div>
        </footer>
    );
}