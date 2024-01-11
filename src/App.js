import './App.css';
import { Routes, Route } from 'react-router-dom';
import Choice from './components/admin/Choice';
import Admin_main from './components/admin/Admin_main';
import CreateQR from './components/admin/CreateQR';
import Admin_department from './components/admin/Admin_department';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Choice />} />
        <Route path='AdminMain' element={<Admin_main />} />
        <Route path='CreateQR' element={<CreateQR/>}/>
        <Route path='AdminDepartment' element={<Admin_department/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
