import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20"> {/* pt-20 because of fixed navbar */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
