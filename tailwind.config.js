/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IBM Color Palette
        'ibm-blue': {
          DEFAULT: '#0f62fe',
          50: '#e8f4ff',
          100: '#d0e8ff',
          200: '#a6d5ff',
          300: '#78b9ff',
          400: '#4589ff',
          500: '#0f62fe',
          600: '#0043ce',
          700: '#002d9c',
          800: '#001d6c',
          900: '#001141',
        },
        // Dark theme colors
        'dark': {
          DEFAULT: '#0a0a0a',
          50: '#f4f4f4',
          100: '#e0e0e0',
          200: '#c6c6c6',
          300: '#a8a8a8',
          400: '#8d8d8d',
          500: '#6f6f6f',
          600: '#525252',
          700: '#393939',
          800: '#262626',
          900: '#161616',
          950: '#0a0a0a',
        },
        // Status colors
        'success': '#24a148',
        'warning': '#f1c21b',
        'danger': '#da1e28',
        'info': '#4589ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-ibm': 'linear-gradient(135deg, #0f62fe 0%, #001d6c 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15, 98, 254, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(15, 98, 254, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

// Made with Bob
