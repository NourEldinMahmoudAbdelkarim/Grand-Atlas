import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactService } from '../services/contactService';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const mutation = useMutation({
    mutationFn: contactService.send,
    onSuccess: () => {
      toast.success('Message sent successfully!');
      reset();
    },
    onError: () => {
      toast.error('Failed to send message. Please try again.');
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <MainLayout>
      <div className="bg-stone-50 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Contact Us</h1>
          <p className="text-stone-500 text-lg">
            Have questions about a property or want to discuss investment opportunities? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="border-stone-200">
          <CardHeader className="text-center p-8 pb-4">
             <CardTitle className="text-2xl">Send us a message</CardTitle>
             <CardDescription>Fill out the form below and our team will get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                   label="Full Name"
                   placeholder="John Doe"
                   {...register('name')}
                   error={errors.name?.message}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      {...register('email')}
                      error={errors.email?.message}
                   />
                   <Input
                      label="Phone Number (Optional)"
                      placeholder="+1 (555) 000-0000"
                      {...register('phone')}
                      error={errors.phone?.message}
                   />
                </div>
                
                <div className="space-y-1">
                   <label className="block text-sm font-medium text-stone-700">Message</label>
                   <textarea
                     className={`flex w-full rounded-md border border-stone-300 bg-transparent px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent min-h-[150px] resize-y ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                     placeholder="Tell us how we can help you..."
                     {...register('message')}
                   />
                   {errors.message && (
                     <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                   )}
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={mutation.isPending}>
                   Send Message
                </Button>
             </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
