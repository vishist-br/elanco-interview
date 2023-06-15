import React from 'react';
import elanco from '../../public/elanco.svg'

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className=" flex text-white text-xl font-bold">
             <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
             Elanco
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
