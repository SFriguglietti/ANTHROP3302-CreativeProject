# Medical Anthropology — Web Page

A bold, high-contrast single-page website for an Anthropology class project.

## Project Structure

```
anthropology-project/
├── index.html    ← All page content — edit this file to fill in your research
├── style.css     ← Visual design and layout
├── script.js     ← Loader, animations, sticky nav, mobile menu, lightbox
├── assets/       ← Drop your own images here
└── README.md
```

## How to Edit Content

Open **`index.html`** and look for HTML comments like:

```html
<!-- ============================================================
     SECTION NAME
============================================================ -->
```

Every section has placeholder text with instructions inside it.

### Quick checklist:
- [ ] Update the `<title>` tag in `<head>`
- [ ] Edit the three hero title lines and subtitle
- [ ] Update course number in the nav (`ANTH 000`) and footer
- [ ] Fill in the Introduction text
- [ ] Replace the stat-strip numbers (00%, 0B, etc.) with real data
- [ ] Replace body text in each section
- [ ] Swap Unsplash image URLs for your own photos (or keep as placeholders)
- [ ] Update all `alt` attributes with real image descriptions
- [ ] Fill in the Bibliography section
- [ ] Update your name, course, and semester in the footer

## Deploy to GitHub Pages

1. Create a new **public** repository on GitHub
2. Push this folder's contents to the `main` branch
3. Go to **Settings → Pages**
4. Under "Source" select **Deploy from a branch → main → / (root)**
5. Click **Save** — live at `https://yourusername.github.io/repo-name` within ~1 minute

## Customization

**Change the accent color:** Open `style.css`, find `:root { }` at the top, and change `--accent: #d4242a;` to any hex color.

**Add a hero background image:**
```css
/* In style.css, inside .hero { } */
background-image: url('assets/hero.jpg');
background-size: cover;
background-position: center;
```

**Add/remove sections:** Copy a full `<section>` block in `index.html`, give it a new `id` and update the eyebrow number. Add a matching `<li><a href="#new-id">...</a></li>` to both `<nav>` elements.

**Add more cards:** Duplicate an `<article class="card">` block inside `.card-grid`.

**Add more gallery images:** Duplicate a `<figure class="gallery__item">` block inside `.gallery`.
