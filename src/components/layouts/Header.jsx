import React from 'react';
import { FaHome, FaUserPlus, FaSearch, FaTimes } from 'react-icons/fa';
import { FaRightToBracket } from 'react-icons/fa6';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className='flex justify-between w-full bg-customPrimary text-customSecondary px-12 py-3'>
      <div className='flex space-x-8'>
        {/* logo */}
        <img src={logo} alt='' srcset='' />
        {/* search box */}
        <div className='flex relative bg-customPrimary'>
          <span className='absolute left-4 top-3 text-[#FFFFFFCC] text-sm'>
            <FaSearch />
          </span>
          <input
            type='text'
            placeholder='Search recipe..'
            className='text-xs px-3 pl-12 pr-3 rounded-md w-52 bg-[#FFFFFF1A] border-none placeholder:text-[#FFFFFFCC]  focus:border-none focus:outline-none'
          />
          <span className='absolute right-4 top-3 text-[#FFFFFFCC] text-sm'>
            <FaTimes />
          </span>
        </div>
      </div>
      {/* nav */}
      <div className='flex justify-center items-center '>
        <ul className='flex space-x-6'>
          <li className='p-2'>
            <FaHome className='text-2xl' />
          </li>
          <li className='p-2'>
            <FaRightToBracket className='text-2xl' />
          </li>
          <li className='p-2'>
            <FaUserPlus className='text-2xl' />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
