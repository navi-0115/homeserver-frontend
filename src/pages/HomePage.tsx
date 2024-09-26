import ProductCard from "../components/ui/ProductCard";
import { products } from "../lib/products";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-6">Product Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
