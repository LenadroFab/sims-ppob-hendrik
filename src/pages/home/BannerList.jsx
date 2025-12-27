export default function BannerList({ banners }) {
  return (
    <div style={cardStyle}>
      <h3>Banner Promo</h3>
      <div style={{ display: "flex", gap: 12 }}>
        {banners.map((b, i) => (
          <img
            key={i}
            src={b.banner_image}
            alt={b.banner_name}
            style={{ width: 300, borderRadius: 6 }}
          />
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: 8,
  marginBottom: 16,
};
