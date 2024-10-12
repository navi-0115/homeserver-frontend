// src/routes/profile.tsx
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { getAuthenticatedUser } from "@/lib/auth";
import { Profile } from "@/models/User";

export const loader: LoaderFunction = async () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  try {
    const user = await getAuthenticatedUser();
    return user;
  } catch {
    throw new Response("Failed to load user data", { status: 500 });
  }
};

export default function ProfilePage() {
  const user = useLoaderData() as Profile;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            {/* Display avatar or fallback */}
            <AvatarImage
              src={user.avatarUrl || "/placeholder.svg?height=96&width=96"}
              alt={user.name}
            />
            <AvatarFallback>
              <User className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
