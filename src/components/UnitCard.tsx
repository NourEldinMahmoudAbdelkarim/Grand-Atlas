import type { Unit } from '../types';
import { Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

const MAROON = '#632323';
const BODY = '#707070';
const GREEN = '#28a745';

interface UnitCardProps {
  unit: Unit;
}

function statusLabel(status: Unit['status']) {
  switch (status) {
    case 'AVAILABLE':
      return 'Available';
    case 'SOLD':
      return 'Sold';
    case 'RENTED':
      return 'Rented';
    default:
      return status;
  }
}

function statusStyle(status: Unit['status']) {
  switch (status) {
    case 'AVAILABLE':
      return { backgroundColor: GREEN, color: '#fff' };
    case 'SOLD':
      return { backgroundColor: MAROON, color: '#fff' };
    case 'RENTED':
      return { backgroundColor: '#2563eb', color: '#fff' };
    default:
      return { backgroundColor: '#64748b', color: '#fff' };
  }
}

export function UnitCard({ unit }: UnitCardProps) {
  const imageUrl =
    unit.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';
  const desc = unit.description_en?.trim() || '';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={unit.title_en}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
        <span
          className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
          style={statusStyle(unit.status)}
        >
          {statusLabel(unit.status)}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-stone-100 px-4 py-3 text-[13px] text-stone-700">
        <span className="inline-flex items-center gap-1.5">
          <Bed className="h-4 w-4 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
          {unit.bedrooms} Bedroom{unit.bedrooms !== 1 ? 's' : ''}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Bath className="h-4 w-4 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
          {unit.bathrooms} Bathroom{unit.bathrooms !== 1 ? 's' : ''}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Square className="h-4 w-4 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
          {unit.size}m
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2 gap-y-1">
          <h3
            className="min-w-0 max-w-[65%] font-serif text-lg font-semibold leading-snug tracking-tight line-clamp-2"
            style={{ color: MAROON }}
          >
            {unit.title_en}
          </h3>
          <p className="shrink-0 text-right text-base font-bold text-stone-900 tabular-nums">
            EGP {unit.price.toLocaleString()}
          </p>
        </div>

        {desc ? (
          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>
            {desc}
          </p>
        ) : (
          <p className="mb-4 flex-1 text-sm italic leading-relaxed" style={{ color: BODY }}>
            Premium residence in a curated collection of exceptional addresses.
          </p>
        )}

        <div className="mt-auto flex justify-center pt-1">
          <Link
            to={`/units/${unit.id}`}
            className="text-sm font-semibold underline decoration-1 underline-offset-4 transition-opacity hover:opacity-80"
            style={{ color: MAROON }}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
