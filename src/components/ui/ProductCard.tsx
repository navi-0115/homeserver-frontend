import { Link } from "react-router-dom";
import { Product } from "../../models/Product";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
      <p className="text-gray-700 mt-2">${product.price}</p>
      <Link
        to={`/product/${product.id}`}
        className="text-blue-500 hover:underline mt-4 block"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
