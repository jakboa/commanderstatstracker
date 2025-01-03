
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import "./Charts.css";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart( { results } ) {

  const options ={
    responsive: true,
    maintainAspectRatio: false,
  } 

const data = {
  labels: ['First', 'Second', 'Third', 'Fourth'],
  datasets: [
    {
      label: '# of Results',
      data: results,
      backgroundColor: [
        'rgba(250, 243, 44, 0.69)',
        'rgba(100, 112, 120, 0.86)',
        'rgba(92, 67, 5, 0.83)',
        'rgb(11, 31, 31)'
      ],
      borderColor: [
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)',
        'rgb(0, 0, 0)'
      ],
      borderWidth: 2,
    },
  ],
};

  return <Doughnut options={ options } data={data} className="doughnutChart bg-light-subtle" />;
}
