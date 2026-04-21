import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { developerService } from '../../services/developerService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Developer } from '../../types';

export function ManageDevelopers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
  const queryClient = useQueryClient();

  const { data: developers, isLoading } = useQuery({
    queryKey: ['developers'],
    queryFn: developerService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: developerService.delete,
    onSuccess: () => {
      toast.success('Developer deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['developers'] });
    },
    onError: () => toast.error('Failed to delete developer'),
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this developer?')) {
      deleteMutation.mutate(id);
    }
  };

  const openModal = (developer?: Developer) => {
    setEditingDeveloper(developer || null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Manage Developers</h1>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Developer
        </Button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-medium">Developer</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {isLoading ? (
                 <tr><td colSpan={2} className="px-6 py-8 text-center text-stone-500">Loading developers...</td></tr>
              ) : developers?.map((developer) => (
                <tr key={developer.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-stone-200 p-1 border border-stone-100 overflow-hidden shrink-0 flex items-center justify-center">
                         {developer.images?.[0] ? (
                            <img src={developer.images[0]} className="w-full h-full object-contain rounded-full bg-white" alt="" />
                         ) : (
                            <ImageIcon className="w-5 h-5 text-stone-400" />
                         )}
                      </div>
                      <div className="font-medium text-stone-900">{developer.name_en}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openModal(developer)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(developer.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {developers?.length === 0 && (
                 <tr><td colSpan={2} className="px-6 py-8 text-center text-stone-500">No developers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <DeveloperModal developer={editingDeveloper} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

function DeveloperModal({ developer, onClose }: { developer: Developer | null, onClose: () => void }) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const images = formData.getAll('images') as File[];
    if (images.length === 1 && images[0].size === 0) {
      formData.delete('images');
    }

    try {
      if (developer) {
        await developerService.update(developer.id, formData);
        toast.success('Developer updated');
      } else {
        await developerService.create(formData);
        toast.success('Developer created');
      }
      queryClient.invalidateQueries({ queryKey: ['developers'] });
      onClose();
    } catch (error) {
      toast.error(developer ? 'Failed to update' : 'Failed to create');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold">{developer ? 'Edit Developer' : 'Add Developer'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5"/></Button>
        </div>
        
        <form onSubmit={handleSubmit}>
           <div className="p-6 space-y-4">
             <Input name="name_en" label="Name (EN)" defaultValue={developer?.name_en} required />
             <Input name="name_ar" label="Name (AR)" defaultValue={developer?.name_ar} required />
             
             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (EN)</label>
                 <textarea name="description_en" defaultValue={developer?.description_en} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[80px] resize-y" required />
             </div>
             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (AR)</label>
                 <textarea name="description_ar" defaultValue={developer?.description_ar} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[80px] resize-y" required />
             </div>
             
             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Logo/Images</label>
                 <input type="file" name="images" multiple accept="image/*" className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-stone-50 file:text-stone-700" />
             </div>
           </div>

           <div className="px-6 py-4 border-t border-stone-200 flex justify-end space-x-3 shrink-0">
            <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
