import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ProjectCard';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { developerService } from '../services/developerService';
import { Link } from 'react-router-dom';
import { Target, Activity, Home, Trophy, ChevronRight } from 'lucide-react';

export function HomePage() {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const { data: developers } = useQuery({
    queryKey: ['developers'],
    queryFn: developerService.getAll,
  });

  return (
    <MainLayout>
      {/* ── Hero Section ── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/70" />
        </div>

        {/* Social Icons */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden lg:flex">
          {['f', 'in', 'ig', 'x'].map((label, idx) => (
            <a
              key={idx}
              href="#"
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white hover:text-stone-900 transition-all text-xs font-bold"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <p className="text-[#C9A96E] uppercase tracking-[0.3em] text-xs font-semibold mb-6">
            Grand Atlas Real Estate
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-serif">
            Redefining the Horizon<br />of Modern Luxury Living
          </h1>
          <p className="text-sm md:text-base text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            We believe a space should be a continuation of what surrounds you, giving the right proportion
            within your present time, and allowing you to enjoy your future path with a touch of your personal vision.
          </p>
          <Button
            size="lg"
            className="rounded-full px-14 py-4 bg-[#8C1C1D] hover:bg-[#731718] text-white font-semibold tracking-wide"
            asChild
          >
            <Link to="/units">Explore</Link>
          </Button>
        </div>
      </section>

      {/* ── Statistics ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 font-serif inline-block relative">
              Benchmarks of Success
              <span className="block w-1/2 h-0.5 bg-[#8C1C1D] mx-auto mt-3" />
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Target,   value: '40',  label: 'Project Managed' },
              { icon: Activity, value: '90M', label: 'Traffic Volume'  },
              { icon: Home,     value: '800', label: 'Properties'      },
              { icon: Trophy,   value: '99%', label: 'Client Satisfaction' },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-3 py-10 px-6 border border-stone-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white text-center"
              >
                <Icon className="w-8 h-8 text-[#8C1C1D]" />
                <span className="text-4xl font-bold text-stone-900">{value}</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 font-serif inline-block relative">
              About Grand Atlas
              <span className="block w-1/2 h-0.5 bg-[#8C1C1D] mx-auto mt-3" />
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image with decorative border */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-3/4 h-full border-l-4 border-t-4 border-[#8C1C1D] rounded-tl-3xl pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                alt="Luxury Property"
                className="relative z-10 w-full h-[480px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            {/* Text */}
            <div>
              <p className="text-stone-600 leading-relaxed text-[15px] mb-6">
                We begin with a simple, uncompromising vision: to bridge the gap between world-class architecture
                and the individuals who define our global culture. We recognized that what is missing is not just
                structural per se, but an integration of harmonious environments, exquisite open spaces, and the
                ultimate expression of utility and detail.
              </p>
              <p className="text-stone-600 leading-relaxed text-[15px] mb-10">
                Our properties stand as more than monumental towers — they are the greatest realized ones.
                We commit to bringing the most luxurious, high-caliber, and secure actualities where hospitality
                protocols run supreme, handled in the safest possible environment.
              </p>
              <Button
                className="rounded-full px-8 bg-[#8C1C1D] hover:bg-[#731718] text-white"
                asChild
              >
                <Link to="/units">
                  Know More <ChevronRight className="ml-1 w-4 h-4 inline" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hand-Selected Masterpieces ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 font-serif relative">
              Hand-Selected Masterpieces
              <span className="block w-1/2 h-0.5 bg-[#8C1C1D] mt-3" />
            </h2>
            <Link
              to="/units"
              className="hidden md:flex items-center text-sm font-semibold text-[#8C1C1D] hover:underline"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: 'https://images.unsplash.com/photo-1600607687939-ce8e0026e4ce?auto=format&fit=crop&w=800&q=80',
                label: '01. Palm Hills: Delta Villa',
              },
              {
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                label: '02. Marassi: Duplex Villa',
              },
              {
                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
                label: '03. Soma Bay Villa',
              },
            ].map((item) => (
              <Link to="/units" key={item.label} className="group block">
                <div className="overflow-hidden rounded-2xl aspect-[4/3]">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-stone-900 font-serif text-lg">{item.label}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-2">
            <div className="w-8 h-2 bg-[#8C1C1D] rounded-full" />
            <div className="w-2 h-2 bg-stone-300 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Strategic Locations ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 font-serif inline-block relative">
              Strategic Locations
              <span className="block w-1/2 h-0.5 bg-[#8C1C1D] mx-auto mt-3" />
            </h2>
          </div>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Egypt_location_map.svg/1200px-Egypt_location_map.svg.png"
              alt="Strategic Locations Map"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-[#8C1C1D]/10 flex items-center justify-center">
              <Link
                to="/zones"
                className="bg-white px-8 py-3 rounded-full font-bold text-stone-900 shadow-lg hover:bg-[#8C1C1D] hover:text-white transition-colors"
              >
                Explore All Zones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Future Landmarks ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 font-serif relative">
              Future Landmarks
              <span className="block w-1/2 h-0.5 bg-[#8C1C1D] mt-3" />
            </h2>
            <Link
              to="/projects"
              className="hidden md:flex items-center text-sm font-semibold text-[#8C1C1D] hover:underline"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-stone-200 aspect-[4/3] rounded-2xl w-full mb-4" />
                  <div className="h-5 bg-stone-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-stone-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects?.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center gap-2">
            <div className="w-8 h-2 bg-[#8C1C1D] rounded-full" />
            <div className="w-2 h-2 bg-stone-300 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Developers Strip ── */}
      {developers && developers.length > 0 && (
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-widest text-stone-400 mb-10 font-semibold">
              Trusted Partners & Developers
            </p>
            <div className="flex flex-wrap justify-center gap-10 items-center">
              {developers.slice(0, 6).map((dev) => (
                <div
                  key={dev.id}
                  className="flex items-center justify-center w-28 h-16 grayscale hover:grayscale-0 transition"
                  title={dev.name_en}
                >
                  {dev.images?.[0] ? (
                    <img
                      src={dev.images[0]}
                      alt={dev.name_en}
                      className="max-h-12 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-stone-500 font-semibold text-sm text-center">{dev.name_en}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
