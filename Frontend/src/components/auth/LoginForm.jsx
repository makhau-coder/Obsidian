import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import FormField from "../forms/FormField.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { login } from "../../api/auth.api.js";

// Decode JWT to get role for redirect
function decodeToken(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

export default function LoginForm() {
    const { saveToken } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutation({
        mutationFn: () => login({ user_email: email, user_password: password }),
        onSuccess: (data) => {
            saveToken(data.accessToken);
            const decoded = decodeToken(data.accessToken);
            const role = decoded?.user_role?.toLowerCase();
            if (role === "admin")    navigate("/admin/dashboard");
            else if (role === "merchant") navigate("/merchant/dashboard");
            else navigate("/customer/home");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <FormField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {mutation.isError && (
                <p className="text-sm" style={{ color: "var(--danger)" }}>
                    {mutation.error?.message || "Login failed"}
                </p>
            )}
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Signing in…" : "Login"}
            </button>
        </form>
    );
}
