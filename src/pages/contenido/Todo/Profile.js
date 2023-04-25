import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import Axios from "../../../services/Axios";

export function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get('/profile');
      setUserData(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Mi perfil</h1>
      <Descriptions bordered>
        <Descriptions.Item label="Nombre">{userData.name}</Descriptions.Item>
        <Descriptions.Item label="Apellido">{userData.lastName}</Descriptions.Item>
        <Descriptions.Item label="Correo electrónico">{userData.email}</Descriptions.Item>
        <Descriptions.Item label="Rol">{userData.role}</Descriptions.Item>
        <Descriptions.Item label="CURP">{userData.curp}</Descriptions.Item>
        <Descriptions.Item label="Fecha de nacimiento">{userData.birthDate}</Descriptions.Item>
        <Descriptions.Item label="Dirección">{userData.address}</Descriptions.Item>
        <Descriptions.Item label="Género">{userData.gender}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
