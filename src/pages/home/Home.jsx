import { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [p, b, s, bn] = await Promise.all([
      api.get("/profile"),
      api.get("/balance"),
      api.get("/services"),
      api.get("/banner"),
    ]);

    setProfile(p.data.data);
    setBalance(b.data.data.balance);
    setServices(s.data.data);
    setBanners(bn.data.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Header />

      <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
        {/* GREETING + SALDO */}
        <div style={topSection}>
          <div>
            <p>Selamat datang,</p>
            <h2>
              {profile?.first_name} {profile?.last_name}
            </h2>
          </div>

          <div style={saldoCard}>
            <p>Saldo anda</p>
            <h2>Rp ••••••</h2>
            <small>Lihat saldo</small>
          </div>
        </div>

        {/* SERVICES */}
        <div style={serviceGrid}>
          {services.map((s) => (
            <div key={s.service_code} style={serviceItem}>
              <div style={iconBox}>🔌</div>
              <small>{s.service_name}</small>
            </div>
          ))}
        </div>

        {/* BANNER */}
        <h3 style={{ margin: "24px 0 12px" }}>Temukan promo menarik</h3>
        <div style={bannerRow}>
          {banners.map((b, i) => (
            <img
              key={i}
              src={b.banner_image}
              alt={b.banner_name}
              style={bannerImg}
            />
          ))}
        </div>

        {/* LOGOUT */}
        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </>
  );
}

const topSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 32,
};

const saldoCard = {
  background: "#f44336",
  color: "#fff",
  padding: 24,
  borderRadius: 12,
  width: 320,
};

const serviceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: 20,
  textAlign: "center",
  marginBottom: 32,
};

const serviceItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

const iconBox = {
  width: 48,
  height: 48,
  borderRadius: 12,
  background: "#f5f5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
};

const bannerRow = {
  display: "flex",
  gap: 16,
  overflowX: "auto",
};

const bannerImg = {
  width: 280,
  borderRadius: 12,
};

const logoutBtn = {
  marginTop: 32,
  background: "#e53935",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  cursor: "pointer",
};
