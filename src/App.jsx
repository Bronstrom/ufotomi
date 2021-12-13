import './App.css';
import { Route, Routes } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { fetchMonth } from './actions';
import { useEffect } from 'react';

import { Navbar } from './Navbar';
import { Home } from './Home';
import { SearchMonth } from './SearchMonth';
import { SearchTag } from './SearchTag';
import { SharePhoto } from './SharePhoto';

function App() {
  // Initialize & declare app states
  const photos = useSelector(state => state.photos);
  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  // After render apply thunk functions: getMonth (retrieve photo for month & year) & getTag (retrieve photo with specific tag)
  useEffect(() => {
    const today = new Date();
    dispatch(fetchMonth(today.getMonth(), today.getFullYear()));
  }, [dispatch]);


    return (
      <div className="App">
        
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/month" element={<SearchMonth/>} />
          <Route path="/tag" element={<SearchTag/>} />
          <Route path="/share" element={<SharePhoto/>} />
        </Routes>
        
      </div>
    );
  }

export default App;
