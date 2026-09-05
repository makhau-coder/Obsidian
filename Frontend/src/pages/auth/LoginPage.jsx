import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm.jsx";

export default function LoginPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to continue ordering.</p>
      <LoginForm />
      <p className="mt-5 text-center text-sm text-muted-foreground">
        Don't have an account? <Link to="/register" className="font-medium text-foreground">Register</Link>
      </p>
    </div>
  );
}
