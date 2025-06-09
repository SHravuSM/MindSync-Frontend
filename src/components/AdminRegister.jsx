import { useAuthStore } from "../context/AuthContext";

export default function AdminRegister() {
  const { adminWithGoogle } = useAuthStore();
  return (
    <div>
      <button onClick={adminWithGoogle}>Hlo</button>
    </div>
  );
}
