import type { User } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useCallback, useContext, useState } from "react";

type UserContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Décoder le token pour récupérer l'id/email
  const decodeToken = (token: string) => {
    try {
      return jwtDecode<{ id: string; email: string }>(token);
    } catch {
      return null;
    }
  };

  // Login: stocke le token et fetch l'user
  const login = useCallback(async (jwt: string) => {
    setToken(jwt);
    const decoded = decodeToken(jwt);
    if (decoded?.id) {
      // Fetch user complet depuis ton backend
      const res = await fetch(
        `https://ton-backend.com/api/users/${decoded.id}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      const userData = await res.json();
      setUser(userData);
    }
  }, []);

  // Logout: reset tout
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  // Fetch user si besoin
  const fetchUser = useCallback(async () => {
    if (!token || user) return;
    const decoded = decodeToken(token);
    if (decoded?.id) {
      const res = await fetch(
        `https://ton-backend.com/api/users/${decoded.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userData = await res.json();
      setUser(userData);
    }
  }, [token, user]);

  return (
    <UserContext.Provider value={{ user, token, login, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}