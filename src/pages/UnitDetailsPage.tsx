import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { unitService } from '../services/unitService';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, MessageCircle, Bed, Bath, Square, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="pt-24 pb-16 max-w-[90rem] mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="w-full bg-stone-200 h-[60vh] rounded-2xl" />
            <div className="flex gap-3">
              {[1, 2, 3].map(i => <div key={i} className="w-32 h-20 bg-stone-200 rounded-xl" />)}
            </div>
            <div className="h-8 w-1/2 bg-stone-200 rounded" />
            <div className="grid grid-cols-3 gap-6">
              <div className="h-96 bg-stone-200 rounded-2xl" />
              <div className="col-span-2 h-96 bg-stone-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!unit) {
    return (
      <MainLayout>
        <div className="pt-40 pb-20 text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Unit not found.</h2>
          <Button asChild><Link to="/units">Back to Units</Link></Button>
        </div>
      </MainLayout>
    );
  }

  // images is string[] from API
  const heroImage = activeImage || unit.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';
  const location = unit.zoneName_en || unit.project?.zone?.name_en || unit.city_en;
  const developerName = unit.developerName_en || unit.project?.developer?.name_en;

  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link */}
          <Link to="/units" className="inline-flex items-center gap-2 text-stone-500 hover:text-[#8C1C1D] text-sm font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Units
          </Link>

          {/* Hero Image */}
          <div className="mb-4 w-full h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden shadow-lg">
            <img src={heroImage} alt={unit.title_en} className="w-full h-full object-cover" />
          </div>

          {/* Gallery Thumbnails */}
          {unit.images && unit.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
              {unit.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`shrink-0 w-28 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    heroImage === imgUrl
                      ? 'border-[#8C1C1D] shadow-md scale-105'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Price */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 font-serif mb-3">{unit.title_en}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                {location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#8C1C1D]" /> {location}
                  </span>
                )}
                {(unit.projectName_en || unit.project?.name_en) && (
                  <span className="text-stone-400">· {unit.projectName_en || unit.project?.name_en}</span>
                )}
                {developerName && (
                  <span className="text-stone-400">· By {developerName}</span>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-4xl font-bold text-[#8C1C1D]">EGP {unit.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Details + Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Key Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm sticky top-28">
                <h3 className="text-xl font-bold text-stone-900 font-serif mb-6 pb-4 border-b border-stone-100">
                  Property Details
                </h3>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-stone-100">
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl">
                    <Bed className="w-5 h-5 text-[#8C1C1D]" />
                    <span className="text-lg font-bold text-stone-900">{unit.bedrooms}</span>
                    <span className="text-xs text-stone-400">Beds</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl">
                    <Bath className="w-5 h-5 text-[#8C1C1D]" />
                    <span className="text-lg font-bold text-stone-900">{unit.bathrooms}</span>
                    <span className="text-xs text-stone-400">Baths</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-stone-50 rounded-xl">
                    <Square className="w-5 h-5 text-[#8C1C1D]" />
                    <span className="text-lg font-bold text-stone-900">{unit.size}</span>
                    <span className="text-xs text-stone-400">m²</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm mb-8">
                  {[
                    ['Plot Size',  `${unit.size} sqm`],
                    ['Living Area', `${unit.size} sqm`],
                    ['Bedrooms',  unit.bedrooms],
                    ['Bathrooms', unit.bathrooms],
                    ['Status',    unit.status],
                    ...(location ? [['Location', location]] : []),
                  ].map(([label, value]) => (
                    <li key={label as string} className="flex justify-between py-2 border-b border-stone-50 last:border-0">
                      <span className="text-stone-500">{label}</span>
                      <span className="font-semibold text-stone-900">{value}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-base transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contact via WhatsApp
                  </a>
                  <a
                    href="tel:+201000000000"
                    className="w-full flex items-center justify-center gap-3 border-2 border-stone-300 hover:border-[#8C1C1D] text-stone-700 hover:text-[#8C1C1D] py-4 rounded-xl font-bold text-base transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
                <h3 className="text-2xl font-bold text-stone-900 font-serif mb-2 relative inline-block">
                  Property Overview
                  <div className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#8C1C1D]" />
                </h3>
                <div className="mt-6 text-stone-600 leading-relaxed text-base whitespace-pre-wrap">
                  {unit.description_en}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
