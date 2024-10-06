import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/models/Product";

async function fetchProduct(slug: string) {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_API_URL + `/api/products/${slug}`
  );
  if (!response.ok) {
    throw new Error("Product not found");
  }
  const result = await response.json();
  const product = result.data as Product[];
  return product;
}

// Loader function
export async function productDetailLoader({ params }: any) {
  const product = await fetchProduct(params.slug);
  return product;
}

export default function ProductDetail() {
  const product = useLoaderData() as Product;
  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Handle increment
  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  // Handle decrement
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // manual quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:space-x-8">
        {/* Product Image */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="text-2xl font-bold mb-6">
            <p className="text-gray-600 ">
              Rp
              {product.price.toLocaleString("id-ID", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {"  "}
            </p>
          </div>

          {/* Quantity Selector and Add to Cart */}
          <div className="flex items-center mb-6">
            <div className="flex items-center border rounded-md mr-4">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                className="rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border-y focus:outline-none"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-grow">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
