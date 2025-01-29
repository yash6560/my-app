import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';


function App() {
  
  return (
    <>
   <BrowserRouter>
   <AuthProvider>
   <Navbar/>
   <div className='p-4'>
    <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
        </div>
        </AuthProvider>
   </BrowserRouter>
  
   </>
  );
}

export default App;
