import StatusBadge from "../common/StatusBadge.jsx";

export default function UserCard({ user }) {
  return (
    <div className="card flex items-center justify-between gap-3">
      <div>
        <p className="font-semibold">
          {user.user_firstname} {user.user_lastname}
        </p>
        <p className="text-sm text-muted-foreground">{user.user_email}</p>
        <p className="text-sm text-muted-foreground">{user.user_phone}</p>
      </div>
      <StatusBadge status={user.user_role} />
    </div>
  );
}
