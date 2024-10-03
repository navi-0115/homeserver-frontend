export const auth = {
  isAuthenticated: false,

  async login({ username, password }: { username: string; password: string }) {
    // Call backend API to authenticate the user
    const response = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
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
