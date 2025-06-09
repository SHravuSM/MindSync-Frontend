// src/context/AuthContext.js
import axios from "axios";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteUser, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // useful while checking session

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(true);
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const backendUser = res.data.user;
          console.log("User from backend:", backendUser);
          setUser(backendUser);
          localStorage.setItem("user", JSON.stringify(backendUser));
          localStorage.setItem("token", token);
        } catch (err) {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          console.error("Error syncing with backend:", err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   // console.log(localStorage)
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   setUser(user)
  // }, [])

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      // Check with backend if user exists
      // const checkRes = await axios.post(`${import.meta.env.VITE_API_URL}/check-user`, {
      //   email,
      // });

      // if (!checkRes.data.exists) {
      // ❌ User is not in your DB
      // alert("User not registered. Please sign up first.");

      // ✅ Delete from Firebase Auth first
      //   const user = auth.currentUser;
      //   console.log(user)
      //   if (user) {
      //     await deleteUser(user);
      //     console.log("Deleted from Firebase Auth");
      //   }

      //   // ✅ Now sign out
      //   await signOut(auth);
      //   return;
      // }

      // ✅ User exists, proceed
      const token = await result.user.getIdToken(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        token,
      });

      const user = res.data.user;
      setUser(user);
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const signUpWithGoogle = async (role) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        token,
        role
      });

      const user = res.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const adminWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/registeradmin`,
        {
          token,
        }
      );

      const user = res.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/Adashboard");
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const companyRegister = async (details) => {
    console.log(details)
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/registerCompany`, details);
    console.log(res)
  }

  const companyLogin = async (details) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/loginCompany`, details);
    const token = res.data.token
    const user = res.data.user
    console.log(user);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(JSON.stringify(user))
    localStorage.setItem("token", token);
    navigate('/dashboard')
  }

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/")
      })
      .catch(error => console.log('Logout failed : ', error))
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginWithGoogle,
        signUpWithGoogle,
        companyRegister,
        companyLogin,
        adminWithGoogle,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthContext);


// src/store/useAuthStore.js

// import axios from "axios";
// import { create } from "zustand";
// import { useEffect } from "react";
// import { persist } from "zustand/middleware";
// import { auth, provider } from "../firebase";
// import {
//   deleteUser,
//   onAuthStateChanged,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// const VITE_API_URL = import.meta.env.VITE_API_URL;

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       loading: true,
//       navigate: null, // Will hold react-router's navigate function

//       setNavigate: (navFn) => set({ navigate: navFn }),

//       initAuthListener: () => {
//         const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//           if (firebaseUser) {
//             try {
//               const token = await firebaseUser.getIdToken(true);
//               const res = await axios.get(`${VITE_API_URL}/user`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const backendUser = res.data.user;
//               console.log("User from backend:", backendUser);
//               set({ user: backendUser, token });
//             } catch (err) {
//               set({ user: null, token: null });
//               console.error("Error syncing with backend:", err);
//             }
//           } else {
//             set({ user: null, token: null });
//           }
//           set({ loading: false });
//         });

//         return unsubscribe;
//       },

//       loginWithGoogle: async () => {
//         try {
//           const navigate = get().navigate;
//           const result = await signInWithPopup(auth, provider);
//           const email = result.user.email;

//           const checkRes = await axios.post(`${VITE_API_URL}/check-user`, {
//             email,
//           });

//           if (!checkRes.data.exists) {
//             alert("User not registered. Please sign up first.");

//             const user = auth.currentUser;
//             if (user) {
//               await deleteUser(user);
//               console.log("Deleted from Firebase Auth");
//             }

//             await signOut(auth);
//             return;
//           }

//           const token = await result.user.getIdToken(true);
//           const res = await axios.post(`${VITE_API_URL}/login`, { token });

//           const user = res.data.user;
//           set({ user, token });
//           navigate("/dashboard");
//         } catch (err) {
//           console.error("Google sign-in error:", err);
//         }
//       },

//       signUpWithGoogle: async (role) => {
//         try {
//           const navigate = get().navigate;
//           const result = await signInWithPopup(auth, provider);
//           const token = await result.user.getIdToken(true);
//           console.log(role);
//           const res = await axios.post(`${VITE_API_URL}/register`, {
//             token,
//             role,
//           });

//           const user = res.data.user;
//           set({ user, token });
//           navigate("/dashboard");
//         } catch (err) {
//           console.error("Google sign-in error:", err);
//         }
//       },

//       adminWithGoogle: async () => {
//         try {
//           const navigate = get().navigate;
//           const result = await signInWithPopup(auth, provider);
//           const token = await result.user.getIdToken(true);
//           const res = await axios.post(`${VITE_API_URL}/registeradmin`, { token });

//           const user = res.data.user;
//           set({ user, token });
//           navigate("/Adashboard");
//         } catch (err) {
//           console.error("Google sign-in error:", err);
//         }
//       },

//       companyRegister: async (details) => {
//         try {
//           console.log(details);
//           const res = await axios.post(`${VITE_API_URL}/registerCompany`, details);
//           console.log(res);
//         } catch (err) {
//           console.error("Company registration error:", err);
//         }
//       },

//       companyLogin: async (details) => {
//         try {
//           const navigate = get().navigate;
//           const res = await axios.post(`${VITE_API_URL}/loginCompany`, details);
//           const token = res.data.token;
//           const user = res.data.user;
//           console.log(user)
//           set({ user, token });
//           console.log(user);
//           navigate("/dashboard");
//         } catch (err) {
//           console.error("Company login error:", err);
//         }
//       },

//       logout: async () => {
//         try {
//           const navigate = get().navigate;
//           await signOut(auth);
//           set({ user: null, token: null });
//           navigate("/");
//         } catch (error) {
//           console.log("Logout failed : ", error);
//         }
//       },
//     }),
//     {
//       name: "auth-storage",
//       partialize: (state) => ({ user: state.user, token: state.token }),
//       onRehydrateStorage: () => (state) => {
//         // After rehydration, you can mark loading false or call initAuthListener
//         state.set({ loading: false });
//       },
//     }
//   )
// );