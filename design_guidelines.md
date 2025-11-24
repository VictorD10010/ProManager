# Design Guidelines: Modern Login Page

## Design Approach
**System Selected:** Minimal Design System with Material Design influences
**Rationale:** Login pages require trust, clarity, and efficiency. A clean, focused approach prioritizes usability while maintaining modern aesthetics.

## Layout System

**Structure:** Split-screen layout for desktop, single-column for mobile
- Left panel (50% width on desktop): Login form container
- Right panel (50% width on desktop): Visual brand panel with image/illustration
- Mobile: Stack vertically, prioritize form visibility

**Spacing Units:** Tailwind units of 4, 6, and 8
- Form container: p-8 on desktop, p-6 on mobile
- Form field spacing: gap-6 between elements
- Section margins: mb-8 for major sections

**Container Widths:**
- Form container: max-w-md centered within left panel
- Full viewport height: min-h-screen for immersive experience

## Typography

**Font Family:** 
- Primary: Inter or DM Sans (clean, professional sans-serif)
- Single family throughout for consistency

**Hierarchy:**
- Heading (h1): text-3xl font-bold
- Subheading: text-sm font-normal
- Form labels: text-sm font-medium
- Input text: text-base
- Links: text-sm font-medium
- Error messages: text-sm

## Component Library

### Form Components
**Input Fields:**
- Full-width text inputs with clear borders
- Height: h-12 for comfortable touch targets
- Padding: px-4
- Border radius: rounded-lg
- Focus states with ring effect
- Label above input with mb-2 spacing
- Password field with show/hide toggle icon

**Primary Button:**
- Full-width submit button
- Height: h-12 for consistency with inputs
- Text: text-base font-semibold
- Border radius: rounded-lg
- Prominent visual treatment

**Links:**
- "Forgot password?" - positioned after password field
- "Create account" - placed below submit button
- Underline on hover

### Additional Elements
**Remember Me Checkbox:**
- Positioned between password and submit button
- Custom checkbox styling aligned with design system
- Label text-sm

**Social Login Options:**
- Google and/or other providers
- Icon + text buttons
- Positioned below primary login or above form
- Border radius: rounded-lg
- Height: h-12

**Divider:**
- "Or continue with" text between social and email login
- Horizontal line with centered text

**Trust Indicators:**
- Small security badge or text near submit button
- Subtle, non-intrusive placement

## Visual Panel (Right Side - Desktop)

**Background Treatment:**
- Gradient overlay on brand image
- Full-height panel
- Includes: Brand logo, tagline, or key benefit statement
- Text overlay: Large heading (text-4xl font-bold) with supporting text

## Navigation

**Header (if included):**
- Simple logo placement top-left
- "Need help?" link top-right
- Minimal height: h-16

## Form Validation

**Error States:**
- Red accent for error text below invalid fields
- Border highlight on error fields
- Clear, specific error messages
- Inline validation after field blur

**Success States:**
- Subtle confirmation on valid field completion
- Loading state on submit button during authentication

## Images

**Visual Panel Image:**
- Professional photo or illustration representing the brand/product
- Dimensions: Full height, 50% viewport width (desktop only)
- Treatment: Slight gradient overlay for text readability
- Theme: Modern workspace, team collaboration, or abstract tech aesthetic
- Position: Right side of screen (desktop), hidden on mobile

## Accessibility

- Proper label-input associations
- ARIA labels for icon-only buttons
- Focus indicators on all interactive elements
- Keyboard navigation support
- High contrast text ratios
- Password visibility toggle announced to screen readers

## Responsive Behavior

**Desktop (lg+):** Split-screen layout
**Tablet (md):** Split-screen with narrower right panel
**Mobile (base):** Single column, form only, visual panel hidden

## Key Principles

1. **Clarity First:** Every element serves the authentication goal
2. **Trust Building:** Professional, secure appearance
3. **Minimal Friction:** Quick access to form, minimal distractions
4. **Modern Polish:** Contemporary without trendy gimmicks
5. **Accessibility:** Fully keyboard navigable and screen reader friendly