import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Photo } from './Photo';
import { fetchDate } from './actions';
import { useEffect } from 'react';

function App() {
  const photos = useSelector(state => state.photos);

  // TODO: Widen the scope
  /*
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    dispatch(fetchDate(today.getMonth() + 1, today.getDate(), today.getFullYear()));
  }, [dispatch]);
  */

  return (
    <div className="App">
      <h2>Ufotomi</h2>
      <div className="photos">
        {photos.map(photo => 
          <Photo key={photo.id} photo={photo} />
        )}
      </div>
    </div>
  );
}

export default App;
