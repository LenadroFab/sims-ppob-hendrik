export default function ServicesList({ services }) {
  return (
    <div style={cardStyle}>
      <h3>Layanan</h3>
      <ul>
        {services.map((s) => (
          <li key={s.service_code}>
            {s.service_name} — Rp {s.tariff.toLocaleString("id-ID")}
          </li>
        ))}
      </ul>
    </div>
  );
}

const cardStyle = {
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: 8,
  marginBottom: 16,
};
