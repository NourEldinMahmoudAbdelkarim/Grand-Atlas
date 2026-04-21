import type { Unit } from '../types';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

interface UnitCardProps {
  unit: Unit;
}

export function UnitCard({ unit }: UnitCardProps) {
  const imageUrl = unit.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';
  const location = unit.zoneName_en || unit.project?.zone?.name_en || unit.city_en;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={unit.title_en}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {unit.status === 'AVAILABLE' && (
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">For Sale</span>
          )}
          {unit.status === 'SOLD' && (
            <span className="px-3 py-1 bg-[#8C1C1D] text-white text-xs font-bold rounded-full">Sold</span>
          )}
          {unit.status === 'RENTED' && (
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">For Rent</span>
          )}
        </div>
        {/* Price Tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-bold text-lg">EGP {unit.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {location && (
          <div className="flex items-center text-stone-400 text-xs mb-2">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            {location}
            {(unit.projectName_en || unit.project?.name_en) &&
              <span className="ml-1 text-stone-400">· {unit.projectName_en || unit.project?.name_en}</span>
            }
          </div>
        )}

        <h3 className="font-bold text-base text-stone-900 mb-3 font-serif line-clamp-2 flex-1">{unit.title_en}</h3>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 border-t border-b border-stone-100 py-3 mb-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-[#8C1C1D]" />
            <span className="text-xs font-semibold text-stone-700">{unit.bedrooms} Bed</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-stone-100">
            <Bath className="w-4 h-4 text-[#8C1C1D]" />
            <span className="text-xs font-semibold text-stone-700">{unit.bathrooms} Bath</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Square className="w-4 h-4 text-[#8C1C1D]" />
            <span className="text-xs font-semibold text-stone-700">{unit.size} m²</span>
          </div>
        </div>

        <Button className="w-full bg-[#8C1C1D] hover:bg-[#731718] text-white rounded-xl" asChild>
          <Link to={`/units/${unit.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
