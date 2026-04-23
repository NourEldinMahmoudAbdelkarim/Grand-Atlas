import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Building2, Search, Smile, Target, ChevronRight } from 'lucide-react';

const BRAND = '#8B2323';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2400&q=80';

const MAP_IMAGE =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1600585154526-990dcec4db64?auto=format&fit=crop&w=1200&q=80';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-balance font-serif text-[1.6rem] font-semibold tracking-tight text-stone-900 md:text-[1.9rem]">
        {children}
      </h2>
      <span
        className="mx-auto mt-3 block h-[3px] w-10 rounded-full"
        style={{ backgroundColor: BRAND }}
        aria-hidden
      />
    </div>
  );
}

const masterpieceSlides: { img: string; title: string }[][] = [
  [
    {
      img: 'https://images.unsplash.com/photo-1600607687939-ce8e0026e4ce?auto=format&fit=crop&w=900&q=80',
      title: '01. Palm Hills Office No.5',
    },
    {
      img: 'https://images.unsplash.com/photo-1600210491892-03d3c47a3ee1?auto=format&fit=crop&w=900&q=80',
      title: '02. Hacienda Duplex No.4',
    },
    {
      img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
      title: '03. Marassi Waterfront Villa',
    },
  ],
  [
    {
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      title: '04. New Cairo Garden Residence',
    },
    {
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
      title: '05. Soma Bay Cliff Estate',
    },
    {
      img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80',
      title: '06. Sheikh Zayed Signature Home',
    },
  ],
];

const dummyLandmarkSlides: {
  title: string;
  developer: string;
  image: string;
  href: string;
}[][] = [
  [
    {
      title: 'Sawary Lake Villas',
      developer: 'Palm Hills Developments',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      href: '/projects',
    },
    {
      title: 'Hacienda West — Phase II',
      developer: 'Palm Hills Developments',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
      href: '/projects',
    },
    {
      title: 'Marassi Marina Homes',
      developer: 'Emaar Misr',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
      href: '/projects',
    },
  ],
  [
    {
      title: 'Badya Palm Hills',
      developer: 'Palm Hills Developments',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
      href: '/projects',
    },
    {
      title: 'Solana West Walk',
      developer: 'Mountain View',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8e0026e4ce?auto=format&fit=crop&w=900&q=80',
      href: '/projects',
    },
    {
      title: 'The Groove Ain Sokhna',
      developer: 'DM Development',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
      href: '/projects',
    },
  ],
];

function SocialHeroLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
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

function DummyLandmarkCard({
  title,
  developer,
  image,
  href,
}: {
  title: string;
  developer: string;
  image: string;
  href: string;
}) {
  return (
    <Link to={href} className="group block h-full">
      <article className="mx-auto flex h-full w-full max-w-[22rem] flex-col overflow-hidden rounded-md border border-stone-200 bg-white shadow-[0_3px_18px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_7px_24px_rgba(0,0,0,0.08)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <span
            className="absolute right-3 top-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: BRAND }}
          >
            New Launch
          </span>
        </div>
        <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
          <div className="flex items-center justify-between gap-4">
            <img src="/logo.png" alt="" className="h-6 w-auto max-w-[9rem] object-contain opacity-90" />
            <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-stone-500">{developer}</p>
          </div>
          <h3 className="mt-3 line-clamp-2 font-serif text-[17px] font-semibold leading-snug text-stone-900">{title}</h3>

          <div className="mt-auto pt-4">
            <span className="inline-flex w-full items-center justify-center rounded-md border border-[#8B2323] bg-white px-4 py-2 text-[13px] font-semibold text-[#8B2323] transition-colors group-hover:bg-[#fcf6f6]">
              View Details
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function HomePage() {
  const [masterpiecePage, setMasterpiecePage] = useState(0);
  const [landmarkSlide, setLandmarkSlide] = useState(0);

  const statItems = [
    { icon: Building2, value: '40', label: 'Projects Managed' },
    { icon: Search, value: '90M', label: 'Total Square Feet Built' },
    { icon: Smile, value: '500', label: 'Happy Clients' },
    { icon: Target, value: '97%', label: 'Client Satisfaction' },
  ] as const;

  const sectionY = 'py-16 md:py-20';

  return (
    <MainLayout>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover object-[center_35%] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/45 to-stone-950/85" />
        </div>

        <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 md:left-8 lg:flex">
          <SocialHeroLink label="Facebook" href="https://facebook.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </SocialHeroLink>
          <SocialHeroLink label="Twitter" href="https://twitter.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </SocialHeroLink>
          <SocialHeroLink label="Instagram" href="https://instagram.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </SocialHeroLink>
          <SocialHeroLink label="LinkedIn" href="https://linkedin.com">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </SocialHeroLink>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 text-center md:pb-28 md:pt-12">
          <h1 className="font-serif text-[2rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Redefining the Horizon of Modern Luxury Living
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-sm font-normal leading-relaxed text-white/90 md:text-[15px]">
            Grand Atlas curates exceptional residences where architecture, light, and landscape converge — creating
            private worlds defined by proportion, craft, and enduring value for discerning owners across the region and
            beyond.
          </p>
          <Button
            size="lg"
            className="mt-10 h-12 rounded-md border-0 bg-[#8B2323] px-12 text-[13px] font-semibold uppercase tracking-wide text-white shadow-none hover:bg-[#6f1b1b]"
            asChild
          >
            <Link to="/units">Explore</Link>
          </Button>
        </div>
      </section>

      <section className={`${sectionY} bg-white`}>
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <SectionTitle>Benchmarks of Success</SectionTitle>
          <div className="mt-14 grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4">
            {statItems.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-3 border border-stone-200 bg-white px-4 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <Icon className="h-8 w-8 stroke-[1.5]" style={{ color: BRAND }} />
                <span className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">{value}</span>
                <span className="max-w-[12rem] text-[13px] font-medium leading-snug text-stone-600 md:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionY} border-t border-stone-100 bg-white`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>About Grand Atlas</SectionTitle>
          <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="mx-auto w-full max-w-[42rem] overflow-hidden rounded-3xl border-[3px] border-[#8B2323] bg-white lg:mx-0">
              <img
                src={ABOUT_IMAGE}
                alt="Grand Atlas architecture"
                className="block h-[min(25rem,70vw)] w-full object-cover object-center lg:h-[26rem]"
              />
            </div>
            <div className="pt-1">
              <div className="space-y-5 font-sans text-[15px] leading-[1.75] text-stone-600">
                <p>
                  We begin with a simple, uncompromising vision: to bridge the gap between world-class architecture and
                  the individuals who shape our culture. What sets us apart is not scale alone, but the integration of
                  harmonious environments, generous open space, and meticulous detail — executed with quiet confidence.
                </p>
                <p>
                  Our portfolio represents more than iconic silhouettes on the skyline; each address is conceived as a
                  complete living experience — secure, discreet, and serviced to the highest standard. From coastal
                  compounds to urban penthouses, Grand Atlas is your partner in acquiring the exceptional.
                </p>
              </div>
              <Button
                className="mt-10 h-10 w-48 justify-center gap-2 rounded-md border-0 bg-[#8B2323] px-6 text-[13px] font-semibold tracking-wide text-white shadow-none hover:bg-[#6f1b1b]"
                asChild
              >
                <Link to="/units">
                  Know More
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-white`}>
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <SectionTitle>Hand-Selected Masterpieces</SectionTitle>

          <div className="mt-12">
            {(() => {
              const items = masterpieceSlides.flat();
              const perPage = 3;
              const pages = Math.max(1, Math.ceil(items.length / perPage));
              const clampedPage = Math.min(masterpiecePage, pages - 1);

              return (
                <>
                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 ease-out"
                      style={{ transform: `translateX(-${clampedPage * 100}%)` }}
                    >
                      {Array.from({ length: pages }).map((_, pageIndex) => {
                        const start = pageIndex * perPage;
                        const pageItems = items.slice(start, start + perPage);
                        return (
                          <div key={pageIndex} className="min-w-full shrink-0">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                              {pageItems.map((item) => (
                                <Link to="/units" key={item.title} className="group block">
                                  <div className="aspect-[16/10] overflow-hidden border border-stone-100 bg-stone-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                                    <img
                                      src={item.img}
                                      alt=""
                                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                  </div>
                                  <h3 className="mt-5 font-serif text-lg font-semibold tracking-tight text-stone-900">
                                    {item.title}
                                  </h3>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-9 flex justify-center gap-2">
                    {Array.from({ length: pages }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Masterpieces page ${i + 1}`}
                        onClick={() => setMasterpiecePage(i)}
                        className={`h-2 rounded-full transition-all ${
                          clampedPage === i ? 'w-8' : 'w-2 bg-stone-300 hover:bg-stone-400'
                        }`}
                        style={clampedPage === i ? { backgroundColor: BRAND } : undefined}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-white`}>
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <SectionTitle>Strategic Locations</SectionTitle>
          <div className="mt-14 h-[min(26rem,55vh)] w-full overflow-hidden rounded-sm border border-stone-200/90 bg-stone-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:h-[28rem]">
            <img
              src={MAP_IMAGE}
              alt="Strategic locations and regional presence"
              className="h-full w-full object-cover object-[center_40%] opacity-95 [filter:contrast(0.95)_saturate(0.75)]"
            />
          </div>
        </div>
      </section>

      <section className={`${sectionY} bg-white`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>Future Landmarks</SectionTitle>

          <div className="mt-12 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${landmarkSlide * 100}%)` }}
            >
              {dummyLandmarkSlides.map((slide, si) => (
                <div key={si} className="min-w-full shrink-0">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
                    {slide.map((card) => (
                      <DummyLandmarkCard
                        key={card.title}
                        title={card.title}
                        developer={card.developer}
                        image={card.image}
                        href={card.href}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {dummyLandmarkSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Landmarks slide ${i + 1}`}
                onClick={() => setLandmarkSlide(i)}
                className={`h-2 rounded-full transition-all ${landmarkSlide === i ? 'w-8' : 'w-2 bg-stone-300 hover:bg-stone-400'}`}
                style={landmarkSlide === i ? { backgroundColor: BRAND } : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
