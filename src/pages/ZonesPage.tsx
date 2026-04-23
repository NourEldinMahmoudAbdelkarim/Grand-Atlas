import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { zoneService } from '../services/zoneService';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1529158062015-cad636e205a0?auto=format&fit=crop&w=2400&q=80';

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1591608971494-4e35de14f8e9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503177119275-0faa32b3a936?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
];

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

export function ZonesPage() {
  const { data: zones, isLoading } = useQuery({
    queryKey: ['zones'],
    queryFn: zoneService.getAll,
  });

  return (
    <MainLayout>
      <section className="relative flex min-h-[min(56vh,36rem)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover object-[center_40%] sepia-[0.45] contrast-[0.92] brightness-[0.88] saturate-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-900/55 to-stone-950/85" />
          <div
            className="pointer-events-none absolute left-[22%] top-[48%] hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/55 shadow-[0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_48px_rgba(0,0,0,0.35)] md:block md:h-52 md:w-52 lg:left-[26%]"
            aria-hidden
          />
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

        <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center md:py-28">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Destinations Defined by Distinction
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/90 md:text-[15px]">
            From the quiet pulse of the shoreline to the vibrant energy of the metropolitan center, explore our guide to
            the neighborhoods that mirror your ambition and your aesthetic.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] animate-pulse rounded-md bg-stone-200"
                />
              ))}
            </div>
          ) : zones && zones.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-4">
              {zones.map((zone, index) => {
                const src = zone.images?.[0] || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
                return (
                  <Link
                    key={zone.id}
                    to={`/units?zoneName=${encodeURIComponent(zone.name_en)}`}
                    className="group block overflow-hidden rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-stone-200/80 transition duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:ring-[#632323]/30"
                    aria-label={`Browse units in ${zone.name_en}`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-stone-50/90 py-20 text-center">
              <h3 className="mb-2 font-serif text-2xl font-semibold text-stone-900">No zones available</h3>
              <p className="mx-auto max-w-md text-sm text-[#707070]">
                We are expanding to new regions. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
