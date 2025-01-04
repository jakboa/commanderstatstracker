import React from "react";
import SearchHandler from "../../components/SearchHandler";


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


export default function GroupLineChart( { entityName, entityMatches } ) {

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

      const results = SearchHandler.getGroupLineChartData(entityMatches).sort();
      
      const labels = [];
      for (let i = 1; i <= Object.keys(entityMatches).length; i++) {
        labels.push(`Game: ${i}`);
        
      };
      

      const data = { labels, datasets:[ 
        {
        label: results[0].player,
        data: results[0].results,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: results[1].player,
        data: results[1].results,
        borderColor: 'rgb(4, 174, 16)',
        backgroundColor: 'rgba(3, 107, 15, 0.5)'
      },
      {
        label: results[2].player,
        data: results[2].results,
        borderColor: 'rgb(48, 23, 233)',
        backgroundColor: 'rgba(6, 24, 115, 0.5)'
      },
      {
        label: results[3].player,
        data: results[3].results,
        borderColor: 'rgb(203, 236, 70)',
        backgroundColor: 'rgba(188, 243, 7, 0.5)'
      },
    ]};


    return (
        < Line options={ options } data={data} className="border border-white border-3 rounded bg-light-subtle m-2" />
    );
};


