import React from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import { COLORS } from '../../constant/constant';
import './CustomBarChart.css'; 

const CustomBarChart = ({ widget }) => {
  if (!Array.isArray(widget.widgetData) || widget.widgetData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{widget.widgetName}</div>
        <div className='centered-container'>
          <BarChartOutlined style={{ fontSize: '40px', color: '#8884d8', marginBottom: '10px' }} />
          <div>No graph data available.</div>
        </div>
      </div>
    );
  }

  const total = widget.widgetData.reduce((sum, item) => sum + Object.values(item)[0], 0);

  return (
    <>
      <div style={{ fontSize: '14px', fontWeight: 'bold', float: 'left' }}>
        {total} {widget.widgetName}
      </div>
      <div style={{ display: 'flex', width: '100%', marginTop: '30px' }}>
        {widget.widgetData.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          const percent = (value / total) * 100;
          const barStyle = {
            width: `${percent}%`,
            backgroundColor: COLORS[index % COLORS.length],
          };

          return (
            <div
              key={index}
              className={getClassName(index, widget)}
              style={barStyle}
            />
          );
        })}
      </div>
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'space-between',
        }}
      >
        {widget.widgetData.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = Object.values(item)[0];
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexBasis: 'calc(50% - 5px)',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: '5px',
                  borderRadius: '3px',
                }}
              />
              <span style={{ fontSize: '12px' }}>{key} {'('}{value}{')'}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

// Function to determine the class name based on index
const getClassName = (index, widget) => {
  if (index === 0) return 'bar first';
  if (index === widget.widgetData.length - 1) return 'bar last';
  return 'bar';
};

export default CustomBarChart;
