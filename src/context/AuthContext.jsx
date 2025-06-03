// src/context/AuthContext.js
import axios from "axios";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
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

  // const loginWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const token = await result.user.getIdToken(true);
  //     const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
  //       token,
  //     });

  //     const user = res.data.user;
  //     setUser(user);
  //     console.log(user)
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("token", token);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     console.error("Google sign-in error:", err);
  //   }
  // };

  // const loginWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     console.log(user)
  //     const email = result.user.email;  // get user's email from Google account
  //     // Ask backend if user exists
  //     const checkRes = await axios.post(`${import.meta.env.VITE_API_URL}/check-user`, {
  //       email,
  //     });
  //     console.log(checkRes)
  //     if (!checkRes.data.exists) {
  //       // User does not exist in your system yet
  //       alert("User not registered. Please sign up first.");
  //       await signOut(auth); // sign out from Firebase Auth popup session
  //       const user = auth.currentUser
  //       deleteUser(user)
  //       return; // exit early, do not proceed
  //     }

  //     // User exists, proceed with login flow
  //     const token = await result.user.getIdToken(true);
  //     console.log(token)
  //     const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
  //       token,
  //     });

  //     const user = res.data.user;
  //     setUser(user);
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("token", token);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     console.error("Google sign-in error:", err);
  //   }
  // };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      // Check with backend if user exists
      const checkRes = await axios.post(`${import.meta.env.VITE_API_URL}/check-user`, {
        email,
      });

      if (!checkRes.data.exists) {
        // ❌ User is not in your DB
        alert("User not registered. Please sign up first.");

        // ✅ Delete from Firebase Auth first
        const user = auth.currentUser;
        console.log(user)
        if (user) {
          await deleteUser(user);
          console.log("Deleted from Firebase Auth");
        }

        // ✅ Now sign out
        await signOut(auth);
        return;
      }

      // ✅ User exists, proceed
      const token = await result.user.getIdToken(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        token,
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


  const signUpWithGoogle = async (role) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      console.log(role)
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

  const logout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginWithGoogle,
        signUpWithGoogle,
        adminWithGoogle,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
