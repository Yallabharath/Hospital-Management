// src/pages/PatientHistory.jsx
import React from "react";
import { Typography, Card } from "antd";
import PatientHistoryTable from "../components/PatientHistoryTable";

const { Title } = Typography;

const PatientHistory = () => {
  const consultationHistory = [
    {
      date: "2025-07-01",
      doctor: "Dr. Smith",
      department: "Cardiology",
      hospital: "City Hospital",
      notes: "Routine check-up",
    },
    {
      date: "2025-06-18",
      doctor: "Dr. Patel",
      department: "Orthopedics",
      hospital: "Metro Health",
      notes: "Follow-up for leg injury",
    },
    {
      date: "2025-05-20",
      doctor: "Dr. Jones",
      department: "Neurology",
      hospital: "Green Valley Hospital",
      notes: "Migraine evaluation",
    },
  ];

  return (
    <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      <Title level={2}>My Consultation History</Title>
      <Card>
        <PatientHistoryTable data={consultationHistory} />
      </Card>
    </div>
  );
};

export default PatientHistory;
