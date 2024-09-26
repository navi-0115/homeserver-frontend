import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage";
import ProductDetail from "../pages/ProductPage";
import BaseLayout from "../components/ui/Baselayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);
