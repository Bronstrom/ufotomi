import { useSelector, useDispatch } from 'react-redux';

import { fetchMonth, newPhoto } from './actions';
import { useEffect } from 'react';

import { Photo } from './Photo';

export function SharePhoto() {
  // Initialize & declare month states
  const photos = useSelector(state => state.photos);
  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  // Get today
  const today = new Date();
  // After render apply thunk function: getMonth (retrieve photo for month & year)
  useEffect(() => {
    dispatch(fetchMonth(today.getMonth(), today.getFullYear()));
  }, [dispatch]);

  return (
    <div className="App, centering">
      <h2>Share Photo</h2>
      <div className="searchbar">
          <button onClick={() => dispatch(newPhoto(today.getFullYear(), today.getMonth(), today.getDate()))}
          >New Photo</button>
      </div>
      <div className="photos">
        {isLoading && <div className="spinner" />}
        {photos.filter(photoCheck => photoCheck.is_editing === true).map(photo =>
          <Photo key={photo.id} photo={photo} />
        )}
      </div>
    </div>
  );
}