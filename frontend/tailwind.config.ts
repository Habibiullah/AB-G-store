import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#eef2ff',200:'#c7d2fe',400:'#818cf8',600:'#4f46e5',800:'#3730a3' }
      }
    }
  },
  plugins: []
} satisfies Config