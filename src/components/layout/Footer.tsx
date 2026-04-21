import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-stone-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Grand Atlas Logo" className="h-20 w-auto" />
            </Link>
            <p className="text-xs text-stone-500 font-medium">GRAND ATLAS REAL ESTATE</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-stone-900 font-bold mb-4 font-serif text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm text-stone-600 font-medium">
              <li><Link to="/" className="hover:text-[#8C1C1D] transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-[#8C1C1D] transition-colors">Services</Link></li>
              <li><Link to="/projects" className="hover:text-[#8C1C1D] transition-colors">Projects</Link></li>
              <li><Link to="/developers" className="hover:text-[#8C1C1D] transition-colors">Developers</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-stone-900 font-bold mb-4 font-serif text-lg">About</h4>
            <ul className="space-y-3 text-sm text-stone-600 font-medium">
              <li><Link to="/mission" className="hover:text-[#8C1C1D] transition-colors">Our Mission</Link></li>
              <li><Link to="/privacy" className="hover:text-[#8C1C1D] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/team" className="hover:text-[#8C1C1D] transition-colors">Team</Link></li>
              <li><Link to="/careers" className="hover:text-[#8C1C1D] transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-stone-900 font-bold mb-4 font-serif text-lg">Newsletter</h4>
            <div className="flex gap-2">
               <Input 
                 placeholder="Enter your email" 
                 className="bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400"
               />
               <Button className="bg-[#8C1C1D] hover:bg-[#731718] text-white">
                  &rarr;
               </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 flex text-xs text-stone-500 justify-center">
          <p>&copy; {new Date().getFullYear()} Grand Atlas All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
