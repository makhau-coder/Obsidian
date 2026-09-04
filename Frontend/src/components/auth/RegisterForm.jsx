import FormField from "../forms/FormField.jsx";
import RoleSelector from "./RoleSelector.jsx";

export default function RegisterForm() {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name" value="" />
        <FormField label="Last name" value="" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Gender" value="MALE" options={["MALE", "FEMALE", "OTHERS"]} />
        <FormField label="Phone" value="" />
      </div>
      <FormField label="Email" type="email" value="" />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Password" type="password" value="" />
        <FormField label="Confirm password" type="password" value="" />
      </div>
      <RoleSelector />
      <button className="btn btn-primary w-full">Register</button>
    </div>
  );
}
