// src/components/HospitalAssociationForm.jsx
import React, { useState } from "react";
import {
  Modal,
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  TimePicker,
} from "antd";

const { Option } = Select;

const HospitalAssociationForm = ({
  visible,
  hospitals = [],
  doctorSpecializations = [],
  onAssociate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [availableDepartments, setAvailableDepartments] = useState([]);

  const handleFinish = (values) => {
    const slot = {
      hospital: values.hospital,
      department: values.department,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("HH:mm"),
      fee: values.fee,
    };
    onAssociate(slot);
    form.resetFields();
  };

  return (
    <Modal
      title="Associate with Hospital"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        onValuesChange={(changedValues) => {
          if (changedValues.hospital) {
            const selectedHospital = hospitals.find(
              (h) => h.name === changedValues.hospital
            );
            if (selectedHospital) {
              const matchingDepartments = selectedHospital.departments.filter(
                (dept) => doctorSpecializations.includes(dept)
              );
              setAvailableDepartments(matchingDepartments);
              form.setFieldsValue({ department: undefined }); // reset department
            } else {
              setAvailableDepartments([]);
            }
          }
        }}
      >
        <Form.Item
          name="hospital"
          label="Select Hospital"
          rules={[{ required: true, message: "Please select a hospital" }]}
        >
          <Select placeholder="Select a hospital">
            {hospitals.map((h) => (
              <Option key={h.name} value={h.name}>
                {h.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="department"
          label="Select Department"
          rules={[{ required: true, message: "Please select a department" }]}
        >
          <Select placeholder="Select a department" disabled={!availableDepartments.length}>
            {availableDepartments.map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Available Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Available Time"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="fee"
          label="Consultation Fee"
          rules={[{ required: true, message: "Please enter consultation fee" }]}
        >
          <Input prefix="₹" type="number" min={0} placeholder="e.g. 500" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Associate
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HospitalAssociationForm;
