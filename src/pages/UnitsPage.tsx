import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { UnitCard } from '../components/UnitCard';
import { useQuery } from '@tanstack/react-query';
import { unitService } from '../services/unitService';
import { developerService } from '../services/developerService';
import { zoneService } from '../services/zoneService';
import { projectService } from '../services/projectService';
import { Search, ChevronDown } from 'lucide-react';
import type { UnitFilters } from '../types';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1586145658125-78d3789a3f93?auto=format&fit=crop&w=2400&q=80';

function SelectField({
  name,
  value,
  onChange,
  children,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-w-0">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-stone-300 bg-white py-2 pl-3 pr-9 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:ring-1 focus:ring-stone-300"
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
        aria-hidden
      />
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/90 text-white transition-colors hover:bg-white hover:text-stone-900"
    >
      {children}
    </a>
  );
}

export function UnitsPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<UnitFilters>(() => ({
    zoneName: searchParams.get('zoneName') || undefined,
  }));
  const [searchInput, setSearchInput] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const { data: units, isLoading } = useQuery({
    queryKey: ['units', filters],
    queryFn: () => unitService.getAll(filters),
  });
  const { data: developers } = useQuery({ queryKey: ['developers'], queryFn: developerService.getAll });
  const { data: zones } = useQuery({ queryKey: ['zones'], queryFn: zoneService.getAll });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: projectService.getAll });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'priceRange') {
      setPriceRange(value);
      if (!value) {
        setFilters((prev) => {
          const next = { ...prev };
          delete next.minPrice;
          delete next.maxPrice;
          return next;
        });
        return;
      }
      if (value === '50mplus') {
        setFilters((prev) => ({ ...prev, minPrice: 50_000_000, maxPrice: undefined }));
        return;
      }
      const [minS, maxS] = value.split(',');
      const minPrice = Number(minS);
      const maxPrice = maxS === '' || maxS === undefined ? undefined : Number(maxS);
      setFilters((prev) => ({
        ...prev,
        minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
        maxPrice: maxPrice !== undefined && Number.isFinite(maxPrice) ? maxPrice : undefined,
      }));
      return;
    }
    const numFields = ['bedrooms'];
    if (numFields.includes(name)) {
      setFilters((prev) => ({
        ...prev,
        [name]: value === '' ? undefined : Number(value),
      }));
      return;
    }
    setFilters((prev) => ({ ...prev, [name]: value === '' ? undefined : value }));
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchInput.trim() || undefined }));
  };

  const clearAll = () => {
    setFilters({});
    setSearchInput('');
    setPriceRange('');
  };

  return (
    <MainLayout>
      <section className="relative flex min-h-[min(52vh,32rem)] items-center justify-center overflow-hidden pt-0">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-900/75 to-stone-950/88" />
        </div>

        <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:left-8 lg:flex">
          <SocialLink label="Facebook" href="https://facebook.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </SocialLink>
          <SocialLink label="X" href="https://x.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialLink>
          <SocialLink label="Instagram" href="https://instagram.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </SocialLink>
          <SocialLink label="TikTok" href="https://tiktok.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </SocialLink>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center md:py-28">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Where Visionary Design Meets Daily Life
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/85 md:text-[15px]">
            Explore a hand-picked portfolio of residences shaped by light, proportion, and craft — each one chosen to
            elevate how you live, work, and unwind every day.
          </p>
        </div>
      </section>

      <div className="relative z-20 -mt-10 px-4 pb-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[90rem] rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:p-6 md:p-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search Property"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="h-11 w-full rounded-lg border border-stone-300 bg-white py-2 pl-10 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-1 focus:ring-stone-300"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <SelectField name="bedrooms" value={filters.bedrooms?.toString() ?? ''} onChange={handleSelect}>
                <option value="">Bedrooms</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Bedroom{n > 1 ? 's' : ''}
                  </option>
                ))}
              </SelectField>

              <SelectField name="developerName" value={filters.developerName ?? ''} onChange={handleSelect}>
                <option value="">Developer</option>
                {developers?.map((d) => (
                  <option key={d.id} value={d.name_en}>
                    {d.name_en}
                  </option>
                ))}
              </SelectField>

              <SelectField name="zoneName" value={filters.zoneName ?? ''} onChange={handleSelect}>
                <option value="">Zone</option>
                {zones?.map((z) => (
                  <option key={z.id} value={z.name_en}>
                    {z.name_en}
                  </option>
                ))}
              </SelectField>

              <SelectField name="projectName" value={filters.projectName ?? ''} onChange={handleSelect}>
                <option value="">Project</option>
                {projects?.map((p) => (
                  <option key={p.id} value={p.name_en}>
                    {p.name_en}
                  </option>
                ))}
              </SelectField>

              <SelectField name="status" value={filters.status ?? ''} onChange={handleSelect}>
                <option value="">Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="SOLD">Sold</option>
                <option value="RENTED">Rented</option>
              </SelectField>

              <SelectField name="priceRange" value={priceRange} onChange={handleSelect}>
                <option value="">Price Range</option>
                <option value="0,5000000">Up to 5,000,000 EGP</option>
                <option value="5000000,10000000">5M – 10M EGP</option>
                <option value="10000000,20000000">10M – 20M EGP</option>
                <option value="20000000,50000000">20M – 50M EGP</option>
                <option value="50mplus">50M+ EGP</option>
              </SelectField>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleSearch}
              className="h-11 min-w-[10rem] rounded-md bg-[#632323] px-10 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#4a1a1a]"
            >
              Search
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-medium text-stone-500 underline decoration-stone-300 underline-offset-4 hover:text-stone-800"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-stone-100 pb-4">
          <p className="text-sm" style={{ color: '#707070' }}>
            {isLoading ? 'Loading…' : `${units?.length ?? 0} propert${units?.length === 1 ? 'y' : 'ies'} found`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-stone-200 bg-white">
                <div className="aspect-[4/3] bg-stone-200" />
                <div className="h-12 border-b border-stone-100 bg-stone-50" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 rounded bg-stone-200" />
                  <div className="h-4 w-full rounded bg-stone-100" />
                  <div className="h-4 w-full rounded bg-stone-100" />
                  <div className="mx-auto mt-4 h-4 w-24 rounded bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        ) : units && units.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-100 bg-stone-50/80 py-24 text-center">
            <h3 className="mb-2 font-serif text-2xl font-semibold text-stone-900">No units found</h3>
            <p className="mx-auto mb-8 max-w-md text-sm" style={{ color: '#707070' }}>
              Try adjusting your search or filters, or clear everything to see the full collection.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-md bg-[#632323] px-10 py-3 text-sm font-semibold text-white transition hover:bg-[#4a1a1a]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
