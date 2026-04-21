import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../../services/projectService';
import { developerService } from '../../services/developerService';
import { zoneService } from '../../services/zoneService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Project } from '../../types';

export function ManageProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const { data: developers } = useQuery({
    queryKey: ['developers'],
    queryFn: developerService.getAll,
  });

  const { data: zones } = useQuery({
    queryKey: ['zones'],
    queryFn: zoneService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      toast.success('Project deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => toast.error('Failed to delete project'),
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  const openModal = (project?: Project) => {
    setEditingProject(project || null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Manage Projects</h1>
          <p className="text-stone-500 text-sm">Add, edit or remove properties</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Developer</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {isLoading ? (
                <tr>
                   <td colSpan={4} className="px-6 py-8 text-center text-stone-500">Loading projects...</td>
                </tr>
              ) : projects?.map((project) => (
                <tr key={project.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-md bg-stone-200 overflow-hidden shrink-0">
                         {project.images?.[0] ? (
                            <img src={project.images[0]} className="w-full h-full object-cover" alt="" />
                         ) : (
                            <ImageIcon className="w-5 h-5 text-stone-400 m-auto mt-2.5" />
                         )}
                      </div>
                      <div className="font-medium text-stone-900">{project.name_en}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{project.zone?.name_en || '-'}</td>
                  <td className="px-6 py-4 text-stone-600">{project.developer?.name_en || '-'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openModal(project)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {projects?.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-stone-500">No projects found. Add one to get started.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProjectModal 
          project={editingProject} 
          developers={developers || []}
          zones={zones || []}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

function ProjectModal({ project, developers, zones, onClose }: { project: Project | null, developers: any[], zones: any[], onClose: () => void }) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    // Clean up empty file inputs
    const images = formData.getAll('images') as File[];
    if (images.length === 1 && images[0].size === 0) {
      formData.delete('images');
    }

    try {
      if (project) {
        await projectService.update(project.id, formData);
        toast.success('Project updated');
      } else {
        await projectService.create(formData);
        toast.success('Project created');
      }
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      onClose();
    } catch (error) {
      toast.error(project ? 'Failed to update' : 'Failed to create');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold">{project ? 'Edit Project' : 'Add Project'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5"/></Button>
        </div>
        
        <div className="p-6 overflow-y-auto">
           <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               <Input name="name_en" label="Name (EN)" defaultValue={project?.name_en} required />
               <Input name="name_ar" label="Name (AR)" defaultValue={project?.name_ar} required />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="block text-sm font-medium text-stone-700">Developer</label>
                   <select name="developerId" defaultValue={project?.developerId} className="flex h-10 w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent" required>
                      <option value="">Select Developer</option>
                      {developers.map(d => <option key={d.id} value={d.id}>{d.name_en}</option>)}
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="block text-sm font-medium text-stone-700">Zone</label>
                   <select name="zoneId" defaultValue={project?.zoneId} className="flex h-10 w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent" required>
                      <option value="">Select Zone</option>
                      {zones.map(z => <option key={z.id} value={z.id}>{z.name_en}</option>)}
                   </select>
                </div>
             </div>

             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (EN)</label>
                 <textarea name="description_en" defaultValue={project?.description_en} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[100px] resize-y" required />
             </div>

             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (AR)</label>
                 <textarea name="description_ar" defaultValue={project?.description_ar} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[100px] resize-y" required />
             </div>

             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Images</label>
                 <input type="file" name="images" multiple accept="image/*" className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-stone-50 file:text-stone-700 hover:file:bg-stone-100" />
                 {project?.images && project.images.length > 0 && (
                    <div className="mt-2 text-sm text-stone-500">Current active images: {project.images.length}</div>
                 )}
             </div>
           </form>
        </div>

        <div className="px-6 py-4 border-t border-stone-200 flex justify-end space-x-3 shrink-0">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit" form="project-form" isLoading={isSubmitting}>
             {project ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </div>
    </div>
  );
}
