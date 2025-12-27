export default function ProfileCard({ profile }) {
  return (
    <div style={cardStyle}>
      <h3>Profile</h3>
      <p>
        <strong>Nama:</strong> {profile.first_name} {profile.last_name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
}

const cardStyle = {
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: 8,
  marginBottom: 16,
};
