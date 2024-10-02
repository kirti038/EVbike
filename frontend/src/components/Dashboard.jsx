import React from 'react';
import { Row, Col, Card } from 'antd';
import { Bar, Pie } from 'react-chartjs-2'; // Chart types
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Yeh line chart.js ke components ko register kar rahi hai
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);


const Dashboard = () => {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Sales', 'Marketing', 'Development'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Revenue Chart">
            <Bar data={barData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Department Allocation">
            <Pie data={pieData} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="User Stats">
            {/* Tum aur charts ya data yaha add kar sakte ho */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Activity Logs">
            {/* Tum aur charts ya data yaha add kar sakte ho */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
