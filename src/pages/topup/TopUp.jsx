import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

import Navbar from "../../components/Navbar";
import { submitTopUp } from "../../features/topup/topupThunk";
import { fetchProfile } from "../../features/profile/profileThunk";

import profileImg from "../../assets/profile.png";
import "../../styles/topup.css";

export default function TopUp() {
  const dispatch = useDispatch();

  // 🔹 TOPUP STATE
  const { loading, error, success } = useSelector((state) => state.topup);

  // 🔹 PROFILE STATE (SOURCE OF TRUTH SALDO)
  const { data: profile } = useSelector((state) => state.profile);
  const balance = profile?.balance || 0;

  // STATE
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  // KONSTANTA
  const QUICK_AMOUNTS = [50000, 100000, 200000, 500000, 1000000];
  const MIN_TOPUP = 10000;
  const isAmountValid = Number(amount) >= MIN_TOPUP;

  // AMBIL PROFILE (SALDO)
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // SETELAH TOPUP SUKSES → REFRESH PROFILE
  useEffect(() => {
    if (!success) return;

    setAmount("");
    dispatch(fetchProfile());

    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 2500);
    return () => clearTimeout(timer);
  }, [success, dispatch]);

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAmountValid) return;
    dispatch(submitTopUp(amount));
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        {/* ================= HEADER ================= */}
        <div className="topup-header">
          {/* USER */}
          <div className="topup-user">
            <img src={profileImg} alt="Profile" className="avatar" />
            <div className="user-text">
              <span className="welcome-label">Selamat datang,</span>
              <h3 className="welcome-name">
                {profile?.first_name} {profile?.last_name}
              </h3>
            </div>
          </div>

          {/* SALDO */}
          <div className="topup-balance">
            <div className="balance-card">
              <div className="balance-label">Saldo anda</div>
              <div className="balance-amount">
                {showBalance
                  ? `Rp ${balance.toLocaleString("id-ID")}`
                  : "Rp ••••••"}
              </div>
              <button
                type="button"
                className="balance-toggle"
                onClick={() => setShowBalance((p) => !p)}
              >
                {showBalance ? "Tutup saldo 👁" : "Lihat saldo 👁"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="topup-card">
          <div className="topup-heading">
            <div className="topup-subtitle">Silakan masukan</div>
            <div className="topup-title">Nominal Top Up</div>
          </div>

          {loading && <Spinner />}
          {error && <Alert variant="danger">{error}</Alert>}
          {showSuccess && <Alert variant="success">Top up berhasil 🎉</Alert>}

          <Form onSubmit={handleSubmit}>
            <div className="topup-input-grid">
              <Form.Control
                type="number"
                placeholder="Masukkan nominal Top Up"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="quick-amount">
                {QUICK_AMOUNTS.map((nominal) => (
                  <button
                    key={nominal}
                    type="button"
                    className={`quick-btn ${
                      Number(amount) === nominal ? "active" : ""
                    }`}
                    onClick={() => setAmount(nominal)}
                    disabled={loading}
                  >
                    Rp{nominal.toLocaleString("id-ID")}
                  </button>
                ))}
              </div>
            </div>

            {amount && !isAmountValid && (
              <div className="text-danger small mb-3">
                Minimal top up Rp {MIN_TOPUP.toLocaleString("id-ID")}
              </div>
            )}

            <Button
              type="submit"
              className="btn-topup"
              disabled={loading || !isAmountValid}
            >
              {loading ? "Memproses..." : "Top Up"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
