import { MainLayout } from '../components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { developerService } from '../services/developerService';
import { DeveloperCard } from '../components/DeveloperCard';

export function DevelopersPage() {
  const { data: developers, isLoading } = useQuery({
    queryKey: ['developers'],
    queryFn: developerService.getAll,
  });

  return (
    <MainLayout>
      <div className="bg-stone-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Our Partner Developers</h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">
            We work with the most trusted names in the industry to bring you exceptional properties.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse flex flex-col items-center gap-4 border border-stone-200 p-8 rounded-xl">
                 <div className="w-32 h-32 bg-stone-200 rounded-full"></div>
                 <div className="h-6 bg-stone-200 rounded w-1/2"></div>
                 <div className="h-20 w-full bg-stone-100 rounded mt-4"></div>
              </div>
            ))}
          </div>
        ) : developers && developers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        ) : (
           <div className="text-center py-20 text-stone-500">
             No developers found at the moment.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
