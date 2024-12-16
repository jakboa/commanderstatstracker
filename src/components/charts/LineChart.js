import React from "react";
import SearchHandler from "../SearchHandler";


import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales
} from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function LineChart( {entityName,entityMatches} ) {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Player stats',
          },
        },
        scales: {
            y: {
                type: "linear",
                reverse: true,
                min: 1,
                max: 4,
                ticks: {
                    stepSize: 1
                }
            }
        }
      };

      const results = SearchHandler.getLineChartData(entityName, entityMatches);
      const labels = []
      for (let i = 1; i <= results.length; i++) {
        labels.push(`Game: ${i}`)
      }

      const data = { labels, datasets:[ {
        label: entityName,
        data: results,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }]};

      

      //const labelsExample = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      /*
        const dataExample = {
        labels,
        datasets: [
        {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
    };
    */

    return (
        < Line options={ options } data={data} />
    );
};


