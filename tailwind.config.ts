import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "accent-1": {
          DEFAULT: "hsl(var(--accent-1))",
          foreground: "hsl(var(--accent-1-foreground))",
        },
        "accent-2": {
          DEFAULT: "hsl(var(--accent-2))",
          foreground: "hsl(var(--accent-2-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(51, 65, 85)',
            a: {
              color: '#0096D6',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#0077AA',
              },
            },
            'strong': {
              color: 'rgb(15, 23, 42)',
              fontWeight: '700',
            },
            'h1': {
              backgroundImage: 'linear-gradient(90deg, #0096D6, #60CEF6, #0077AA)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
            },
            'h2': {
              color: 'rgb(15, 23, 42)',
              fontWeight: '700',
            },
            'h3': {
              color: 'rgb(15, 23, 42)',
              fontWeight: '600',
            },
            'h4': {
              color: 'rgb(15, 23, 42)',
              fontWeight: '600',
            },
            'blockquote': {
              borderLeft: '4px solid #0096D6',
              backgroundColor: 'rgba(15, 23, 42, 0.02)',
              backdropFilter: 'blur(8px)',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              borderRadius: '0.75rem',
              fontStyle: 'normal',
              color: 'rgb(51, 65, 85)',
            },
            'code': {
              color: 'rgb(15, 23, 42)',
              backgroundColor: 'rgb(241, 245, 249)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            'pre': {
              backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
              backgroundColor: 'rgb(15, 23, 42)',
              color: 'rgb(241, 245, 249)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderLeftColor: '#0096D6',
              borderLeftWidth: '4px',
              borderRadius: '1rem',
              padding: '1.25rem',
              boxShadow: '0 20px 40px -15px rgb(0, 150, 214, 0.15), inset 0 1px 0 rgb(255, 255, 255, 0.05)',
              overflowX: 'auto',
            },
            'pre code': {
              color: 'rgb(241, 245, 249)',
              backgroundColor: 'transparent',
              padding: '0',
              fontWeight: '400',
            },
            'table': {
              borderCollapse: 'collapse',
            },
            'thead th': {
              backgroundColor: 'rgb(241, 245, 249)',
              borderColor: 'rgb(203, 213, 225)',
              fontWeight: '700',
            },
            'tbody td': {
              borderColor: 'rgb(203, 213, 225)',
            },
            'img': {
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            },
          },
        },
        invert: {
          css: {
            color: 'rgb(203, 213, 225)',
            a: {
              color: '#0096D6',
              '&:hover': {
                color: '#00b4f0',
              },
            },
            'strong': {
              color: 'rgb(241, 245, 249)',
            },
            'h1': {
              backgroundImage: 'linear-gradient(90deg, #0096D6, #60CEF6, #0077AA)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
            },
            'h2': {
              color: 'rgb(226, 232, 240)',
              fontWeight: '700',
            },
            'h3': {
              color: 'rgb(226, 232, 240)',
              fontWeight: '600',
            },
            'h4': {
              color: 'rgb(226, 232, 240)',
            },
            'blockquote': {
              borderLeft: '4px solid #0096D6',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              color: 'rgb(203, 213, 225)',
            },
            'code': {
              color: 'rgb(241, 245, 249)',
              backgroundColor: 'rgb(30, 41, 59)',
              borderRadius: '0.375rem',
            },
            'pre': {
              backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
              backgroundColor: 'rgb(15, 23, 42)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderLeftColor: '#0096D6',
              borderLeftWidth: '4px',
              borderRadius: '1rem',
              boxShadow: '0 20px 40px -15px rgb(0, 150, 214, 0.15), inset 0 1px 0 rgb(255, 255, 255, 0.05)',
            },
            'pre code': {
              color: 'rgb(241, 245, 249)',
              backgroundColor: 'transparent',
            },
            'table': {
              borderCollapse: 'collapse',
            },
            'thead th': {
              backgroundColor: 'rgb(30, 41, 59)',
              borderColor: 'rgb(51, 65, 85)',
            },
            'tbody td': {
              borderColor: 'rgb(51, 65, 85)',
            },
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-gentle": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.85",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "pulse-gentle": "pulse-gentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
