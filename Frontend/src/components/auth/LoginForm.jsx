import FormField from "../forms/FormField.jsx";

export default function LoginForm() {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <FormField label="Email" type="email" value="abhay@obsidian.food" />
      <FormField label="Password" type="password" value="password" />
      <button className="btn btn-primary w-full">Login</button>
    </div>
  );
}
