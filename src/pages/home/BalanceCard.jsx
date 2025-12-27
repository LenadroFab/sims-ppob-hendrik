export default function BalanceCard({ balance }) {
  return (
    <div style={{ ...cardStyle, background: "#f5f7ff" }}>
      <h3>Saldo</h3>
      <p style={{ fontSize: 20 }}>Rp {balance.toLocaleString("id-ID")}</p>
    </div>
  );
}

const cardStyle = {
  padding: 16,
  borderRadius: 8,
  marginBottom: 16,
};
