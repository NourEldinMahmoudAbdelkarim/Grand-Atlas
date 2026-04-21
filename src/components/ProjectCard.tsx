import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <div className="h-full border-stone-200 border rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={project.name_en}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#8C1C1D] text-white text-xs font-bold px-3 py-1 rounded-full">
              {project.zone?.name_en || 'Premium'}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 line-clamp-1">{project.name_en}</h3>
          {project.zone && (
            <div className="flex items-center text-stone-500 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1 shrink-0 text-[#8C1C1D]" />
              {project.zone.name_en}
            </div>
          )}
          <p className="text-stone-500 text-sm line-clamp-2">{project.description_en}</p>
          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
            {project.developer && (
              <span className="text-xs text-stone-400 font-medium">{project.developer.name_en}</span>
            )}
            <span className="text-xs font-semibold text-[#8C1C1D] group-hover:underline">View Project →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
