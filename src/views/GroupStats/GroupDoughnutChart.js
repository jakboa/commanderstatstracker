
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

//import "./Charts.css";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function GroupDoughnutChart( { results } ) {

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
        '#AAFABA' ,
        '#FAE6AA',
        '#AAB8FA',
        '#AAFAB9'
      ],
      borderColor: [
        '#AAFABA',
        '#FAE6AA',
        '#AAB8FA',
        '#AAFAB9'
      ],
      borderWidth: 2,
    },
  ],
};

  return <Doughnut options={ options } data={data} className="doughnutChart bg-light-subtle" />;
}
