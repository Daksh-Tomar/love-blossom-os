import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Love theme colors
				'love-pink': 'hsl(var(--love-pink))',
				'love-rose': 'hsl(var(--love-rose))',
				'love-blush': 'hsl(var(--love-blush))',
				'love-cream': 'hsl(var(--love-cream))',
				'love-gold': 'hsl(var(--love-gold))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float-hearts': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
					'25%': { transform: 'translateY(-10px) rotate(5deg)', opacity: '1' },
					'50%': { transform: 'translateY(-20px) rotate(-5deg)', opacity: '0.8' },
					'75%': { transform: 'translateY(-15px) rotate(3deg)', opacity: '0.9' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '0', transform: 'scale(0.8)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' }
				},
				'love-bounce': {
					'0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
					'40%': { transform: 'translateY(-20px)' },
					'60%': { transform: 'translateY(-10px)' }
				},
				'card-flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(-90deg)' },
					'100%': { transform: 'rotateY(-180deg)' }
				},
				'confetti-fall': {
					'0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' }
				},
				'fly-around': {
					'0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
					'25%': { transform: 'translate(40vw, -20vh) rotate(15deg)' },
					'50%': { transform: 'translate(20vw, 30vh) rotate(-15deg)' },
					'75%': { transform: 'translate(-30vw, 10vh) rotate(10deg)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float-hearts': 'float-hearts 2s ease-in-out infinite',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'love-bounce': 'love-bounce 2s ease-in-out infinite',
				'card-flip': 'card-flip 0.6s ease-in-out',
				'confetti-fall': 'confetti-fall 3s linear infinite',
				'fly-around': 'fly-around 20s ease-in-out infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'spin-slow': 'spin 3s linear infinite'
			},
			backgroundImage: {
				'gradient-love': 'var(--gradient-love)',
				'gradient-soft': 'var(--gradient-soft)',
				'gradient-dreamy': 'var(--gradient-dreamy)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
