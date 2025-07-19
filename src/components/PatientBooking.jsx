// src/components/PatientBooking.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Select,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Input,
  message,
} from "antd";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const PatientBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [bookingSlot, setBookingSlot] = useState(null);
  const [bookingFee, setBookingFee] = useState("");
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(data);
    setFilteredDoctors(data);
  }, []);

  const handleFilter = () => {
    let filtered = [...doctors];
    if (selectedSpecialization) {
      filtered = filtered.filter(
        (doc) => doc.specialization === selectedSpecialization
      );
    }
    if (selectedHospital) {
      filtered = filtered.filter((doc) =>
        doc.associated.some((a) => a.name === selectedHospital)
      );
    }
    setFilteredDoctors(filtered);
  };

  const handleBook = () => {
    if (!patientName || !bookingFee) {
      message.error("Please enter your name and consultation amount.");
      return;
    }

    const updatedDoctors = doctors.map((doc) => {
      if (doc.name === bookingDoctor.name) {
        const assoc = doc.associated.map((a) => {
          if (a.name === bookingSlot.name) {
            const updatedSlots = a.timeSlots.filter((s) => s !== bookingSlot.slot);
            return {
              ...a,
              timeSlots: updatedSlots,
              consultations: (a.consultations || 0) + 1,
              earnings: (a.earnings || 0) + parseInt(bookingFee),
            };
          }
          return a;
        });
        return { ...doc, associated: assoc };
      }
      return doc;
    });

    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({
      patient: patientName,
      doctor: bookingDoctor.name,
      specialization: bookingDoctor.specialization,
      hospital: bookingSlot.name,
      slot: bookingSlot.slot,
      fee: parseInt(bookingFee),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));
    message.success("Booking confirmed!");
    setBookingDoctor(null);
    setBookingSlot(null);
    setBookingFee("");
    setPatientName("");
  };

  return (
    <div className="p-4">
      <Title level={2}>Book a Consultation</Title>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Select
            placeholder="Filter by specialization"
            onChange={(v) => setSelectedSpecialization(v)}
            style={{ width: "100%" }}
            allowClear
          >
            {[...new Set(doctors.map((doc) => doc.specialization))].map(
              (spec) => (
                <Option key={spec} value={spec}>
                  {spec}
                </Option>
              )
            )}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Filter by hospital"
            onChange={(v) => setSelectedHospital(v)}
            style={{ width: "100%" }}
            allowClear
          >
            {[...new Set(doctors.flatMap((doc) => doc.associated.map((a) => a.name)))].map(
              (hosp) => (
                <Option key={hosp} value={hosp}>
                  {hosp}
                </Option>
              )
            )}
          </Select>
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleFilter}>
            Apply Filters
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {filteredDoctors.map((doc, i) => (
          <Col span={8} key={i}>
            <Card title={doc.name}>
              <Paragraph>Specialization: {doc.specialization}</Paragraph>
              <Paragraph>Hospitals:</Paragraph>
              {doc.associated.map((a, j) => (
                <div key={j} className="mb-2">
                  <strong>{a.name}</strong>
                  <br />
                  Fee: ₹{a.fee}
                  <br />
                  Slots:
                  <ul>
                    {a.timeSlots.map((slot, k) => (
                      <li key={k}>
                        {slot}{" "}
                        <Button
                          size="small"
                          onClick={() => {
                            setBookingDoctor(doc);
                            setBookingSlot({ name: a.name, slot });
                          }}
                        >
                          Book
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        open={!!bookingSlot}
        title="Confirm Booking"
        onCancel={() => setBookingSlot(null)}
        onOk={handleBook}
      >
        <Input
          placeholder="Enter your name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Enter consultation amount"
          type="number"
          value={bookingFee}
          onChange={(e) => setBookingFee(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default PatientBooking;
