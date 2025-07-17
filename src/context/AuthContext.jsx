import axios from "axios";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteUser, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false)
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('dark');
    return stored === 'true'; // convert string to boolean
  });
  const [submit, setSubmit] = useState(false);
  const [yes, setYes] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setState(false);
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
          // console.log("User from backend:", backendUser);
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

  useEffect(() => {
    localStorage.setItem('dark', dark);
  }, [dark]);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        token,
      });

      const user = res.data.user;
      console.log(user)
      setUser(user);
      const Name = user.name;
      console.log(Name)
      user.role === 'creator' ? navigate("/dashboard") : navigate(`/${Name}`);
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
      console.log(user)
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
        setState,
        state,
        yes,
        setDark,
        dark,
        setYes,
        setSubmit,
        submit,
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




// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";
// import { auth, provider } from "../firebase";
// import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       loading: true,
//       dark: localStorage.getItem("dark") === "true",
//       submit: false,
//       state: false,
//       yes: false,

//       // Simple setters
//       setUser: (user) => set({ user }),
//       setDark: (val) => {
//         localStorage.setItem("dark", val);
//         set({ dark: val });
//       },
//       setSubmit: (val) => set({ submit: val }),
//       setState: (val) => set({ state: val }),
//       setYes: (val) => set({ yes: val }),

//       // Auth listener
//       initAuthListener: () => {
//         const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//           if (firebaseUser) {
//             try {
//               const token = await firebaseUser.getIdToken(true);
//               const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const backendUser = res.data.user;
//               set({ user: backendUser });
//               localStorage.setItem("user", JSON.stringify(backendUser));
//               localStorage.setItem("token", token);
//             } catch (err) {
//               console.error("Backend sync error:", err);
//               set({ user: null });
//               localStorage.removeItem("user");
//               localStorage.removeItem("token");
//             }
//           } else {
//             set({ user: null });
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//           }
//           set({ loading: false });
//         });

//         return unsubscribe;
//       },

//       // Google login for user
//       loginWithGoogle: async (navigate) => {
//         try {
//           const result = await signInWithPopup(auth, provider);
//           const token = await result.user.getIdToken(true);
//           const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { token });

//           const user = res.data.user;
//           set({ user });
//           localStorage.setItem("user", JSON.stringify(user));
//           localStorage.setItem("token", token);

//           const Name = user.name;
//           user.role === "creator" ? navigate("/dashboard") : navigate(`/${Name}`);
//         } catch (err) {
//           console.error("Google sign-in error:", err);
//         }
//       },

//       // Signup with Google
//       signUpWithGoogle: async (role, navigate) => {
//         try {
//           const result = await signInWithPopup(auth, provider);
//           const token = await result.user.getIdToken(true);
//           const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { token, role });

//           const user = res.data.user;
//           set({ user });
//           localStorage.setItem("user", JSON.stringify(user));
//           localStorage.setItem("token", token);
//           navigate("/dashboard");
//         } catch (err) {
//           console.error("Signup error:", err);
//         }
//       },

//       // Admin login
//       adminWithGoogle: async (navigate) => {
//         try {
//           const result = await signInWithPopup(auth, provider);
//           const token = await result.user.getIdToken(true);
//           const res = await axios.post(`${import.meta.env.VITE_API_URL}/registeradmin`, { token });

//           const user = res.data.user;
//           set({ user });
//           localStorage.setItem("user", JSON.stringify(user));
//           localStorage.setItem("token", token);
//           navigate("/Adashboard");
//         } catch (err) {
//           console.error("Admin login error:", err);
//         }
//       },

//       // Company register
//       companyRegister: async (details) => {
//         try {
//           const res = await axios.post(`${import.meta.env.VITE_API_URL}/registerCompany`, details);
//           console.log("Company registered:", res.data);
//         } catch (err) {
//           console.error("Company registration failed:", err);
//         }
//       },

//       // Company login
//       companyLogin: async (details, navigate) => {
//         try {
//           const res = await axios.post(`${import.meta.env.VITE_API_URL}/loginCompany`, details);
//           const { token, user } = res.data;
//           set({ user });
//           localStorage.setItem("user", JSON.stringify(user));
//           localStorage.setItem("token", token);
//           navigate("/dashboard");
//         } catch (err) {
//           console.error("Company login failed:", err);
//         }
//       },

//       // Logout
//       logout: async (navigate) => {
//         try {
//           await signOut(auth);
//           set({ user: null });
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//           navigate("/");
//         } catch (error) {
//           console.log("Logout failed:", error);
//         }
//       },
//     }),
//     {
//       name: "auth-storage", // name for persist
//       partialize: (state) => ({ user: state.user, dark: state.dark }), // only persist necessary values
//     }
//   )
// );