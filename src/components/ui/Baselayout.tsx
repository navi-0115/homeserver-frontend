import { Outlet, Link } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div>
      <nav className="bg-white p-4 drop-shadow">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-black text-2xl font-bold">
            Homeserver
          </Link>
          <Link to="/cart" className="text-black">
            Cart
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
