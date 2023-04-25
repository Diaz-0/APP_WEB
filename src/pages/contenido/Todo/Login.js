import { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import "../Css/Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

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
      if (response.data.phoneNumber) {
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
                <label htmlFor="name">Name:</label>
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
                  <label htmlFor="age">Age:</label>
                  <input
                  type="number"
                  id="age"
                  className="form-input"
                  value={profileData.age}
                  onChange={(e) =>
                  setProfileData({ ...profileData, age: e.target.value })
                  }
                  />
                  </div>
                  <div className="form-group">
                  <label htmlFor="address">Address:</label>
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
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                  type="tel"
                  id="phoneNumber"
                  className="form-input"
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                  setProfileData({
                  ...profileData,
                  phoneNumber: e.target.value,
                  })
                  }
                  />
                  </div>
                  <button type="submit" className="form-button">
                  Save
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
                      {profile && !profile.phoneNumber && (
                        <div className="jobposting-button-container">
                          <button onClick={() => window.location.href='/jp'} className="jobposting-button">
                          Publicar un Trabajo
                          </button>
                        </div>
                      )}
                      {profile && (
                        <div className="profile">
                          <div className="profile-item">
                            <span className="profile-label">Nombre:</span>
                            <span className="profile-value">{profile.name}</span>
                          </div>
                          <div className="profile-item">
                            <span className="profile-label">Edad:</span>
                            <span className="profile-value">{profile.age}</span>
                          </div>
                          <div className="profile-item">
                            <span className="profile-label">Direccíon:</span>
                            <span className="profile-value">{profile.address}</span>
                          </div>
                          <div className="profile-item">
                            <span className="profile-label">Telefono:</span>
                            <span className="profile-value">{profile.phoneNumber}</span>
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
                  <label htmlFor="email">Email:</label>
                  <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                  </div>
                  <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            <button type="submit" className="form-button">
          Login
        </button>
      </form>
    )}
  </>
);
}