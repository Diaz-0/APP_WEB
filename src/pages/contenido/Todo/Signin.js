import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import Axios from "../../../services/Axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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
      {errorMessage && <p>{errorMessage}</p>}
      <Form
        {...layout}
        name="basic"
        initialValues={{ role: '' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[{ required: true, message: 'Por favor ingrese su correo electrónico!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: 'Por favor seleccione un rol!' }]}
        >
          <Select>
            <Option value="">-- Seleccione un rol --</Option>
            <Option value="employee">Empleado</Option>
            <Option value="employer">Empleador</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="CURP"
          name="curp"
          rules={[{ required: true, message: 'Por favor ingrese su CURP!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="lastName"
          rules={[{ required: true, message: 'Por favor ingrese su apellido!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Fecha de nacimiento"
          name="birthDate"
          rules={[{ required: true, message: 'Por favor ingrese su fecha de nacimiento!' }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="address"
          rules={[{ required: true, message: 'Por favor ingrese su dirección!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Género"
          name="gender"
          rules={[{ required: true, message: 'Por favor seleccione su género!' }]}
        >
          <Select>
<Option value="">-- Seleccione su género --</Option>
<Option value="M">Masculino</Option>
<Option value="F">Femenino</Option>
<Option value="O">Otro</Option>
</Select>
</Form.Item>    <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
