# BackofficeApp — Roadmap

> A living document. **You** own the work; your mentor (Claude) owns the steering and the reviews.
> Started 2026-10-21. Revise it at every phase retro.

The product is an **infrastructure / ops console**: services, deployments, live logs, alerts, incidents, and users with roles. It has a retro green CRT terminal look. The real product is **you**: by the end you should be able to explain every line of this app, and why it was written that way and not another.

---

## How this document works

- Work is broken down as **Phase → Epic → Ticket**. Each ticket becomes a GitHub issue. Each epic becomes a parent issue or milestone.
- **Rolling-wave planning:** only the next few phases are broken into detailed tickets. Later phases are listed as epics with learning goals and get detailed when we reach them. Real teams plan this way because what you learn in Phase 2 changes how Phase 5 should be designed. Detailed tickets written months ahead are mostly fiction.
- **Ticket sizes** are counted in **sessions** (1 session = 1 hour). If a ticket blows past its estimate by more than 2×, stop and raise it at standup. That's a signal, not a failure.
- Each ticket has these parts:
  - **Why**: the reason the ticket exists
  - **Tasks**: what to do
  - **Acceptance criteria (AC)**: how we know it's done
  - **Checkpoint**: concepts you must be able to explain before it closes
  - **Sources**: where to read
  - **Guard** (sometimes): where the rabbit holes are

---

## Team agreements

1. **The master rule:** everything on `master` is code you can explain line by line. If you can't explain it, it doesn't merge.
2. **One ticket → one branch → one PR.** Branch names look like `feat/T2.6-login-form`, `chore/T0.4-line-endings`, `spike/T0.9-cascade`. Commits follow [Conventional Commits](https://www.conventionalcommits.org).
3. **You never merge unreviewed.** I review using [Conventional Comments](https://conventionalcomments.org) labels: `blocking:`, `issue:`, `suggestion:`, `question:`, `nit:`, `praise:`. Every `blocking:` must be resolved before merge. `nit:` comments are optional.
4. **Hint ladder.** Before any hint, you tell me what you tried and what you think is happening. The levels are:
   1. I ask a question back.
   2. I give you the concept or keyword to look up.
   3. I point you at a primary source.
   4. I describe an approach in prose or pseudocode.
   5. I give you the solution, but **only** if you explicitly ask for it.
5. **20-minute timebox.** If you've been stuck on the same quirk for 20 minutes, stop. Write down what you tried and ask. Knowing when to escalate is a professional skill, not a weakness. This is also your guard against CSS-quirk rabbit holes.
6. **Primary sources first**: MDN, angular.dev, web.dev, the WAI-ARIA Authoring Practices Guide (APG), OWASP, the specs. Blog posts come second. Never paste code you can't explain. If you adapted something from somewhere, say so in the PR and expect to be grilled on it.
7. **Grading.** Every checkpoint answer is graded **canonical / partial / misconception**. A ticket closes only when all of its checkpoints are canonical.
8. **Decisions get ADRs.** Every new dependency, and every architectural choice someone might later ask "why?" about, gets an Architecture Decision Record in `docs/adr/`.
9. **Learning notes.** Spike tickets end with a note in `docs/learning/`, written in your own words. Those notes get graded too.
10. **Session rhythm.**
    - Each session opens with a standup message to me:
      ```
      Done: ...
      Today: T-x.y ...
      Blockers: ...
      ```
    - Each session closes with your work pushed and a one-line status on the PR or issue.
11. **Every phase ends with a retro.** Write down what went well, what didn't, and what we change. Then revise this document.
12. **AI autocomplete is off in this repo.** This is a pre-AI simulation.
13. **Experiments never go on `master`.** Scratch files like `unknown.ts` belong outside the repo or on the `playground` branch.

## Definition of Done (applies to every ticket)

- [ ] All acceptance criteria are met.
- [ ] All checkpoints are graded **canonical**.
- [ ] Tests cover the new behavior, and the full suite is green.
- [ ] Lint, format and type-check pass, and CI is green. *(from T0.8)*
- [ ] **Accessibility floor:**
  - fully keyboard-operable
  - visible focus at all times
  - semantic HTML, with correct ARIA only where HTML isn't enough
  - `prefers-reduced-motion` respected
- [ ] No hardcoded colors, spacing or z-index values outside the tokens. *(from T1.2)*
- [ ] Every user-facing string is translatable. *(from T2.8)*
- [ ] No `any` without a comment explaining why.
- [ ] The PR description covers what changed, why, how to test it, and includes screenshots for any UI change.
- [ ] An ADR was written if a decision was made.

---

## Baseline: placement test (2026-10-21)

The same 12 questions get re-taken at the end of Phase 2 (T2.9).

| # | Topic | Grade | Gap | Fixed in |
|---|-------|-------|-----|----------|
| 1 | `<div (click)>` vs `<button>` | Partial | Got focus and keyboard. Missed the screen-reader role, `disabled` semantics, and form participation. The "cursor" claim is wrong: browsers don't give buttons a pointer cursor; *your own CSS* adds it. | T2.1 |
| 2 | `<form>` behavior | Partial | `(submit)` is a native DOM event, not an Angular emitter. Missed implicit submission, password managers, native validation, and the default `type` of a button inside a form. | T2.6 |
| 3 | The cascade | Misconception | Specificity is one cascade criterion of several, and not the first. Inline styles are not "higher specificity". | T0.9, T1.3 |
| 4a | Overlay vs. clicks | Canonical | — | — |
| 4b | Picker scanlines | Partial | The picker isn't "taken out of the document". The concept you need to name and understand is the **top layer**. | T1.8, E5.1 |
| 5 | Event loop | Partial | The output is right, but `setTimeout` doesn't queue a microtask, so your explanation contradicts itself. | T0.12 |
| 6 | Closures | Partial | Your example is valid, but the definition is imprecise, and you didn't explain why closures matter. There's a more important closure in `shared/utils`. | T0.12 |
| 7 | `any` vs `unknown` | Partial | The point of `unknown` is **narrowing**. "Might change in the future" is wrong. | T2.5, E4.1 |
| 8 | `inject()` | Misconception | `inject()` *resolves* a dependency; it doesn't register one. It throws when called outside an injection context, so it won't work inside `onCheck()`. | T0.10 |
| 9 | `detectChanges()` | Misconception | It has nothing to do with `@Input`. The real cause is zoneless change detection plus a plain field mutated inside a subscription. | T0.11 |
| 10 | Signal vs Observable | Partial | Good intuition, but "Angular does its magic" is not a mechanism. Missed laziness, cancellation and completion. | E4.3 |
| 11a | Search-as-you-type | Partial | `debounceTime` is right, but you missed the **race condition**, which is the bug that ships to production. | E4.2 |
| 11b | Double-clicked Save | Canonical | `exhaustMap` is correct. Bonus: what else protects you besides the operator? | T2.5 |
| 12 | Token storage | Misconception | You swapped XSS and CSRF. JavaScript can't set an `httpOnly` cookie; only the server can. You also missed in-memory storage. | E3.0 |

**The pattern:** you usually reach for the right tool, but you can't explain the mechanism underneath it. Phrases like "magic", "something to do with" and "or whatever" mark every gap. That's why the checkpoints in this plan target *how it works*, not *what to call*.

---

## Phase map

| Phase | Theme | Backend | Detail level |
|-------|-------|---------|--------------|
| **0** | Team workflow, quality gates, fundamentals spikes | — | Detailed |
| **1** | Design foundations: tokens, CSS architecture, layout, motion, theming | — | Detailed |
| **2** | First primitives, forms, the login screen, routing, i18n | — | Detailed |
| 3 | NestJS arrives: real authentication and RBAC | NestJS | Epics |
| 4 | Data layer and RxJS core: HTTP, caching, URL state, signals ↔ RxJS | NestJS | Epics |
| 5 | Ops-console features and the remaining primitives | NestJS | Epics |
| 6 | Real-time and high volume: WebSockets, backpressure, virtual scroll | NestJS | Epics |
| 7 | Performance and rendering | NestJS | Epics |
| 8 | Security hardening | NestJS | Epics |
| 9 | Production: Docker, deployment, observability | NestJS | Epics |

**Threads that run through every phase:** accessibility, tests, i18n, motion, tokens, ADRs, and refactoring old code when you learn something that makes it wrong.

At 1h/day this is well over a year of work. That's by design.

---

# Phase 0 — Team workflow & quality gates

**Goal:** before writing a single feature, the project works like a real team's repo: a clean master, tickets, PRs, lint, tests and CI. Then four short spikes fix the worst gaps from the placement test.

## E0.1 — Repo hygiene & workflow

### T0.1 — Archive the experiments, clean `master`
**Why:** the master rule. Right now `master` contains copied code you can't explain: the Bootstrap classes, `ExampleDataSource`, and the CDK select.

**Tasks**
- [ ] Deal with your uncommitted login changes first. Decide between a WIP commit and `git stash`, and justify the choice.
- [ ] Create a `playground` branch from the current state and push it. Nothing gets lost.
- [ ] On a branch off `master`, remove all scratch and copied code:
  - the dashboard contents (keep it as an empty placeholder page)
  - `select-custom/`
  - `select-modal/`
  - the placeholder sidebar text
- [ ] Every file you **keep**, you must be able to explain line by line in review. That includes `ripple.ts`. Anything you can't explain goes.
- [ ] Keep `minSelectedItems`. It's the subject of your first test (T0.7).
- [ ] Open a PR, even for a cleanup. Get it reviewed, then merge it.

**AC**
- `playground` exists on GitHub with the old state.
- `master` builds, and `/login` and `/app/dashboard` still render.
- Review finds no line on `master` you can't explain.

**Checkpoint**
- What does `git stash` do compared with a WIP commit, and when would you pick each?
- Why use a PR for a solo cleanup? (There are at least two reasons.)

**Size:** 1 session

### T0.2 — GitHub as a team tool
**Tasks**
- [ ] Create a GitHub Project board with the columns Backlog → Ready → In progress → In review → Done.
- [ ] Create labels in three groups:
  - type: `feat`, `fix`, `chore`, `spike`, `docs`, `test`
  - area: `css`, `a11y`, `forms`, `routing`, `rxjs`, `security`, `i18n`, `testing`, `ci`
  - phase: `phase-0` … `phase-9`
- [ ] Add issue templates for ticket, bug and spike, and a PR template whose checklist is the Definition of Done.
- [ ] Write a short `CONTRIBUTING.md` covering branch naming, commits and PR rules. Summarize the Team agreements in your own words.
- [ ] Protect `master`: no direct pushes, PRs required, checks must pass. *Note:* on a **private** repo with a free plan, GitHub may not enforce this. Find out what your plan allows. If it can't be enforced, the rule is enforced by discipline.
- [ ] Install the GitHub CLI (`gh`) and authenticate it.
- [ ] Create the Phase 0 issues **with `gh`** from this document, add them to the board, and label them.
- [ ] Learn enough `gh` to work from the terminal: list and view issues, create a PR, check a PR's CI status.

**AC**
- Opening a PR auto-fills your template. Test this with this ticket's own PR.
- The board shows Phase 0.

**Checkpoint**
- Why do teams standardize commit messages? Name two things that read them, at least one of which is a tool.
- What exactly does branch protection prevent?

**Size:** 1–2 sessions

### T0.3 — Your first ADR: drop Angular CDK for UI primitives (for now)
**Why:** we made this decision in conversation. Writing it down in your own words proves you understood the reasoning.

**Tasks**
- [ ] Create `docs/adr/` and an ADR template with these sections: Status, Context, Decision, Consequences, Alternatives considered. Look up Michael Nygard's original ADR format.
- [ ] Write `0001-no-cdk-for-ui-primitives.md`. Include at least one **consequence or risk I didn't mention**.
- [ ] Remove the remaining CDK usage: `table-custom`, the `OVERLAY_DEFAULT_CONFIG` provider, and the `@angular/cdk` dependency.
- [ ] Find out why `usePopover: false` was in your `app.config.ts`. You'll meet that problem again in Phase 5.

**Checkpoint**
- Why are ADRs never edited after they're accepted? What happens instead?
- What's in `package-lock.json`, and why is it committed?

**Size:** 1 session

## E0.2 — Quality gates

### T0.4 — Line endings
**Why:** every `git add` warns `LF will be replaced by CRLF`, yet your `.editorconfig` says `end_of_line = lf`. Two of your tools disagree.

**Tasks**
- [ ] Find out what `core.autocrlf` does and what yours is set to.
- [ ] Make line endings deterministic **at the repo level**, so they're correct for any contributor on any OS.
- [ ] Renormalize existing files if needed.

**AC**
- No CRLF warnings appear.
- Every file in the repo has LF line endings.

**Checkpoint**
- Why do line endings differ between operating systems?
- Why is repo-level config better than per-machine config? Picture a team of ten on mixed operating systems.

**Guard:** this is hygiene. Spend 1 session at most.

### T0.5 — Linting & formatting
**Tasks**
- [ ] Add the official Angular ESLint integration. Start from the recommended rules, **plus the template accessibility rules**.
- [ ] Decide who owns formatting so that ESLint and Prettier don't fight.
- [ ] Add `lint` and `format:check` scripts.
- [ ] Fix every violation, or justify it in a comment.

**AC**
- `npm run lint` and `npm run format:check` both pass.
- The template a11y rules are enabled.

**Checkpoint**
- What does each of these catch that the other two don't: linter, formatter, type checker?
- Why does every `eslint-disable` comment need a justification?

**Size:** 1–2 sessions

### T0.6 — Investigation: is TypeScript strict mode on?
**Why:** your `tsconfig.json` has no `strict` flag and no `strictTemplates`. Is strict mode on or off? Don't guess. Prove it.

**Tasks**
- [ ] Find the answer in the TypeScript 6 and Angular 22 docs and release notes.
- [ ] **Prove it with code.** Write a few lines that should fail to compile under strict mode and see what happens. Cover:
  - an implicit-`any` parameter
  - accessing something that may be null
  - a wrong type passed to a component input from a template
- [ ] Make the strictness **explicit** in your config, whatever the defaults turn out to be.
- [ ] Write a short note in `docs/learning/ts-strict.md`.
- [ ] *Carried over from the placement test:*
  - Your `unknown.ts` returns `string | void`. Explain why `void` in a union is a smell, what the type should be, and what the function actually returns at runtime on the path that doesn't `return`.
  - Does the "Function lacks ending return statement" error depend on a strict flag? Which one?

**Checkpoint**
- Which individual flags does `strict` bundle, and what does each one catch?
- What does `strictTemplates` add on top?
- Why write config explicitly even when it matches the defaults?

**Size:** 1 session

### T0.7 — Test suite baseline & your first real tests
**Tasks**
- [ ] Run the suite once, not in watch mode. Is it green?
- [ ] For every existing spec, either fix it or delete it, and write down why for each one.
- [ ] Write thorough unit tests for `minSelectedItems`:
  - boundary values (below, at, and above `min`)
  - empty input
  - `null` and other non-array input
- [ ] Before writing that last group, answer this: **Angular's built-in validators (except `required`) treat an empty value as valid. Does yours? Should it? Why do they do that?** Change the validator if your answer says so.
- [ ] Learn the Arrange-Act-Assert structure.
- [ ] Write one test you expect to fail and watch it fail before making it pass.

**AC**
- The suite is green.
- Every branch of the validator is covered.
- There's a script that runs the tests once, for CI.

**Checkpoint**
- What's the difference between a unit, an integration and an end-to-end test?
- What makes a test brittle?
- Why test behavior rather than implementation?
- What does a test you've never seen fail actually prove?

**Size:** 2 sessions

### T0.8 — CI pipeline
**Tasks**
- [ ] Add a GitHub Actions workflow that runs on pull requests and on pushes to `master`. It should install dependencies, then lint, check formatting, run the tests, and do a **production** build.
- [ ] Cache dependencies. Find out what the cache key should be and why.
- [ ] Add a status badge to the README.
- [ ] Open a deliberately broken PR and watch CI block it.

**AC**
- Every PR shows green checks.
- The broken PR shows red.

**Checkpoint**
- `npm ci` vs `npm install`: what's the difference, and why does CI use one and not the other?
- Why does CI build in production mode?
- What does the dependency cache key protect you from?

**Size:** 2 sessions

## E0.3 — Fundamentals spikes

A spike is a time-boxed investigation that ends in written knowledge, not shipped features. Each one ends with a note in `docs/learning/`, written in your own words, which I grade.

### T0.9 — Spike: the cascade *(fixes placement Q3)*
**Tasks**
- [ ] On a throwaway branch, put a Tailwind padding or background utility class on one of your `<input>`s, then on a `<td>`. Watch what happens.
- [ ] Explain **exactly** why, using the full cascade algorithm, not just specificity. Look at which of the rules in `styles.css` are inside an `@layer` and which aren't, and at where Tailwind v4 puts its utilities.
- [ ] Write `docs/learning/cascade.md`. It should cover every cascade criterion in order, where inline styles and `!important` fit, and how `@layer` changes the picture.
- [ ] *Carried over from the placement test:*
  - Put Tailwind's `overflow-visible` on an element that has `appRipple` (which adds `.ripple-host`, i.e. your own CSS). Predict the result, run it, and explain it.
  - State the exact rule for an unlayered declaration versus a layered one.
- [ ] **Don't fix it yet.** The fix is T1.3.

**Checkpoint**
- Why does `!important` *reverse* the order of layers?
- Where does inheritance fit relative to the cascade?

**Sources**
- MDN: "Introducing the CSS cascade" and "Cascade layers"
- The CSS Cascading and Inheritance Level 5 spec. Skim the cascade sorting order section.

**Size:** 1–2 sessions

### T0.10 — Spike: dependency injection & injection context *(fixes Q8)*
**Tasks**
- [ ] Call `inject(...)` inside a click handler, trigger it, and read the error code. Look the code up in angular.dev's error reference.
- [ ] List every place `inject()` is allowed, and explain *why* it's limited to those places. (Ask yourself: how would `inject()` know *which* injector to ask?)
- [ ] Explain providers vs. `inject()`, i.e. registration vs. resolution.
- [ ] Draw this app's injector hierarchy.
- [ ] Experiment: provide a service in `providedIn: 'root'`, then in a component's `providers`. Check whether two instances of that component share one service instance.
- [ ] Write `docs/learning/dependency-injection.md`.
- [ ] *Carried over from the placement test:*
  - `inject()` asks the **current** injector, which isn't always the `EnvironmentInjector`. Inside a component, which injector is asked first, and where does the lookup go from there?
  - You pass in a token. What do you get back?
  - Replace "declared inside the constructor" with the correct verb, and explain why the difference between *declared* and *called* is the whole point.
  - Read `auth-interceptor.spec.ts` line 7. Look up that function, and explain why `inject()` works inside an interceptor but not inside `onCheck()`.

**Size:** 2 sessions

### T0.11 — Spike: zoneless change detection *(fixes Q9)*
**Tasks**
- [ ] Compare your `package.json` with an Angular app from a few major versions ago. A dependency every Angular app used to have is missing. Which one, and what did it do?
- [ ] List what **schedules** change detection in a zoneless app.
- [ ] On `playground`, remove `this.cdr.detectChanges()` from the old select, observe what breaks, and explain it.
- [ ] Propose, in writing only, two different ways to make that call unnecessary, and say which one you'd pick.
- [ ] Explain `markForCheck()` vs. `detectChanges()`.
- [ ] Write `docs/learning/change-detection.md`.
- [ ] *Carried over from the placement test:* change the sidebar's `isOpen` into a **plain boolean field**, not a signal, and keep toggling it in the same `(click)`. **Predict first:** does the sidebar still update? Then run it. If your prediction was wrong, your "signal vs. not signal" explanation is incomplete. Find out what else notifies Angular in a zoneless app.

**Size:** 2 sessions

### T0.12 — Spike: event loop & closures *(fixes Q5, Q6)*
**Tasks**
- [ ] Correct your placement-test explanation of the `setTimeout` line.
- [ ] Predict first, then run, then explain:
  - (a) A `.then` callback schedules another `.then`. Does that one still run before the `setTimeout`? How can this freeze a page?
  - (b) Where does **rendering** fit in the event loop?
  - (c) `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))`, and then the same loop with `let`.
- [ ] Find the **second** closure in `src/app/shared` (the important kind). Explain what it captures, when that captured value is used, and why the pattern exists.
- [ ] Rewrite your closure definition until it holds up. Hint: lexical scope, and the outer function having already *returned*.
- [ ] Write `docs/learning/event-loop-and-closures.md`.
- [ ] *Carried over from the placement test:*
  - "Then the task queue" is imprecise. How many tasks does the loop take per iteration, and how many microtasks does it run? Why does that difference matter?
  - In `minSelectedItems`, when does the outer function run, how often, and what triggers it? Same three questions for the inner function.
  - Walk your "abc → backspace" sequence through `debounceTime` + `distinctUntilChanged` in both orders, and show where the duplicate request appears.

**Sources**
- Jake Archibald, "Tasks, microtasks, queues and schedules" (article), and his talk *In The Loop*
- MDN: "Closures" and "Using microtasks"

**Size:** 2 sessions

**Phase 0 retro** → revise this document.

---

# Phase 1 — Design foundations

**Goal:** a real design system foundation. Every color, size and motion value comes from tokens. The CSS architecture is deliberate. The layout is responsive and accessible. Adding a second theme should cost zero component changes.

## E1.1 — Tokens & CSS architecture

### T1.1 — Color audit (no code)
**Tasks**
- [ ] Inventory **every** color value in `src`. Look in CSS files, in templates (`bg-[#…]`, `drop-shadow-[…#38f58f]`), in inline SVG data URIs, and in the autofill override.
- [ ] Group the colors by the job each one does: background levels, text levels, borders, accents, interaction states.
- [ ] Decide how many greens you actually *need*.
- [ ] **Design question:** an ops console needs status colors (healthy, degraded, down, unknown). How do you show "down" in a single-hue green theme? Look at how real monochrome terminals handled it.
- [ ] Measure the contrast of your main text/background pairs. You decided contrast can bend, but you should know the numbers you're bending.
- [ ] Document the result in `docs/design/palette.md`.

**Checkpoint**
- What does WCAG's "Use of Color" criterion forbid, and why does it matter more for a dashboard than for most apps?
- What is a contrast ratio, roughly?

**Size:** 1–2 sessions

### T1.2 — Token architecture
**Tasks**
- [ ] Research **primitive** tokens (the raw palette), **semantic** tokens (roles such as `surface-raised`, `text-muted`, `status-danger`) and **component** tokens. Decide which layers you need.
- [ ] Decide a naming convention and write it down.
- [ ] Implement it in Tailwind v4. Work out how `@theme` relates to plain CSS custom properties, and which tokens *should* generate utility classes and which shouldn't.
- [ ] Tokenize more than color:
  - spacing
  - font sizes
  - border widths
  - radius (probably always 0, but make that a decision)
  - shadows and glows
  - a **z-index scale** (look at your `z-index: 9999`)
- [ ] Replace every hardcoded value from T1.1.

**AC**
- Searching `src` for hex colors finds them only in the token definitions.
- Changing one semantic token changes the UI everywhere it's used.

**Checkpoint**
- Why do semantic tokens make theming possible?
- What's the difference between a token defined in `@theme` and a plain `:root` variable in Tailwind v4?

**Sources**
- Tailwind v4 docs: "Theme variables"
- MDN: "Using CSS custom properties"
- The W3C Design Tokens Community Group

**Size:** 3 sessions

### T1.3 — CSS architecture & layers *(fixes the T0.9 bug)*
**Tasks**
- [ ] Decide where every kind of rule lives, and in which layer:
  - element defaults and resets
  - component classes
  - utilities
- [ ] Move your unlayered global rules accordingly.
- [ ] Decide the **styling strategy** and write it as an ADR: which styling goes in component `.css` files, which in global CSS, and which as Tailwind classes in templates. Include when `@apply` is acceptable, and when it isn't.
- [ ] Open DevTools and find out how Angular's **emulated view encapsulation** actually scopes your component CSS. Look at the generated attributes.
- [ ] Find out why `angular.json` sets a 4 kB budget for each component's styles.

**AC**
- Tailwind utilities now work on inputs and table cells.
- The styling-strategy ADR is merged.

**Checkpoint**
- Compare Emulated, None and ShadowDom encapsulation.
- What does `:host` mean?
- What does emulated encapsulation cost in specificity?

**Size:** 2 sessions

### T1.4 — Typography & font loading
**Tasks**
- [ ] Yours is a bitmap-style 8×14 pixel font. Which sizes render crisp, and why? Build the **type scale** tokens from that answer.
- [ ] Remove the arbitrary sizes from templates, such as `text-[18px]`.
- [ ] Font loading: compare `.woff` and `.woff2`. Work out what `font-display: swap` does visually on first load, and whether you should **preload** the font. Measure in the DevTools Network panel.
- [ ] Find out on which operating system `-webkit-font-smoothing` actually does anything, and what `font-smooth` is.

**Checkpoint**
- FOIT vs. FOUT.
- What do the different `font-display` values do?
- What does `preload` change about a request's priority?

**Guard:** don't go deep into font-metric overrides. Know they exist and move on.

**Size:** 1–2 sessions

## E1.2 — Layout

### T1.5 — Responsive app shell
**Tasks**
- [ ] Landmarks: `header`, `nav`, `main`, with only one `main` per page. Check your shells: are there nested or duplicate landmarks right now?
- [ ] Add a **skip link** to the main content.
- [ ] Make the sidebar collapsible using the APG **Disclosure** pattern. Your toggle has an `aria-label` but doesn't say whether the sidebar is open. What's missing? At narrow widths, the sidebar becomes a drawer.
- [ ] Decide Grid vs. Flexbox for the shell, and justify the choice.
- [ ] Only `main` scrolls. Check that keyboard users can scroll it too.
- [ ] `100vh` vs. `100dvh` vs. `100svh`: pick one and explain why.
- [ ] Breakpoints as tokens. Find **one** place where a container query is more correct than a media query.

**AC**
- Works from 320 px to 2560 px wide, with no horizontal scroll at 320 px.
- The skip link becomes visible on focus.
- The DevTools accessibility tree shows the expected landmarks.

**Checkpoint**
- Grid vs. Flexbox, beyond "1D vs. 2D".
- Media queries vs. container queries.
- How do screen-reader users actually use landmarks?

**Size:** 3 sessions

### T1.6 — Auth shell & layout routes
**Why:** `AuthShell` renders `<app-login />` directly, **and** your router config lists `Login` as its child route. One of those is lying.

**Tasks**
- [ ] Explain what the router does with that child route today.
- [ ] Explain what a **layout route** (shell) is for.
- [ ] Fix the shell so it does that job.
- [ ] Replace the fixed `h-[400px] w-[600px]` card with intrinsic, responsive sizing (`min()`, `clamp()`, max widths).

**AC**
- The auth shell works as a layout route.
- The card looks right from 320 px up to wide screens.

**Checkpoint**
- What does `<router-outlet>` do?
- What happens if a component with child routes has no outlet?

**Size:** 1 session

## E1.3 — Motion & CRT effects

### T1.7 — Motion foundations
**Tasks**
- [ ] Add motion tokens: durations and easings, including `steps()` for the CRT feel.
- [ ] Learn which properties are cheap to animate and why. Verify with DevTools Rendering → *Paint flashing*.
- [ ] Decide your **`prefers-reduced-motion` strategy**: reduce or remove? Apply it globally or per animation?
- [ ] Revisit `ripple.ts`:
  - Explain every line.
  - What happens when someone clicks rapidly?
  - **What happens to the ripple spans if the animation never runs**, for example under reduced motion?
  - Fix whatever that last question reveals.

**AC**
- All motion values come from tokens.
- Reduced motion is respected app-wide.
- The ripple can't leak DOM nodes.

**Checkpoint**
- The rendering pipeline: style → layout → paint → composite.
- Why are `transform` and `opacity` cheap to animate?
- What does `will-change` do, and why does overusing it hurt?

**Sources**
- web.dev: "How to create high-performance CSS animations"
- MDN: `prefers-reduced-motion`

**Size:** 2 sessions

### T1.8 — CRT effects & the effects toggle
**Tasks**
- [ ] Scanlines already exist. Add two more effects, such as glow, flicker or a vignette, all driven by tokens.
- [ ] Add a user **effects on/off** toggle that persists across reloads. Animated effects switch off automatically under reduced motion.
- [ ] **Flicker safety:** find WCAG's flash threshold and make sure you stay under it.
- [ ] Measure the cost of the fixed `mix-blend-mode` overlay while scrolling (DevTools Performance panel).
- [ ] Research the **top layer**: which elements render there, and why your `body::after` can't draw over them *(fixes Q4b; you'll need it for dialogs in Phase 5)*.

**AC**
- The toggle works and persists.
- Reloading shows no flash of the wrong state.
- Flicker stays within WCAG limits.

**Size:** 2 sessions

## E1.4 — Theming

### T1.9 — Theme switcher (amber terminal)
**Why:** this is the test of your token architecture. **If adding a theme means editing a single component's CSS, T1.2 failed. Go back to it.**

**Tasks**
- [ ] Build an amber theme using semantic tokens only.
- [ ] Decide where the active theme is applied in the DOM.
- [ ] Persist the choice. What's safe to keep in `localStorage`, and what isn't? (That links to placement Q12.)
- [ ] Avoid the **flash of the wrong theme** on load. Why does it happen in an SPA, and where must your fix run?
- [ ] Set the `color-scheme` property, and find out what it changes: scrollbars, form controls, autofill.
- [ ] Choose the right control and pattern for the switcher (radio group, toggle button, or select), and justify it.

**AC**
- Switching themes requires no component CSS changes.
- Reloading keeps the theme, with no flash.
- The switcher is keyboard-operable and has correct semantics.

**Size:** 2–3 sessions

**Phase 1 retro.**

---

# Phase 2 — First primitives, forms & the login screen

**Goal:** a production-grade login screen built from your own primitives. It needs proper form semantics, validation UX and async state handling, plus a real routing architecture and i18n. The backend is still faked here; it becomes real in Phase 3.

## E2.1 — Primitives

### T2.0 — Component showcase route
**Tasks**
- [ ] Create a dev-only route (e.g. `/dev/components`) that shows every primitive in every state. It's a poor man's Storybook.
- [ ] Find out how to make sure it **never ships** in a production build.

**Checkpoint**
- How does code end up in the production bundle, and how do you keep it out?

**Size:** 1 session

### T2.1 — Button *(fixes placement Q1)*
**Decision to make in your PR:** a wrapper component (`<app-button>`) or an attribute selector on the native element (`button[appButton]`)? Research how established design systems do it, and what a wrapper component costs you. Think about placement Q1 and about forms.

**Requirements**
- Variants: primary (your striped style), secondary, ghost, danger.
- Two sizes.
- States: hover, active, `:focus-visible`, disabled, loading.
- Icon + text, and icon-only. An icon-only button **must** still have an accessible name. How?
- Know what a button's `type` defaults to inside a `<form>`, and why that's a trap.
- `<a>` vs. `<button>`: your current login "button" navigates with `routerLink`. Explain why that's wrong on two levels.

**AC**
- All variants and states appear on the showcase page.
- Tests cover these:
  - a disabled button doesn't fire its handler
  - the loading state
  - icon-only buttons have an accessible name
- Enter and Space both activate the button. (They fire at different moments. Find out which.)

**Checkpoint**
- `:focus` vs. `:focus-visible`.
- `disabled` vs. `aria-disabled`: the trade-offs.
- When is something a link, and when is it a button?

**Sources:** APG "Button" pattern; MDN `<button>`

**Size:** 3 sessions

### T2.2 — ADR: which forms API?
**Tasks**
- [ ] Compare Reactive Forms (typed) with **Signal Forms**. Check angular.dev for Signal Forms' current stability status.
- [ ] Consider:
  - stability
  - typing
  - integration with your custom controls
  - how much you'll find in docs and real codebases
  - what your *job's* codebase uses
- [ ] Write the ADR.

**Size:** 1 session

### T2.3 — Text field & ControlValueAccessor *(closes the CVA/`forwardRef` question from our first conversation)*
**Decision to make in your PR:** where's the component boundary? Option A: one `<app-text-field>` that wraps the label, input, hint and error, and implements CVA. Option B: a styled native `<input>` plus a field wrapper that **projects** it. Research the trade-offs: autofill, attribute passthrough, and how the ARIA ids connect.

**Requirements**
- The label is always visible. Find out why a placeholder is never a label.
- Hint text, error text, and a required indicator.
- Unique ids, plus `aria-describedby` linking the hint and error, plus `aria-invalid` at the right moment.
- Disabled and readonly states.
- A **password variant** with a reveal toggle:
  - It must not submit the form.
  - It announces its state accessibly.
  - Think about what happens to the cursor position when the toggle changes.
- The autofill styling uses tokens.

**AC**
- It works with the forms API you chose in T2.2.
- Tests cover these:
  - the label is associated with the input
  - the error shows at the right time
  - the ARIA attributes are correct
  - value flows correctly in both directions

**Checkpoint (expect a hard interrogation)**
- Who calls each of the four CVA methods (Angular or your component), and which way does data flow in each?
- What does `NG_VALUE_ACCESSOR` with `multi: true` mean?
- Why is `forwardRef` needed?
- Write `docs/learning/control-value-accessor.md`.

**Size:** 4 sessions

### T2.4 — Validation messages strategy
**Tasks**
- [ ] Decide **when** errors appear: on blur, on submit, or live after the first error. Research it rather than guessing.
- [ ] Map validation error keys to messages centrally, and keep them translatable.
- [ ] Learn the **error summary** pattern for longer forms.

**Sources**
- GOV.UK Design System: "Error message" and "Error summary". This is some of the best real-world form guidance that exists.
- NN/g on form error reporting

**Size:** 1–2 sessions

## E2.2 — Login

### T2.5 — Fake auth service & async UI state *(touches Q7, Q11b)*
**Tasks**
- [ ] Create a stub `AuthService.login()` that returns an Observable after a realistic delay and **can fail in every way a real one can**:
  - wrong credentials
  - too many attempts
  - server error
  - network down
  - very slow response (5 s)
- [ ] Pick a way to trigger each case, such as magic test credentials.
- [ ] Model the screen state as a **discriminated union** rather than a handful of booleans.
- [ ] Get an **exhaustiveness check** from the compiler, so that adding a new state breaks the build until you handle it.
- [ ] Prevent double submission. Decide whether that belongs at the UI level, the stream level, or both, and justify it. (Placement Q11b: what protects you *besides* the operator?)

**Checkpoint**
- What does "make impossible states impossible" mean?
- How does `never` give you exhaustiveness?
- What does narrowing have to do with `unknown`?

**Size:** 2 sessions

### T2.6 — Login screen *(fixes placement Q2)*
**Route:** `/login`, public. After a successful login, go to `/app/dashboard`. Decide what the browser's **Back** button should do after that, and implement it.

**Fields**
| Field | Rules |
|-------|-------|
| Email | required; valid email format |
| Password | required **only**, with a reveal toggle |

**Behavior**
- It's a real `<form>`, so **Enter submits** from any field.
- Password managers offer to fill **and** save the credentials. Look up the correct `autocomplete` tokens for a sign-in form.
- Validation messages follow your T2.4 strategy. On a submit attempt with errors, focus moves somewhere sensible. Decide where.
- **A login form does not validate password strength or show password rules.** Explain why.
- Don't trim the password. Don't block paste. Explain why for both.
- Wrong credentials show **one generic message**. It never says whether the email or the password was wrong. Explain why (look up user enumeration).
- Every failure mode from T2.5 shows an appropriate message. While submitting, the button shows a loading state and double submission is impossible.
- The page title updates for this route.
- Works at 320 px.
- *Stretch:* a Caps Lock warning on the password field.

**AC**
- Everything above is demonstrable.
- Component tests cover:
  - Enter submits
  - errors appear at the right time
  - the generic error on bad credentials
  - the pending state
  - no double submission
- Keyboard-only and screen-reader walkthroughs are done and noted in the PR.

**Checkpoint**
- What is implicit submission?
- How do password managers detect a login form?
- What is user enumeration?
- `(submit)` vs. `(ngSubmit)`: what's the difference?

**Sources:** web.dev "Sign-in form best practices"; OWASP "Authentication Cheat Sheet"

**Size:** 4–5 sessions

## E2.3 — Routing

### T2.7 — Routing architecture
**Tasks**
- [ ] **Lazy-load** the feature routes. Compare the build output chunks before and after.
- [ ] Give every route a page title.
- [ ] Replace `** → ''` with a **real 404 page**. Explain why silently redirecting unknown URLs to login is bad, both for the user and for debugging.
- [ ] Make `/app` redirect to a default child.
- [ ] Guards, against fake auth state for now:
  - `/app/**` requires a logged-in user.
  - `/login` is only for logged-out users.
  - Find out the difference between `CanActivate` and `CanMatch`. It matters for lazy loading.
- [ ] **Focus after navigation:** in an SPA, where does focus go after a route change, and what does a screen-reader user hear? Make it right.
- [ ] Agree on URL conventions (casing, plural nouns, nesting) and write them in `CONTRIBUTING.md`.

**AC**
- Separate chunks appear in the build output.
- An unknown URL shows the 404 page.
- Titles update on every route.
- The guards behave correctly.
- Focus is managed after navigation.

**Size:** 3 sessions

## E2.4 — i18n

### T2.8 — i18n foundation: English + Slovenian
**Why now:** adding i18n to an app with hundreds of hardcoded strings is miserable. From this ticket on, the Definition of Done requires every string to be translatable.

**Tasks**
- [ ] Write an ADR comparing Angular's **built-in compile-time i18n** with a **runtime** library. Find out what "compile-time" means for switching language without a reload, for builds, and for deployment.
- [ ] Translate the shell and the login screen.
- [ ] Update the `lang` attribute when the language changes.
- [ ] Add an accessible language switcher.
- [ ] Write an **ICU plural** message, e.g. "N failed attempts". Find out how many plural categories Slovenian has. (It's more than English.)
- [ ] Format dates and numbers by locale. Check which character Slovenian uses as the decimal separator.
- [ ] Sort a list of Slovenian names containing č, š and ž. Show that the naive sort gets it wrong, then fix it.

**Checkpoint**
- What is CLDR?
- Why does string concatenation break translations?
- What's the difference between plural *categories* and numbers?

**Size:** 3–4 sessions

### T2.9 — Phase 2 retro & placement re-test
- [ ] Hold a retro.
- [ ] Re-answer the 12 placement questions **without looking at your old answers**.
- [ ] Compare the grades.

---

# Phase 3 — NestJS: real authentication & authorization *(epics)*

- **E3.0 Security reading** *(fixes Q12).* Read the OWASP cheat sheets on XSS prevention, CSRF prevention and session management. Then write your own comparison table: every place a credential can live, which attack each is exposed to, and the mitigations. *Carried over from the placement test:* your sentence "it can call your server with a POST request with the user's cookies attached" actually describes **two different attacks**, depending on which page sends the request. Separate them, and name both.
- **E3.1 Monorepo.** Write an ADR on npm workspaces vs. Nx. Restructure the repo, and add a shared package of TypeScript types for API contracts.
- **E3.2 Backend basics.**
  - NestJS fundamentals: modules, controllers and providers. Compare them with Angular.
  - DTO validation.
  - Config and secrets: what never gets committed.
  - Logging and exception filters.
  - OpenAPI docs.
  - Docker basics.
  - PostgreSQL.
  - An ADR on ORM choice.
  - Migrations and seed data.
- **E3.3 Authentication (server).**
  - Password hashing: compare the algorithms and say why plain SHA is wrong.
  - An ADR on **httpOnly cookie sessions vs. tokens**.
  - Login, logout and current-user endpoints.
  - Rate limiting and brute-force protection.
  - Secure cookie flags.
  - Generic error responses.
- **E3.4 Authentication (client).**
  - Auth state.
  - The interceptor and 401 handling.
  - CSRF handling with Angular's `HttpClient`.
  - If you choose tokens: **concurrent refresh**. Ten requests fail with 401 at once; exactly one refresh should happen. This is your first serious RxJS concurrency problem.
  - Guards on real state.
  - A `returnUrl` parameter, with **open-redirect** protection.
  - Logout that propagates across tabs.
  - Dev-server proxy vs. CORS: what CORS actually protects, and whom.
- **E3.5 RBAC.**
  - Model roles and permissions (admin / operator / viewer).
  - Enforce them **on the server**.
  - In the UI: a permission directive, permission-aware routes, and a deliberate choice between hiding and disabling.
  - The key lesson: **frontend checks are UX, never security**.
- **E3.6 End-to-end tests.** Playwright tests for the login, logout, session expiry and role flows.

# Phase 4 — Data layer & RxJS core *(epics)*

- **E4.1 HTTP layer.**
  - A typed API client.
  - **Runtime validation** of responses: compile-time types prove nothing about network data, which is effectively `unknown`. Write an ADR on Zod vs. Valibot vs. building your own.
  - An error-handling strategy: decide what's handled globally and what locally.
  - Retries with backoff, **only for idempotent requests**.
  - Timeouts and cancellation.
- **E4.2 RxJS through real features** *(fixes Q11a).*
  - Search-as-you-type including the race condition.
  - All four higher-order mapping operators, each used where it belongs.
  - Where `catchError` goes so one error doesn't kill the stream.
  - Hot vs. cold observables; `share` / `shareReplay` and their pitfalls.
  - Subjects.
  - **Marble testing.**
- **E4.3 Signals ↔ RxJS boundary** *(fixes Q10).*
  - The mechanism behind signals: reactive context, dependency tracking, push-then-pull.
  - `toSignal` / `toObservable`.
  - `resource` / `httpResource`.
  - An ADR on state management: services with signals vs. NgRx SignalStore.
- **E4.4 Caching.**
  - Dedupe in-flight requests.
  - Stale-while-revalidate.
  - Invalidation after mutations.
  - **Optimistic updates with rollback.**
  - HTTP caching headers (`Cache-Control`, `ETag`).
  - An ADR on building your own vs. TanStack Query.
- **E4.5 URL as state.** Filters, sorting and pagination live in query params. Views are deep-linkable, and Back/Forward behave correctly.
- **E4.6 MSW in tests.** Simulate latency, 500s and flaky networks in component and integration tests.

# Phase 5 — Ops console features & remaining primitives *(epics)*

- **E5.1 Dialog.**
  - Native `<dialog>`.
  - Return focus to the trigger on close.
  - Enter and exit animations with `@starting-style`.
  - The top-layer scanline problem, again (T1.8).
  - Confirmation dialogs for destructive actions.
- **E5.2 Popover / menu button / tooltip.** Popover API, CSS anchor positioning, APG patterns.
- **E5.3 Listbox / multi-select, rebuilt properly.** Start with a UX question: should a multi-select open a modal at all?
- **E5.4 Toasts and tabs.** Toasts use `aria-live` with the right politeness; tabs follow the APG pattern.
- **E5.5 Data table.**
  - Server-side pagination, sorting and filtering.
  - Row selection.
  - Bulk actions, gated by role.
  - Loading, empty and error states, plus skeletons.
- **E5.6 Screens.**
  - Services overview
  - Service detail
  - Deployments, where only operators can trigger a deploy, with a confirmation
  - Incidents: create/update, assignment, comments
  - Users & roles admin, admin only
- **E5.7 Hand-built SVG charts.**
  - Sparkline, bar and line charts.
  - The math of scales and axes.
  - An accessible alternative (a data table).
  - An ADR on which library to use for the complex charts.

# Phase 6 — Real-time & high volume *(epics)*

- **E6.1 Event generator (server).** A NestJS WebSocket/SSE endpoint that produces synthetic metrics and logs at a configurable rate, from 10 up to 10,000+ events per second.
- **E6.2 Transport in RxJS.**
  - An ADR on WebSocket vs. SSE.
  - Reconnect with backoff, and heartbeats.
  - Multiplexed subscriptions.
  - A connection-status UI.
- **E6.3 Live log viewer.**
  - **Virtual scrolling**: build a naive version first, then write an ADR on whether to adopt CDK's (revisiting ADR-0001).
  - Batch updates to the frame rate.
  - **Backpressure** strategies: sample, throttle, buffer or drop.
  - Pause/resume, with a bounded buffer.
  - Filtering inside a Web Worker.
- **E6.4 Live metrics.** An ADR on Canvas vs. SVG at high update rates; `requestAnimationFrame`.
- **E6.5 Alerts pipeline.** Alerts become in-app notifications, and optionally desktop notifications with good permission UX.

# Phase 7 — Performance *(epics)*

- Core Web Vitals (LCP, INP, CLS) and how to measure them, in the lab and in the field.
- The DevTools Performance panel and Angular DevTools profiling.
- Bundle analysis and budgets.
- `@defer`.
- `track` in `@for`.
- Hunting memory leaks: heap snapshots and forgotten subscriptions.
- Web Workers.
- An ADR on SSR/hydration: is it worth it for an app that sits behind a login?

# Phase 8 — Security hardening *(epics)*

- Angular's XSS model: sanitization, and the dangers of `bypassSecurityTrust*`.
- A strict **CSP**, and Trusted Types.
- Security headers: HSTS, `frame-ancestors`, Referrer-Policy, Permissions-Policy.
- Dependency auditing and automated update PRs.
- Secrets scanning.
- An **OWASP Top 10** review of *your own* app.
- A lightweight threat model (STRIDE).
- An OWASP ASVS level-1 checklist.

# Phase 9 — Production *(epics)*

- Docker images for both apps.
- Environments: dev, staging, prod.
- Frontend runtime config, keeping in mind that **anything in the bundle is public**.
- Continuous deployment on merge.
- An ADR on hosting.
- HTTPS/TLS basics.
- An ADR on error tracking.
- Structured logging, health checks and uptime monitoring.
- *Optional:* a PWA with offline support.

---

## Appendix — formats

**Standup** (start of every session)
```
Done:     what you finished last session
Today:    ticket id + what you'll attempt
Blockers: anything stuck, plus what you already tried
```

**PR description**
```
## What
## Why        (link the ticket)
## How to test
## Screenshots (UI changes)
## Decisions / trade-offs
## Definition of Done checklist
```

**ADR:** Title · Status (proposed / accepted / superseded by …) · Context · Decision · Consequences · Alternatives considered

**Learning note** (`docs/learning/*.md`)
1. The question.
2. The explanation in your own words. No pasted text.
3. A small experiment you ran, and what it showed.
4. What surprised you.
5. Your sources.

## Primary sources

- **MDN** (developer.mozilla.org): HTML, CSS and JS reference
- **web.dev**: performance, forms, best practices
- **angular.dev**: guides, API reference, error reference
- **WAI-ARIA Authoring Practices Guide** (w3.org/WAI/ARIA/apg): component keyboard and ARIA patterns
- **WCAG 2.2 Quick Reference** (w3.org/WAI/WCAG22/quickref)
- **OWASP Cheat Sheet Series** (cheatsheetseries.owasp.org)
- **GOV.UK Design System** (design-system.service.gov.uk): battle-tested form patterns
- **RxJS docs** (rxjs.dev), plus the operator decision tree
- **Tailwind CSS v4 docs** (tailwindcss.com)
