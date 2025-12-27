export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={{ fontWeight: "bold", color: "#e53935" }}>● SIMS PPOB</div>

      <nav style={{ display: "flex", gap: 24 }}>
        <span>Top Up</span>
        <span>Transaction</span>
        <span>Akun</span>
      </nav>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 32px",
  borderBottom: "1px solid #eee",
};
