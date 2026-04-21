import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import type { Developer } from '../types';

interface DeveloperCardProps {
  developer: Developer;
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  const imageUrl = developer.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

  return (
    <Link to={`/developers/${developer.id}`} className="group block h-full">
      <Card className="h-full flex flex-col items-center text-center p-8 hover:border-stone-300 hover:shadow-md transition-all">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border border-stone-100 p-2 bg-white shadow-sm group-hover:shadow-md transition-all">
          <img
             src={imageUrl}
             alt={developer.name_en}
             className="w-full h-full object-contain rounded-full"
          />
        </div>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-lg">{developer.name_en}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-sm text-stone-500 line-clamp-3">
          {developer.description_en}
        </CardContent>
      </Card>
    </Link>
  );
}
