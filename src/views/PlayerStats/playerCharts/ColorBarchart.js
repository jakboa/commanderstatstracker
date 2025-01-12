import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function ColorBarchart({ filteredCommanderCards, loading }) {

    //console.log(filteredCommanderCards);
    const labels = filteredCommanderCards.map(commander => commander.colorIdentity);
    //console.log(labels)
    //const labels3 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Used color identities',
          },
        },
      };
      
      
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => ({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => ({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      


  return ( 
    <>  
        {loading ? (
            <p>...loading</p>
        ):(
            <Bar options={options} data={data} />
        )
        }  
    </>
)
}
