import { create } from 'zustand';

export const useUserStore = create((set) => ({
isAuthenticated: false,
user: null,
setUser: (user) => set({ user }),
// login: (user, token) =>
//   set({
//     user,
//     token,
//     isAuthenticated: true,
//   }),  
  logout: () => set({ user: null, token: null, isAuthenticated: false }),

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
        return { success: false, message: data.message || "Login failed" };
      }

      set({ user: data.user, token: data.token, isAuthenticated: true });
      localStorage.setItem("token", data.token);
      return { success: true, message: "Login successful" };
    } catch (error) {
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
        return { success: false, message: data.message || "Registration failed" };
      }

      set({ user: data.user });
      localStorage.setItem("token", data.token);
      return { success: true, message: "Registration successful" };
    } catch (error) {
      return { success: false, message: "Network error: " + error.message };
    }
  }
}));