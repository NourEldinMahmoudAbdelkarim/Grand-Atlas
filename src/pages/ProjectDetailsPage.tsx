import { useParams } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { MapPin, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="animate-pulse">
           <div className="w-full h-[60vh] bg-stone-200"></div>
           <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="h-10 bg-stone-200 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-stone-200 rounded w-1/4 mb-12"></div>
              <div className="h-32 bg-stone-200 rounded w-full"></div>
           </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) return <MainLayout><div className="py-20 text-center">Project not found</div></MainLayout>;

  return (
    <MainLayout>
      {/* Hero Gallery - First image large, others in grid */}
      <div className="w-full bg-stone-900 border-b border-stone-800">
         <div className="w-full h-[60vh] md:h-[70vh] relative">
            <img 
               src={project.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'} 
               alt={project.name_en}
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
               <div className="max-w-7xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-sm">{project.name_en}</h1>
                  {project.zone && (
                     <p className="text-xl text-stone-200 flex items-center">
                        <MapPin className="w-6 h-6 mr-2" />
                        {project.zone.name_en}, {project.zone.city_en}
                     </p>
                  )}
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
           {/* Main Content */}
           <div className="col-span-1 lg:col-span-2 space-y-12">
              <section>
                 <h2 className="text-2xl font-bold text-stone-900 mb-6">About the Project</h2>
                 <p className="text-stone-600 leading-relaxed text-lg">
                    {project.description_en}
                 </p>
              </section>

              {project.images && project.images.length > 1 && (
                 <section>
                    <h2 className="text-2xl font-bold text-stone-900 mb-6">Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {project.images.slice(1).map((imgUrl, idx) => (
                          <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-stone-100">
                             <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                          </div>
                       ))}
                    </div>
                 </section>
              )}
           </div>

           {/* Sidebar */}
           <div className="col-span-1">
              <div className="sticky top-28 bg-white border border-stone-200 p-8 rounded-2xl shadow-sm">
                 <h3 className="text-xl font-bold text-stone-900 mb-6">Project Details</h3>
                 
                 <div className="space-y-6 mb-8">
                    {project.developer && (
                       <div className="flex items-start">
                          <Building className="w-6 h-6 text-stone-400 mr-4 shrink-0" />
                          <div>
                             <p className="text-sm text-stone-500 font-medium">Developer</p>
                             <p className="text-stone-900">{project.developer.name_en}</p>
                          </div>
                       </div>
                    )}
                 </div>

                 <Button className="w-full" size="lg">Request Details</Button>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}
