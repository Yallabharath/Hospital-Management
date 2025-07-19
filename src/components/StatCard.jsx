// src/components/StatCard.jsx
import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const StatCard = ({ title, value }) => (
  <Card>
    <Text type="secondary">{title}</Text>
    <Title level={3} style={{ marginTop: 8 }}>
      {value}
    </Title>
  </Card>
);

export default StatCard;
