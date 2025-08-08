import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        id: null,
        role: null,
      },
      token: null,
      logIn: async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email,
          password,
        });
        console.log(res.data)

        return res.data;
      },

      signUp: async (name, role, email, password) => {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/register`,
          { name, role, email, password }
        );
        return res.data.user;
      },

      logOut: () => {
        set({ user: null, token: null });
      },
      setToken: (token) => set({ token }),
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
