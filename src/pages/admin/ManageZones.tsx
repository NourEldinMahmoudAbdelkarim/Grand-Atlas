import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zoneService } from '../../services/zoneService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Zone } from '../../types';

export function ManageZones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const queryClient = useQueryClient();

  const { data: zones, isLoading } = useQuery({
    queryKey: ['zones'],
    queryFn: zoneService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: zoneService.delete,
    onSuccess: () => {
      toast.success('Zone deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
    onError: () => toast.error('Failed to delete zone'),
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      deleteMutation.mutate(id);
    }
  };

  const openModal = (zone?: Zone) => {
    setEditingZone(zone || null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Manage Zones</h1>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Zone
        </Button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-medium">Zone Name</th>
                <th className="px-6 py-4 font-medium">City</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {isLoading ? (
                 <tr><td colSpan={3} className="px-6 py-8 text-center text-stone-500">Loading zones...</td></tr>
              ) : zones?.map((zone) => (
                <tr key={zone.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-md bg-stone-200 overflow-hidden shrink-0">
                         {zone.images?.[0] ? (
                            <img src={zone.images[0]} className="w-full h-full object-cover" alt="" />
                         ) : (
                            <ImageIcon className="w-5 h-5 text-stone-400 m-auto mt-2.5" />
                         )}
                      </div>
                      <div className="font-medium text-stone-900">{zone.name_en}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{zone.city_en}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openModal(zone)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(zone.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {zones?.length === 0 && (
                 <tr><td colSpan={3} className="px-6 py-8 text-center text-stone-500">No zones found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ZoneModal zone={editingZone} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

function ZoneModal({ zone, onClose }: { zone: Zone | null, onClose: () => void }) {
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
      if (zone) {
        await zoneService.update(zone.id, formData);
        toast.success('Zone updated');
      } else {
        await zoneService.create(formData);
        toast.success('Zone created');
      }
      queryClient.invalidateQueries({ queryKey: ['zones'] });
      onClose();
    } catch (error) {
      toast.error(zone ? 'Failed to update' : 'Failed to create');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold">{zone ? 'Edit Zone' : 'Add Zone'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5"/></Button>
        </div>
        
        <form onSubmit={handleSubmit}>
           <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
             <div className="grid grid-cols-2 gap-4">
                <Input name="name_en" label="Name (EN)" defaultValue={zone?.name_en} required />
                <Input name="name_ar" label="Name (AR)" defaultValue={zone?.name_ar} required />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <Input name="city_en" label="City (EN)" defaultValue={zone?.city_en} required />
                <Input name="city_ar" label="City (AR)" defaultValue={zone?.city_ar} required />
             </div>
             
             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (EN)</label>
                 <textarea name="description_en" defaultValue={zone?.description_en} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[80px] resize-y" required />
             </div>
             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (AR)</label>
                 <textarea name="description_ar" defaultValue={zone?.description_ar} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[80px] resize-y" required />
             </div>
             
             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Images</label>
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
