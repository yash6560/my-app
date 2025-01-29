import React, { useState } from 'react'
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isopen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isopen);
  }

  const handleLogout = () => {
    logout();
  }

 

  return (
    <nav className="bg-gray-800 text-white">
      <div className="md:px-16 px-5 py-5">
        <div className="md:flex justify-between items-center">
          {/* Logo */}
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              MyLogo
            </Link>
            <span className='md:hidden table' onClick={handleMenu}>
            {isopen ? <IoClose/> : <IoMenu />}
            </span>
          </div>
          {/* Navigation Links */}
          <div className={`md:flex items-center gap-5 grid pt-10 md:pt-0 ${isopen ? "block" : "hidden"}`}>
          <Link to="/" className="hover:text-gray-300 font-bold">Home</Link>
            <Link to="/about" className="hover:text-gray-300 font-bold">About</Link>
            <a href="#contact" className="hover:text-gray-300 font-bold">
              Contact
            </a>
            {
              user
              ?
               <>
               <Link to="/login" onClick={handleLogout} className='px-5 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600'>Log Out</Link>
               
            </> 
            : 
            <>
             <Link to="/signup" className='px-5 py-2 rounded bg-green-500 text-white font-bold hover:bg-green-600'>Sign Up</Link>
             <Link to="/login" className='px-5 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600'>Log In</Link>
            </>
            }
            
           
          </div>
          
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar