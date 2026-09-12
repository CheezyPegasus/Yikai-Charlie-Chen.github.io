# 15-113 Project 1 — AI Prompt Log
**Student:** Charlie (Yikai) Chen  
**Project:** Personal Portfolio Website  
**AI Tool:** ChatGPT  
**Purpose:** Documentation of AI-assisted brainstorming, web-development learning, debugging, design iteration, and deployment work for 15-113 Project 1.

> **Scope note:** This log reconstructs the portfolio-related conversation from the current ChatGPT thread. It includes the substantive user prompts and the corresponding assistant guidance/outputs that materially affected the website. Tool-only execution details, internal system messages, and repetitive low-level command output are omitted. Where the conversation contained many rapid iterations around the same change, they are grouped together and labeled as such.

---

## 1. Initial visual direction

### User
> chat, I need to build a personal website  
> the vibe I'm aiming for is a dark, Polyphia neoclassical vibe  
> like Playing God, Genesis, Chimera and that type of stuff, idk if you know, like medieval, renaissance, and christianity/evangelical vibes but also a bit mordern, symplistic and even dark

### Assistant
Discussed a visual direction combining dark neoclassical architecture, Renaissance/Christian imagery, modern spacing, and Polyphia-adjacent visual references.

---

### User
> https://polyphia.com/  
> look at the current website and whatever archives of prior versions are there  
> also reference the mural style of CMU CFA

### Assistant
Used Polyphia and CMU CFA as visual references, noting the contrast between ornate historical architecture and modern minimal web composition.

---

### User
> https://www.cs.cmu.edu/~113/  
> this is the class I'm building this for

### Assistant
Adjusted the plan around the 15-113 Project 1 requirements: portfolio structure, responsive design, GitHub Pages deployment, AI-use documentation, and an interactive feature.

---

## 2. Branding / logo direction

### User
> ok so first of all, make a CC logo that looks like chanel but not anything that's like plagiarized

### Assistant
Proposed an original interlocking “CC” monogram direction inspired by mirrored luxury monograms without directly copying Chanel.

---

### User
> Lvthiery, Mvsic, Programming, Athleticism, Tricking, Swimming  
> I want it to be an ultimate hub for almost all my current interests and ECs  
> and that logo is garbage, don't make another until I say so

### Assistant
Stopped iterating on the logo and shifted focus to information architecture and discipline pages.

---

## 3. Project-1 structure

### User
> ### Project 1: Personal Portfolio Website (Weeks 1-2)
> ...
> **Requirements:**
> - About Me section with bio, photo, interests, skills
> - Projects section
> - Contact section
> - Responsive design
> - Professional appearance
> - Optional interactive feature
> - Deployed and live via GitHub Pages

### Assistant
Mapped the site around the course deliverables while preserving the broader personal-hub concept.

---

### User
> I also need about me, resume, contact, socials, linktree, projects, and like some funny game

### Assistant
Expanded the site map to include:
- Home
- About
- Disciplines
- Projects
- Resume
- Socials
- Link hub
- Contact
- LVDVS / arcade

---

## 4. Roman inscription / architectural motif

### User
> LVTHIERY // Engineering  
> MVSIC  
> PROGRAMMING  
> it should be a slow scorlling bar horizontal, with the texts in Roman all-caps font, like the sculpture on ancient buildings

### Assistant
Designed the idea of a continuously scrolling inscription/frieze using Roman-capital typography, later implemented as a clickable discipline navigation bar.

---

### User
> BVSINESS -- https://pittsburghpearls.base44.app/ (draft)  
> this is my own jewelry startup, a bit behind on everything

### Assistant
Added BVSINESS / Pittsburgh Pearls to the discipline architecture and project links.

---

## 5. Sacred / Renaissance visual references

### User
Shared a classical statue reference and wrote:
> one aesthetic is a white marble Saint Mary's statue, and another is tears falling out of the woman's eyes, like Mateus Asato's NeuralDSP plugin  
> another is a greek statue like this one  
> and obviously angel wings are important, but either black or white, or gray/dark purple

### Assistant
Recorded a design vocabulary around:
- white marble devotional imagery
- classical sculpture
- angel wings
- black / white / gray / purple
- sacred imagery used sparingly rather than as generic decoration

---

### User
Shared a Marian statue image and wrote:
> like this one, I include it because 1. I'm christian but not catholic and 2. my own mother is a crucial factor in my successes and position today

### Assistant
Kept Mary as a specific About/Persona symbol tied to gratitude, memory, family, and faith rather than using it indiscriminately throughout the site.

---

## 6. First implementation / local development

### User
> ok now use Codex and make a pilot version with placeholder name, education and more  
> also refer to my resume

### Assistant
Created an initial local portfolio prototype and began using placeholder academic content and resume-derived structure.

---

### User
> SON WHAT?? like nice job but now actually start putting some effort into it, like base44 , with fonts and styles; like this rough draft is very rough 💀

### Assistant
Reworked the site toward a more deliberate visual language with stronger typography, architectural references, and less generic card-based styling.

---

## 7. Interactive arcade ideas

### User
> also where are these??
> 1. Choose Your Discipline
> 2. How Charlie Are You?
> 3. Instrument Guessing Game
> 4. Catch the Pick
> 5. 404-style boss fight
> 6. Random Interest Generator

### Assistant
Implemented a six-game LVDVS / arcade page with JavaScript interactions for each concept.

---

## 8. Expanding disciplines

### User
> ANIME as another point  
> FELINE as another new one  
> also the style is not even close to what I'm going for rn; like look at CMU's CFA building, or Andrew Carnegie's museum of art n natural history the sculpture hall

### Assistant
Added Anime and Feline, and pushed the visual direction toward Carnegie museum / Beaux-Arts spatial composition.

---

### User
> Github and Youtube are one of the few parts of the website that are exempt from Roman Scripture styling, also make it like a rolling bar on top of the website below the centerpiece...

### Assistant
Kept internal site typography Roman/serif while allowing external platform names such as GitHub and YouTube to use their more modern native typography.

---

## 9. Full site architecture

### User
Provided a detailed site map covering:
- HOME
- ABOUT
- DISCIPLINES
- PROJECTS
- RESUME
- SOCIALS + LINKS
- LINKTREE
- CONTACT
- LVDVS / ARCADE
- ARCHIVE
- FOOTER

and detailed sub-structure for Mvsic, Lvthiery, Engineering, Programming, Lingvistics + Cvltvre, Bvsiness, Athleticism, Swimming, Tricking, Cooking, Anime, and Feline.

### Assistant
Converted this into the canonical structure used for the project and built local routes for the discipline pages.

---

## 10. Font / Roman-capital requirement

### User
> now fix the website, use literal TIMES NEW ROMAN or whatever font that looks like the roman scriptures seen on the old marble buildings, like the MIT one

### Assistant
Changed internal typography to Times New Roman / Times and reserved Arial/Helvetica only for external platform branding.

---

## 11. Museum / marble redesign

### User
Shared Carnegie museum / CFA hall references and requested a less stock, less generic implementation.

### Assistant
Rebuilt the site around:
- museum-hall hero
- columns / architectural axes
- stone / marble visual language
- dark Polyphia-adjacent sections
- clickable discipline frieze
- local sub-routes
- a more monumental layout

---

## 12. Palette correction

### User
> first of all nice job, but the entire website is piss yellow 💀  
> top text could be "CARNEGIE MELLON · SAN FRANCISCO · PITTSBVRGH" instead  
> and please do not use Arial for anything that's not external source

### Assistant
Revised the palette toward cool white marble, gray limestone, charcoal, and muted purple; changed the top inscription; and enforced serif internal typography.

---

## 13. 21:9 discipline gallery

### User
> the gallery also looks very disgusting, just make a 4:3 block with shading/fade in...
> ...
> wait, actually use 21:9

### Assistant
Rebuilt the discipline gallery as cinematic 21:9 image panels:
- image visible by default
- gray hover veil
- discipline title
- one-sentence description
- “Enter Gallery” interaction

---

## 14. About / heading cleanup

### User
> PERSONA  
> ## ABOUT THE ARCHIVE  
> first of all, why is it saying the archive, and also make Persona the same size as the other title...

### Assistant
Iterated on section-heading hierarchy and removed “About the Archive” in favor of “About Me” / more relevant headings.

---

## 15. Major Renaissance-Christian-modern-neoclassical critique

### User
> I want it to be full on Renaissance, christianity, and modern-neoclassical themes that's a blend of them, but not bland, generic or plain...

### Assistant
Recommended and then implemented a more complete design system:
- hero as architectural façade/interior rather than a generic card
- restrained Renaissance pigments
- sacred geometry / halos / axes / triptychs
- Mary as a specific devotional About motif
- 21:9 galleries framed like frescoes
- Project section as a triptych
- Resume as archival register
- Socials as a deliberate modern break
- Contact as a dark chapel/apse finale
- motion used as the “modern” element rather than app-style UI

---

## 16. Reveal bug / empty-site debugging

### User
Shared screenshots showing only the museum background and navbar and wrote:
> FINALLY CLOSER TO WHAT I WANTED
> ...
> empty empty EMPTY

### Assistant
Diagnosed the issue as:
```css
.reveal { opacity: 0; }
```
combined with JavaScript/IntersectionObserver not activating. The fix changed the site to progressive enhancement: content remains visible without JavaScript.

---

## 17. Hero typography tuning

### User
Requested:
- smaller CHARLIE CHEN
- larger supporting text
- darker gray text
- new academic lines:
  - `B.S. Artificial Intelligence · Carnegie Mellon University`
  - `PITTSBVRGH · CARNEGIE MELLON · SAN FRANCISCO`
- larger dedication text in black / white / gray

### Assistant
Adjusted hero text hierarchy and contrast while preserving the museum background.

---

## 18. GitHub setup and deployment

### User
Asked how to post the site to GitHub and later showed terminal output for:
```bash
git init
git branch -M main
git add .
git commit -m "Initial personal portfolio website"
```

### Assistant
Guided through:
- `.gitignore`
- setting the remote
- pushing to `CheezyPegasus/Yikai-Charlie-Chen.github.io`
- enabling GitHub Pages from `main` / root
- interpreting initial 404 while GitHub Pages was building

---

## 19. 15-113 rubric audit

### User
Provided the 15-113 minimum requirements and asked:
> 1. check this, what am I missing for now?
> 2. my goal is to finish this in the next 25 minutes

### Assistant
Identified high-priority requirements:
- portfolio itself must appear in Projects
- visible source credits
- AI-use comments
- personal photo
- live-link / responsive test
- later, after checking the official page, also noted a prompt-log requirement

---

## 20. Credits / Sources and AI-use documentation

### User
> can you help me add Credits/Sources page and AI comments?

### Assistant
Created:
- `/credits/` page
- visible footer link
- source attribution for museum references, TechSpark, StewMac, Unsplash/Pexels placeholders, Marian reference
- explicit AI-use comments in:
  - `index.html`
  - `style.css`
  - `script.js`
  - LVDVS files

---

## 21. About-section content

### User
Requested a static deep gray About section and supplied:
- Education
- Locations
- Languages
- Practice

### Assistant
Updated the About register to:
- Carnegie Mellon University
- Statistics and Machine Learning → Artificial Intelligence
- Pittsburgh / San Francisco / Los Angeles
- English / Mandarin fluency
- Spanish / Japanese conversational
- German interest
- Cooking / Music / Crafting

---

## 22. Personal photo and medallion interaction

### User
Uploaded a personal photo and wrote:
> now I need to find a picture of myself, and make the Saint Mary profile rotate when the cursor glides over it, like a rotating wheel or coin

### Assistant
Implemented a two-sided medallion:
- Saint Mary on the front
- Charlie’s photo on the reverse
- CSS 3D Y-axis rotation
- hover/focus on desktop
- click/tap and Enter/Space support
- no grayscale filter

---

## 23. Real About page

### User
> the next one is to fix the page within http://127.0.0.1:8000/about/ rather than the current placeholder site
> ...
> add a list of DISCIPLINES ... narrow dark grey placard with rounded corners

### Assistant
Built a full `/about/` page:
- Carnegie museum backdrop
- deep gray panel
- editable biography area
- lower DISCIPLINES directory
- rounded dark-gray placards
- filled dot before each discipline
- links to discipline routes

---

## 24. Biography writing

### User
Submitted a self-written biography beginning:
> Hello! I am Charlie, or Yikai Chen.
> I'm a current Statistics and Machine Learning student at Carnegie Mellon University...

### Assistant
Edited grammar and flow while preserving the user’s voice, then inserted the revised text into `/about/`.

---

## 25. Social links

### User
Provided:
- https://www.instagram.com/cosplayatcmu/
- https://www.instagram.com/lingotheband/
- https://www.instagram.com/cmutricking/

### Assistant
Made the handles clickable.

---

### User
Requested:
> get rid of the weird arrow after every link
> and then after lingo add these two links:
> @chromiummusic -- instagram.com/chromiummusic
> @oneoneoneband -- instagram.com/oneoneoneband
> also make "I" and ABOUT ME the same size and same color, and make the text a bit smaller

### Assistant
Removed arrow glyphs, added Chromium and OneOneOne links, equalized `I` and `ABOUT ME`, and reduced the About typography slightly.

---

## 26. Official criteria check

### User
> ok now check with the criteria in https://www.cs.cmu.edu/~113/project1.html

### Assistant
Audited the project against the official page and identified:
- About / photo / interests / skills: present
- Contact: present
- Credits: present
- Responsive CSS: present
- AI comments: present
- JavaScript interactivity: present
- Portfolio project still needed in Projects
- Prompt log required in repository
- dead `href="#"` links should be removed
- GitHub Pages root-relative path handling should be checked

---

## 27. Schulte Grid project

### User
Provided repository:
> https://github.com/CheezyPegasus/Schulte-Grid-15122-Spring2026

### Assistant
Connected the project card to the source repository.

---

### User
Provided resume text:
> **15-122 Independent Data Structure Development — Schulte Grid Spring 2026**
> - Implemented a 2D-array-based Schulte grid interface in C...
> - Combined cognitive psychology principles with computer science concepts...

### Assistant
Prepared to expand the Schulte project write-up for the website.

---

### User
> before that, for screenshot just like run the code in the terminal, and take some output and display it in a code terminal/box alongside the project

### Assistant
Compiled and ran the actual C project locally and used a real 5×5 output in a styled terminal panel. The project card was expanded and linked directly to the GitHub repository.

Example output included:

```text
$ ./schulte-demo
Creating a 5x5 schulte grid...
Initializing with random values 1..25...
Printing grid:
 -------------------------
 | 18 | 11 | 1  | 6  | 20 |
 -------------------------
 | 25 | 14 | 10 | 21 | 3  |
 -------------------------
 | 13 | 19 | 15 | 23 | 24 |
 -------------------------
 | 5  | 16 | 22 | 8  | 17 |
 -------------------------
 | 7  | 2  | 9  | 4  | 12 |
 -------------------------
Freeing grid...
```

---

## 28. Local-server debugging

### User
Shared:
> OSError: [Errno 48] Address already in use

### Assistant
Explained that port 8000 was already occupied and suggested:
```bash
lsof -i :8000
kill <PID>
```
or temporarily switching to another port.

---

## 29. Final Git publication

### User
Asked to publish `~/Desktop/charlie_portfolio_v10_11` to the existing GitHub repository.

### Assistant
Helped correct an accidental Git repository initialized in the user’s home directory, then guided the user to initialize/fetch/reset the correct V10.11 folder against the existing GitHub repo.

---

### User
Eventually reported:
```text
[main 8061be1] Finalize Project 1 portfolio
...
To https://github.com/CheezyPegasus/Yikai-Charlie-Chen.github.io.git
d051bad..8061be1 main -> main
branch 'main' set up to track 'origin/main'.
```

### Assistant
Confirmed the push succeeded and recommended checking the live GitHub Pages deployment.

---

## 30. Prompt-log requirement

### User
> how do I get a prompt log and upload it onto the website?

### Assistant
Recommended a root-level `PROMPT_LOG.md` file and explained how to commit it to GitHub, optionally linking to it from the Credits page.

---

### User
> like do I just export this chat?

### Assistant
Explained that exporting or copying the relevant ChatGPT transcript is a good way to produce the prompt log.

---

### User
> I don't know how to export this very long chat out

### Assistant
Explained ChatGPT data export and Share → Save as PDF as possible workflows.

---

### User
> can you package this chat and all above into a prompt log, as a .md or .txt file?

### Assistant
Created this prompt log as a submission-ready project artifact.

---

# End of Prompt Log

## Suggested repository placement

Place this file at the root of the repository as:

```text
PROMPT_LOG.md
```

Then commit it with:

```bash
git add PROMPT_LOG.md
git commit -m "Add AI prompt log"
git push
```
