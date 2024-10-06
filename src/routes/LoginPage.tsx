import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import Swal from "sweetalert2";

export async function loginLoader() {
  if (auth.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const mode = formData.get("mode");

  if (mode === "login") {
    const userLogin = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };
    const result = await auth.login(userLogin);
    if (result) {
      // Trigger SweetAlert2
      Swal.fire({
        title: "Login Successful",
        text: "You have been successfully logged in!",
        icon: "success",
        confirmButtonText: "OK",
      });

      return redirect("/");
    }
  }
};
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pb-20">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <Form method="post" className="space-y-4">
            <input type="hidden" name="mode" value="login" />
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="Input your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
