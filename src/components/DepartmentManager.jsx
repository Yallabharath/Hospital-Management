import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, List, Typography, Divider, Tag } from "antd";

const { Title } = Typography;

const DepartmentManager = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("hospitals");
    if (stored) setHospitals(JSON.parse(stored));
  }, []);

  const [deptForm] = Form.useForm();

  const onAddDepartment = (hospitalIndex, values) => {
    const updatedHospitals = [...hospitals];
    updatedHospitals[hospitalIndex].departments = [
      ...(updatedHospitals[hospitalIndex].departments || []),
      values.department,
    ];
    setHospitals(updatedHospitals);
    localStorage.setItem("hospitals", JSON.stringify(updatedHospitals));
    deptForm.resetFields();
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Manage Departments</Title>
      <Divider />

      {hospitals.map((hospital, index) => (
        <Card
          key={index}
          title={`${hospital.name} (${hospital.location})`}
          style={{ marginBottom: 24 }}
        >
          <List
            header="Departments"
            bordered
            dataSource={hospital.departments || []}
            renderItem={(item) => (
              <List.Item>
                <Tag color="blue">{item}</Tag>
              </List.Item>
            )}
            locale={{ emptyText: "No departments added yet" }}
          />

          <Form
            form={deptForm}
            layout="inline"
            onFinish={(values) => onAddDepartment(index, values)}
            style={{ marginTop: 16 }}
          >
            <Form.Item
              name="department"
              rules={[{ required: true, message: "Enter department name" }]}
            >
              <Input placeholder="e.g., Pediatrics" />
            </Form.Item>
            <Form.Item>
              <Button type="dashed" htmlType="submit">
                Add Department
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentManager;
