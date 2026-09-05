import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm.jsx";

export default function RegisterPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">It takes less than a minute.</p>
      <RegisterForm />
      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/login" className="font-medium text-foreground">Login</Link>
      </p>
    </div>
  );
}
