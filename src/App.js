import { Children } from 'react';
import './App.css';
import Root from './components/Root';
import PlayerStats from './components/Player';
import GameResults from './components/GameResults';

import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from 'react-router-dom';

//import { gameInfo } from './MockData';


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
        path: 'playerstats',
        element: <PlayerStats />
      },
      {
        path: 'gameresults',
        element: <GameResults />
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
