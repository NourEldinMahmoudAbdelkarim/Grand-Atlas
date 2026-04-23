import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { unitService } from '../services/unitService';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, ArrowLeft } from 'lucide-react';

const MAROON = '#8B2323';
const GOLD = '#B5A284';
const GREY = '#707070';
const WA_GREEN = '#00A82D';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function UnitDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { data: unit, isLoading } = useQuery({
    queryKey: ['unit', id],
    queryFn: () => unitService.getById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-32 rounded bg-stone-200" />
            <div className="aspect-[21/9] w-full rounded-lg bg-stone-200 md:aspect-[2.4/1]" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 w-24 shrink-0 rounded-md bg-stone-200 sm:h-20 sm:w-28" />
              ))}
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div className="h-10 w-3/4 max-w-xl rounded bg-stone-200" />
              <div className="h-10 w-48 rounded bg-stone-200 md:ml-auto" />
            </div>
            <div className="h-4 w-2/3 max-w-lg rounded bg-stone-200" />
            <div className="grid gap-10 pt-6 lg:grid-cols-2">
              <div className="h-64 rounded-lg bg-stone-200" />
              <div className="h-80 rounded-lg bg-stone-200" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!unit) {
    return (
      <MainLayout>
        <div className="px-4 pb-20 pt-40 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-stone-900">Unit not found</h2>
          <Button asChild>
            <Link to="/units">Back to Units</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const images = unit.images?.length ? unit.images : [];
  const heroImage = activeImage || images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80';
  const locationParts = [
    unit.city_en,
    unit.zoneName_en || unit.project?.zone?.name_en,
    unit.projectName_en || unit.project?.name_en,
  ].filter(Boolean);
  const locationLine = locationParts.join(', ') || 'Location on request';
  const refId = `REF-${unit.id.replace(/-/g, '').slice(0, 6).toUpperCase()}`;

  const glanceItems: { label: string; value: string }[] = [
    { label: 'Plot size ca.', value: `${unit.size} m²` },
    { label: 'Living area ca.', value: `${unit.size} m²` },
    { label: 'Bedrooms', value: String(unit.bedrooms) },
    { label: 'Bathrooms', value: String(unit.bathrooms) },
    { label: 'Status', value: unit.status === 'AVAILABLE' ? 'Available' : unit.status === 'SOLD' ? 'Sold' : 'Rented' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white pb-20 pt-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <Link
            to="/units"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: GREY }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Units
          </Link>

          <div className="mb-3 overflow-hidden rounded-lg shadow-sm ring-1 ring-stone-200/80">
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

          <header className="mb-3 flex flex-col gap-4 border-b border-stone-100 pb-8 md:flex-row md:items-start md:justify-between md:gap-8">
            <h1
              className="max-w-3xl font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.35rem]"
              style={{ color: MAROON }}
            >
              {unit.title_en}
            </h1>
            <p
              className="shrink-0 text-right font-serif text-3xl font-bold tabular-nums md:text-4xl"
              style={{ color: GOLD }}
            >
              {unit.price.toLocaleString()} EGP
            </p>
          </header>

          <p className="mb-14 flex flex-wrap items-center gap-1.5 text-sm md:text-[15px]" style={{ color: GREY }}>
            <MapPin className="h-4 w-4 shrink-0" style={{ color: MAROON }} aria-hidden />
            <span>
              {locationLine} — ref. {refId}
            </span>
          </p>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <section>
              <h2 className="mb-6 text-lg font-bold text-stone-900">At a glance</h2>
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
              <h2 className="mb-6 text-lg font-bold text-stone-900">Overview</h2>
              <div className="space-y-8 text-[15px] leading-[1.75]" style={{ color: GREY }}>
                {unit.description_en ? (
                  <p className="whitespace-pre-wrap">{unit.description_en}</p>
                ) : (
                  <p>
                    A distinguished residence presented by Grand Atlas. This property combines refined proportions with
                    quality finishes in a sought-after setting. Contact our team for full specifications, availability,
                    and private viewings.
                  </p>
                )}

                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                    style={{ backgroundColor: WA_GREEN }}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Contact via WhatsApp
                  </a>
                  <a
                    href="tel:+201000000000"
                    className="flex w-full items-center justify-center gap-2 rounded-md border-2 bg-white py-3.5 text-sm font-semibold transition hover:bg-stone-50"
                    style={{ borderColor: MAROON, color: MAROON }}
                  >
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    Call
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
