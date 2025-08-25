import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json(); // parse JSON for both success & error

        if (res.ok) {
          setUser(data.user);
        } else {
          console.error("Auth error:", data.error || res.statusText);
          toast.error(data.error || "Failed to verify authentication");
          setUser(null);
        }
      } catch (err) {
        console.error("Network or JS error:", err);
        toast.error(`Failed to verify authentication: ${err?.message}`);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔹 Signup
  const signup = async (username, email, password) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    setUser(data.user);
  };

  // 🔹 Login
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    console.log("res", res);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error); // ✅ backend error preserved
    }

    setUser(data.user);
  };

  // 🔹 Logout
  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
