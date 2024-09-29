import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProductDetail from "../pages/ProductPage";
import BaseLayout from "../components/ui/Baselayout";
import { Product } from "@/models/Product";

async function productsLoader(): Promise<Product[]> {
  const response = await fetch(
    "https://homeserver-backend.navingrh.com/api/products"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: productsLoader,
        // errorElement: <ErrorBoundary />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

function ErrorBoundary() {
  return (
    <div className="text-center text-red-500">
      An error occurred. Please try again later.
    </div>
  );
}

export default router;
