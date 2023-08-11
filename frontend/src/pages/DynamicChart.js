import React, { useEffect, useRef } from 'react';
import{Chart}from 'chart.js';

const DynamicChart = ({ data, options }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // If a previous chart instance exists, destroy it before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line', // Change the chart type as needed
        data: data,
        options: options,
      });
    }
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default DynamicChart;
