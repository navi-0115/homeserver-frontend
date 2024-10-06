import { useLoaderData } from "react-router-dom";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/models/Product";

// Fetch the product data based on slug from an API
async function fetchProduct(slug: string): Promise<Product | null> {
  const response = await fetch(`/api/products/${slug}`);
  if (response.ok) {
    return await response.json();
  }
  return null;
}

// Loader function to fetch product data before rendering
export async function loader({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return product;
}

export default function ProductDetail() {
  const product = useLoaderData() as Product;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Price */}
              <div className="text-2xl font-bold mb-6">
                ${(product.price / 100).toFixed(2)}
              </div>

              {/* Add to Cart */}
              <Button className="w-full mb-6">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
