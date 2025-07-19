// src/components/PatientHistory.jsx
import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";

const { Title } = Typography;

const PatientHistory = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setRecords(bookings);
  }, []);

  const columns = [
    { title: "Patient", dataIndex: "patient", key: "patient" },
    { title: "Doctor", dataIndex: "doctor", key: "doctor" },
    { title: "Specialization", dataIndex: "specialization", key: "specialization" },
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    { title: "Slot", dataIndex: "slot", key: "slot" },
    { title: "Fee", dataIndex: "fee", key: "fee", render: (fee) => `₹${fee}` },
    { title: "Date", dataIndex: "timestamp", key: "timestamp", render: (t) => new Date(t).toLocaleString() },
  ];

  return (
    <div className="p-4">
      <Title level={2}>Your Consultation History</Title>
      <Table dataSource={records} columns={columns} rowKey="timestamp" />
    </div>
  );
};

export default PatientHistory;
