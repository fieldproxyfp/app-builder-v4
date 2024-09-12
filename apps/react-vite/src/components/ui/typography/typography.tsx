import { cn } from '@/utils/cn';
import React from 'react';

type TypographyVariant =
    | 'display'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'subHeading'
    | 'large'
    | 'body'
    | 'small'
    | 'button'
    | 'buttonSmall';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant: TypographyVariant;
    as?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
}


const variantStyles: Record<TypographyVariant, string> = {
    display: 'font-responsive-display font-semibold leading-[56px] tracking-[0]',
    h1: 'font-responsive-h1 font-semibold leading-[40px] tracking-[-0.01em]',
    h2: 'font-responsive-h2 font-semibold leading-[30px] tracking-[-0.01em]',
    h3: 'font-responsive-h3 font-semibold leading-[28px] tracking-[-0.02em]',
    subHeading: 'font-responsive-subheading font-medium leading-[24px] tracking-[-0.01em]',
    large: 'font-responsive-large font-normal leading-[20px] tracking-[-0.01em]',
    body: 'font-responsive-body font-medium leading-[20px] tracking-[-0.01em]',
    small: 'font-responsive-small font-medium leading-[16px] tracking-[-0.01em]',
    button: 'font-responsive-button font-medium leading-[20px] tracking-[0]',
    buttonSmall: 'font-responsive-button-small font-semibold leading-[20px] tracking-[-0.01em]'

};

export function Typography({ variant, as, children, className, ...props }: TypographyProps) {
    const Component = as || 'p' as React.ElementType;

    return (
        <Component
            className={cn(variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Component>
    );
}
