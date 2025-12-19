import AuthForm from "./AuthForm";
import loginImage from "../../assets/images/login.png"; // Add your image
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={loginImage} alt="Login" className="w-24 mb-4" />
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <AuthForm mode="login" onSuccess={() => navigate("/")} />
      </div>
    </div>
  );
}
