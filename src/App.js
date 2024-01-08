import './App.css';
import { Routes, Route } from 'react-router-dom';
import Choice from './components/admin/Choice';
import Admin_main from './components/admin/Admin_main';
import CreateQR from './components/admin/CreateQR';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Choice />} />
        <Route path='AdminMain' element={<Admin_main />} />
        <Route path='CreateQR' element={<CreateQR/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
