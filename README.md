# PHOSPHOR

### A retro terminal simulator for tabletop role-playing games

[Click here to skip the preamble and jump straight to Getting Started](#getting-started).

## Inspiration

The inspiration for this little app was [Quadra's post](https://www.traaa.sh/the-ypsilon-14-terminal) about an ersatz terminal for [The Haunting of Ypsilon 14](https://www.mothershiprpg.com/pamphlet-adventures/#The_Haunting_Of_Ypsilon_14), a module written by D G Chapman for [the Mothership tabletop roleplaying game](https://www.mothershiprpg.com/).

Because of that (and because I was asked on [the Mothership Discord](https://discord.gg/uuvxG29)), I've made the JSON content that I used when I ran the module available in this repo. To use it, just load `ypsilon14.json` instead of `sample.json` at the top of `src/components/Phosphor/index.tsx` (line 22 as of this writing).

Or you can skip doing it yourself and instead just check out [the Ypsilon 14 terminal in action](https://redhg.com/ypsilon14/).

## An important note about this project

I will not be accepting pull requests, nor will I be paying attention to the issues. I suggest you fork this repo if you want to make any public changes. It's all just for fun; noodling around without a particular goal.

That being said, I'd love to see what _you_ can do with my garabge project, so send me an email at **phosphor {at} redhg {dot} com** to let me know how you've expanded it!

Suggested features:

- Sound effects;
- Autoscrolling or auto-pause/press space to continue at end of screen;
- Asset preloader;
- JSON uploading & parsing;
- Routing support;
- Dynamic themes -- I've added some colour values in `_colors.scss` but they don't work yet;
- Links, Prompts, Images, and Teletype support _within_ Dialogs.

---

## Getting Started

This project is a Next.js app. The recommended package manager is PNPM, which is installed automatically if you're using corepack.

To install this project, open a terminal window and `cd` into the repo's directory, then run

### `pnpm install`.

## Available Scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `pnpm build`

Builds the app for production.
See the section about [deployment](https://nextjs.org/docs/app/getting-started/deploying) for more information.
