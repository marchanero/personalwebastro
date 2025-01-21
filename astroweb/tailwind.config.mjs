/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				accent: {
					lighter: '#7dd3fc',
					light: '#22d3ee',
					DEFAULT: '#0891b2',
					dark: '#0e7490',
					darker: '#155e75'
				},
				glass: {
					light: 'rgba(255, 255, 255, 0.85)',
					dark: 'rgba(17, 24, 39, 0.85)'
				},
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49',
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif']
			},
			height: {
				header: '70px',
			},
			maxWidth: {
				container: '1200px',
			},
			animation: {
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			backgroundImage: {
				'dots-light': 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
				'dots-dark': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
			},
			backgroundSize: {
				'dots-sm': '20px 20px',
				'dots-lg': '40px 40px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}