import { Link } from 'react-router-dom';
import { Building2, MapPin, Square } from 'lucide-react';
import type { Project } from '../types';

const MAROON = '#8B2323';
const MUTED = '#707070';
const BAR_BG = '#F3F3F3';

export interface ProjectGridMetrics {
  unitCount: number;
  totalAreaM2: number;
}

interface ProjectGridCardProps {
  project: Project;
  metrics: ProjectGridMetrics;
}

function formatAreaM2(n: number) {
  if (!n || n <= 0) return '—';
  return `${Math.round(n).toLocaleString()}m`;
}

export function ProjectGridCard({ project, metrics }: ProjectGridCardProps) {
  const img = project.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80';
  const desc = project.description_en?.trim() || 'Premium development in a prime location with curated amenities and refined architecture.';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
      <Link to={`/projects/${project.id}`} className="block shrink-0">
        <div className="aspect-[16/11] w-full overflow-hidden bg-stone-100">
          <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
        </div>
      </Link>

      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 px-3 py-2.5 text-[12px] font-medium sm:px-4 sm:text-[13px]"
        style={{ backgroundColor: BAR_BG, color: MUTED }}
      >
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="h-4 w-4 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
          {metrics.unitCount} Units
        </span>
        <span className="inline-flex min-w-0 max-w-[38%] items-center gap-1.5 truncate sm:max-w-none">
          <MapPin className="h-4 w-4 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
          {project.zone?.city_en || project.zone?.name_en || '—'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Square className="h-4 w-4 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
          {formatAreaM2(metrics.totalAreaM2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <Link to={`/projects/${project.id}`}>
          <h3 className="font-serif text-xl font-bold leading-snug tracking-tight transition hover:opacity-90" style={{ color: MAROON }}>
            {project.name_en}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed" style={{ color: MUTED }}>
          {desc}
        </p>
        <div className="mt-5">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex w-full items-center justify-center rounded-md border-2 bg-transparent py-2.5 text-sm font-semibold transition hover:bg-stone-50"
            style={{ borderColor: MAROON, color: MAROON }}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
