import { UserLogin, UserRegister } from "../schemas/user";
import { Profile } from "../models/User";
import { accessToken } from "./access-token";
import { BACKEND_API_URL } from "./env";

export type Auth = {
  isAuthenticated: boolean;
  getToken: () => string;
  register(userRegister: UserRegister): Promise<Profile | null>;
  login(userLogin: UserLogin): Promise<void | null>;
  checkUser(): Promise<Profile | undefined>;
  logout(): void;
};

export const auth: Auth = {
  isAuthenticated: false,

  getToken() {
    return accessToken.get();
  },

  async register(userRegister: UserRegister) {
    const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userRegister),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const user: Profile = await response.json();
    return user;
  },

  async login(userLogin: UserLogin) {
    try {
      const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      // Check if the result has data and token
      if (!result.data || !result.data.token) {
        console.error("Token not found in response:", result);
        return null;
      }

      // Store the access token in the token utility
      accessToken.set(result.data.token);
      auth.isAuthenticated = true;

      // Return the user data
      return result.data;
    } catch (error) {
      console.error("Login error:", error);
      accessToken.remove();
      auth.isAuthenticated = false;
      return null;
    }
  },

  async checkUser() {
    const token = accessToken.get();

    if (token) {
      try {
        const response = await fetch(`${BACKEND_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jsonResponse = await response.json();
        const user: Profile = jsonResponse.data;

        auth.isAuthenticated = true;
        return user;
      } catch (error) {
        accessToken.remove();
        auth.isAuthenticated = false;
      }
    }
  },

  logout() {
    accessToken.remove();
    auth.isAuthenticated = false;
  },
};
