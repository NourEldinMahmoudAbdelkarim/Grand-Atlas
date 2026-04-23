import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { MainLayout } from '../components/layout/MainLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import type { RegisterRequest } from '../types';

const MAROON = '#8B2323';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80';

const registerSchema = z
  .object({
    name_en: z.string().min(2, 'English name is required'),
    name_ar: z.string().min(2, 'Arabic name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Enter a valid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const inputFieldClass =
  'h-11 rounded-md border-stone-200 bg-[#F8F8F8] focus:ring-1 focus:ring-stone-300 focus:border-stone-300';

export function RegisterPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => authService.register(payload),
    onSuccess: () => {
      toast.success('Account created. Please sign in.');
      navigate('/login');
    },
    onError: () => {
      toast.error('Registration failed. Please check your details and try again.');
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = ({ confirmPassword: _c, ...data }: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <MainLayout>
      <section className="relative flex min-h-[min(42vh,24rem)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full scale-105 object-cover blur-[2px] brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/55 to-stone-950/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.35rem]">
            Join Grand Atlas
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/88 md:text-[15px]">
            Register for private listings, tailored recommendations, and discreet access to our global network.
          </p>
        </div>
      </section>

      <div className="bg-[#F8F8F8] py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-8 md:p-10">
              <div className="mb-8 text-center">
                <img src="/logo.png" alt="Grand Atlas" className="mx-auto h-14 object-contain md:h-16" />
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: '#707070' }}>
                  Complete the form below. Our team may follow up to verify your profile.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Name (English)"
                    placeholder="Full name"
                    className={inputFieldClass}
                    {...register('name_en')}
                    error={errors.name_en?.message}
                  />
                  <Input
                    label="Name (Arabic)"
                    placeholder="الاسم بالعربية"
                    className={inputFieldClass}
                    {...register('name_ar')}
                    error={errors.name_ar?.message}
                  />
                </div>
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
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="At least 8 characters"
                    className={inputFieldClass}
                    {...register('password')}
                    error={errors.password?.message}
                  />
                  <Input
                    label="Confirm password"
                    type="password"
                    placeholder="Repeat password"
                    className={inputFieldClass}
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-2 h-12 w-full rounded-md border-0 text-sm font-semibold tracking-wide sm:max-w-xs"
                  style={{ backgroundColor: MAROON }}
                  isLoading={registerMutation.isPending}
                >
                  Create account
                </Button>
              </form>

              <p className="mt-8 text-center text-[15px]" style={{ color: '#505050' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold underline-offset-2 hover:underline" style={{ color: MAROON }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
