import React, { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(async (email, password, name) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Validate inputs
      if (!email || !password || !name) {
        throw new Error("All fields are required!");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters!");
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email!");
      }

      // Simulate storing user (in real app, send to backend)
      const newUser = {
        id: `u${Date.now()}`,
        email,
        name,
        password, // In real app, hash password on backend
        createdAt: new Date(),
      };

      // Store in localStorage (simulating database)
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.find((u) => u.email === email);

      if (userExists) {
        throw new Error("Email already registered!");
      }

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Set user in state
      setUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      });

      // Store auth token in localStorage
      localStorage.setItem("authToken", newUser.id);

      setIsLoading(false);
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!email || !password) {
        throw new Error("Email and password are required!");
      }

      // Get users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = existingUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password!");
      }

      // Set user in state
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      });

      // Store auth token
      localStorage.setItem("authToken", foundUser.id);

      setIsLoading(false);
      return { success: true, user: foundUser };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem("authToken");
  }, []);

  const value = {
    user,
    isLoading,
    error,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
