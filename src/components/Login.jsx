// src/pages/Login.jsx
import { useAuthContext } from "../context/AuthContext";
import GoogleButton from "./GoogleButton";

const Login = () => {
  const { loginWithGoogle } = useAuthContext();

  return (
    <div className="h-screen flex justify-center items-center">
      {/* <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Sign in with Google
      </button> */}
      <GoogleButton loginWithGoogle={loginWithGoogle} />
    </div>
  );
};

export default Login;
