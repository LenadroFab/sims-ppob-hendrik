import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import Navbar from "../../components/Navbar";
import profileImg from "../../assets/profile.png";
import "../../styles/payment.css";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // kalau akses manual tanpa state → balik ke dashboard
  if (!state) {
    navigate("/");
    return null;
  }

  const { serviceName, icon } = state;

  // =====================
  // STATE
  // =====================
  const [amount, setAmount] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  // =====================
  // HANDLER
  // =====================
  const handleSubmit = (e) => {
    e.preventDefault();

    const nominal = Number(amount);

    if (!nominal || nominal <= 0) {
      alert("Nominal pembayaran tidak valid");
      return;
    }

    // 🔐 VALIDASI SALDO
    if (nominal > BALANCE) {
      alert("Saldo tidak cukup untuk melakukan pembayaran");
      return;
    }

    alert(
      `Pembayaran ${serviceName} sebesar Rp ${nominal.toLocaleString(
        "id-ID"
      )} berhasil`
    );

    navigate("/transaction");
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        {/* =====================
            HEADER (PROFILE + SALDO)
        ===================== */}
        <div className="topup-header">
          {/* KIRI — PROFILE */}
          <div className="topup-user">
            <img src={profileImg} alt="Profile" className="avatar" />
            <div className="user-text">
              <span className="welcome-label">Selamat datang,</span>
              <h3 className="welcome-name">Kristanto Wibowo</h3>
            </div>
          </div>

          {/* KANAN — SALDO */}
          <div className="topup-balance">
            <div className="balance-card">
              <div className="balance-label">Saldo anda</div>

              <div className="balance-amount">
                {showBalance ? "Rp 0" : "Rp ••••••"}
              </div>

              <button
                type="button"
                className="balance-toggle"
                onClick={() => setShowBalance((prev) => !prev)}
              >
                {showBalance ? "Tutup saldo 👁" : "Lihat saldo 👁"}
              </button>
            </div>
          </div>
        </div>

        {/* =====================
            AREA PEMBAYARAN
        ===================== */}
        <div className="payment-section">
          <div className="payment-info">
            <span className="welcome-label">Pembayaran</span>

            <div className="payment-service-title">
              <img src={icon} alt={serviceName} className="payment-icon" />
              <h3 className="welcome-name">{serviceName}</h3>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="number"
              placeholder="Masukkan nominal pembayaran"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button type="submit" className="btn-pay">
              Bayar
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
