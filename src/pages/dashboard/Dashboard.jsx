import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import ServiceGrid from "../../components/ServiceGrid";

import {
  fetchBalance,
  fetchBanner,
} from "../../features/dashboard/dashboardThunk";

import avatar from "../../assets/profile.png";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { balance = 0, banner = [] } = useSelector(
    (state) => state.dashboard || {}
  );

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchBanner());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        {/* ===== TOP SECTION ===== */}
        <div className="dashboard-top">
          <div className="dashboard-user">
            <img src={avatar} className="user-avatar" />
            <div>
              <span className="welcome-text">Selamat datang,</span>
              <h3 className="user-name">Kristanto Wibowo</h3>
            </div>
          </div>

          <div className="dashboard-balance">
            <span className="balance-label">Saldo anda</span>
            <h2 className="balance-amount">Rp ••••••</h2>
            <span className="balance-action">Lihat Saldo 👁</span>
          </div>
        </div>

        {/* ===== SERVICES ===== */}
        <ServiceGrid />

        {/* ===== PROMO TITLE ===== */}
        <h4 className="promo-title">Temukan promo menarik</h4>

        {/* ===== BANNER ===== */}
        <div className="dashboard-banner">
          {banner.map((item) => (
            <img
              key={item.banner_name}
              src={item.banner_image}
              alt={item.banner_name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
