import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function AdminRegister() {
  const { adminWithGoogle } = useAuthContext();
  return (
    <div>
      <button onClick={adminWithGoogle}>Hlo</button>
    </div>
  );
}
