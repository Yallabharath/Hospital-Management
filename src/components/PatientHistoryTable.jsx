// src/components/PatientHistoryTable.jsx
import React from "react";
import { Table } from "antd";

const PatientHistoryTable = ({ data }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} rowKey="date" />;
};

export default PatientHistoryTable;
