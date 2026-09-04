export default function RoleSelector() {
  return (
    <div>
      <label className="field-label">I am a</label>
      <div className="grid grid-cols-2 gap-3">
        <button className="btn btn-primary flex-col items-start py-3">
          <span>🍽️ Customer</span>
          <span className="text-xs opacity-80">Order food</span>
        </button>
        <button className="btn btn-ghost flex-col items-start py-3">
          <span>👩‍🍳 Merchant</span>
          <span className="text-xs opacity-70">Sell food</span>
        </button>
      </div>
    </div>
  );
}
