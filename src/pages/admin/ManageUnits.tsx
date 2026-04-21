import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unitService } from '../../services/unitService';
import { projectService } from '../../services/projectService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Unit, UnitStatus } from '../../types';

export function ManageUnits() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const queryClient = useQueryClient();

  const { data: units, isLoading: unitsLoading } = useQuery({
    queryKey: ['units'],
    queryFn: () => unitService.getAll(),
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: unitService.delete,
    onSuccess: () => {
      toast.success('Unit deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: () => toast.error('Failed to delete unit'),
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      deleteMutation.mutate(id);
    }
  };

  const openModal = (unit?: Unit) => {
    setEditingUnit(unit || null);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: UnitStatus) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800';
      case 'SOLD': return 'bg-red-100 text-red-800';
      case 'RENTED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Manage Units</h1>
          <p className="text-stone-500 text-sm">Add, edit or remove individual properties</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Unit
        </Button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-medium">Unit</th>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {unitsLoading ? (
                 <tr><td colSpan={5} className="px-6 py-8 text-center text-stone-500">Loading units...</td></tr>
              ) : units?.map((unit) => (
                <tr key={unit.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-md bg-stone-200 overflow-hidden shrink-0">
                         {unit.images?.[0] ? (
                            <img src={unit.images[0]} className="w-full h-full object-cover" alt="" />
                         ) : (
                            <ImageIcon className="w-5 h-5 text-stone-400 m-auto mt-2.5" />
                         )}
                      </div>
                      <div className="font-medium text-stone-900">{unit.title_en}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{unit.project?.name_en || '-'}</td>
                  <td className="px-6 py-4 text-stone-600">${unit.price?.toLocaleString() || '-'}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
                        {unit.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openModal(unit)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(unit.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {units?.length === 0 && (
                 <tr><td colSpan={5} className="px-6 py-8 text-center text-stone-500">No units found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <UnitModal 
          unit={editingUnit} 
          projects={projects || []}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

function UnitModal({ unit, projects, onClose }: { unit: Unit | null, projects: any[], onClose: () => void }) {
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
      if (unit) {
        await unitService.update(unit.id, formData);
        toast.success('Unit updated');
      } else {
        await unitService.create(formData);
        toast.success('Unit created');
      }
      queryClient.invalidateQueries({ queryKey: ['units'] });
      onClose();
    } catch (error) {
      toast.error(unit ? 'Failed to update' : 'Failed to create');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold">{unit ? 'Edit Unit' : 'Add Unit'}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5"/></Button>
        </div>
        
        <div className="p-6 overflow-y-auto">
           <form id="unit-form" onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               <Input name="title_en" label="Title (EN)" defaultValue={unit?.title_en} required />
               <Input name="title_ar" label="Title (AR)" defaultValue={unit?.title_ar} required />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="block text-sm font-medium text-stone-700">Project</label>
                   <select name="projectId" defaultValue={unit?.projectId} className="flex h-10 w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent" required>
                      <option value="">Select Project</option>
                      {projects.map(p => <option key={p.id} value={p.id}>{p.name_en}</option>)}
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="block text-sm font-medium text-stone-700">Status</label>
                   <select name="status" defaultValue={unit?.status || 'AVAILABLE'} className="flex h-10 w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent" required>
                      <option value="AVAILABLE">Available</option>
                      <option value="SOLD">Sold</option>
                      <option value="RENTED">Rented</option>
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <Input name="price" label="Price" type="number" defaultValue={unit?.price} required />
               <Input name="size" label="Size (sqm)" type="number" defaultValue={unit?.size} required />
               <Input name="bedrooms" label="Bedrooms" type="number" defaultValue={unit?.bedrooms} required />
               <Input name="bathrooms" label="Bathrooms" type="number" defaultValue={unit?.bathrooms} required />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <Input name="city_en" label="City (EN)" defaultValue={unit?.city_en} required />
               <Input name="city_ar" label="City (AR)" defaultValue={unit?.city_ar} required />
             </div>

             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (EN)</label>
                 <textarea name="description_en" defaultValue={unit?.description_en} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[80px] resize-y" required />
             </div>

             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Description (AR)</label>
                 <textarea name="description_ar" defaultValue={unit?.description_ar} className="flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[80px] resize-y" required />
             </div>

             <div className="space-y-1">
                 <label className="block text-sm font-medium text-stone-700">Images</label>
                 <input type="file" name="images" multiple accept="image/*" className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-stone-50 file:text-stone-700" />
             </div>
           </form>
        </div>

        <div className="px-6 py-4 border-t border-stone-200 flex justify-end space-x-3 shrink-0">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit" form="unit-form" isLoading={isSubmitting}>
             {unit ? 'Save Changes' : 'Create Unit'}
          </Button>
        </div>
      </div>
    </div>
  );
}
