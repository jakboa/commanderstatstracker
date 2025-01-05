
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import SearchHandler from '../../components/SearchHandler';

import "./GroupPage.css";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function GroupDoughnutChart( { results } ) {

  const displayResults = SearchHandler.getGroupStats(results);
  
  const placements = [];
  const players = [];
  for (const [player, result] of Object.entries(displayResults).sort()) {
    players.push(player);
    placements.push(result[1])
  };

  const options ={
    responsive: true,
    maintainAspectRatio: false,
  } 

const data = {
  labels: players.sort(),
  datasets: [
    {
      label: '# of Results',
      data: placements,
      backgroundColor: [
        '#EBA7A4',
        '#A4EBBE' ,
        '#A4A5EB',
        '#EBDEA4'
      ],
      borderColor: [
        '#EBA7A4',
        '#A4EBBE',
        '#A4A5EB',
        '#EBDEA4'

      ],
      borderWidth: 2,
    },
  ],
};

  return <Doughnut options={ options } data={data} className="GroupDoughnutChart bg-light-subtle m-2" />;
}
