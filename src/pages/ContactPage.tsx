import { MainLayout } from '../components/layout/MainLayout';
import { Input } from '../components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactService } from '../services/contactService';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { MapPin, Mail, Phone } from 'lucide-react';

const MAROON = '#A63A3A';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function SocialOutline({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white transition-colors hover:bg-stone-50"
      style={{ borderColor: MAROON, color: MAROON }}
    >
      {children}
    </a>
  );
}

const inputFieldClass =
  'h-11 rounded-md border-stone-200 bg-[#F8F8F8] focus:ring-1 focus:ring-stone-300 focus:border-stone-300';

export function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: contactService.send,
    onSuccess: () => {
      toast.success('Message sent successfully!');
      reset();
    },
    onError: () => {
      toast.error('Failed to send message. Please try again.');
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  const hours = [
    { day: 'Saturday', time: '9:00AM - 5:00PM' },
    { day: 'Sunday', time: '9:00AM - 5:00PM' },
    { day: 'Monday', time: '9:00AM - 5:00PM' },
    { day: 'Tuesday', time: '9:00AM - 5:00PM' },
    { day: 'Wednesday', time: '9:00AM - 5:00PM' },
  ];

  return (
    <MainLayout>
      <section className="relative flex min-h-[min(48vh,28rem)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full scale-105 object-cover blur-[2px] brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/65 via-stone-900/55 to-stone-950/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Connected Globally. Available Locally.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/90 md:text-[15px]">
            Our advisory teams bridge international standards with local insight — so every conversation is informed,
            discreet, and tailored to how you prefer to move through the market.
          </p>
        </div>
      </section>

      <div className="bg-[#F8F8F8] py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-900 md:text-[1.65rem]">
                Contact Information
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: '#707070' }}>
                For private consultations, portfolio access, and off-market opportunities, reach us through the channels
                below. We respond with the same discretion we bring to every mandate.
              </p>

              <ul className="mt-10 space-y-6">
                <li className="flex gap-3 text-[15px] leading-snug" style={{ color: '#505050' }}>
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
                  <span>Minusio, Lake Maggiore, Switzerland — ref. LOC1771</span>
                </li>
                <li className="flex gap-3 text-[15px] leading-snug" style={{ color: '#505050' }}>
                  <Mail className="mt-0.5 h-5 w-5 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
                  <a href="mailto:Grand.Atlas.Support@gmail.com" className="underline-offset-2 hover:underline">
                    Grand.Atlas.Support@gmail.com
                  </a>
                </li>
                <li className="flex flex-col gap-2">
                  <div className="flex gap-3 text-[15px] leading-snug" style={{ color: '#505050' }}>
                    <Phone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
                    <a href="tel:01247859622" className="underline-offset-2 hover:underline">
                      01247859622
                    </a>
                  </div>
                  <div className="flex gap-3 pl-8 text-[15px] leading-snug" style={{ color: '#505050' }}>
                    <Phone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: MAROON }} strokeWidth={1.75} />
                    <a href="tel:035987124" className="underline-offset-2 hover:underline">
                      035987124
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <p className="text-sm font-semibold text-stone-800">Follow us on social media</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <SocialOutline label="Facebook" href="https://facebook.com">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </SocialOutline>
                  <SocialOutline label="X" href="https://x.com">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </SocialOutline>
                  <SocialOutline label="Instagram" href="https://instagram.com">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </SocialOutline>
                  <SocialOutline label="TikTok" href="https://tiktok.com">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </SocialOutline>
                </div>
              </div>

              <div className="mt-12 border-t border-stone-200 pt-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800">Working hours</h3>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {hours.map(({ day, time }) => (
                    <li key={day} className="flex justify-between gap-6 border-b border-stone-100 py-2 last:border-0">
                      <span className="font-semibold" style={{ color: MAROON }}>
                        {day}
                      </span>
                      <span style={{ color: '#707070' }}>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-8 md:p-10">
                <h2 className="font-serif text-2xl font-bold text-stone-900 md:text-[1.65rem]">Send us a message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    className={inputFieldClass}
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputFieldClass}
                    {...register('email')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Phone"
                    placeholder="01234567890"
                    className={inputFieldClass}
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">Message</label>
                    <textarea
                      className={`flex min-h-[160px] w-full resize-y rounded-md border border-stone-200 bg-[#F8F8F8] px-3 py-3 text-sm placeholder:text-stone-400 focus:border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-300 ${
                        errors.message ? 'border-red-500 ring-red-500' : ''
                      }`}
                      placeholder="How can we help you?"
                      {...register('message')}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="h-12 w-full rounded-md bg-[#A63A3A] text-sm font-semibold tracking-wide text-white transition hover:bg-[#8f3030] disabled:opacity-60"
                  >
                    {mutation.isPending ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
