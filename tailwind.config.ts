import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mds}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1B1D26',
        'secondary': '#F9A826',
        'accent': '#3E4E62',
      },
      keyframes: {
        wiggle: {
          '0%, 100%':{transofrm: 'left 0'},
          '33%':{transforma: 'left 10px'},
          '64%':{transform: 'right 10px'}
        }
      }

    },
  },
  plugins: [],
}
export default config
