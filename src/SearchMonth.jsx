import { useSelector, useDispatch } from 'react-redux';

import { fetchMonth } from './actions';
import { useEffect } from 'react';

import { Photo } from './Photo';
import { SearchbarMonth } from './SearchbarMonth';

export function SearchMonth() {
  // Initialize & declare month states
  const photos = useSelector(state => state.photos);
  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  // After render apply thunk function: getMonth (retrieve photo for month & year)
  useEffect(() => {
    const today = new Date();
    dispatch(fetchMonth(today.getMonth(), today.getFullYear()));
  }, [dispatch]);


    return (
      <div className="App">
        <h2>Search by Month</h2>
        <SearchbarMonth />
        <div className="photos">
          {isLoading && <div className="spinner" />}
          {photos.map(photo =>
            <Photo key={photo.id} photo={photo} />
          )}
        </div>
      </div>
    );
  }