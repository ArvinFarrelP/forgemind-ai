/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forge: {
          bg: '#0A0A0D',
          surface: '#131318',
          surface2: '#1B1B22',
          border: '#2A2A33',
          ember: '#FF6B35',
          amber: '#F5A623',
          molten: '#FF8A3D',
          violet: '#7C5CFF',
          cyan: '#3FD1C9',
          text: '#F4F2ED',
          muted: '#9B98A8',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'forge-glow': 'radial-gradient(circle at 50% 0%, rgba(255,107,53,0.18), transparent 60%)',
        'ember-gradient': 'linear-gradient(135deg, #FF6B35 0%, #F5A623 50%, #7C5CFF 100%)',
        'ember-gradient-soft': 'linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(124,92,255,0.15) 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255,138,61,0.25)',
        'glow-sm': '0 0 20px rgba(255,138,61,0.18)',
        card: '0 8px 30px rgba(0,0,0,0.35)',
      },
      keyframes: {
        ember: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.9' },
          '100%': { transform: 'translateY(-120px) scale(0.3)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        ember: 'ember 3.5s ease-in infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
