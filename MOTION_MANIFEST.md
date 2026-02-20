# MOTION_MANIFEST.md - 100x Expert UI Physics

## Core Physics: "High-Stiffness Spring"
All interactive elements must feel snappy, responsive, and substantial.

### Spring Config (Framer Motion)
```javascript
const expertSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1
};
```

### Hover Physics
- **Scale:** 1.05x (Subtle but noticeable)
- **Rotate:** +/- 2deg based on mouse position (if possible) or static tilt.
- **Lift:** Y-axis translation -5px.
- **Shadow:** Increase opacity and blur radius.

### Tap/Click Physics
- **Scale:** 0.95x (Tactile feedback)
- **Sound:** Instant trigger on 'pointerDown'.

## Transitions: "LayoutID Hero"
- **Avoid:** Simple opacity fades.
- **Prefer:** `layoutId` morphing. Elements should physically travel to their new positions.
- **Context:** When a card is selected, it should expand to fill the screen (Hero animation).

## Particle System: "Floating Safari"
- **Fireflies:** Slow, meandering paths using Perlin noise or sine waves.
- **Leaves:** Occasional drift-down animation.
- **Depth:** Parallax effect on mouse move (if performant).
