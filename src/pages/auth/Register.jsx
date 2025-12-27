import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Envelope, Person, Lock, Eye, EyeSlash } from "react-bootstrap-icons";

import { registerUser } from "../../features/auth/authThunk";
import { resetAuth } from "../../features/auth/authSlice";

import illustration from "../../assets/illustration-login.png";
import logo from "../../assets/Logo.png";
import "../../styles/auth.css";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.auth);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi password tidak sama");
      return;
    }

    dispatch(registerUser(form));
  };

  // redirect ke login setelah register sukses
  useEffect(() => {
    if (success) {
      localStorage.removeItem("token"); // ⬅️ TAMBAH INI

      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  // reset auth state saat keluar halaman
  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

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
            <h3>Lengkapi data untuk membuat akun</h3>
          </div>

          {success && (
            <Alert variant="success">
              Register berhasil! Mengalihkan ke halaman login...
            </Alert>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <Form.Label>Email address</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <Envelope />
              </InputGroup.Text>
              <Form.Control
                name="email"
                placeholder="masukan email anda"
                value={form.email}
                onChange={handleChange}
              />
            </InputGroup>

            {/* NAMA DEPAN */}
            <Form.Label>Nama Depan</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <Person />
              </InputGroup.Text>
              <Form.Control
                name="firstName"
                placeholder="masukan nama depan"
                value={form.firstName}
                onChange={handleChange}
              />
            </InputGroup>

            {/* NAMA BELAKANG */}
            <Form.Label>Nama Belakang</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <Person />
              </InputGroup.Text>
              <Form.Control
                name="lastName"
                placeholder="masukan nama belakang"
                value={form.lastName}
                onChange={handleChange}
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
              />
              <InputGroup.Text
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeSlash /> : <Eye />}
              </InputGroup.Text>
            </InputGroup>

            {/* KONFIRMASI PASSWORD */}
            <Form.Label>Konfirmasi Password</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <Lock />
              </InputGroup.Text>
              <Form.Control
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Konfirmasi password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <InputGroup.Text
                className="cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeSlash /> : <Eye />}
              </InputGroup.Text>
            </InputGroup>

            <Button type="submit" className="btn-auth w-100" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Registrasi"}
            </Button>
          </Form>

          <p className="auth-footer">
            sudah punya akun?{" "}
            <span onClick={() => navigate("/login")}>login disini</span>
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <img src={illustration} alt="Register Illustration" />
      </div>
    </div>
  );
}
