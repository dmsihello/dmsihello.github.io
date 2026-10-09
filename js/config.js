/* ==========================================================================
   DMSI SITE SETTINGS: the only file you need to edit to
   (1) switch on the Apply buttons and (2) add photos to the galleries.
   ========================================================================== */

window.DMSI_CONFIG = {

  /* ---- 1. GOOGLE FORM LINKS FOR APPLICATIONS ----------------------------
     Paste the link to your Google Form between the quotation marks.
     - "us"      : DMSI US (Kalamazoo)
     - "uk"      : DMSI UK (Leeds)
     - "general" : used by any Apply button that has no edition-specific link
                   (so one form for both editions? fill in only "general").
     Leave a link empty ("") and its button shows "Applications opening soon".
     Once a link is filled in, every Apply button on the site switches on. */
  applyForms: {
    general: "",
    us: "",
    uk: ""
  },

  /* Label on the Apply buttons, and the text shown while a form is not set. */
  applyLabel: "Apply now",
  closedLabel: "Applications opening soon"
};

/* ---- 2. PHOTO GALLERIES -------------------------------------------------
   Save a photo into the matching folder under assets/gallery/, then add a line
   for it below. Each line looks like:
     { src: "assets/gallery/year-by-year/2026/leeds-01.jpg",
       alt: "Describe the photo for screen-reader users",
       caption: "Optional caption shown under the photo",
       region: "uk" },                       <- "us" or "uk" (optional)
   Lightning-talk photos can also carry a  year: 2025  so visitors can filter.
   Tip: resize photos to about 1600 pixels wide before uploading. */

window.DMSI_GALLERIES = {

  /* Year by Year page: one gallery per year */
  "year-2026":    [ ],
  "year-2025":    [ ],
  "year-2024":    [ ],
  "year-earlier": [ ],

  /* Lightning Talks page */
  "lightning-talks": [ ]
};
