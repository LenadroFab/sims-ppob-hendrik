import pbb from "../assets/PBB.png";
import listrik from "../assets/Listrik.png";
import pulsa from "../assets/Pulsa.png";
import pdam from "../assets/PDAM.png";
import pgn from "../assets/PGN.png";
import tv from "../assets/Televisi.png";
import musik from "../assets/Musik.png";
import game from "../assets/Game.png";
import makanan from "../assets/VoucherMakanan.png";
import kurban from "../assets/Kurban.png";
import zakat from "../assets/Zakat.png";
import paketData from "../assets/PaketData.png";

export const SERVICES = [
  {
    code: "PBB",
    label: "PBB",
    icon: pbb,
    type: "PAYMENT",
  },
  {
    code: "PLN_PREPAID",
    label: "Listrik",
    icon: listrik,
    type: "PAYMENT",
  },
  {
    code: "PULSA",
    label: "Pulsa",
    icon: pulsa,
    type: "PAYMENT",
  },
  {
    code: "PDAM",
    label: "PDAM",
    icon: pdam,
    type: "PAYMENT",
  },
  {
    code: "PGN",
    label: "PGN",
    icon: pgn,
    type: "PAYMENT",
  },
  {
    code: "TV_SUBSCRIPTION",
    label: "TV Langganan",
    icon: tv,
    type: "PAYMENT",
  },
  {
    code: "MUSIC",
    label: "Musik",
    icon: musik,
    type: "PAYMENT",
  },
  {
    code: "GAME_VOUCHER",
    label: "Voucher Game",
    icon: game,
    type: "PAYMENT",
  },
  {
    code: "FOOD_VOUCHER",
    label: "Voucher Makanan",
    icon: makanan,
    type: "PAYMENT",
  },
  {
    code: "QURBAN",
    label: "Kurban",
    icon: kurban,
    type: "PAYMENT",
  },
  {
    code: "ZAKAT",
    label: "Zakat",
    icon: zakat,
    type: "PAYMENT",
  },
  {
    code: "DATA_PACKAGE",
    label: "Paket Data",
    icon: paketData,
    type: "PAYMENT",
  },
];
