// // HospitalDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { Row, Col, Typography, Card, Button, Modal, List } from "antd";
// import StatCard from "../components/StatCard";
// import DoctorTable from "../components/DoctorTable";
// import ChartBox from "../components/ChartBox";
// import HospitalForm from "../components/HospitalForm";
// import DepartmentManager from "../components/DepartmentManager";

// const { Title } = Typography;

// const HospitalDashboard = () => {
//   const [isHospitalModalOpen, setHospitalModalOpen] = useState(false);
//   const [isDepartmentModalOpen, setDepartmentModalOpen] = useState(false);
//   const [hospitals, setHospitals] = useState([]);

//   // ✅ Load hospitals from localStorage on mount
//   useEffect(() => {
//     const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
//     setHospitals(storedHospitals);
//   }, []);

//   // ✅ Add and persist hospital
//   const handleAddHospital = (newHospital) => {
//     const updatedHospitals = [...hospitals, newHospital];
//     localStorage.setItem("hospitals", JSON.stringify(updatedHospitals));
//     setHospitals(updatedHospitals);
//     setHospitalModalOpen(false);
//   };

//   const doctors = [
//     { name: "Dr. Smith", department: "Cardiology", revenue: 20000 },
//     { name: "Dr. Jones", department: "Neurology", revenue: 15000 },
//     { name: "Dr. Patel", department: "Orthopedics", revenue: 12000 },
//   ];

//   const departmentRevenue = {
//     Cardiology: 20000,
//     Neurology: 15000,
//     Orthopedics: 12000,
//   };

//   const totalRevenue = doctors.reduce((sum, doc) => sum + doc.revenue, 0);
//   const totalConsultations = 310;

//   return (
//     <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
//       <Title level={2}>Hospital Admin Dashboard</Title>

//       {/* 👉 Hospital and Dept actions */}
//       <Row gutter={16} style={{ marginBottom: 24 }}>
//         <Col span={12}>
//           <Card bordered={false}>
//             <Button type="primary" onClick={() => setHospitalModalOpen(true)}>
//               Register New Hospital
//             </Button>
//           </Card>
//         </Col>
//         <Col span={12}>
//           <Card bordered={false}>
//             <Button onClick={() => setDepartmentModalOpen(true)}>
//               Manage Departments
//             </Button>
//           </Card>
//         </Col>
//       </Row>

//       {/* ✅ Show registered hospitals */}
//       <Card title="Registered Hospitals" style={{ marginBottom: 24 }}>
//         <List
//           dataSource={hospitals}
//           bordered
//           renderItem={(item) => (
//             <List.Item>
//               <strong>{item.name}</strong> — {item.location}
//             </List.Item>
//           )}
//           locale={{ emptyText: "No hospitals registered yet." }}
//         />
//       </Card>

//       {/* Stats Row */}
//       <Row gutter={16} style={{ marginBottom: 24 }}>
//         <Col span={8}>
//           <StatCard title="Total Doctors" value={doctors.length} />
//         </Col>
//         <Col span={8}>
//           <StatCard title="Total Consultations" value={totalConsultations} />
//         </Col>
//         <Col span={8}>
//           <StatCard title="Total Revenue" value={`$${totalRevenue}`} />
//         </Col>
//       </Row>

//       {/* Charts and Tables */}
//       <Row gutter={16}>
//         <Col span={12}>
//           <Card title="Revenue by Doctor" bordered={false}>
//             <DoctorTable doctors={doctors} />
//           </Card>
//         </Col>
//         <Col span={12}>
//           <Card title="Revenue by Department" bordered={false}>
//             <ChartBox data={departmentRevenue} />
//           </Card>
//         </Col>
//       </Row>

//       {/* Modals */}
//       <Modal
//         title="Register New Hospital"
//         open={isHospitalModalOpen}
//         onCancel={() => setHospitalModalOpen(false)}
//         footer={null}
//         style={{ top: 20 }}
//       >
//         <HospitalForm onAddHospital={handleAddHospital} />
//       </Modal>

//       <Modal
//         title="Manage Departments"
//         open={isDepartmentModalOpen}
//         onCancel={() => setDepartmentModalOpen(false)}
//         footer={null}
//         width={700}
//         style={{ top: 20 }}
//       >
//         <DepartmentManager />
//       </Modal>
//     </div>
//   );
// };

// export default HospitalDashboard;
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Button,
  Modal,
  List,
  message,
} from "antd";
import StatCard from "../components/StatCard";
import DoctorTable from "../components/DoctorTable";
import ChartBox from "../components/ChartBox";
import HospitalForm from "../components/HospitalForm";
import DepartmentManager from "../components/DepartmentManager";

const { Title } = Typography;

const HospitalDashboard = () => {
  const [isHospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [isDepartmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departmentRevenue, setDepartmentRevenue] = useState({});
  const [totalConsultations, setTotalConsultations] = useState(0);

  // 🟡 Load hospitals and doctors from localStorage
  useEffect(() => {
    const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];

    setHospitals(storedHospitals);
    setDoctors(storedDoctors);

    // Calculate revenue and consultations
    const deptRev = {};
    let totalRev = 0;
    let consultations = 0;

    storedDoctors.forEach((doc) => {
      doc.associatedHospitals?.forEach((hosp) => {
        const dept = doc.department || "General";
        const fee = parseFloat(hosp.fee) || 0;
        const bookings = hosp.bookings?.length || 0;
        consultations += bookings;
        totalRev += bookings * fee;
        deptRev[dept] = (deptRev[dept] || 0) + bookings * fee;
      });
    });

    setDepartmentRevenue(deptRev);
    setTotalConsultations(consultations);
  }, []);

  const handleAddHospital = (newHospital) => {
    const updated = [...hospitals, newHospital];
    setHospitals(updated);
    localStorage.setItem("hospitals", JSON.stringify(updated));
    setHospitalModalOpen(false);
    message.success("Hospital registered successfully!");
  };

  const totalRevenue = Object.values(departmentRevenue).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      <Title level={2}>Hospital Admin Dashboard</Title>

      {/* Register / Manage */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card bordered={false}>
            <Button type="primary" onClick={() => setHospitalModalOpen(true)}>
              Register New Hospital
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Button onClick={() => setDepartmentModalOpen(true)}>
              Manage Departments
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Registered Hospitals */}
      <Card title="Registered Hospitals" style={{ marginBottom: 24 }}>
        <List
          dataSource={hospitals}
          bordered
          renderItem={(item) => (
            <List.Item>
              <strong>{item.name}</strong> — {item.location}
            </List.Item>
          )}
          locale={{ emptyText: "No hospitals registered yet." }}
        />
      </Card>

      {/* Stats */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <StatCard title="Total Doctors" value={doctors.length} />
        </Col>
        <Col span={8}>
          <StatCard title="Total Consultations" value={totalConsultations} />
        </Col>
        <Col span={8}>
          <StatCard title="Total Revenue" value={`$${totalRevenue}`} />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Revenue by Doctor" bordered={false}>
            <DoctorTable
              doctors={doctors.map((doc) => {
                const totalDocRevenue = doc.associatedHospitals?.reduce(
                  (sum, hosp) =>
                    sum + ((parseFloat(hosp.fee) || 0) * (hosp.bookings?.length || 0)),
                  0
                );
                return {
                  name: doc.name,
                  department: doc.department,
                  revenue: totalDocRevenue || 0,
                };
              })}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue by Department" bordered={false}>
            <ChartBox data={departmentRevenue} />
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <Modal
        title="Register New Hospital"
        open={isHospitalModalOpen}
        onCancel={() => setHospitalModalOpen(false)}
        footer={null}
        style={{ top: 20 }}
      >
        <HospitalForm onAddHospital={handleAddHospital} />
      </Modal>

      <Modal
        title="Manage Departments"
        open={isDepartmentModalOpen}
        onCancel={() => setDepartmentModalOpen(false)}
        footer={null}
        width={700}
        style={{ top: 20 }}
      >
        <DepartmentManager />
      </Modal>
    </div>
  );
};

export default HospitalDashboard;
