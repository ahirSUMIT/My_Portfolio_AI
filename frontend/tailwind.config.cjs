module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        electricBlue: '#1E40FF',
        deepRoyalBlue: '#0032B0',
        vibrantViolet: '#5428F5',
        indigo: '#171680',
        darkWindow: '#171717',
        glassGrey: '#303030',
        softCyan: '#38DDF8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        macos: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'desktop-gradient': 'linear-gradient(135deg, #1E40FF, #5428F5)',
      },
    },
  },
  plugins: [],
};
