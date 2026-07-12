---
name: Celestial Alchemy
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#fbabff'
  on-secondary: '#580065'
  secondary-container: '#ae05c6'
  on-secondary-container: '#ffd8fd'
  tertiary: '#f9bd22'
  on-tertiary: '#402d00'
  tertiary-container: '#b88900'
  on-tertiary-container: '#372700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd6fd'
  secondary-fixed-dim: '#fbabff'
  on-secondary-fixed: '#36003e'
  on-secondary-fixed-variant: '#7c008e'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 16px
  section-gap: 64px
---

## Brand & Style

The design system is crafted to evoke a sense of cosmic wonder and sophisticated mysticism. It balances the playful energy of discovery with the reliability of expert guidance. The visual direction is a fusion of **Modern Corporate** structure and **Glassmorphism**, creating a premium "magical" experience that feels like a digital gateway to the stars.

The aesthetic leans heavily into ethereal depth. By utilizing translucent layers, vibrant background blurs, and crisp, modern typography, the UI feels lightweight and innovative. It avoids the heavy, traditional tropes of astrology in favor of a clean, high-tech interface that prioritizes accessibility and exploration. The mood is intentionally "enchanting yet clear"—mysterious enough to pique curiosity, but functional enough to build deep user trust.

## Colors

The palette is anchored in a **Deep Night Sky** (Dark Navy) to provide a canvas for vibrant, luminous accents. 

- **Core Palette:** Deep Navy (`#0F172A`) serves as the base surface, while Royal Purple (`#8B5CF6`) and Fuchsia (`#D946EF`) drive the primary brand identity.
- **Luminosity:** Gold (`#FBBF24`) is reserved for high-value moments, successes, and celestial highlights. Turquoise and Pink are used as secondary accents for data visualization and interactive states.
- **Functional Gradients:** Use "Nebula Gradients"—soft, radial blends of Purple and Fuchsia at 10-20% opacity—to create depth in the background without overwhelming content.

## Typography

This design system uses **Sora** for headlines to provide a geometric, tech-forward, and slightly "sci-fi" personality. **Inter** is utilized for body copy and labels to ensure maximum legibility and a grounded, professional feel.

Typography hierarchy is strictly enforced to manage information density. Display styles should be used sparingly for "magical" headers or daily horoscopes. Labels and captions use increased letter-spacing and uppercase styling to denote metadata and categories, creating a clear distinction from narrative body text.

## Layout & Spacing

The layout follows a **Fluid Grid** system optimized for mobile-first consumption. 
- **Mobile:** A 4-column grid with 20px margins. Content cards usually span the full width or 2 columns for smaller items like zodiac icons.
- **Desktop:** A 12-column grid with a maximum width of 1280px. 
- **Rhythm:** An 8px linear scale is used for all spacing. "Large Whitespace" is a core principle—use generous padding within cards (min 24px) and significant vertical gaps (64px+) between sections to allow the nebula backgrounds to breathe and create a sense of vastness.

## Elevation & Depth

Visual hierarchy is achieved through **Glassmorphism** and **Tonal Layering**.

- **Surfaces:** Use semi-transparent backgrounds (`rgba(30, 41, 59, 0.7)`) with a 12px-20px backdrop-filter (blur).
- **Outlines:** Instead of heavy shadows, use "Inner Glow" borders—1px solid strokes with a subtle gradient (top-left: white at 15% opacity to bottom-right: white at 5% opacity).
- **Shadows:** Use large, highly diffused shadows with a slight color tint matching the background (e.g., `#000000` at 40% opacity with a 30px blur) to make cards feel like they are floating in space.
- **Background Depth:** Layer 1 is the Dark Navy base; Layer 2 consists of static nebula blurs; Layer 3 contains sharp, tiny "star" dots; Layer 4 is the interactive UI.

## Shapes

The shape language is consistently **Rounded**. High corner radii are used to soften the "technical" feel of the typography and colors, making the interface approachable and friendly. 

- **Standard Cards:** 1rem (16px) radius.
- **Primary Buttons:** Fully rounded (pill-shaped) to encourage interaction.
- **Zodiac Icons:** Circular containers to mirror the shape of planets and celestial charts.

## Components

- **Buttons:** Primary buttons use a vibrant gradient (Purple to Fuchsia) with a subtle outer glow. Secondary buttons use the glassmorphic style with a white 1px border.
- **Cards:** "Celestial Cards" feature a 1px top-light border, backdrop blur, and rounded corners. They should feel like physical glass panes floating over the nebula.
- **Chips:** Small, pill-shaped tags used for star signs or element types (Fire, Water, etc.). Use low-opacity fills of the specific element's color (e.g., Water = Turquoise).
- **Input Fields:** Darker than the background with a 1px border that glows Purple when focused. Labels float above the field in `label-md` style.
- **Navigation:** A bottom navigation bar on mobile with an acrylic/glass effect. The active state is indicated by a Gold star icon or a subtle purple glow.
- **Progress Indicators:** Use thin, circular Gold lines for planetary alignment or reading progress.