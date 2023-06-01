import { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`/auth/login`, { email, password });
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetProfile = async () => {
    try {
      const response = await Axios.get(`/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      if (response.data) {
        setProfileData({});
      } else {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    setEditProfile(true);
    setProfileData(profile);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditProfile(false);
      handleGetProfile();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancelEdit = () => {
    setEditProfile(false);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setProfile(null);
  };

  useEffect(() => {
    if (token && !profile) {
      handleGetProfile();
    }
  }, [token, profile]);

  return (
    <>
      {token ? (
        <div className="profile-container">
          {editProfile ? (
            <form onSubmit={handleSaveProfile}>
              <h1 className="title">Editar Perfil</h1>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Apellido:</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-input"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  id="birthDate"
                  className="form-input"
                  value={profileData.birthDate}
                  onChange={(e) =>
                    setProfileData({ ...profileData, birthDate: e.target.value })
                  }
                  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Dirección:</label>
                    <input
                      type="text"
                      id="address"
                      className="form-input"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({ ...profileData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Género:</label>
                    <input
                      type="text"
                      id="gender"
                      className="form-input"
                      value={profileData.gender}
                      onChange={(e) =>
                        setProfileData({ ...profileData, gender: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-input"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="curp">CURP:</label>
                    <input
                      type="text"
                      id="curp"
                      className="form-input"
                      value={profileData.curp}
                      onChange={(e) =>
                        setProfileData({ ...profileData, curp: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Rol:</label>
                    <input
                      type="text"
                      id="role"
                      className="form-input"
                      value={profileData.role}
                      onChange={(e) =>
                        setProfileData({ ...profileData, role: e.target.value })
                      }
                    />
                  </div>
                  <button type="button" className="form-button" onClick={handleCancelEdit}>
                    Cancelar
                    </button>
                    <button type="submit" className="form-button">
                      Guardar
                      </button>
                      </form>
                ) : (
                <>
                  <h1 className="title">Tu perfil</h1>
                  <button className="edit-button" onClick={handleEditProfile}>
                    <i className="fas fa-edit"></i> Editar
                  </button>
                  <button className="logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                  </button>
                  {profile && (
                    <div className="profile">
                      <div className="profile-item">
                        <span className="profile-label">Nombre:</span>
                        <span className="profile-value">{profile.name}</span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-label">Apellido:</span>
                        <span className="profile-value">{profile.lastName}</span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-label">Fecha de Nacimiento:</span>
                        <span className="profile-value">{new Date(profile.birthDate).toLocaleDateString()}</span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-label">Dirección:</span>
                        <span className="profile-value">{profile.address}</span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-label">Género:</span>
                        <span className="profile-value">{profile.gender}</span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-label">Teléfono:</span>
                        <span className="profile-value">{profile.phone}</span>
                      </div>
                      <div className="profile-item">
                    <span className="profile-label">CURP:</span>
                    <span className="profile-value">{profile.curp}</span>
                  </div>
                  <div className="profile-item">
                    <span className="profile-label">Rol:</span>
                    <span className="profile-value">{profile.role}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <h1 className="title">INICIE SESIÓN</h1>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                            <button
                type="button"
                className="toggle-password-button"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button type="submit" className="form-button">
            Iniciar sesión
          </button>
          <Link to="/Registrarse" className="link-button">
            Crear cuenta
          </Link>
        </form>
      )}
    </>
  );
}
