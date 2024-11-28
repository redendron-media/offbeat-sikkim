import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			xs: '320px'
  		},
  		colors: {
  			primary: {
  				'0': '#000000',
  				'5': '#001509',
  				'10': '#002111',
  				'15': '#002D18',
  				'20': '#003920',
  				'25': '#004528',
  				'30': '#005231',
  				'35': '#005F3A',
  				'40': '#19A96C',
  				'50': '#008955',
  				'60': '#0FA569',
  				'70': '#3EC181',
  				'80': '#5FDD9B',
  				'90': '#A5F3C3',
  				'95': '#C0FFD6',
  				'98': '#E9FFED',
  				'99': '#F5FFF5',
  				'100': '#FFFFFF',
  				DEFAULT: '#19A96C',
  				container: '#A5F3C3',
  				oncontainer: '#002111'
  			},
  			secondary: {
  				'0': '#000000',
  				'5': '#001508',
  				'10': '#00210F',
  				'15': '#002D16',
  				'20': '#00391D',
  				'25': '#004525',
  				'30': '#0C512F',
  				'35': '#1D5E3A',
  				'40': '#2B6A45',
  				'50': '#45845C',
  				'60': '#5F9E74',
  				'70': '#79B98D',
  				'80': '#94D5A7',
  				'90': '#AFF2C2',
  				'95': '#C2FFD2',
  				'98': '#E9FFEC',
  				'99': '#F5FFF5',
  				'100': '#FFFFFF',
  				DEFAULT: '#2C6A45',
  				container: '#AFF2C2',
  				oncontainer: '#00210F'
  			},
  			accent: {
  				'0': '#000000',
  				'5': '#121200',
  				'10': '#1D1D00',
  				'15': '#272700',
  				'20': '#323200',
  				'25': '#3D3E00',
  				'30': '#494900',
  				'35': '#555500',
  				'40': '#616200',
  				'50': '#7B7B00',
  				'60': '#959600',
  				'70': '#B0B100',
  				'80': '#CCCD02',
  				'90': '#E8E885',
  				'95': '#F6F692',
  				'98': '#FFFF9A',
  				'99': '#FFFBFF',
  				'100': '#FFFFFF',
  				DEFAULT: '#616118'
  			},
  			error: {
  				'0': '#000000',
  				'5': '#2D0001',
  				'10': '#410002',
  				'15': '#540003',
  				'20': '#690005',
  				'25': '#7E0007',
  				'30': '#93000A',
  				'35': '#A80710',
  				'40': '#BA1A1A',
  				'50': '#DE3730',
  				'60': '#FF5449',
  				'70': '#FF897D',
  				'80': '#FFB4AB',
  				'90': '#FFDAD6',
  				'95': '#FFEDEA',
  				'98': '#FFF8F7',
  				'99': '#FFFBFF',
  				'100': '#FFFFFF',
  				DEFAULT: '#DE3730'
  			},
  			neutral: {
  				'0': '#000000',
  				'4': '#0F0D13',
  				'5': '#0F120F',
  				'6': '#141218',
  				'10': '#191C1A',
  				'12': '#211F26',
  				'15': '#232724',
  				'17': '#2B2930',
  				'20': '#2E312E',
  				'22': '#36343B',
  				'24': '#3B383E',
  				'25': '#393C39',
  				'30': '#444744',
  				'35': '#505350',
  				'40': '#5C5F5C',
  				'50': '#757874',
  				'60': '#8F918D',
  				'70': '#A9ACA8',
  				'80': '#C5C7C3',
  				'87': '#DED8E1',
  				'90': '#E1E3DE',
  				'92': '#ECE6F0',
  				'94': '#F3EDF7',
  				'95': '#F0F1ED',
  				'96': '#F7F2FA',
  				'98': '#F8FAF5',
  				'99': '#FBFDF8',
  				'100': '#FFFFFF'
  			},
  			neutralv: {
  				'0': '#000000',
  				'5': '#0B130E',
  				'10': '#161D18',
  				'15': '#202822',
  				'20': '#2A322C',
  				'25': '#353D37',
  				'30': '#404942',
  				'35': '#4C544E',
  				'40': '#586059',
  				'50': '#717972',
  				'60': '#8A938B',
  				'70': '#ADF2C6',
  				'80': '#C0C9C0',
  				'90': '#DCE5DC',
  				'95': '#EAF3EA',
  				'98': '#F3FCF2',
  				'99': '#F6FFF5',
  				'100': '#FFFFFF'
  			}
  		},
  		fontFamily: {
  			roboto: ['var(--font-roboto)', 'sans'],
  			slab: ['var(--font-roboto-slab)', 'sans']
  		},
  		boxShadow: {
  			cardShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  			footerShadow: '0px -4px 6px -2px rgba(0, 0, 0, 0.25)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('daisyui'),require('@tailwindcss/typography')],
};
export default config;
