/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: { 
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],      
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        brand1: 'hsl(var(--brand-1))',
        brand1Foreground: 'hsl(var(--brand-1-foreground))',
        brand2: 'hsl(var(--brand-2))',
        brand2Foreground: 'hsl(var(--brand-2-foreground))',
        brand3: 'hsl(var(--brand-3))',
        brand3Foreground: 'hsl(var(--brand-3-foreground))',
        border1: 'hsl(var(--border-1))',
        border2: 'hsl(var(--border-2))',
        border3: 'hsl(var(--border-3))',
        gray10: 'hsl(var(--gray-10))',
        gray20: 'hsl(var(--gray-20))',
        gray30: 'hsl(var(--gray-30))',
        gray40: 'hsl(var(--gray-40))',
        grayDisplay: 'hsl(var(--gray-display))',
        red1: 'hsl(var(--red-1))',
        red1Foreground: 'hsl(var(--red-1-foreground))',
        red2: 'hsl(var(--red-2))',
        red2Foreground: 'hsl(var(--red-2-foreground))',
        green1: 'hsl(var(--green-1))',
        green1Foreground: 'hsl(var(--green-1-foreground))',
        green2: 'hsl(var(--green-2))',
        green2Foreground: 'hsl(var(--green-2-foreground))',
        green3: 'hsl(var(--green-3))',
        green3Foreground: 'hsl(var(--green-3-foreground))',
        
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        }, 
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
