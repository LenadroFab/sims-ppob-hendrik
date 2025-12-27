import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import Navbar from "../../components/Navbar";

import {
  fetchProfile,
  updateProfile,
} from "../../features/profile/profileThunk";

import avatar from "../../assets/profile.png";
import "../../styles/profile.css";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ TAMBAH INI
  const { data, loading, error } = useSelector((state) => state.profile);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
  });

  // ambil profile
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // isi form dari API
  useEffect(() => {
    if (data) {
      setForm({
        first_name: data.first_name,
        last_name: data.last_name,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-center">
          {/* HEADER */}
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={data?.profile_image || avatar} alt="Profile" />

              <span
                className="edit-icon"
                role="button"
                onClick={() => navigate("/profile/edit")}
              >
                ✎
              </span>
            </div>

            <h3 className="profile-name">
              {data?.first_name} {data?.last_name}
            </h3>
          </div>

          {/* FORM */}
          {error && <Alert variant="danger">{error}</Alert>}

          {!data && loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="profile-form">
              <Form.Group className="profile-group">
                <Form.Label>Email</Form.Label>
                <Form.Control value={data?.email || ""} disabled />
              </Form.Group>

              <Form.Group className="profile-group">
                <Form.Label>Nama Depan</Form.Label>
                <Form.Control
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="profile-group">
                <Form.Label>Nama Belakang</Form.Label>
                <Form.Control
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" className="btn-save" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
