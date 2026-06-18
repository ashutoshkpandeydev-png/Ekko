/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-down': 'slide-down 0.8s ease-out',
        'fade-in': 'fade-in 0.9s ease-out',
        'scale-in': 'scale-in 0.8s ease-out',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(124,58,237,0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'slide-down': {
          'from': { transform: 'translateY(-100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'scale-in': {
          'from': { transform: 'scale(0.8)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(200px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(200px) rotate(-360deg)' },
        },
      },
      backgroundSize: {
        '200%': '200%',
        '300%': '300%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 0deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124,58,237,0.5)',
        'glow-lg': '0 0 40px rgba(124,58,237,0.8)',
        'glow-xl': '0 0 60px rgba(124,58,237,0.9)',
        'neon': '0 0 20px rgba(124,58,237,0.8), 0 0 40px rgba(59,130,246,0.6)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
        'blur-md': 'blur(12px)',
        'blur-lg': 'blur(20px)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      colors: {
        'ekko-purple': '#7C3AED',
        'ekko-blue': '#3B82F6',
        'ekko-cyan': '#06B6D4',
        'ekko-pink': '#EC4899',
        'ekko-dark': '#0A0E27',
      },
    },
  },
  plugins: [],
}
