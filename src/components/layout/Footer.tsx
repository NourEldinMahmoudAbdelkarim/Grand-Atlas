import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

function SocialIcon({ children, label, href }: { children: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#8B2323] text-[#8B2323] hover:bg-[#8B2323] hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-[#F9F9F9] pb-10 pt-20">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-14">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/logo.png"
                alt="Grand Atlas Luxury Real Estate"
                className="h-[4.5rem] w-auto object-contain object-left"
              />
            </Link>
            <a href="tel:+176355471297" className="text-sm font-medium text-stone-600 hover:text-[#8B2323]">
              +1 (7635) 547-12-97
            </a>
            <a href="mailto:support@grandatlas.com" className="mt-1 text-sm font-medium text-stone-600 hover:text-[#8B2323]">
              support@grandatlas.com
            </a>
          </div>

          <div>
            <h4 className="text-stone-900 font-semibold mb-5 font-serif text-lg tracking-tight">Quick Links</h4>
            <ul className="space-y-3 text-sm text-stone-600 font-medium">
              <li>
                <Link to="/" className="transition-colors hover:text-[#8B2323]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-[#8B2323]">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/projects" className="transition-colors hover:text-[#8B2323]">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/developers" className="transition-colors hover:text-[#8B2323]">
                  Developers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[#8B2323]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-900 font-semibold mb-5 font-serif text-lg tracking-tight">About</h4>
            <ul className="space-y-3 text-sm text-stone-600 font-medium">
              <li>
                <Link to="/units" className="transition-colors hover:text-[#8B2323]">
                  About Atlas
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[#8B2323]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[#8B2323]">
                  Legal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[#8B2323]">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[#8B2323]">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-900 font-semibold mb-5 font-serif text-lg tracking-tight">Our Network</h4>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-3">Newsletter</p>
            <div className="flex gap-0 max-w-sm">
              <Input
                type="email"
                placeholder="Get product updates"
                className="h-11 flex-1 rounded-l-md rounded-r-none border border-r-0 border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="button"
                className="h-11 w-12 shrink-0 rounded-l-none rounded-r-md border-0 bg-[#8B2323] px-0 hover:bg-[#6f1b1b]"
              >
                <span aria-hidden>→</span>
              </Button>
            </div>
            <div className="flex gap-3 mt-6 justify-center sm:justify-start">
              <SocialIcon label="Facebook" href="https://facebook.com">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram" href="https://instagram.com">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="https://linkedin.com">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-300/80 pt-8">
          <p className="text-center text-[13px] text-stone-500">© 2024 Grand Atlas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
