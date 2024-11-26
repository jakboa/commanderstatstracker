// Genereal use Imports
import React from 'react';
import './App.css';
import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from 'react-router-dom';


// Here I put alle the imports from different part of the application.
import Root from './components/Root';
import PlayerStats from './components/Player';
import PlayerCommanderStats from './components/PlayerCommanderStats';
import GameResults from './components/GameResults';
import Commanders from './components/Commanders';
import Homepage from './components/Homepage/Homepage';


//Must import Route and createRoutesFromElements in order for this to work.
//Kept this so i can see how jsx version looks like.
/*
const router_OLD = createBrowserRouter(createRoutesFromElements(

  <Route path='/' element={<Root />}>
    <Route path='gameresults' element= {<GameResults />} />
  </Route>

));
*/


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
        path: 'gameresults',
        element: <GameResults />
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
