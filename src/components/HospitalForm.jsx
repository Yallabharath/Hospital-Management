import React from "react";
import { Form, Input, Button } from "antd";

const HospitalForm = ({ onAddHospital }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const existing = JSON.parse(localStorage.getItem("hospitals")) || [];
    const newHospital = { ...values, departments: [] };
    const updated = [...existing, newHospital];

    localStorage.setItem("hospitals", JSON.stringify(updated));
    onAddHospital(newHospital);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ marginTop: 16 }}
    >
      <Form.Item
        name="name"
        label="Hospital Name"
        rules={[{ required: true, message: "Please enter hospital name" }]}
      >
        <Input placeholder="e.g. Apollo Hospitals" />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: "Please enter hospital location" }]}
      >
        <Input placeholder="e.g. Hyderabad" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register Hospital
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HospitalForm;
