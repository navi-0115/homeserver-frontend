export const auth = {
  isAuthenticated: false,

  async login({ username, password }: { username: string; password: string }) {
    // Call backend API to authenticate the user
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      this.isAuthenticated = true;
      return data;
    }
    return null;
  },

  async register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    // Call backend API to register a new user
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  },
};
