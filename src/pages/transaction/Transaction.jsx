import { useState } from "react";
import Navbar from "../../components/Navbar";
import profileImg from "../../assets/profile.png";
import "../../styles/transaction.css";

export default function Transaction() {
  const [showBalance, setShowBalance] = useState(false);

  // dummy data (nanti ganti dari API)
  const transactions = [
    {
      id: 1,
      type: "TOPUP",
      amount: 10000,
      date: "17 Agustus 2023 13:10 WIB",
      label: "Top Up Saldo",
    },
    {
      id: 2,
      type: "PAYMENT",
      amount: 40000,
      date: "17 Agustus 2023 12:10 WIB",
      label: "Pulsa Prabayar",
    },
    {
      id: 3,
      type: "PAYMENT",
      amount: 10000,
      date: "17 Agustus 2023 11:10 WIB",
      label: "Listrik Pascabayar",
    },
    {
      id: 4,
      type: "TOPUP",
      amount: 50000,
      date: "17 Agustus 2023 10:10 WIB",
      label: "Top Up Saldo",
    },
  ];

  return (
    <>
      <Navbar />

      {/* 🔒 SATU CONTAINER (SAMA SEPERTI TOPUP) */}
      <div className="page-container">
        {/* ================= HEADER ================= */}
        <div className="transaction-header">
          {/* USER */}
          <div className="transaction-user">
            <img src={profileImg} alt="profile" className="avatar" />
            <div className="user-text">
              <span className="welcome-label">Selamat datang,</span>
              <h3 className="welcome-name">Kristanto Wibowo</h3>
            </div>
          </div>

          {/* SALDO */}
          <div className="transaction-balance">
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

        {/* ================= CONTENT ================= */}
        <div className="transaction-card">
          <h4 className="transaction-title">Semua Transaksi</h4>

          <div className="transaction-list">
            {transactions.map((item) => (
              <div key={item.id} className="transaction-item">
                <div className="transaction-left">
                  <div
                    className={`amount ${
                      item.type === "TOPUP" ? "plus" : "minus"
                    }`}
                  >
                    {item.type === "TOPUP" ? "+" : "-"} Rp
                    {item.amount.toLocaleString("id-ID")}
                  </div>
                  <div className="date">{item.date}</div>
                </div>

                <div className="label">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="show-more-wrapper">
            <div className="show-more">Show more</div>
          </div>
        </div>
      </div>
    </>
  );
}
