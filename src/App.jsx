import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMonth, fetchTag } from './actions';
import { useEffect } from 'react';

import { Photo } from './Photo';
import { Toolbar } from './Toolbar';


function App() {
  const photos = useSelector(state => state.photos);
  //let tag = "Other";
  //const toolbarhandler = data => tag = data.tag;

  // TODO: Widen the scope
  const dispatch = useDispatch();

  useEffect((tag) => {
    const today = new Date();
    dispatch(fetchMonth(today.getMonth(), today.getFullYear()));
    //dispatch(fetchTag(tag));
  }, [dispatch]);

  return (
    <div className="App">
      <Toolbar /*onchange={toolbarhandler}*/ />
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
