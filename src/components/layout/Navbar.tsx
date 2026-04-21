import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Units', path: '/units' },
    { name: 'Zones', path: '/zones' },
    { name: 'Developers', path: '/developers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm border-b border-stone-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Grand Atlas Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => {
              // Custom active logic: exact match for Home, loose for others
              const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);
              return (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-[#8C1C1D]' : 'text-stone-700 hover:text-[#8C1C1D]'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#8C1C1D]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <Button className="rounded-full px-6 text-xs tracking-wider" asChild>
              <Link to="/login">Register</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-4 text-base font-medium text-stone-600 hover:text-[#8C1C1D] hover:bg-stone-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-4">
              <Button className="w-full rounded-full" asChild>
                 <Link to="/login">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
