import { PROMOS } from "../constants/promos";

export default function PromoList() {
  return (
    <div className="promo-list">
      {PROMOS.map((promo) => (
        <div key={promo.id} className="promo-card">
          <img src={promo.image} alt={promo.title} className="promo-image" />
        </div>
      ))}
    </div>
  );
}
