import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/models/Product";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_API_URL + "/api/products"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const result = await response.json();
  const products = result.data as Product[];

  if (!products) {
    return { products: [] };
  }

  return { products };
}

const Homepage = () => {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-200">
        <img
          src="https://ucarecdn.com/d8ded04b-fa5f-4911-8ea9-09cf7da15b34/vishnumohananrZKdS0wI8Ksunsplash.jpg"
          alt="Hero Image"
          className="w-screen h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Homeserver
          </h1>
        </div>
      </div>

      {/* Product Catalog */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {/* {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.slug ? product.slug : product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
