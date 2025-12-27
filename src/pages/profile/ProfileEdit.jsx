import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import Navbar from "../../../components/Navbar";


import { logout } from "../../features/auth/authSlice";
import {
  fetchProfile,
  updateProfile,
  uploadProfileImage,
} from "../../features/profile/profileThunk";

import "../../styles/profileedit.css";

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.profile);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
  });

  // fetch profile jika belum ada
  useEffect(() => {
    if (!data) dispatch(fetchProfile());
  }, [dispatch, data]);

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(form)).unwrap();
      await dispatch(fetchProfile());
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadProfileImage(file));
    }
  };

  // ✅ LOGOUT FUNCTION (INI YANG TADI KURANG)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="profile-edit-page">
        <div className="profile-edit-center">
          <h4 className="profile-edit-title">Edit Profile</h4>

          {!data && loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="profile-form">
              {/* FOTO */}
              <div className="edit-avatar">
                <img
                  src={data?.profile_image}
                  alt="Profile"
                  className="avatar-img"
                />

                <label className="btn-upload">
                  Ubah Foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* EMAIL */}
              <Form.Group className="profile-group">
                <Form.Label>Email</Form.Label>
                <Form.Control value={data?.email || ""} disabled />
              </Form.Group>

              {/* NAMA DEPAN */}
              <Form.Group className="profile-group">
                <Form.Label>Nama Depan</Form.Label>
                <Form.Control
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* NAMA BELAKANG */}
              <Form.Group className="profile-group">
                <Form.Label>Nama Belakang</Form.Label>
                <Form.Control
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* SIMPAN */}
              <Button type="submit" className="btn-save" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>

              {/* LOGOUT */}
              <Button
                type="button"
                className="btn-logout"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
