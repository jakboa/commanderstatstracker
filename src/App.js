// Genereal use Imports
import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


// Here I put alle the imports from different part of the application.
import Root from './components/Root';
import PlayerStats from './components/Player';
import PlayerCommanderStats from './components/PlayerCommanderStats';
import GameResults from './components/GameResults';
import Commanders from './views/CommanderStats/Commanders';
import Homepage from './views/Homepage/Homepage';

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'gameresults',
        element: <GameResults />
      },

      {
        path: 'playerstats',
        element: <PlayerStats />,
        children: [
          {
            path: ':commanders',
            element: <PlayerCommanderStats />
          }
        ]
      },

      {
        path: 'commanders',
        element: <Commanders />
      }
    ] 
  }
]

const router = createBrowserRouter(routes);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
