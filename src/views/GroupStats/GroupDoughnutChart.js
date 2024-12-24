
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
  for (const [player, result] of Object.entries(displayResults)) {
    players.push(player);
    placements.push(result[1])
  };

  const options ={
    responsive: true,
    maintainAspectRatio: false,
  } 

const data = {
  labels: players,
  datasets: [
    {
      label: '# of Results',
      data: placements,
      backgroundColor: [
        '#A4EBBE' ,
        '#EBDEA4',
        '#EBA7A4',
        '#A4A5EB'
      ],
      borderColor: [
        '#A4EBBE',
        '#EBDEA4',
        '#EBA7A4',
        '#A4A5EB'
      ],
      borderWidth: 2,
    },
  ],
};

  return <Doughnut options={ options } data={data} className="GroupDoughnutChart bg-light-subtle m-2" />;
}
