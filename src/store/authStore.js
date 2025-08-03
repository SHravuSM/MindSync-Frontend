import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      logIn: async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email,
          password,
        });
        console.log("Login Response:", res);
        set({ user: res.data.user, token: res.data.token });
        return res.data;
      },

      signUp: async (role, email, password) => {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/register`,
          { role, email, password }
        );
        return res.data.user;
      },

      logOut: () => {
        set({ user: null, token: null });
      },

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        return {
          user: state.user,
          token: state.token,
        };
      },
    }
  )
);

export default useAuthStore;
export const authStore = useAuthStore;
