// src/lib/auth.ts
export const auth = {
  isAuthenticated: false,

  async login({ email, password }: { email: string; password: string }) {
    // Call backend API to authenticate the user and store token in cookies
    const response = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      this.isAuthenticated = true;
      return data;
    }

    return null;
  },

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    // Call backend API to register a new user
    const response = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data; // Return registration success info
    }

    return null;
  },

  async logout() {
    // Call backend API to log out the user
    const response = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/auth/logout",
      {
        method: "POST",
      }
    );

    if (response.ok) {
      this.isAuthenticated = false;
    }
  },
};

// Fetch the authenticated user data
export async function getAuthenticatedUser() {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + `/auth/me`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const user = await response.json();
    return user.data;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
