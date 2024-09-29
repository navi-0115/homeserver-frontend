import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/models/Product";

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ProductsResponse = await fetch(
          "https://homeserver-backend.navingrh.com/api/products"
        );
        if (!ProductsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await ProductsResponse.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-200">
        <img
          src="https://ucarecdn.com/d8ded04b-fa5f-4911-8ea9-09cf7da15b34/vishnumohananrZKdS0wI8Ksunsplash.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover"
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
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.slug ? product.slug : product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;
