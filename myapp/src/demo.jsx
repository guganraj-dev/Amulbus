import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginClick = () => {
    setOpen(false);
    navigate('/login');
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-4 py-2 text-gray-800 hover:text-black focus:outline-none"
      >
        <FaUserCircle className="text-2xl" />
        <span>Account</span>
        <svg
          className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50">
          <ul className="flex flex-col text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cancel Ticket</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Travel Date</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Show My Ticket</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Email/SMS</li>
            <hr />
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold"
              onClick={handleLoginClick}
            >
              Login / Sign Up
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;


