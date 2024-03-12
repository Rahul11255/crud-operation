import './App.css';
import { Routes, Route } from "react-router-dom";
import Crud from './components/Crud';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
   <Routes>
   <Route path="/" element={<Crud />} />
   <Route path='/update/:id' element={<Update />} />
    </Routes>
    </div>
  );
}

export default App;
