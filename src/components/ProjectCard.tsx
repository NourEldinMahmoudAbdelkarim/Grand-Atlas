import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Project } from '../types';
import { cn } from './ui/Button';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'landing';
}

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const imageUrl =
    project.images?.[0] ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  if (variant === 'landing') {
    const devLogo = (project.developer as { name_en: string; name_ar: string; images?: string[] } | undefined)
      ?.images?.[0];

    return (
      <Link to={`/projects/${project.id}`} className="group block h-full">
        <article className="h-full flex flex-col bg-white border border-stone-200 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={imageUrl}
              alt={project.name_en}
              className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
            />
            <span className="absolute top-3 right-3 bg-[#8B2323] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
              New Launch
            </span>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-3 min-h-[2.5rem]">
              {devLogo ? (
                <img src={devLogo} alt="" className="h-9 w-auto max-w-[100px] object-contain" />
              ) : null}
              <div className="min-w-0">
                {project.developer && (
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold truncate">
                    {project.developer.name_en}
                  </p>
                )}
                <h3 className="font-serif text-lg font-semibold text-stone-900 leading-snug line-clamp-2">
                  {project.name_en}
                </h3>
              </div>
            </div>
            <div className="mt-auto pt-4">
              <span className="inline-flex w-full items-center justify-center rounded-md border border-[#8B2323] bg-white px-4 py-2.5 text-sm font-semibold text-[#8B2323] group-hover:bg-[#fcf6f6] transition-colors">
                View Details
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <div className="h-full border-stone-200 border rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={project.name_en}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#8B2323] text-white text-xs font-bold px-3 py-1 rounded-full">
              {project.zone?.name_en || 'Premium'}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 line-clamp-1">{project.name_en}</h3>
          {project.zone && (
            <div className="flex items-center text-stone-500 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1 shrink-0 text-[#8B2323]" />
              {project.zone.name_en}
            </div>
          )}
          <p className="text-stone-500 text-sm line-clamp-2">{project.description_en}</p>
          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
            {project.developer && (
              <span className="text-xs text-stone-400 font-medium">{project.developer.name_en}</span>
            )}
            <span className={cn('text-xs font-semibold text-[#8B2323] group-hover:underline')}>View Project →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
