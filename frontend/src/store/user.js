import { create } from 'zustand';

export const useUserStore = create((set) => ({
isAuthenticated: false,
user: null,
token: null,
error: null,
setUserState: (user) => set({ user }),
setError: (error) => set({ error }),
logout: () => {
  set({ user: null, token: null, isAuthenticated: false });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
},
checkAuth: () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (!token || !user) {
    set({ user: null, token: null, isAuthenticated: false });
    return false;
  }
  try {
    // Decode JWT (basic, no external lib)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      // Token expired
      set({ user: null, token: null, isAuthenticated: false });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
    set({ user: JSON.parse(user), token, isAuthenticated: true });
    return true;
  } catch (e) {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
},
//Login User    
loginUser: async (credentials) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      set({ error: data.message || "Login failed" });
      return { success: false, message: data.message || "Login failed" };
    }
    set({ user: data.user, token: data.token, isAuthenticated: true, error: null });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return { success: true, message: "Login successful" };
  } catch (error) {
    set({ error: "Network error: " + error.message });
    return { success: false, message: "Network error: " + error.message };
  }
},

  //Register User
  registerUser: async (userInfo) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (!response.ok) {
        set({ error: data.message || "Registration failed" });
        return { success: false, message: data.message || "Registration failed" };
      }

      set({ user: data.user, token: data.token, isAuthenticated: true, error: null });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true, message: "Registration successful" };
    } catch (error) {
      set({ error: "Network error: " + error.message });
      return { success: false, message: "Network error: " + error.message };
    }
  }
}));