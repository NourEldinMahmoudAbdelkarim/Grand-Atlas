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

const MAROON = '#8B2323';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const inputFieldClass =
  'h-11 rounded-md border-stone-200 bg-[#F8F8F8] focus:ring-1 focus:ring-stone-300 focus:border-stone-300';

export function LoginPage() {
  const { isAuthenticated, setAuth } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Signed in successfully');
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Invalid credentials. Please try again.');
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
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
            Welcome back
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/88 md:text-[15px]">
            Sign in to access your portfolio, saved searches, and the Grand Atlas partner dashboard.
          </p>
        </div>
      </section>

      <div className="bg-[#F8F8F8] py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-8 md:p-10">
              <div className="mb-8 text-center">
                <img src="/logo.png" alt="Grand Atlas" className="mx-auto h-14 object-contain md:h-16" />
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: '#707070' }}>
                  Enter your email and password to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  className={inputFieldClass}
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  className={inputFieldClass}
                  {...register('password')}
                  error={errors.password?.message}
                />
                <Button
                  type="submit"
                  className="mt-2 h-12 w-full rounded-md border-0 text-sm font-semibold tracking-wide"
                  style={{ backgroundColor: MAROON }}
                  isLoading={loginMutation.isPending}
                >
                  Sign in
                </Button>
              </form>

              <p className="mt-8 text-center text-[15px]" style={{ color: '#505050' }}>
                New to Grand Atlas?{' '}
                <Link to="/register" className="font-semibold underline-offset-2 hover:underline" style={{ color: MAROON }}>
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
