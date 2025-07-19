// src/pages/Login.jsx
import React, { useState } from "react";
import { Card, Button, Radio, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "admin") navigate("/admin");
    else if (role === "doctor") navigate("/doctor");
    else if (role === "patient") navigate("/patient");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, textAlign: "center" }}>
        <Title level={3}>Login</Title>
        <p>Select your role:</p>
        <Radio.Group
          onChange={(e) => setRole(e.target.value)}
          value={role}
          style={{ marginBottom: 20 }}
        >
          <Space direction="vertical">
            <Radio value="admin">Hospital Admin</Radio>
            <Radio value="doctor">Doctor</Radio>
            <Radio value="patient">Patient</Radio>
          </Space>
        </Radio.Group>
        <br />
        <Button type="primary" block onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Login;
