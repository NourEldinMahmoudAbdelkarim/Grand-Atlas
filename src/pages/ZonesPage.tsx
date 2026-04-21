import { MainLayout } from '../components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { zoneService } from '../services/zoneService';

export function ZonesPage() {
  const { data: zones, isLoading } = useQuery({
    queryKey: ['zones'],
    queryFn: zoneService.getAll,
  });

  return (
    <MainLayout>
      {/* Hero Section (Map Style) */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          {/* Map style background */}
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/222/272/non_2x/map-of-egypt-vector.jpg"
            alt="Map Hero"
            className="w-full h-full object-cover opacity-80 mix-blend-multiply filter contrast-125 saturate-50"
          />
          <div className="absolute inset-0 bg-[#8C1C1D]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
        </div>
        
        {/* Absolute Social Icons (Matches homepage design) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden md:flex">
          {['f', 'in', 'ig', 'x'].map((label, idx) => (
            <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-colors text-sm font-bold font-serif">
              {label}
            </a>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif tracking-wide">
            Destinations Defined by Distinction
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto font-light">
            Explore our curated selection of premium zones, offering unparalleled lifestyles and breathtaking investment opportunities.
          </p>
        </div>
      </section>

      {/* Zones Grid Section */}
      <section className="py-24 bg-stone-50 min-h-[40vh]">
         <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1,2,3,4].map(i => (
                     <div key={i} className="animate-pulse w-full bg-stone-200 aspect-square rounded-2xl"></div>
                  ))}
               </div>
            ) : zones && zones.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {zones.map(zone => (
                     <div key={zone.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-stone-200 hover:ring-[#8C1C1D]">
                        <div className="aspect-[4/3] w-full overflow-hidden relative">
                           <img 
                              src={zone.images?.[0] || 'https://images.unsplash.com/photo-1546412414-e1885259563a'} 
                              alt={zone.name_en}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                           {/* Gradient overlay to make text pop */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                           <div className="absolute bottom-6 left-6 right-6">
                              <h3 className="text-2xl font-bold text-white font-serif tracking-wide mb-1">{zone.name_en}</h3>
                              <p className="text-stone-300 text-sm font-medium">{zone.city_en}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl">
                  <h3 className="text-2xl font-bold text-stone-900 mb-2 font-serif">No Zones Available</h3>
                  <p className="text-stone-500">We are expanding to new regions. Check back later.</p>
               </div>
            )}
         </div>
      </section>
    </MainLayout>
  );
}
