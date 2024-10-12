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

  async register(userRegister: UserRegister): Promise<Profile | null> {
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

      const data: { token?: string; user?: Profile } = await response.json();
      if (!data.token) return null;

      accessToken.set(data.token);
      auth.isAuthenticated = true;
    } catch (error) {
      accessToken.remove();
      auth.isAuthenticated = false;
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
