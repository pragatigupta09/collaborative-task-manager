import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <AuthForm
        mode="login"
        onSuccess={() => navigate("/")}
      />
    </div>
  );
}
