import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchServices } from "../features/services/serviceThunk";
import "../styles/serviceGrid.css";

export default function ServiceGrid() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data = [], // ⬅️ DEFAULT ARRAY (PENTING)
    loading,
    error,
  } = useSelector((state) => state.services || {});

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // loading state
  if (loading) {
    return <p style={{ marginTop: 24 }}>Loading services...</p>;
  }

  // error state
  if (error) {
    return <p style={{ marginTop: 24, color: "red" }}>Gagal memuat layanan</p>;
  }

  return (
    <div className="services-grid">
      {data.map((item) => (
        <div
          key={item.service_code}
          className="service-item"
          onClick={() => navigate(`/service/${item.service_code}`)}
        >
          <img
            src={item.service_icon}
            alt={item.service_name}
            className="service-icon"
          />
          <span className="service-label">{item.service_name}</span>
        </div>
      ))}
    </div>
  );
}
