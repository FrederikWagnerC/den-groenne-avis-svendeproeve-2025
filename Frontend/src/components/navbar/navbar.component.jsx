import burgerMenuSvg from "../../assets/burgerMenu.svg"
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.svg"
import profileIcon from "../../assets/profileIcon.svg"
import infoSquared from "../../assets/infoSquared.svg"
import mailImportant from "../../assets/mailImportant.svg"
import { AuthProvider, useAuth } from "../providers/auth.provider";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loginData, setLoginData } = useAuth();

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-50 h-[100px] py-4">
      <div className="max-w-[90%] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold"><img className="h-10" src={logo} alt="Logo" /></NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-black align-middle h-full items-center">
            <NavLink to="/produkter" className="bg-lightgreen text-white px-4 text-center py-1">Produkter</NavLink>
            {loginData && (
              <NavLink to="/opret-annonce" className="">Opret Annonce</NavLink>
            )}
            <div className="flex space-x-2">
              <NavLink to="/mail" className=""><img src={mailImportant} alt="" /></NavLink>
              <NavLink to="/info" className=""><img src={infoSquared} alt="" /></NavLink>
              {loginData ?
                <NavLink to="/profil" className=""><img src={profileIcon} alt="" /></NavLink>
                : <NavLink to="/login" className=""><img src={profileIcon} alt="" /></NavLink>}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src={burgerMenuSvg} alt="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
              <NavLink to="/" className="block px-3 py-2 hover:bg-gray-50">Home</NavLink>
              <NavLink to="/about" className="block px-3 py-2 hover:bg-gray-50">About</NavLink>
              <NavLink to="/contact" className="block px-3 py-2 hover:bg-gray-50">Contact</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};