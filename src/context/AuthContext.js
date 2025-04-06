import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password });
      console.log("LOGIN SUCCESS RESPONSE:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.msg || "Login failed";
      throw new Error(errorMsg); // Re-throw the error so Login.js can catch it
    }
    
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await registerUser({ name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
