import React from 'react';

const CustomBarChart = ({ widget }) => {
  if (!Array.isArray(widget.widgetData) || widget.widgetData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{widget.widgetName}</div>
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
          <div>No graph data available.</div>
        </div>
      </div>
    );
  }

  const total = widget.widgetData.reduce((sum, item) => sum + Object.values(item)[0], 0);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <div style={{ fontSize: '14px', fontWeight: 'bold', float: 'left' }}>{total} {widget.widgetName}</div>
      <div style={{ display: 'flex', width: '100%', marginTop: '30px' }}>
        {widget.widgetData.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          const percent = (value / total) * 100;

          return (
            <div
              key={index}
              style={{
                width: `${percent}%`,
                height: '15px',
                backgroundColor: COLORS[index % COLORS.length],
                textAlign: 'center',
                color: '#fff',
                padding: '5px 0',
                marginTop: 30,
                fontSize: '12px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                borderRadius:
                  index === 0
                    ? '12px 0 0 12px'
                    : index === widget.widgetData.length - 1
                    ? '0 12px 12px 0'
                    : 'none',
              }}
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

export default CustomBarChart;
