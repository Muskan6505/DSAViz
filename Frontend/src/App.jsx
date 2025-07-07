import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { useState } from 'react';

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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice.js';
import axios from 'axios';


function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        setLoading(true);
        const res = await axios.post('/api/v1/users/refresh', {}, { withCredentials: true });
        if (res.status === 200 && res.data?.data) {
          dispatch(login(res.data.data));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.log(err)
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, [dispatch]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 via-black to-indigo-900">
      <div className="w-12 h-12 border-4 border-white border-dashed rounded-full animate-spin"></div>
        <p className="ml-4 text-white text-xl">Loading...</p>
    </div>
  );

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/problems' element={<Problems />} />
          <Route path='/playground' element={<Playground/>} />
          <Route path='/visualizers' element={<Visualizers/>} />
          <Route path='/leaderboard' element={<Leaderboard/>} />
          <Route element={<AuthenticatedLayout />}>
            <Route path='/sortingVisualizer' element={<SortingVisualizer />} />
            <Route path='/graphVisualizer' element={<GraphVisualizer />} />
            <Route path='/treeVisualizer' element={<TreeVisualizer />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
