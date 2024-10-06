import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import Swal from "sweetalert2";

export async function registerLoader() {
  if (auth.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const mode = formData.get("mode");

  if (mode === "register") {
    const userRegister = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };
    const result = await auth.register(userRegister);
    if (result) {
      // Trigger SweetAlert2
      Swal.fire({
        title: "Registration Successful",
        text: "You have been successfully registered!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Redirect to login tab
      return redirect("/login");
    }
  }
  return null;
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pb-20">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <Form method="post" className="space-y-4">
            <input type="hidden" name="mode" value="register" />
            <div className="space-y-2">
              <Label htmlFor="register-username">Name</Label>
              <Input
                id="register-username"
                name="name"
                type="text"
                placeholder="Input your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="Input your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                name="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </Form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
