import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

import { Spinner } from '../spinner';
import { Typography } from '../typography/typography';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-fit whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background text-primary shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground  text-primary ',
        link: 'text-primary underline-offset-4 hover:underline',
        positive:
          'bg-accentGreen text-primary-foreground shadow-sm hover:bg-accentGreen/80',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8 w-full ',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading,
      icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <React.Fragment>
          {isLoading && <Spinner size="sm" className="text-current" />}
          {!isLoading && icon && (
            <span className="material-icons-round text-lg">{icon}</span>
          )}
          {size !== 'icon' && (
            <Typography
              variant={size === 'sm' ? 'buttonSmall' : 'button'}
              className="mx-2"
            >
              {children}
            </Typography>
          )}
        </React.Fragment>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
