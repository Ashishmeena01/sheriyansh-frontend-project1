import { useContext } from "react";
import { MyStore } from "../context/myStore";


function Navbar() {
    const {isCart,setIsCart} = useContext(MyStore);

    return (
        <nav className="flex sticky top-0 items-center justify-between bg-black px-6 py-4 text-white">
            {/* Logo */}
            <h1 className="text-xl font-bold">MyWebsite</h1>

            {/* Navigation Links */}
            <div className="flex gap-6">
                <a href="/" className="hover:text-gray-400">Home</a>
                <a href="/about" className="hover:text-gray-400">About</a>
                <a href="/services" className="hover:text-gray-400">Services</a>
                <a href="/contact" className="hover:text-gray-400">Contact</a>
            </div>

            {/* Button */}
            <button onClick={()=>{setIsCart((val)=>!val)}} className="rounded bg-white px-4 py-2 text-black hover:bg-gray-200">
               {isCart ? "Cart" : "Cards"}
            </button>
        </nav>
    );
}

export default Navbar;