import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import { BarChartOutlined } from '@ant-design/icons';


const CustomPieChart = ({ widget }) => {
  const hasData = Array.isArray(widget.widgetData) && widget.widgetData.length > 0;

  if (!hasData) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', float: 'left' }}>{widget.widgetName}</div>
        <div
          style={{
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <BarChartOutlined style={{ fontSize: '40px', color: '#8884d8', marginBottom: '10px' }} />
          <div>No graph data available.</div>
        </div>
      </div>
    );
  }

  const pieData = widget.widgetData.map(item => {
    const key = Object.keys(item)[0];
    return { name: key, value: item[key] };
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <div style={{ fontSize: '14px', fontWeight: 'bold', float: 'left' }}>{widget.widgetName}</div>
      <PieChart width={450} height={250}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            position="center"
            content={({ viewBox }) => {
              const { cx, cy } = viewBox;
              const total = pieData.reduce((sum, entry) => sum + entry.value, 0);
              return (
                <>
                  <text
                    x={cx}
                    y={cy + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: '20px', fontWeight: 'bold', fill: '#8884d8' }}
                  >
                    {total} 
                  </text>
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: '10px', fontWeight: 'bold' }}
                  >
                    Total
                  </text>
                </>
              );
            }}
          />
        </Pie>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" iconType='square' />
      </PieChart>
    </>
  );
};

export default CustomPieChart;
