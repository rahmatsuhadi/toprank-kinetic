---
name: Kinetic Academy
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  success-green: '#10B981'
  status-verified: '#10B981'
  status-pending: '#F59E0B'
  status-rejected: '#EF4444'
  reward-gold: '#FFD700'
  surface-glass: rgba(255, 255, 255, 0.7)
  background-main: '#F8FAFC'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  point-display:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is built for a "Edu-Tech meets Gamification" environment, targeting a demographic of ambitious university students. The brand personality is **energetic, prestigious, and forward-looking**, balancing the seriousness of professional development with the excitement of a high-stakes competition.

The chosen style is a hybrid of **Corporate Modern** and **Glassmorphism**. It utilizes high-contrast typography and a vibrant primary palette to drive engagement, while frosted-glass surfaces and subtle blurs create a sense of depth and technological sophistication. This approach ensures the platform feels like a cutting-edge "Talent Hub" rather than a traditional academic portal.

**Design Principles:**
- **Momentum:** Use gradients and directional cues to suggest progress and growth.
- **Clarity:** Maintain high information density for portfolios while ensuring key actions are impossible to miss.
- **Reward-Centric:** Highlight point accumulation and status upgrades through vibrant color accents and tactile depth.

## Colors

The color strategy uses **Electric Indigo** (`#4F46E5`) as the anchor to represent authority and professionalism. A secondary **Cyber Blue** (`#0EA5E9`) is used for interactive elements and accents to maintain the energetic tech feel.

Functional colors are critical for the gamified verification loop:
- **Success/Verified:** A vivid Emerald Green to signal achievement.
- **Pending/Warning:** An Amber Orange to indicate "work in progress."
- **Rejected/Critical:** A sharp Red for items requiring attention.

**Gradients:** Use linear gradients from Primary to Secondary (top-left to bottom-right) for "level up" moments, point cards, and primary action buttons to reinforce the gamified narrative.

## Typography

This design system uses **Hanken Grotesk** as the primary typeface. Its sharp, contemporary geometry provides the "Edu-Tech" aesthetic—clean enough for administrative data but bold enough for student profiles.

For technical data, point values, and status badges, **JetBrains Mono** is introduced. This monospaced font provides a "developer" and "precise" feel, reinforcing the idea of verified skill data and systematic rewards.

**Scale Rules:**
- Use `display-lg` for leaderboard rankings and total point tallies.
- Use `label-caps` (all caps) for category tags like "NATIONAL CERTIFICATE" or "UI/UX DESIGN."
- Line heights are kept generous in body text to ensure readability of long student descriptions.

## Layout & Spacing

The layout follows a **Fluid Grid** system based on a 4px baseline rhythm. 

- **Desktop:** 12-column grid with 24px gutters and 40px margins. Dashboard views utilize a sidebar-content split (280px fixed sidebar, fluid content).
- **Mobile:** Single column with 16px margins. Cards should fill the width to maximize space for portfolio thumbnails.
- **Spacing Logic:** Use `md` (16px) for internal card padding and `lg` (24px) for vertical spacing between sections to maintain a clean, airy "modern" feel.

## Elevation & Depth

To achieve the modern Glassmorphism look, the design system utilizes **Tonal Layers** combined with **Backdrop Blurs**.

- **Level 0 (Background):** Solid `#F8FAFC`.
- **Level 1 (Cards):** White background with a 1px border (`#E2E8F0`) and a soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)).
- **Level 2 (Overlays/Modals):** Glassmorphic surface: `rgba(255, 255, 255, 0.7)` with a `backdrop-filter: blur(12px)`. This is used for verification pop-ups and student quick-views.
- **Interactive Depth:** Buttons should use a subtle inner glow or a secondary shadow when hovered to feel "pressable" and tactile, mimicking a game interface.

## Shapes

The design uses a **Rounded** (`0.5rem`) language to feel approachable and contemporary.

- **Standard Buttons & Inputs:** 8px (`rounded-md`).
- **Cards & Skill Blocks:** 16px (`rounded-lg`).
- **Status Badges & Reward Chips:** 32px (`rounded-full`) to create a distinct "pill" shape that contrasts with the structural grid.
- **Gamification Icons:** Use continuous curves (squircular) for profile pictures to add a premium, modern touch.

## Components

### Buttons
- **Primary:** Solid Electric Indigo with a subtle top-to-bottom gradient. 
- **Secondary:** Transparent with an Electric Indigo border (2px) and Indigo text.
- **Reward Button:** Solid Tertiary Amber with white text, using a "pulse" animation for high-point claims.

### Status Badges
- Used for `Verified`, `Pending`, and `Rejected`. 
- **Verified:** Success Green background (10% opacity) with solid green text and a JetBrains Mono typeface. Include a small checkmark icon.
- **Pending:** Amber background (10% opacity) with amber text.

### Point Indicators
- Displayed as a small chip with a `reward-gold` icon. The text must be monospaced (`point-display`) to emphasize the numerical value.

### Input Fields
- High-contrast white backgrounds with a subtle gray border. On focus, the border transitions to Primary Indigo with a soft 4px outer glow (ring).

### Cards
- **Portfolio Card:** Features a large media container (top) with a 16px bottom padding for the title and a right-aligned verification badge.
- **Leaderboard Row:** A horizontal card format using alternating subtle tints to differentiate rankings. Top 3 ranks should feature a thin gold/silver/bronze border.

### Skill Chips
- Small, rounded-full containers. Use secondary blue for verified skills and neutral gray for unverified ones.