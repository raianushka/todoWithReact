import React from 'react'
import { useState } from 'react';

function Navbar({ onSearch }) {

  // State to hold the search term input by the user
  const [searchTerm, setSearchTerm] = useState("");

   // Function to handle input change in the search box
  const handleInputChange = (e) => {
    const term = e.target.value;  // Get the current value of the input field
    setSearchTerm(term);  // Update the local state with the new search term
    onSearch(term); // Trigger the search function passed via props on every change
  };

  return (
   <nav className='flex justify-between bg-[#231B1B] rounded-xl text-white p-5 w-3/4 mx-auto'> 
   <div className='logo'>
    <span className='font bold text-xl mx-8'>TODO</span>
   </div>
   <ul className='flex gap-8 mx-9'>
    <li className=''>
      <input type='text' placeholder='Search Todo' name='search' 
      className='p-1 rounded-md text-black'
       value={searchTerm} onChange={handleInputChange}/> 
    </li>
   </ul>
   </nav>
  )
}

export default Navbar