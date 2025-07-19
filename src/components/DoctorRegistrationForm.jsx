import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const specializationsList = [
  "Cardiology", "Neurology", "Orthopedics", "Dermatology", "Pediatrics", "Radiology"
];

const DoctorRegistrationForm = ({ onRegister }) => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = (values) => {
    console.log("Doctor Registered:", values);
    setSubmitted(true);
    onRegister(values);
  };

  if (submitted) {
    return <p>Doctor registered successfully!</p>;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="name"
        label="Doctor Name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input placeholder="Enter full name" />
      </Form.Item>

      <Form.Item
        name="qualifications"
        label="Qualifications"
        rules={[{ required: true, message: "Please enter qualifications" }]}
      >
        <Input placeholder="E.g., MBBS, MD" />
      </Form.Item>

      <Form.Item
        name="specializations"
        label="Specializations"
        rules={[{ required: true, message: "Select at least one specialization" }]}
      >
        <Select
          mode="multiple"
          placeholder="Select specializations"
        >
          {specializationsList.map((spec) => (
            <Option key={spec} value={spec}>
              {spec}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="experience"
        label="Years of Experience"
        rules={[{ required: true, message: "Please enter years of experience" }]}
      >
        <Input type="number" min={0} placeholder="E.g., 5" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register Doctor
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DoctorRegistrationForm;
