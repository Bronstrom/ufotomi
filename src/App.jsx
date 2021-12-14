import './App.css';
import { Route, Routes } from 'react-router-dom';


import { Navbar } from './Navbar';
import { Home } from './Home';
import { SearchMonth } from './SearchMonth';
import { SearchTag } from './SearchTag';
import { SharePhoto } from './SharePhoto';

function App() {
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
