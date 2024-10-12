// // src/lib/auth.ts
// export const auth = {
//   isAuthenticated: false,

//   async login({ email, password }: { email: string; password: string }) {
//     // Call backend API to authenticate the user and store token in cookies
//     const response = await fetch(
//       import.meta.env.VITE_BACKEND_API_URL + "/auth/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       this.isAuthenticated = true;
//       return data;
//     }

//     return null;
//   },

//   async register({
//     name,
//     email,
//     password,
//   }: {
//     name: string;
//     email: string;
//     password: string;
//   }) {
//     // Call backend API to register a new user
//     const response = await fetch(
//       import.meta.env.VITE_BACKEND_API_URL + "/auth/register",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       return data; // Return registration success info
//     }

//     return null;
//   },

//   async logout() {
//     // Call backend API to log out the user
//     const response = await fetch(
//       import.meta.env.VITE_BACKEND_API_URL + "/auth/logout",
//       {
//         method: "POST",
//       }
//     );

//     if (response.ok) {
//       this.isAuthenticated = false;
//     }
//   },
// };

// // Fetch the authenticated user data
// export async function getAuthenticatedUser() {
//   try {
//     const response = await fetch(
//       import.meta.env.VITE_BACKEND_API_URL + "/auth/me",
//       {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Unauthorized");
//     }

//     const user = await response.json();
//     return user.data;
//     console.log("test");
//   } catch (error) {
//     throw new Error("Unauthorized");
//   }
// }

import { User } from "@/types";
import { BACKEND_API_URL } from "@/libs/env";
import { UserLogin, UserRegister } from "@/schemas/user";

export type Auth = {
  isAuthenticated: boolean;
  getToken: () => string | undefined;
  register(userRegister: UserRegister): Promise<void | null>;
  login(userLogin: UserLogin): Promise<void | null>;
  checkUser(): Promise<User | undefined>;
  logout(): void;
};

export const auth: Auth = {
  isAuthenticated: false,

  // Retrieves the token from cookies
  getToken() {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token;
  },

  async register(userRegister: UserRegister) {
    const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userRegister),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const user: User = await response.json();
    if (!user) return null;
  },

  async login(userLogin: UserLogin) {
    try {
      const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important to include cookies
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data: { token?: string; user?: User } = await response.json();

      // Assuming the token is stored in a cookie, so no need to manually store the token in local storage
      if (!data.token) return null;

      auth.isAuthenticated = true;
    } catch (error) {
      document.cookie = "token=; Max-Age=0; path=/"; // Clear token cookie if login fails
      auth.isAuthenticated = false;
    }
  },

  async checkUser() {
    const token = this.getToken();

    if (token) {
      try {
        const response = await fetch(`${BACKEND_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const user: User = await response.json();

        auth.isAuthenticated = true;
        return user;
      } catch (error) {
        document.cookie = "token=; Max-Age=0; path=/"; // Clear token cookie if unauthorized
        auth.isAuthenticated = false;
      }
    }
  },

  logout() {
    document.cookie = "token=; Max-Age=0; path=/"; // Clear token cookie on logout
    auth.isAuthenticated = false;
  },
};
