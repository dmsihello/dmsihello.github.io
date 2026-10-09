# DMSI website

A static site (no build step) for the Digital Medieval Studies Institute.

## Publish on GitHub Pages
1. Create a repository and upload the contents of this folder (keep `index.html` at the top level).
2. In the repository go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. Your site appears at `https://<username>.github.io/<repository>/`.

## The file to edit most: `js/config.js`
**Google Form for applications.** Paste your form link into `applyForms` (`us`, `uk`, or `general` for one shared form). Every Apply button on the site (Upcoming 2027 page, Registration page, Lightning Talks page) switches on automatically. While a link is empty, buttons read "Applications opening soon" and the Registration page shows a "not yet open" notice.

**Photo galleries.** Save photos in the matching folder, then add one line per photo in `config.js`:
- `assets/gallery/year-by-year/2026/`, `2025/`, `2024/`, `earlier/` for the Year by Year page (one gallery per year)
- `assets/gallery/lightning-talks/` for the Lightning Talks page (add `year: 2025` to a photo and visitors can filter by year)

Photos open in a viewer with next/previous, arrow keys and Esc. Resize photos to about 1600 px wide first.

## Add the logos
Save logo files in `assets/` using these exact names:
- `dmsi-logo.png`, `kalamazoo-logo.png` (DMSI US), `leeds-logo.png` (DMSI UK)

## Edit content
- Home text and philosophy: `index.html`
- Upcoming 2027 sessions (dates, workshops once announced, programme): `locations.html`
- Past sessions, year by year: `past-sessions.html` (fill in the "to add" items; when a new year ends, copy a year block to the top)
- Lightning Talks page text: `lightning-talks.html`
- Testimonials: `testimonials.html`; photos in `assets/testimonials/`
- Registration details (fees, deadlines once known): `register.html`
- Menu and footer: `js/main.js` (edit once, applies to every page)
- Colours and fonts: top of `css/style.css`
