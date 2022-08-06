
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Categories } from './components/Categories';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SingleCategory } from './components/SingleCategory';
import { SingleImage } from './components/SingleImage'
import { QueryImage } from './components/QueryImage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="category-slider">
          <Categories />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:id' element={<SingleCategory />} />
          <Route path='/image/:id' element={<SingleImage />} />
          <Route path='/query/:search' element={<QueryImage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
