/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

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
      fontSize: {
        'display': ['40px', { lineHeight: '56px', letterSpacing: '0', fontWeight: '600' }],
        'h1': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['24px', { lineHeight: '30px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'subheading': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'large': ['16px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'small': ['12px', { lineHeight: '16px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'button': ['14px', { lineHeight: '20px', letterSpacing: '0', fontWeight: '500' }],
        'button-small': ['12px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        backgroundGrey: 'hsl(var(--background-grey))',
        backgroundGreyForeground: 'hsl(var(--background-grey-foreground))',
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        brand1: {
          DEFAULT: 'hsl(var(--brand-1))',
          foreground: 'hsl(var(--brand-1-foreground))',
        },
        brand2: {
          DEFAULT: 'hsl(var(--brand-2))',
          foreground: 'hsl(var(--brand-2-foreground))',
        },
        brand3: {
          DEFAULT: 'hsl(var(--brand-3))',
          foreground: 'hsl(var(--brand-3-foreground))',
        },
        borderPrimary: 'hsl(var(--border-primary))',
        borderSecondary: 'hsl(var(--border-secondary))',
        borderDark: 'hsl(var(--border-dark))',
        grayMuted: 'hsl(var(--gray-muted))',
        grayBody: 'hsl(var(--gray-body))',
        grayParagraph: 'hsl(var(--gray-paragraph))',
        graySubtitle: 'hsl(var(--gray-subtitle))',
        grayTitle: 'hsl(var(--gray-title))',
        accentGreen: 'hsl(var(--accent-green))',
        accentYellow: 'hsl(var(--accent-yellow))',
        accentOrange: 'hsl(var(--accent-orange))',
        accentRed: 'hsl(var(--accent-red))',
        accentPink: 'hsl(var(--accent-pink))',
        accentPurple: 'hsl(var(--accent-purple))',
        accentBlue: 'hsl(var(--accent-blue))',
        
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
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'),
    plugin(function({ addUtilities, theme, e }) {
      const responsiveTypography = {};
      const fontSizes = theme('fontSize');
      
      Object.entries(fontSizes).forEach(([key, value]) => {
        const [fontSize, { lineHeight, letterSpacing, fontWeight }] = value;
        responsiveTypography[`.${e(`font-responsive-${key}`)}`] = {
          fontSize: `calc(${fontSize} * var(--font-size-multiplier, 1))`,
          lineHeight: `calc(${lineHeight} * var(--line-height-multiplier, 1))`,
          letterSpacing: `calc(${letterSpacing} * var(--letter-spacing-multiplier, 1))`,
          fontWeight: fontWeight,
        };
      });

      addUtilities(responsiveTypography, ['responsive']);
    })
  ],
};
