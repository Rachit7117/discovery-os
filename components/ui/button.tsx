import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-500/30',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-slate-200',
        secondary:
          'bg-white/8 text-slate-200 hover:bg-white/12',
        ghost:
          'hover:bg-white/8 text-slate-400 hover:text-slate-200',
        link:
          'text-blue-400 underline-offset-4 hover:underline hover:text-blue-300',
        gradient:
          'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-500/35',
        glow:
          'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-base font-semibold',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
