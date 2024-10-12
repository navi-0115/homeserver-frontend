export const auth = {
  isAuthenticated: false,

  async login({ email, password }: { email: string; password: string }) {
    // Call backend API to authenticate the user
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
      return data;
    }
    return null;
  },
};

// get authenticated user
export async function getAuthenticatedUser() {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_API_URL + "/auth/me",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  return data.data;
}
