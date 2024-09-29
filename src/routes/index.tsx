import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetail from "../pages/ProductPage";
import BaseLayout from "../components/ui/Baselayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);
