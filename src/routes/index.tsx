import { createBrowserRouter, useRouteError } from "react-router-dom";
import HomePage, { loader as productsLoader } from "@/routes/HomePage";
import RegisterPage, {
  registerAction,
  registerLoader,
} from "@/routes/Register";
import ProductPage, { productDetailLoader } from "@/routes/ProductDetail";
import LoginPage, { loginAction, loginLoader } from "@/routes/LoginPage";
import BaseLayout from "@/components/ui/Baselayout";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserProfilePage, loader as profileLoader } from "@/routes/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: productsLoader,
      },
      {
        path: "/products/:slug",
        element: <ProductPage />,
        loader: productDetailLoader,
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        loader: registerLoader,
        action: registerAction,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
        loader: profileLoader,
      },
    ],
  },
]);

function ErrorBoundary() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div id="error-page" className="items-center justify-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <i>{error.statusText || error.message}</i>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default router;
