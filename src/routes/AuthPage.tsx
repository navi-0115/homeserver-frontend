import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { auth } from "@/lib/auth";

export async function authLoader() {
  if (auth.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export const authAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const mode = formData.get("mode");

  if (mode === "login") {
    const userLogin = {
      username: String(formData.get("username")),
      password: String(formData.get("password")),
    };
    const result = await auth.login(userLogin);
    if (result) {
      return redirect("/dashboard");
    }
  } else if (mode === "register") {
    const userRegister = {
      username: String(formData.get("username")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };
    const result = await auth.register(userRegister);
    if (result) {
      return redirect("/login");
    }
  }
  return null;
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center pb-20">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <div className="mt-8">
              <TabsContent value="login">
                <Form method="post" className="space-y-4">
                  <input type="hidden" name="mode" value="login" />
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="username"
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
              </TabsContent>
              <TabsContent value="register">
                <Form method="post" className="space-y-4">
                  <input type="hidden" name="mode" value="register" />
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      name="username"
                      type="text"
                      placeholder="Input your username"
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
                  {/* <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      required
                    />
                  </div> */}
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </Form>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
