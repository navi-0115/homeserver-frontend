import { ShoppingCart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white drop-shadow ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-screen-l">
        <Link to="/" className="text-2xl font-bold">
          Homeserver
        </Link>
        <div className="flex-grow  mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/auth" className="text-2xl font-bold">
            <User className="w-6 h-6 text-gray-600 cursor-pointer" />
          </Link>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              3
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
