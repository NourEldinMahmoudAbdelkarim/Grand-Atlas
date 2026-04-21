import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { UnitCard } from '../components/UnitCard';
import { useQuery } from '@tanstack/react-query';
import { unitService } from '../services/unitService';
import { developerService } from '../services/developerService';
import { zoneService } from '../services/zoneService';
import { projectService } from '../services/projectService';
import { Search } from 'lucide-react';
import type { UnitFilters } from '../types';

export function UnitsPage() {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState<UnitFilters>(() => ({
    zoneName: searchParams.get('zoneName') || undefined,
  }));
  const [searchInput, setSearchInput] = useState('');

  // Sync URL params on mount
  useEffect(() => {
    const zoneName = searchParams.get('zoneName');
    if (zoneName) setFilters(prev => ({ ...prev, zoneName }));
  }, [searchParams]);

  const { data: units, isLoading } = useQuery({
    queryKey: ['units', filters],
    queryFn: () => unitService.getAll(filters),
  });
  const { data: developers } = useQuery({ queryKey: ['developers'], queryFn: developerService.getAll });
  const { data: zones }      = useQuery({ queryKey: ['zones'],      queryFn: zoneService.getAll });
  const { data: projects }   = useQuery({ queryKey: ['projects'],   queryFn: projectService.getAll });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value === '' ? undefined : value }));
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchInput || undefined }));
  };

  const clearAll = () => {
    setFilters({});
    setSearchInput('');
  };

  return (
    <MainLayout>
      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[420px] flex items-end pb-0 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
            alt="Units Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-stone-900/80" />
        </div>
        <div className="relative z-10 w-full pb-16 text-center px-4">
          <p className="text-[#C9A96E] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            Browse Our Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif">
            Where Visionary Design Meets Daily Life
          </h1>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-20 z-40 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">

            {/* Search */}
            <div className="flex flex-1 min-w-0 rounded-lg border border-stone-300 overflow-hidden focus-within:border-[#8C1C1D] focus-within:ring-1 focus-within:ring-[#8C1C1D] transition">
              <input
                type="text"
                placeholder="Search by title, city..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2.5 text-sm text-stone-800 outline-none bg-transparent placeholder:text-stone-400"
              />
              <button
                onClick={handleSearch}
                className="px-4 bg-[#8C1C1D] text-white hover:bg-[#731718] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Bedrooms */}
            <select
              name="bedrooms"
              value={filters.bedrooms ?? ''}
              onChange={handleSelect}
              className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#8C1C1D] bg-white"
            >
              <option value="">Bedrooms</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} Bedroom{n > 1 ? 's' : ''}</option>
              ))}
            </select>

            {/* Developer */}
            <select
              name="developerName"
              value={filters.developerName ?? ''}
              onChange={handleSelect}
              className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#8C1C1D] bg-white"
            >
              <option value="">Developer</option>
              {developers?.map(d => (
                <option key={d.id} value={d.name_en}>{d.name_en}</option>
              ))}
            </select>

            {/* Zone */}
            <select
              name="zoneName"
              value={filters.zoneName ?? ''}
              onChange={handleSelect}
              className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#8C1C1D] bg-white"
            >
              <option value="">Zone</option>
              {zones?.map(z => (
                <option key={z.id} value={z.name_en}>{z.name_en}</option>
              ))}
            </select>

            {/* Project */}
            <select
              name="projectName"
              value={filters.projectName ?? ''}
              onChange={handleSelect}
              className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#8C1C1D] bg-white"
            >
              <option value="">Project</option>
              {projects?.map(p => (
                <option key={p.id} value={p.name_en}>{p.name_en}</option>
              ))}
            </select>

            {/* Status */}
            <select
              name="status"
              value={filters.status ?? ''}
              onChange={handleSelect}
              className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#8C1C1D] bg-white"
            >
              <option value="">Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
              <option value="RENTED">Rented</option>
            </select>

            {/* Sort */}
            <select
              name="sort"
              value={filters.sort ?? ''}
              onChange={handleSelect}
              className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#8C1C1D] bg-white"
            >
              <option value="">Price Sort</option>
              <option value="asc">Lowest First</option>
              <option value="desc">Highest First</option>
            </select>

            {/* Clear */}
            <button
              onClick={clearAll}
              className="shrink-0 px-4 py-2.5 rounded-lg border border-stone-300 text-sm text-stone-600 hover:bg-stone-50 transition whitespace-nowrap"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-stone-500 text-sm">
            {isLoading ? 'Loading...' : `${units?.length ?? 0} unit${units?.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse border border-stone-200 rounded-xl overflow-hidden">
                <div className="bg-stone-200 aspect-[4/3] w-full" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-stone-200 rounded w-2/3" />
                  <div className="h-4 bg-stone-200 rounded w-1/3" />
                  <div className="h-10 bg-stone-100 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : units && units.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map(unit => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-stone-50 rounded-2xl border border-stone-100">
            <h3 className="text-2xl font-bold text-stone-900 font-serif mb-3">No Units Found</h3>
            <p className="text-stone-500 mb-6">Try adjusting your filters or clearing them.</p>
            <button
              onClick={clearAll}
              className="px-8 py-3 bg-[#8C1C1D] text-white rounded-full font-semibold hover:bg-[#731718] transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
