// Genereal use Imports
import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Here I put alle the imports from different part of the application.
import Root from './components/Root';
import PlayerStats from './views/PlayerStats/Player';
import Commanders from './views/CommanderStats/Commanders';
import Homepage from './views/Homepage/Homepage';
import GroupStats from './views/GroupStats/GroupStats';


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
        path: 'groupstats/:groupname',
        element: <GroupStats />
      },
      {
        path: 'playerstats/:playerName',
        element: <PlayerStats />,
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
