import { useState } from "react";
import { login, register } from "./auth.api";
import { useAuthStore } from "../../store/auth.store";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

type Props = {
  mode: "login" | "register";
  onSuccess?: () => void;
};

export default function AuthForm({ mode, onSuccess }: Props) {
  const setToken = useAuthStore((s) => s.setToken);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      if (mode === "login") {
        const res = await login(form);
        setToken(res.data.token); // ✅ only login stores token
      } else {
        await register(form); // ✅ register only creates user
      }

      onSuccess?.(); // ✅ redirect handled by parent
    } catch (err) {
      console.error("Auth failed", err);
      alert("Authentication failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      {mode === "register" && (
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      )}

      <Input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <Button onClick={submit}>
        {mode === "login" ? "Login" : "Register"}
      </Button>
    </div>
  );
}
