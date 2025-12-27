import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
