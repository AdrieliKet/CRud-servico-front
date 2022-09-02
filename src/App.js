import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './footer/Footer';
import Header from './header/Header';
import Servico from './crudServico/Servico';

function App() {
  return (
    <Router>
      <div className='Container'>
        <Header nome="Adrieli" />
        <Routes>
          <Route path='/servico' element={<Servico />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
