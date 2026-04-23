import { useMemo } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ProjectGridCard, type ProjectGridMetrics } from '../components/ProjectGridCard';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { unitService } from '../services/unitService';

const MAROON = '#8B2323';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600585154526-990dcec4db64?auto=format&fit=crop&w=2400&q=80';

export function ProjectsPage() {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const { data: allUnits, isLoading: unitsLoading } = useQuery({
    queryKey: ['units', 'all-for-project-metrics'],
    queryFn: () => unitService.getAll({}),
  });

  const metricsByProjectId = useMemo(() => {
    const map = new Map<string, ProjectGridMetrics>();
    for (const u of allUnits || []) {
      const id = u.projectId;
      if (!id) continue;
      const cur = map.get(id) || { unitCount: 0, totalAreaM2: 0 };
      cur.unitCount += 1;
      cur.totalAreaM2 += u.size || 0;
      map.set(id, cur);
    }
    return map;
  }, [allUnits]);

  const isLoading = projectsLoading || unitsLoading;

  return (
    <MainLayout>
      <div className="bg-white pb-20 pt-24 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <header className="mb-10 text-center md:mb-12">
            <h1
              className="font-serif text-3xl font-bold tracking-tight text-[#1a1a1a] md:text-4xl lg:text-[2.35rem]"
            >
              Projects
            </h1>
            <span className="mx-auto mt-4 block h-[3px] w-12 rounded-full" style={{ backgroundColor: MAROON }} />
          </header>

          <div className="mb-14 overflow-hidden rounded-2xl shadow-md ring-1 ring-stone-200/80">
            <div className="aspect-[16/9] w-full md:aspect-[2.4/1]">
              <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover object-center" />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-stone-100 bg-white">
                  <div className="aspect-[16/11] bg-stone-200" />
                  <div className="h-12 bg-stone-100" />
                  <div className="space-y-3 p-5">
                    <div className="h-6 w-3/4 rounded bg-stone-200" />
                    <div className="h-4 w-full rounded bg-stone-100" />
                    <div className="h-4 w-full rounded bg-stone-100" />
                    <div className="h-10 w-full rounded-md bg-stone-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectGridCard
                  key={project.id}
                  project={project}
                  metrics={metricsByProjectId.get(project.id) || { unitCount: 0, totalAreaM2: 0 }}
                />
              ))}
            </div>
          ) : (
            <p className="py-20 text-center text-sm" style={{ color: '#707070' }}>
              No projects are available at the moment.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
