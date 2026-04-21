import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../../services/projectService';
import { developerService } from '../../services/developerService';
import { unitService } from '../../services/unitService';
import { Building2, HardHat, Home, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const { data: developers } = useQuery({
    queryKey: ['developers'],
    queryFn: developerService.getAll,
  });

  const { data: units } = useQuery({
    queryKey: ['units'],
    queryFn: () => unitService.getAll(),
  });

  const stats = [
    {
      name: 'Total Projects',
      value: projects?.length || 0,
      icon: Building2,
      description: 'Active developments',
    },
    {
      name: 'Partner Developers',
      value: developers?.length || 0,
      icon: HardHat,
      description: 'Registered partners',
    },
    {
      name: 'Total Units',
      value: units?.length || 0,
      icon: Home,
      description: 'Properties listed',
    },
    {
       name: 'Available Units',
       value: units?.filter(u => u.status === 'AVAILABLE').length || 0,
       icon: TrendingUp,
       description: 'Ready for sale',
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-stone-500 mt-2">Welcome to the Grand Atlas admin portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="border-stone-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-stone-500">
                  {stat.name}
                </CardTitle>
                <Icon className="w-5 h-5 text-stone-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-stone-900">{stat.value}</div>
                <p className="text-xs text-stone-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="border-stone-200">
            <CardHeader>
               <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {projects?.slice(0, 5).map(project => (
                     <div key={project.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-100">
                        <div className="flex items-center space-x-4">
                           <div className="w-12 h-12 bg-stone-200 rounded-md overflow-hidden shrink-0">
                              <img src={project.images?.[0] || ''} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="font-medium text-stone-900">{project.name_en}</p>
                              <p className="text-sm text-stone-500">{project.zone?.name_en || 'Unknown Zone'}</p>
                           </div>
                        </div>
                     </div>
                  ))}
                  {(!projects || projects.length === 0) && (
                     <p className="text-stone-500 text-sm text-center py-4">No projects found.</p>
                  )}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
