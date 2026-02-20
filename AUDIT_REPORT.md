# Zoo-Venture Audit Report

## 1. CRITICAL: Audio Silent on Live Site
**Severity:** Critical 🔴
**Status:** Root Cause Identified

### Investigation
The app uses the `use-sound` library to play audio from external URLs defined in `src/data.js`.
- `soundUrl` entries point to `soundjay.com` and `pixabay.com`.
- **Finding:** Direct hotlinking to these domains is failing.
    - `soundjay.com` returns **404 Not Found** (likely file structure changed or hotlinking blocked).
    - `pixabay.com` returns **403 Access Denied** (hotlinking protected).
- **Result:** No audio plays because the browser cannot load the resources.

### Recommendation
1.  **Download Assets:** Do not rely on external hotlinks. Download the required MP3 files and place them in the `public/sounds/` directory.
2.  **Update Data:** Update `src/data.js` to reference local paths (e.g., `/sounds/lion.mp3`).
3.  **Fallback:** Implement a fallback error handler in `useSound` to log when audio fails to load.

## 2. UX FIX: Swiping Logic
**Severity:** High 🟠
**Status:** Fixed in `src/App.jsx` ✅

### Issues Found
- **Direction Mismatch:** Swiping right (Previous) caused the card to exit to the *left*, visually confusing the user.
- **Animation Glitch:** `AnimatePresence` lacked context of the swipe direction, so it always used the default exit animation.
- **Responsiveness:** The swipe threshold was hardcoded to `50px` without considering velocity, making fast/short swipes fail.

### Fix Implemented
- **Dynamic Variants:** Added `direction` state (`1` for next, `-1` for previous).
- **Custom Exit Transitions:** The exiting card now moves in the correct direction (e.g., if you go to Previous, the current card slides out to the right).
- **Velocity Tracking:** Implemented `swipePower` function to calculate swipe intent based on both distance and velocity.
- **Elasticity:** Increased `dragElastic` to 1 for a more natural feel.

## 3. BUG HUNT: Code Review
**Severity:** Medium 🟡
**Status:** Reviewed

### Findings
- **State Leaks:** `useEffect` correctly cleans up audio (`stop()`) when the animal changes.
- **Performance:** `AnimatePresence` with `mode='wait'` is good for single-card transitions. However, loading audio on every render/change via `useSound` hook with a changing URL might cause network waterfalls.
    - *Optimisation:* Preload audio or use a single `useSound` instance with a sprite sheet if the app scales. For now, local files will fix the latency.
- **Console Errors:** None found in static analysis, but the 404/403 network errors for audio would flood the console in a live environment.
- **Dependencies:** `framer-motion` and `use-sound` are used correctly.

## 4. Next Steps for Lead Architect
1.  **Action:** Approve the `src/App.jsx` changes (already applied).
2.  **Action:** Source 5 reliable animal MP3 files and commit them to `public/sounds/`.
3.  **Action:** Update `src/data.js` to point to these new local files.
