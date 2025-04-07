/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F59E0B', // amber-500
        background: {
          DEFAULT: '#111111',
          dark: '#0a0a0a',
          light: '#1a1a1a',
        },
        foreground: {
          DEFAULT: '#FFFFFF',
          muted: '#a0a0a0',
        },
      },
      boxShadow: {
        'glow-amber': '0 0 50px 0 rgba(245,158,11,0.15)',
        'glow-white': '0 0 30px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee-left': 'marquee-left 60s linear infinite',
        'marquee-right': 'marquee-right 60s linear infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1152px',
      }
    },
  },
  plugins: [],
} 