// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api1";
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


  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
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
