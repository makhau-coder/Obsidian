import FormField from "./FormField.jsx";

export default function UserForm({ user, showRole }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField label="First name" value={user.user_firstname} />
      <FormField label="Last name" value={user.user_lastname} />
      <FormField label="Email" type="email" value={user.user_email} />
      <FormField label="Phone" value={user.user_phone} />
      <FormField label="Gender" value={user.user_gender} options={["MALE", "FEMALE", "OTHERS"]} />
      {showRole ? (
        <FormField label="Role" value={user.user_role} options={["CUSTOMER", "MERCHANT", "ADMIN"]} />
      ) : null}
    </div>
  );
}
