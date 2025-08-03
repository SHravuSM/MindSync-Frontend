// import { useAuthStore } from "../context/AuthContext";
import api from "../utils/api1";

const ADashboard = () => {
  // const { user, logout } = useAuthStore();
  const handleHi = async () => {
    const res = await api.get("/home");
    console.log(res.data.message);
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <img
        src={user.photo}
        alt="Profile"
        className="w-20 h-20 rounded-full mt-4"
      />
      <button
        className="rounded-md m-5 p-4 bg-red-500 text-white"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default ADashboard;