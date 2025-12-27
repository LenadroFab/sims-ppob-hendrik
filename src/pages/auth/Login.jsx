import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Envelope, Lock, Eye, EyeSlash } from "react-bootstrap-icons";

import { loginUser } from "../../features/auth/authThunk";
import { resetAuth } from "../../features/auth/authSlice";

import illustration from "../../assets/illustration-login.png";
import logo from "../../assets/Logo.png";
import "../../styles/auth.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 🔁 reset auth state saat keluar halaman
  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

  // ✅ redirect setelah login sukses
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: form.email,
        password: form.password,
      })
    );
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT */}
      <div className="auth-left">
        <div className="auth-card">
          {/* HEADER */}
          <div className="auth-header">
            <div className="brand">
              <img src={logo} alt="SIMS PPOB Logo" />
              <span>SIMS PPOB</span>
            </div>
            <h3>Masuk atau buat akun untuk memulai</h3>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <Form.Label>Email address</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <Envelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                placeholder="Masukan email anda"
                value={form.email}
                onChange={handleChange}
                required
              />
            </InputGroup>

            {/* PASSWORD */}
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <Lock />
              </InputGroup.Text>
              <Form.Control
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Masukan password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <InputGroup.Text
                className="cursor-pointer"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <EyeSlash /> : <Eye />}
              </InputGroup.Text>
            </InputGroup>

            <Button type="submit" className="btn-auth w-100" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Masuk"}
            </Button>
          </Form>

          <p className="auth-footer">
            Belum punya akun?{" "}
            <span onClick={() => navigate("/register")}>registrasi disini</span>
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <img src={illustration} alt="Login Illustration" />
      </div>
    </div>
  );
}
