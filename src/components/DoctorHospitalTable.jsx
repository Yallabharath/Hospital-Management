// src/components/DoctorHospitalTable.jsx
import React from "react";
import { Table } from "antd";

const DoctorHospitalTable = ({ data }) => {
  const columns = [
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
    },
    {
      title: "Consultations",
      dataIndex: "consultations",
      key: "consultations",
    },
    {
      title: "Earnings",
      dataIndex: "earnings",
      key: "earnings",
      render: (text) => `$${text}`,
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} rowKey="hospital" />;
};

export default DoctorHospitalTable;
