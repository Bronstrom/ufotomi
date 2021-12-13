import { useSelector, useDispatch } from 'react-redux';

import { fetchTag } from './actions';
import { useEffect } from 'react';

import { Photo } from './Photo';
import { SearchbarTag } from './SearchbarTag';

export function SearchTag() {
  // Initialize & declare tag states
  const photos = useSelector(state => state.photos);
  const isLoading = useSelector(state => state.isLoading);
  const initTag = "Other";

  const dispatch = useDispatch();

  // After render apply thunk function: getTag (retrieve photo with specific tag)
  useEffect(() => {
    dispatch(fetchTag(initTag));
  }, [dispatch]);


    return (
      <div className="App">
        <h2>Search by Tag</h2>
        <SearchbarTag />
        <div className="photos">
          {isLoading && <div className="spinner" />}
          {photos.map(photo => 
            <Photo key={photo.id} photo={photo} />
          )}
        </div>
      </div>
    );
  }
