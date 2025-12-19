import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <AuthForm
        mode="register"
        onSuccess={() => navigate("/login")}
      />
    </div>
  );
}
