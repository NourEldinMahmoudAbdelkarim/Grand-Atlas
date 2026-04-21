import { useState, useMemo } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ProjectCard } from '../components/ProjectCard';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';

export function ProjectsPage() {
  const [search, setSearch] = useState('');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter(p => 
      p.name_en.toLowerCase().includes(search.toLowerCase()) || 
      (p.zone?.name_en || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);


  return (
    <MainLayout>
      <div className="bg-stone-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Available Projects</h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg mb-8">
            Browse our full collection of premium real estate projects.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input 
              className="pl-10 bg-white" 
              placeholder="Search by project name or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="bg-stone-200 aspect-[4/3] rounded-2xl w-full"></div>
                <div className="h-6 bg-stone-200 rounded w-2/3"></div>
                <div className="h-4 bg-stone-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-500">
             No projects match your search criteria.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
