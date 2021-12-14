import { useSelector, useDispatch } from 'react-redux';

import { fetchAll } from './actions';
import { useEffect } from 'react';

import { Photo } from './Photo';

export function Home() {
  // Initialize & declare app states
  const photos = useSelector(state => state.photos);
  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  // After render apply thunk function: getMonth (retrieve photo for month & year)
  useEffect(() => {
    const today = new Date();
    dispatch(fetchAll());
  }, [dispatch]);


  return (
    <div className="App">
      <h2>Ufotomi</h2>
      <p className="centering">A photography application allowing for sharing and rating photos with an intuitive gallery.</p>
      <div className="padding" />
      <h3>Featured Photos</h3>
      <div className="photos">
        {isLoading && <div className="spinner" />}
        {photos.slice(0, 10).map(photo => 
          <Photo key={photo.id} photo={photo} />
        )}
      </div>
    </div>
  );
}