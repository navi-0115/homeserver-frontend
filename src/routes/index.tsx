import { createBrowserRouter } from "react-router-dom";
import HomePage, { loader as productsLoader } from "@/routes/HomePage";
import AuthPage, { authLoader, authAction } from "@/routes/AuthPage";
import ProductPage from "@/routes/ProductPage";
import BaseLayout from "@/components/ui/Baselayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: productsLoader,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
        // loader: productLoader,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        loader: authLoader,
        action: authAction,
      },
    ],
  },
]);

// function ErrorBoundary() {
//   const error = useRouteError() as any;
//   console.error(error);

//   return (
//     <div id="error-page">
//       <h1>Oops!</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p>
//         <i>{error.statusText || error.message}</i>
//       </p>
//     </div>
//   );
// }

export default router;
