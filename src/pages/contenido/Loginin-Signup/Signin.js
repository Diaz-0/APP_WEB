import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from '../../../services/Axios';
import './Signin.css';

const { Option } = Select;

export function Signin() {
  const [errorMessage, setErrorMessage] = useState('');

  const onFinish = async (values) => {
    try {
      const response = await Axios.post('/auth/register', values);
      const { token, user, profile } = response.data;
      localStorage.setItem('token', token);
      console.log(user, profile);
      message.success('Registro exitoso!');
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register-form">
      <h1>Registro de usuario</h1>
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ role: '' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { required: true, message: 'Por favor ingrese su correo electrónico!' },
            { type: 'email', message: 'Por favor ingrese un correo electrónico válido!' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Correo electrónico" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
        </Form.Item>

        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: 'Por favor seleccione un rol!' }]}
        >
          <Select placeholder="-- Seleccione un rol --">
            <Option value="employee">Empleado</Option>
            <Option value="employer">Empleador</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="CURP"
          name="curp"
          rules={[
            { required: true, message: 'Por favor ingrese su CURP!' },
            { pattern: /^[A-Z]{4}\d{6}[HM][A-Z]{5}\w\d$/, message: 'Por favor ingrese un CURP válido!' },
          ]}
        >
          <Input placeholder="CURP" />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="lastName"
          rules={[{ required: true, message: 'Por favor ingrese su apellido!' }]}
        >
          <Input placeholder="Apellido" />
        </Form.Item>

        <Form.Item
          label="Fecha de nacimiento"
          name="birthDate"
          rules={[{ required: true, message: 'Por favor ingrese su fecha de nacimiento!' }]}        >
          <Input type="date" placeholder="Fecha de nacimiento" />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="address"
          rules={[{ required: true, message: 'Por favor ingrese su dirección!' }]}
        >
          <Input placeholder="Dirección" />
        </Form.Item>

        <Form.Item
          label="Género"
          name="gender"
          rules={[{ required: true, message: 'Por favor seleccione su género!' }]}
        >
          <Select placeholder="-- Seleccione su género --">
            <Option value="">-- Seleccione su género --</Option>
            <Option value="M">Masculino</Option>
            <Option value="F">Femenino</Option>
            <Option value="O">Otro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[{ required: true, message: 'Por favor ingrese su teléfono!' }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Teléfono" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button">
            Registrar
          </Button>
        </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit" className="register-button">
          <Link to="/Iniciar-Sesión">Elijo iniciar sesión</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
