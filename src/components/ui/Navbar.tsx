import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Home Servers
        </Link>
        <div>
          <Link to="/" className="text-gray-300 hover:text-white mx-4">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
