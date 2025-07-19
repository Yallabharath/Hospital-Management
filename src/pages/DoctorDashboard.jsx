// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Form,
//   Input,
//   Select,
//   Button,
//   Card,
//   Divider,
//   message,
// } from "antd";

// const { Title, Paragraph } = Typography;

// const DoctorDashboard = () => {
//   const [form] = Form.useForm();
//   const [hospitals, setHospitals] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [currentDoctor, setCurrentDoctor] = useState(null);

//   useEffect(() => {
//     // Load hospitals
//     const storedHospitals = JSON.parse(localStorage.getItem("hospitals") || "[]");
//     setHospitals(storedHospitals);

//     // Load registered doctors
//     const storedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
//     setDoctors(storedDoctors);
//   }, []);

//   const onFinish = (values) => {
//     const newDoctor = {
//       name: values.name,
//       specialization: values.specialization,
//       hospital: values.hospital,
//       consultations: 0,
//       earnings: 0,
//     };

//     const updatedDoctors = [...doctors, newDoctor];
//     localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
//     setDoctors(updatedDoctors);
//     setCurrentDoctor(newDoctor);
//     message.success("Doctor registered and associated successfully!");
//     form.resetFields();
//   };

//   const handleConsultation = (index) => {
//     const updatedDoctors = [...doctors];
//     updatedDoctors[index].consultations += 1;
//     updatedDoctors[index].earnings += 500;

//     localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
//     setDoctors(updatedDoctors);
//     message.success(`Consultation recorded for Dr. ${updatedDoctors[index].name}`);
//   };

//   return (
//     <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
//       <Title level={3}>Doctor Dashboard</Title>

//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         style={{ marginTop: 24 }}
//       >
//         <Form.Item
//           name="name"
//           label="Doctor Name"
//           rules={[{ required: true, message: "Please enter your name" }]}
//         >
//           <Input placeholder="Dr. John Doe" />
//         </Form.Item>

//         <Form.Item
//           name="specialization"
//           label="Specialization"
//           rules={[{ required: true, message: "Please enter your specialization" }]}
//         >
//           <Input placeholder="Cardiology, Orthopedics..." />
//         </Form.Item>

//         <Form.Item
//           name="hospital"
//           label="Select Hospital"
//           rules={[{ required: true, message: "Please select a hospital" }]}
//         >
//           <Select placeholder="Choose a hospital">
//             {hospitals.map((h, idx) => (
//               <Select.Option key={idx} value={h.name}>
//                 {h.name} - {h.location}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             Register Doctor
//           </Button>
//         </Form.Item>
//       </Form>

//       <Divider />

//       <Title level={4}>Registered Doctors</Title>
//       {doctors.length === 0 ? (
//         <Paragraph>No doctors registered yet.</Paragraph>
//       ) : (
//         doctors.map((doc, idx) => (
//           <Card
//             key={idx}
//             style={{ marginBottom: 16 }}
//             title={`Dr. ${doc.name} (${doc.specialization})`}
//           >
//             <Paragraph>
//               <strong>Hospital:</strong> {doc.hospital}
//             </Paragraph>
//             <Paragraph>
//               <strong>Consultations:</strong> {doc.consultations}
//             </Paragraph>
//             <Paragraph>
//               <strong>Earnings:</strong> ₹{doc.earnings}
//             </Paragraph>
//             <Button type="primary" onClick={() => handleConsultation(idx)} block>
//               Simulate Consultation (+₹500)
//             </Button>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;
import React, { useEffect, useState } from "react";
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Card,
  Divider,
  message,
  Space,
} from "antd";

const { Title, Paragraph } = Typography;

const DoctorDashboard = () => {
  const [form] = Form.useForm();
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedHospitals = JSON.parse(localStorage.getItem("hospitals") || "[]");
    const storedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
    setHospitals(storedHospitals);
    setDoctors(storedDoctors);
  }, []);

  const selectedHospitals = Form.useWatch("hospitals", form);

  const handleRegister = (values) => {
    const associated = values.hospitals.map((hosp) => ({
      name: hosp,
      fee: parseInt(values[`fee_${hosp}`], 10),
      timeSlots: values[`slots_${hosp}`].split(",").map((s) => s.trim()),
      consultations: 0,
      earnings: 0,
    }));

    const newDoctor = {
      name: values.name,
      specialization: values.specialization,
      associated,
    };

    const updatedDoctors = [...doctors];
    if (editingIndex !== null) {
      // Preserve consultation/earnings data if editing
      const prev = doctors[editingIndex];
      newDoctor.associated = newDoctor.associated.map((assoc) => {
        const prevAssoc = prev.associated.find((p) => p.name === assoc.name);
        return {
          ...assoc,
          consultations: prevAssoc?.consultations || 0,
          earnings: prevAssoc?.earnings || 0,
        };
      });
      updatedDoctors[editingIndex] = newDoctor;
      setEditingIndex(null);
      message.success("Doctor updated successfully!");
    } else {
      updatedDoctors.push(newDoctor);
      message.success("Doctor registered successfully!");
    }

    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    setDoctors(updatedDoctors);
    form.resetFields();
  };

  const handleConsultation = (docIndex, hospName) => {
    const updatedDoctors = [...doctors];
    const hospital = updatedDoctors[docIndex].associated.find((h) => h.name === hospName);
    hospital.consultations += 1;
    hospital.earnings += hospital.fee;

    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    setDoctors(updatedDoctors);
    message.success(`Consultation recorded for ${hospital.name}`);
  };

  const handleEdit = (index) => {
    const doc = doctors[index];
    form.setFieldsValue({
      name: doc.name,
      specialization: doc.specialization,
      hospitals: doc.associated.map((a) => a.name),
    });

    doc.associated.forEach((assoc) => {
      form.setFieldValue(`fee_${assoc.name}`, assoc.fee);
      form.setFieldValue(`slots_${assoc.name}`, assoc.timeSlots.join(", "));
    });

    setEditingIndex(index);
  };

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
      <Title level={3}>{editingIndex !== null ? "Edit Doctor" : "Doctor Registration"}</Title>
      <Form form={form} layout="vertical" onFinish={handleRegister}>
        <Form.Item
          name="name"
          label="Doctor Name"
          rules={[{ required: true, message: "Enter doctor name" }]}
        >
          <Input placeholder="Dr. A B C" />
        </Form.Item>

        <Form.Item
          name="specialization"
          label="Specialization"
          rules={[{ required: true, message: "Enter specialization" }]}
        >
          <Input placeholder="Cardiology, Pediatrics..." />
        </Form.Item>

        <Form.Item
          name="hospitals"
          label="Select Hospitals to Associate"
          rules={[{ required: true, message: "Select at least one hospital" }]}
        >
          <Select mode="multiple" placeholder="Choose hospitals">
            {hospitals.map((h, idx) => (
              <Select.Option key={idx} value={h.name}>
                {h.name} - {h.location}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {(selectedHospitals || []).map((hospName) => (
          <Card key={hospName} size="small" style={{ marginBottom: 10 }}>
            <Paragraph strong>{hospName}</Paragraph>
            <Form.Item
              name={`fee_${hospName}`}
              label="Consultation Fee (₹)"
              rules={[{ required: true, message: "Enter consultation fee" }]}
            >
              <Input type="number" placeholder="e.g., 500" />
            </Form.Item>
            <Form.Item
              name={`slots_${hospName}`}
              label="Available Time Slots (comma separated)"
              rules={[{ required: true, message: "Enter time slots" }]}
            >
              <Input placeholder="e.g., 10AM-12PM, 4PM-6PM" />
            </Form.Item>
          </Card>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingIndex !== null ? "Update Doctor" : "Register Doctor"}
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <Title level={3}>All Registered Doctors</Title>

      {doctors.map((doc, docIndex) => (
        <Card
          key={docIndex}
          title={`Dr. ${doc.name} (${doc.specialization})`}
          extra={
            <Button type="link" onClick={() => handleEdit(docIndex)}>
              Edit
            </Button>
          }
          style={{ marginBottom: 24 }}
        >
          {(doc.associated || []).map((assoc, idx) => (
            <Card
              key={idx}
              type="inner"
              title={`Hospital: ${assoc.name}`}
              style={{ marginBottom: 12 }}
            >
              <Paragraph>
                <strong>Fee:</strong> ₹{assoc.fee}
              </Paragraph>
              <Paragraph>
                <strong>Time Slots:</strong>{" "}
                {assoc.timeSlots?.length ? assoc.timeSlots.join(", ") : "No slots defined"}
              </Paragraph>
              <Paragraph>
                <strong>Consultations:</strong> {assoc.consultations}
              </Paragraph>
              <Paragraph>
                <strong>Earnings:</strong> ₹{assoc.earnings}
              </Paragraph>
              <Button
                type="primary"
                onClick={() => handleConsultation(docIndex, assoc.name)}
              >
                Simulate Consultation
              </Button>
            </Card>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default DoctorDashboard;
