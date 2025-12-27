import { useState } from "react";
import { useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const balance = useSelector((state) => state.balance.balance);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="balance-card">
      <span className="balance-label">Saldo anda</span>

      <div className="balance-amount">
        {showBalance ? formatRupiah(balance) : "Rp •••••••"}
      </div>

      <div
        className="balance-toggle"
        onClick={() => setShowBalance(!showBalance)}
      >
        {showBalance ? <FiEyeOff /> : <FiEye />}
        <span>{showBalance ? "Tutup saldo" : "Lihat saldo"}</span>
      </div>
    </div>
  );
}
