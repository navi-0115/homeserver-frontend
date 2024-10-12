// src/routes/profile.tsx
import { redirect, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";
import { auth } from "@/lib/auth";
// import { Profile } from "@/models/User"; // Import the User type

export async function loader() {
  const user = await auth.checkUser();
  if (!user) return redirect("/login");
  return { user };
}

export function UserProfilePage() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (data instanceof Response) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={data.user.avatarUrl || "/placeholder.svg?height=96&width=96"}
              alt={data.user.name}
            />
            <AvatarFallback>
              <UserIcon className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{data.user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg">{data.user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
