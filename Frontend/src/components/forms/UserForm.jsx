import FormField from "./FormField.jsx";

export default function UserForm({ user, showRole }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField label="First name" name="user_firstname" value={user?.user_firstname} />
      <FormField label="Last name" name="user_lastname" value={user?.user_lastname} />
      <FormField label="Email" name="user_email" type="email" value={user?.user_email} />
      <FormField label="Phone" name="user_phone" value={user?.user_phone} />
      <FormField label="Gender" name="user_gender" value={user?.user_gender} options={["MALE", "FEMALE", "OTHERS"]} />
      {showRole ? (
        <FormField label="Role" name="user_role" value={user?.user_role} options={["CUSTOMER", "MERCHANT", "ADMIN"]} />
      ) : null}
    </div>
  );
}
