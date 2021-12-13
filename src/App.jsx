import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMonth, fetchTag } from './actions';
import { useEffect } from 'react';

import { Photo } from './Photo';
import { Toolbar } from './Toolbar';

function App() {
  // Initialize & declare app states
  const photos = useSelector(state => state.photos);
  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  // After render apply thunk functions: getMonth (retrieve photo for month & year) & getTag (retrieve photo with specific tag)
  useEffect(() => {
    const today = new Date();
    dispatch(fetchMonth(today.getMonth(), today.getFullYear()));
    dispatch(fetchTag());
  }, [dispatch]);


    return (
      <div className="App">
        <Toolbar/>
        <h2>Ufotomi</h2>
        <div className="photos">
          {isLoading && <div className="spinner" />}
          {photos.map(photo => 
            <Photo key={photo.id} photo={photo} />
          )}
        </div>
      </div>
    );
  }

export default App;
