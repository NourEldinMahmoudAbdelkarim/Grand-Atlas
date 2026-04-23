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
    { name: 'Projects', path: '/projects' },
    { name: 'Developers', path: '/developers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="relative flex h-[4.5rem] items-center md:h-[5rem]">
          <div className="z-10 flex shrink-0 items-center">
            <Link to="/" className="flex items-center py-1">
              <img
                src="/logo.png"
                alt="Grand Atlas Luxury Real Estate"
                className="h-[3.25rem] w-auto object-contain object-left md:h-[3.9rem]"
              />
            </Link>
          </div>

          <div className="pointer-events-none absolute inset-x-0 hidden justify-center md:flex">
            <div className="pointer-events-auto flex items-center gap-10 lg:gap-11">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative pb-1 text-[13px] font-medium tracking-wide transition-colors ${
                      isActive ? 'text-[#8B2323]' : 'text-stone-700 hover:text-[#8B2323]'
                    }`}
                  >
                    {link.name}
                    {isActive ? (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#8B2323]" />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="z-10 ml-auto hidden items-center md:flex">
            <Button
              className="h-10 rounded-md border-0 bg-[#8B2323] px-7 text-[12px] font-semibold uppercase tracking-wide text-white shadow-none hover:bg-[#6f1b1b]"
              asChild
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>

          <div className="z-10 ml-auto flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-stone-100 bg-white shadow-lg md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block rounded-md px-3 py-3 text-[15px] font-medium text-stone-700 hover:bg-stone-50 hover:text-[#8B2323]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="space-y-2 px-3 pt-3">
              <Button className="h-11 w-full rounded-md text-sm font-semibold uppercase tracking-wide" asChild>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
