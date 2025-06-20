// src/context/AuthContext.js
import axios from "axios";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteUser, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false)
  const [dark, setDark] = useState(false)
  const [submit, setSubmit] = useState(false);
  const [yes, setYes] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // useful while checking session

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