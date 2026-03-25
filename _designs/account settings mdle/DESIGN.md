# Design System Strategy: The Editorial Analyst

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Editorial Analyst."** 

In a world of cluttered trading terminals and chaotic data visualizations, this system acts as a sophisticated filter. It treats financial data not as "noise," but as a curated story. We move away from the "app-like" density of traditional brokers and toward the prestige of high-end financial journalism (think *The Financial Times* or *The Economist* digital experiences).

The "Editorial Analyst" breaks the traditional grid through **intentional asymmetry** and **tonal depth**. Rather than boxing information into rigid squares, we use generous whitespace (negative space) as a structural element. Elements should feel like they are laid out on a physical desk—overlapping slightly, layered with purpose, and emphasizing legibility above all else.

---

## 2. Color & Surface Architecture
The color palette is rooted in a "Modern-Classy" ethos, using a high-chroma white base and sophisticated deep navy typography.

### The "No-Line" Rule
To achieve a truly premium feel, **1px solid borders are prohibited for sectioning.** Conventional UIs use lines to separate content; this design system uses **Background Color Shifts**. 
- A section containing market news should be defined by transitioning from `surface` (#f8f9ff) to `surface-container-low` (#eff4ff). 
- Boundaries are felt through tone, not seen through strokes.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use the Material surface tiers to create "stacked" importance:
1.  **Base Layer:** `surface` (#f8f9ff) – The primary canvas.
2.  **Structural Sections:** `surface-container-low` (#eff4ff) – Used for large sidebars or secondary content areas.
3.  **Actionable Cards:** `surface-container-lowest` (#ffffff) – Pure white surfaces that "pop" against the off-white background.
4.  **Floating Elements:** `surface-bright` (#f8f9ff) – Used for tooltips or fly-outs.

### The "Glass & Gradient" Rule
For primary CTAs and high-level headers, flat color is insufficient. Use **Signature Textures**:
- **CTAs:** Use a subtle vertical gradient from `primary` (#000000) to `primary_container` (#141b2c) to give buttons a "milled" look.
- **Overlays:** Use `surface_container_lowest` at 80% opacity with a `backdrop-blur` of 12px for navigation bars or floating modals to create a "frosted glass" editorial feel.

---

## 3. Typography
Typography is the voice of the "Editorial Analyst." We utilize **Plus Jakarta Sans** for its geometric clarity and **Inter** for functional data labels.

- **Display & Headlines:** Use `display-lg` to `headline-sm` in **Plus Jakarta Sans**. These should have a slightly tighter tracking (-0.02em) to feel authoritative and "locked in." Use these for portfolio totals and section headers.
- **Body:** Use `body-lg` and `body-md` in **Plus Jakarta Sans**. Increase letter spacing to +0.01em to ensure maximum readability during long analysis sessions.
- **Data Labels:** Use `label-md` (Inter). This font is built for numbers. Always use tabular lining for numerical data to ensure columns align perfectly in spreadsheets or ticker tapes.

The hierarchy is "Top-Heavy": large, bold titles followed by significant whitespace, leading into highly legible, smaller body text.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking." A card (`surface-container-lowest`) placed on a background (`surface-container-low`) creates a natural lift.
- **Ambient Shadows:** If a floating state is required (e.g., a dropdown), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(11, 28, 48, 0.06);`. Notice the shadow color is a tint of `on_surface` (#0b1c30), not pure black.
- **The Ghost Border:** If a container must exist on a white background, use a "Ghost Border": `outline-variant` (#c6c6cd) at 15% opacity. It should be barely perceptible—a suggestion of a boundary.

---

## 5. Components

### Buttons
- **Primary:** Rounded `lg` (0.5rem). Background is a subtle gradient of `primary`. Text is `on_primary` (#ffffff).
- **Secondary/Ghost:** No background. Use `on_surface_variant` (#45474c) for text. On hover, shift the background to `surface_container_high`.
- **Padding:** High horizontal padding (e.g., `spacing-5` / 1.7rem) to maintain the "Editorial" spaciousness.

### Cards & Lists
- **Rule:** Absolute prohibition of divider lines (`<hr>`).
- **Implementation:** Separate list items using `spacing-3` (1rem) of vertical white space. If separation is visually required, use a alternating background color of `surface_container_lowest` and `surface_container_low`.

### Input Fields
- **Style:** Minimalist. No bottom border or full box. Use a `surface_container_low` background with an `8px` (lg) radius.
- **Focus State:** The border transitions to a 1px "Ghost Border" of `secondary` (#755a26) to signal the "Gold" premium accent.

### Interactive Charts (Custom Component)
- Charts should not use a grid. Only show the X and Y axis labels using `label-sm`.
- Use a `secondary` (#755a26) "Gold" stroke for the primary data line, with a soft `secondary_container` gradient fill beneath it.

---

## 6. Do’s and Don’ts

### Do:
- **Use "Uncomfortable" Whitespace:** If a section feels "too empty," you are likely on the right track. Give data room to breathe.
- **Use Asymmetric Layouts:** Position a headline on the far left and the data visualization slightly offset to the right to mimic a magazine layout.
- **Mix Font Weights:** Use `Bold` for titles and `Medium` or `Regular` for data to create clear visual weight.

### Don't:
- **Don't use 100% Black:** Use `on_surface` (#0b1c30) for text to maintain a sophisticated navy-charcoal depth.
- **Don't use Box Shadows on everything:** Only use shadows for elements that physically "hover" over the interface (Modals, Tooltips).
- **Don't use Red/Green for everything:** For a premium broker, use `error` (#ba1a1a) sparingly. Consider using "up/down" arrows or typographic weight to show market movement instead of "Christmas Tree" coloring.