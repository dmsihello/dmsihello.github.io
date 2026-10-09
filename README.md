# DMSI website

A static site (no build step) for the Digital Medieval Studies Institute.

## Publish on GitHub Pages
1. Create a repository and upload the contents of this folder (keep `index.html` at the top level).
2. In the repository go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. Your site appears at `https://<username>.github.io/<repository>/`.

## Add the logos
Save your logo files in `assets/` using these exact names:
- `dmsi-logo.png` (main DMSI logo, shown in the header and footer)
- `kalamazoo-logo.png` (DMSI US)
- `leeds-logo.png` (DMSI UK)

Until the files are added, the logos are simply hidden and the text wordmark shows.

## Edit content
- Home text: `index.html` (replace with wording from the DMSI Intro slides)
- Editions, workshops, programme: `locations.html`
- Past sessions: `past-sessions.html` (fill in the "to add" items)
- Testimonials: `testimonials.html`; put photos in `assets/testimonials/`
- Registration, bursaries, forms: `register.html` (when applications reopen, remove `aria-disabled="true"` from the button and change its label)
- Menu and footer: `js/main.js` (edit once, applies to every page)
- Colours and fonts: top of `css/style.css`
