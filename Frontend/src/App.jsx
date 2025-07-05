import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import {
  Welcome,
  Leaderboard,
  NotFound,
  Playground,
  Problems,
  Visualizers,
} from './pages'; 

import {
  SortingVisualizer,
  GraphVisualizer,
  TreeVisualizer
} from "./components/index.js"

import AuthenticatedLayout from './layout/AuthenticatedLayout.jsx'
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { login, logout } from './features/userSlice.js';
// import axios from 'axios';


function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const refreshToken = async () => {
  //     try {
  //       const res = await axios.post('api/v1/users/refresh', {}, {withCredentials:true});
  //       const user = res.data.data
  //       dispatch(login(user));
  //     } catch (err) {
  //       dispatch(logout());
  //     }
  //   };

  //   refreshToken();
  // }, [dispatch]);


  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/problems' element={<Problems />} />
          <Route path='/playground' element={<Playground/>} />
          <Route path='/visualizers' element={<Visualizers/>} />
          <Route path='/leaderboard' element={<Leaderboard/>} />
          <Route path='/sortingVisualizer' element={<SortingVisualizer/>} />
          <Route path='/graphVisualizer' element={<GraphVisualizer/>} />
          <Route path='/treeVisualizer' element={<TreeVisualizer/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
