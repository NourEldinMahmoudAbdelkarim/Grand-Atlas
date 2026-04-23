import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { unitService } from '../services/unitService';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

const MAROON = '#8B2323';
const GREY = '#707070';

export function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getById(id!),
    enabled: !!id,
  });

  const { data: projectUnits } = useQuery({
    queryKey: ['units', 'by-project', project?.name_en],
    queryFn: () => unitService.getAll({ projectName: project!.name_en }),
    enabled: !!project?.name_en,
  });

  const portfolioStats = useMemo(() => {
    const units = projectUnits || [];
    const n = units.length;
    const area = units.reduce((s, u) => s + (u.size || 0), 0);
    const beds = units.reduce((s, u) => s + (u.bedrooms || 0), 0);
    const baths = units.reduce((s, u) => s + (u.bathrooms || 0), 0);
    return { n, area, beds, baths };
  }, [projectUnits]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="mx-auto h-8 w-64 rounded bg-stone-200" />
            <div className="mx-auto h-1 w-12 rounded-full bg-stone-200" />
            <div className="aspect-[16/10] w-full rounded-2xl bg-stone-200 md:aspect-[2.2/1]" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 w-24 shrink-0 rounded-md bg-stone-200 sm:h-20 sm:w-28" />
              ))}
            </div>
            <div className="h-10 max-w-2xl rounded bg-stone-200" />
            <div className="h-4 w-2/3 rounded bg-stone-200" />
            <div className="grid gap-10 pt-4 lg:grid-cols-2">
              <div className="h-56 rounded-lg bg-stone-200" />
              <div className="h-72 rounded-lg bg-stone-200" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="px-4 pb-20 pt-32 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">Project not found</h2>
          <Button asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const images = project.images?.length ? project.images : [];
  const heroImage =
    activeImage || images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80';
  const city = project.zone?.city_en || '';
  const zoneName = project.zone?.name_en || '';
  const locationLine = [city, zoneName].filter(Boolean).join(', ') || 'Location on request';
  const refDisplay = `LOC${project.id.replace(/\D/g, '').slice(0, 4)}`;

  const devLogo = (project.developer as { name_en: string; name_ar: string; images?: string[] } | undefined)?.images?.[0];

  const glanceItems: { label: string; value: string }[] = [
    { label: 'Zone', value: zoneName || '—' },
    { label: 'City', value: city || '—' },
    { label: 'Units in portfolio', value: String(portfolioStats.n) },
    {
      label: 'Total residential area ca.',
      value: portfolioStats.area > 0 ? `${Math.round(portfolioStats.area).toLocaleString()} m²` : '—',
    },
    { label: 'Total bedrooms (all units)', value: portfolioStats.beds > 0 ? String(portfolioStats.beds) : '—' },
    { label: 'Total bathrooms (all units)', value: portfolioStats.baths > 0 ? String(portfolioStats.baths) : '—' },
    { label: 'Developer', value: project.developer?.name_en || '—' },
  ];

  const maroonSubtitle =
    zoneName && city
      ? `Luxury residences in ${city}`
      : project.name_en;

  return (
    <MainLayout>
      <div className="min-h-screen bg-white pb-20 pt-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: GREY }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <header className="mb-10 text-center">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-[2.25rem]">
              {project.name_en}
            </h1>
            <span className="mx-auto mt-4 block h-[3px] w-12 rounded-full" style={{ backgroundColor: MAROON }} />
          </header>

          <div className="mb-3 overflow-hidden rounded-2xl shadow-md ring-1 ring-stone-200/80">
            <div className="aspect-[16/10] w-full md:aspect-[2.2/1]">
              <img src={heroImage} alt="" className="h-full w-full object-cover" />
            </div>
          </div>

          {images.length > 1 ? (
            <div className="mb-12 flex gap-2 overflow-x-auto pb-1 sm:gap-3">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`shrink-0 overflow-hidden rounded-md ring-2 transition-all ${
                    heroImage === imgUrl ? 'ring-[#8B2323] opacity-100' : 'ring-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="h-16 w-24 object-cover sm:h-20 sm:w-32" />
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-12" />
          )}

          <div className="mb-3 flex flex-col gap-6 border-b border-stone-100 pb-10 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="min-w-0 flex-1">
              <h2
                className="font-serif text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-[2rem]"
                style={{ color: MAROON }}
              >
                {maroonSubtitle}
              </h2>
              <p className="mt-4 flex flex-wrap items-center gap-1.5 text-sm md:text-[15px]" style={{ color: GREY }}>
                <MapPin className="h-4 w-4 shrink-0" style={{ color: MAROON }} aria-hidden />
                <span>
                  {locationLine} — ref. {refDisplay}
                </span>
              </p>
            </div>
            {devLogo ? (
              <div className="shrink-0 md:pt-1">
                <img src={devLogo} alt={project.developer?.name_en || 'Developer'} className="h-12 w-auto max-w-[200px] object-contain object-right md:h-14" />
              </div>
            ) : project.developer ? (
              <p className="shrink-0 font-serif text-lg font-semibold md:text-right" style={{ color: MAROON }}>
                {project.developer.name_en}
              </p>
            ) : null}
          </div>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <section>
              <h3 className="mb-6 text-lg font-bold text-stone-900">At a glance</h3>
              <ul className="space-y-3.5 text-[15px] leading-relaxed" style={{ color: GREY }}>
                {glanceItems.map(({ label, value }) => (
                  <li key={label} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" aria-hidden />
                    <span>
                      <span className="font-medium text-stone-700">{label}:</span> {value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-6 text-lg font-bold text-stone-900">Overview</h3>
              <div className="text-[15px] leading-[1.75] whitespace-pre-wrap" style={{ color: GREY }}>
                {project.description_en ||
                  'This development represents a carefully planned residential destination, combining architectural quality with landscape and lifestyle amenities. Explore available residences to find a home that fits your vision.'}
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
