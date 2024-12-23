import React from "react";
import SearchHandler from "../SearchHandler";

import "./Charts.css";


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
        maintainAspectRatio: false,
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


    return (
        < Line options={ options } data={data} className="lineChart bg-light-subtle" />
    );
};


