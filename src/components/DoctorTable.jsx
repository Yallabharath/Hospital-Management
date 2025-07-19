// // src/components/DoctorTable.jsx
// import React from "react";
// import { Table } from "antd";

// const DoctorTable = ({ doctors }) => {
//   const columns = [
//     {
//       title: "Doctor",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Department",
//       dataIndex: "department",
//       key: "department",
//     },
//     {
//       title: "Revenue",
//       dataIndex: "revenue",
//       key: "revenue",
//       render: (text) => `$${text}`,
//     },
//   ];

//   return <Table dataSource={doctors} columns={columns} pagination={false} rowKey="name" />;
// };

// export default DoctorTable;
import React from "react";
import { Table } from "antd";

const DoctorTable = ({ doctors }) => {
  const columns = [
    { title: "Doctor", dataIndex: "name", key: "name" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (value) => `$${value}`,
    },
  ];

  return <Table dataSource={doctors} columns={columns} rowKey="name" pagination={false} />;
};

export default DoctorTable;
