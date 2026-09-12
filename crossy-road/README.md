# Professor Peep's Campus Dash

## About the game

> **Write this section yourself before submitting (1–2 sentences; no AI).** Describe what the game is, how your version differs from stock *Crossy Road*, and whether you continued your in-class version or restarted it.
This game is an imitation of the original crossy roads game, except I changed the avatar to a slightly different chicken character that I really liked instead of the stock one; the in-class version looks lie a failed 5th grade coding project with poorly designed sprites and awful movements in the cars, this one has much nicer and much more playable, rather than two drafts of "slop" generated in class that is completely dysfunctional.

## How to play

Help Professor Peep cross the campus by moving one square at a time through traffic.

- **Move:** Use the arrow keys or WASD. On a phone or tablet, swipe across the game or use the on-screen direction buttons.
- **Score:** Your score increases by one whenever you reach a new lane farther forward. Moving sideways or backward does not reduce it.
- **Lose:** The run ends if Professor Peep touches a campus shuttle, scooter, or runaway coffee cart.
- **Restart:** Select **Try again**, or press Enter or Space after losing.
- **Sound:** Sound is off by default. Use the **Sound off/on** button to toggle the synthesized sound effects. (unfortunately unable to find any good and functional sound samples to retrofit :( ))

The highest score is saved in the browser using `localStorage`.

## AI models, tools, and strategy

- **Tool:** Kiro IDE in Autopilot mode
- **Model:** GPT 5.6 Sol
- **Strategy:** I built the no-dependency core loop first—movement, generated lanes, collisions, scoring, and restarting—then added the custom campus theme, responsive controls, accessibility features, sound, visual polish, and repeated difficulty simulations.

The important prompts from this process are recorded in [`prompt_log.md`](prompt_log.md).

## Known issues and unfinished work

- The game has not yet been published or tested at its final GitHub Pages URL.
- The project still needs to be added to the projects section of the portfolio.
- The author-written description in **About the game** still needs to be completed.
- No gameplay-breaking issues are currently known from local testing, but final visual and input testing should be completed on the published site.

## Running the game

No installation, server, package manager, or build step is required. Open `index.html` in a browser, or place this folder in a GitHub Pages repository and visit the folder's URL.
