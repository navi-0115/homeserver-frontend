import { Link } from "react-router-dom";
import { Product } from "@/models/Product";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 ">${product.price.toFixed(2)} </p>
        <Link
          to={`/products/${product.slug}`}
          className="mt-4 block w-full text-center bg-zinc-950 text-white py-2 rounded-md hover:bg-zinc-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
