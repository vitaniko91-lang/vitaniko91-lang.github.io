import type { Config } from 'tailwindcss'

/**
 * Confident Gallery — Portfolio Hub design tokens.
 * Cool near-black gallery frame + ONE signature chartreuse accent.
 * The case thumbnails supply the real color; this is the neutral register.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0C0D10', // page — rich cool near-black
          raised: '#141519', // cards / panels
          sunk: '#090A0C',
        },
        paper: '#F4F5F7', // primary text — cool warm-white
        muted: '#9DA1AB', // secondary text
        // tertiary / meta — eyebrows, labels, tags, credit. Raised from #5A5E68
        // (2.8–3.0:1, WCAG-AA FAIL on near-black) to clear 4.5:1 on base (5.34:1)
        // & raised (5.01:1) while staying visibly below muted's tier.
        faint: '#828691',
        accent: {
          DEFAULT: '#C6F24E', // signature electric chartreuse
          dim: '#8FB23A',
        },
        line: {
          DEFAULT: 'rgba(244,245,247,0.10)', // hairline borders
          bright: 'rgba(244,245,247,0.18)',
        },
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Figtree"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config
