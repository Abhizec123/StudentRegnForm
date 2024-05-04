import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TableMui } from './Pages/TableMui';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableMui />} />
        </Routes>
      </BrowserRouter>
    </>
  )  
}

export default App;
