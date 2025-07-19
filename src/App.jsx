// // src/App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SidebarLayout from "./components/SidebarLayout";
// import HospitalDashboard from "./pages/HospitalDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import PatientHistory from "./pages/PatientHistory";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<SidebarLayout />}>
//           <Route path="admin" element={<HospitalDashboard />} />
//           <Route path="doctor" element={<DoctorDashboard />} />
//           <Route path="patient" element={<PatientHistory />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import HospitalDashboard from "./pages/HospitalDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientHistory from "./pages/PatientHistory";
import Login from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SidebarLayout />}>
          <Route path="admin" element={<HospitalDashboard />} />
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="patient" element={<PatientHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
};

export default App;
