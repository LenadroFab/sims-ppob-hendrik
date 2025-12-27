export default function ServiceItem({ icon: Icon, label }) {
  return (
    <div className="service-item">
      <div className="service-icon">
        <Icon size={22} />
      </div>
      <span>{label}</span>
    </div>
  );
}
