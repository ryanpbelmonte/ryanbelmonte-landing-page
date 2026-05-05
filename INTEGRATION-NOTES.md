# Integration Notes: Lightbox into Landing Page

## 1. Lightbox Placement and Rationale

I added a new gallery section for photos of my sister Lorraine with 5 pictures. It's placed after the "Ola and I" section and before the "Bentley & Marla" memorial section.

I put it there because:
- It adds photos of family beyond just me and my wife
- It flows naturally with the other family stories on the page
- The JavaScript lightbox makes it stand out as the new interactive feature
- It shows I integrated the Week 3 starter code while keeping everything else the same

## 2. Content Choices

All 5 photos are personal photos of my sister:
- Birthday cake celebration
- Two photo booth pictures (one with props, one with peace sign)
- With Dutchy (in the middle)
- In the flower field

These photos represent my sister and expand the portfolio to show more family relationships beyond just my wife.

## 3. Class Names and HTML Structure

I added a new section using the starter's HTML pattern instead of changing the existing galleries.

**Sister Gallery structure:**
- Uses `class="gallery"` with `.gallery__thumb` on each image
- Each photo wrapped in a `.photo` div

**JavaScript Lightbox:**
- Single `<div id="js-lightbox">` that all thumbnails share
- Contains `.lightbox__img`, `.lightbox__caption`, `.lightbox__close`, and `.lightbox__backdrop`
- When you click a thumbnail, JavaScript updates the image and caption inside this one div

**Why I used both approaches:**
- Original galleries still use hash navigation (click photo → URL changes → CSS shows overlay)
- Sister gallery uses JavaScript (click photo → JS fires → state changes → image updates)
- Kept original galleries unchanged like the assignment asked
- Demonstrates understanding of both patterns

## 4. CSS Conflicts and Resolution

### Problem 1: Multiple lightbox divs
The original galleries have many `<div class="lightbox">` elements. When I added the starter's lightbox.css, it was messing with all of them.

**Fix:** I gave the new lightbox a unique id (`#js-lightbox`) and added specific CSS rules for it so it doesn't interfere with the original lightboxes.

### Problem 2: CSS loading order
When `lightbox.css` loaded after `style.css`, the gallery grid sizes were getting messed up.

**Fix:** Reordered the CSS links so `lightbox.css` loads first, then `style.css`. This way my original gallery styling wins for the old galleries.

### Problem 3: Grid sizes don't match
Original galleries use larger thumbnails (220px minimum), but the starter uses smaller ones (160px).

**Fix:** Added a CSS rule that forces the Sister gallery to use the starter's 160px grid, while keeping the original galleries at 220px. This makes the Sister gallery look visually different, which is actually good because it shows it's a new feature.

### Problem 4: Dark overlay on warm page
The starter's dark overlay looks different from my warm color palette, but I left it anyway because it clearly shows the lightbox is something separate from the page.

## 5. How the JavaScript Works

When you click a sister photo:
1. Event listener fires on the thumbnail
2. It calls `openLightbox(index)` 
3. That updates the state (which photo to show)
4. `render()` reads the state and updates the image and caption
5. The CSS class `.open` makes the lightbox visible
6. You can close it with the X button, clicking the background, or pressing Escape

The code uses `textContent` instead of `innerHTML` to prevent XSS attacks.

## Summary

I added a new sister gallery section that uses the JavaScript lightbox pattern from Week 3, while keeping all the original galleries exactly as they were. The Sister gallery has 5 personal photos and the whole section shows I understand how to integrate new features without breaking existing code.
