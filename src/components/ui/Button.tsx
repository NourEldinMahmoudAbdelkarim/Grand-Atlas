import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button variants definition
const buttonVariants = {
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-stone-50',
  variants: {
    primary: 'bg-[#8C1C1D] text-white hover:bg-[#731718]', 
    secondary: 'bg-transparent border border-[#8C1C1D] text-[#8C1C1D] hover:bg-[#fcf8f8]',
    ghost: 'bg-transparent text-stone-900 hover:bg-stone-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  },
  sizes: {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variants;
  size?: keyof typeof buttonVariants.sizes;
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', isLoading, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(
            buttonVariants.base,
            buttonVariants.variants[variant],
            buttonVariants.sizes[size],
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(
          buttonVariants.base,
          buttonVariants.variants[variant],
          buttonVariants.sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-stone-50" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
