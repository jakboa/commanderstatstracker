
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import "./Charts.css";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart( { results, years } ) {
  console.log(results);

  const doughnutData = years.reduce((accumulator, year) =>{
    const yearData = results[year];
    Object.keys(yearData).slice(0,4).forEach(placement => {
      accumulator[placement-1] +=  yearData[placement];
    })
    return accumulator;
  },[0,0,0,0]);

  const options ={
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: {
          display: true,
      },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          let label = context.parsed || '';
          if (label) { 
            const summedValues = context.dataset.data.reduce((accumulator, currentValue) => accumulator + currentValue,0);
            label = `${Math.round(context.parsed/summedValues*100)}%`
          }
          return label
        },},
      },
    },
    
  };

const data = {
  labels: ['First', 'Second', 'Third', 'Fourth'],
  datasets: [
    {
      data: doughnutData,
      backgroundColor: [
        'rgba(236, 239, 55, 0.72)',
        'rgba(169, 169, 158, 0.72)',
        'rgba(188, 121, 55, 0.72)',
        'rgb(17, 19, 19)'
      ],
      borderColor: [
        'rgb(236, 239, 55)',
        'rgb(169, 169, 158)',
        'rgb(188, 121, 55)',
        'rgb(48, 35, 35)'
      ],
      borderWidth: 2,
    },
  ],
  
};

  return <Doughnut options={ options } data={data} className="doughnutChart bg-light-subtle" />;
}
