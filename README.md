# Charlie Portfolio V10 — Renaissance / Sacred / Modern-Neoclassical Rebuild

This is the clean rebuild based on the approved design direction.

## IMPORTANT
If you still see **ABOUT THE ARCHIVE**, **PERSONA**, **DISCIPLINAE**, **OPERA SELECTA**, or **CONNECTIONES** on the home page, you are launching an older folder. The V10 home page does not contain those headings.

## Main home-page section titles
- I · ABOUT ME
- II · DISCIPLINES
- III · SELECTED WORK
- IV · RÉSUMÉ
- V · SOCIALS
- VI · CONTACT

All six use the same primary heading size and Times New Roman inscription system.

## Major V10 changes
- Rebuilt hero as a museum-hall composition rather than a translucent portfolio card.
- Natural-color sculpture-hall background (no grayscale filter).
- White-marble / charcoal base with restrained Marian blue, oxblood, ecclesial purple, and aged-gold accents.
- Sacred geometry appears through halos, cross axes, medallions, triptych structure, and ornamental rules rather than repeated literal religious images.
- Marian image remains natural color and is framed as an engraved oval devotional medallion.
- 21:9 discipline gallery remains cinematic, full-color by default, with gray hover veil + description.
- Projects rebuilt as a three-leaf triptych, with Pittsburgh Pearls as a lower register.
- Résumé rebuilt as an archival register instead of dashboard cards.
- Socials rebuilt as clean full-width rows; external platform names retain their modern/native sans treatment.
- Contact rebuilt as the dark chapel/apse finale with halo, cross-axis geometry, restrained wing forms, and ecclesial purple.
- Added scroll reveal motion while keeping the architecture classical.

## Local preview
```bash
python3 serve.py
```
Then open `http://127.0.0.1:8000`.


## V10.2 visibility hotfix
- Fixed the blank-page bug caused by `.reveal { opacity: 0; }`.
- All content now renders visibly without JavaScript.
- Removed IntersectionObserver as a visibility dependency.
- Preserved the full V10 site, assets, subpages, layout, gallery, medallion, projects, resume, socials, and contact sections.


## V10.3 hero tuning
- Reduced CHARLIE CHEN display size.
- Replaced placeholder degree with B.S. Artificial Intelligence / Carnegie Mellon University and location row.
- Enlarged identity, summary, action links, and dedication copy.
- Darkened supporting gray text for readability.
- Dedication is now strictly black/white/gray (no oxblood accent).
- Preserved all existing V10.2 sections and routes.
