# Emenize Ben Yafit — CLAUDE.md

Thai GL quiz fan website. This file is the source of truth for Claude Code sessions.

---

## Project identity

- **Name:** Emenize Ben Yafit (สัพพรส — "all flavors")
- **Tagline:** How well do you know your Thai GL?
- **Type:** Fan site — not affiliated with any studio or network
- **Live URL:** https://emenize.com (custom domain via Namecheap → Vercel)

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Routing | React Router v6 |
| State | Zustand (quiz store + auth store + competition store) |
| Backend | Supabase (auth, database, Realtime) |
| Hosting | Vercel (auto-deploys from GitHub `main`) |
| Fonts | Cormorant Garamond (display/italic) + DM Sans (body) |
| Node | v18 — do NOT use create-vite@9 or supabase-js@latest (require Node 20+) |

---

## Design system

**Palette:**
- Background: `#0d0d0d` (`bg-bg-base`)
- Surface: `#161616` (`bg-bg-surface`)
- Dusty rose: `#c98b8b` (`rose-dust`) — primary CTA, hover states
- Warm gold: `#c9a84c` (`gold-warm`) — "Did you know" highlights
- Deep mauve: `#7c4d6e` (`mauve-deep`) — structural accents, borders
- Body background has a subtle dot-grid (`radial-gradient` at 28px intervals)

**Typography:**
- `font-display` = Cormorant Garamond, always italic for headings
- `font-body` = DM Sans for all UI text
- Section headers use a vertical rose→mauve accent bar (`.section-accent-bar`) + overline + large italic title

**Cards:** Typography-first, no stock images. Gradient top bar (2px), ghost sequential number, large italic title. Accent cycles: rose→mauve, gold→rose, mauve→gold.

**Coming-soon cards:** Dimmed (opacity-60), cursor-default, no link. Show "Coming Soon" pill badge. Name That Series specifically also shows a large diagonal italic overlay text.

**Animations:**
- `.hero-anim` — staggered fade-up on page load (overline → headline → stats → CTAs at 0/150/300/440ms)
- `.reveal` + `.reveal.in-view` — scroll-reveal via `<Reveal>` component (IntersectionObserver, fires once, disconnects)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` throughout

**Buttons:**
- `.btn-primary` — rose-dust background
- `.btn-ghost` — transparent with border

---

## File structure

```
src/
├── components/
│   ├── AuthModal.jsx        # Sign in / sign up modal (Google + email)
│   ├── MediaPlayer.jsx      # Audio snippet player UI
│   ├── Navbar.jsx           # Sticky nav, auth state, mobile menu, profile link
│   ├── ProgressBar.jsx      # Quiz question progress
│   ├── QuestionBlock.jsx    # Renders all 4 question types
│   ├── QuizCard.jsx         # Typography-first browse card; coming-soon variant has diagonal overlay
│   ├── ResultCard.jsx       # Score ring, grade title, share button
│   ├── Reveal.jsx           # IntersectionObserver scroll-reveal wrapper component
│   ├── SeriesTag.jsx        # Colored badge — color derived from tag string hash
│   └── Timer.jsx            # 30s per-question countdown
├── pages/
│   ├── About.jsx            # Genre explainer + pairing profiles
│   ├── Compete.jsx          # Multiplayer hub — create or join a room (auth required)
│   ├── CompetitionPlay.jsx  # Quiz player in competition mode — saves to competition_participants
│   ├── CompetitionResults.jsx # Live room leaderboard with Supabase Realtime
│   ├── Home.jsx             # Hero, featured quizzes, genre teaser, CTA
│   ├── Leaderboard.jsx      # Global score leaderboard — best attempt per user per quiz
│   ├── Profile.jsx          # User profile — stats + full quiz attempt history
│   ├── QuizBrowser.jsx      # Filterable quiz listing
│   ├── QuizPlayer.jsx       # Active quiz session
│   ├── Results.jsx          # Score screen, saves attempt to Supabase if logged in
│   └── WaitingRoom.jsx      # Competition waiting room with Supabase Realtime
├── data/
│   └── quizzes.json         # All quiz + question data (source of truth)
├── store/
│   ├── useAuthStore.js      # Zustand: user, profile, modal, sign in/out actions
│   ├── useCompetitionStore.js # Zustand: competition room, participants, score submission
│   └── useQuizStore.js      # Zustand: quiz session state, shuffles options on startQuiz
├── lib/
│   └── supabase.js          # Supabase client (credentials via env)
├── App.jsx                  # Router, AuthInit, AuthModal mount
├── main.jsx
└── index.css                # Tailwind + all custom component/utility classes
```

---

## Environment variables

```env
# .env.local (never commit — excluded by .gitignore)
VITE_SUPABASE_URL=https://zysojphokmxczztssrgp.supabase.co
VITE_SUPABASE_KEY=eyJ...anon key...
```

On Vercel these are set via Project → Environment Variables in the dashboard.

---

## Supabase schema

**Project ID:** `zysojphokmxczztssrgp`

### Tables

| Table | Purpose |
|---|---|
| `profiles` | Public user data. Auto-created on signup via `on_auth_user_created` trigger. |
| `quiz_attempts` | One row per completed quiz. Columns: `user_id`, `quiz_id`, `score`, `total_questions`, `created_at`. |
| `competitions` | A room with a 6-char `join_code`. Columns: `id`, `created_by`, `quiz_id`, `name`, `join_code`, `status` (competition_status enum: `open`/`active`/`finished`), `max_participants` (default 20), `created_at`, `ends_at`. |
| `competition_participants` | Who's in each competition. Columns: `id`, `competition_id`, `user_id`, `score` (null until finished), `completed_at` (null until finished), `joined_at`. |

### RLS policies (all confirmed active)
- `profiles` — SELECT all, UPDATE own
- `quiz_attempts` — SELECT all, INSERT own
- `competitions` — SELECT all, INSERT own, UPDATE own
- `competition_participants` — SELECT all, INSERT own, UPDATE own

### Realtime
Supabase Realtime must be enabled on `competitions` and `competition_participants` tables for the multiplayer feature to work (Table editor → Realtime toggle).

### Trigger
- `on_auth_user_created` on `auth.users` → auto-inserts a row into `profiles` on signup

### Auth providers enabled
- Google OAuth
- Email / password

### Supabase URL config (Authentication → URL Configuration)
- Site URL: `https://emenize.com`
- Redirect URLs: `https://emenize.com`, `https://www.emenize.com`, `http://localhost:5173`

---

## Quiz data format

Quizzes live in `src/data/quizzes.json`. Each quiz:

```json
{
  "id": "unique-slug",
  "title": "Quiz Title",
  "description": "Short description",
  "category": "general knowledge | cast | plot | couples",
  "difficulty": "easy | medium | hard",
  "coverImage": "unused — cards are typography-first",
  "seriesTag": "Show Name or general",
  "questionCount": 7,
  "estimatedMinutes": 5,
  "comingSoon": true,
  "questions": [...]
}
```

**`comingSoon: true`** disables the quiz — card is non-clickable, shows "Coming Soon" badge. Name That Series also shows a diagonal overlay text. Remove the field (or set to false) to re-enable.

Each question:

```json
{
  "id": "unique-id",
  "quizId": "parent-quiz-id",
  "type": "multiple-choice | image | quote | audio",
  "question": "Question text?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "Shown after answering.",
  "mediaUrl": null,
  "seriesTag": "Show Name",
  "difficulty": "easy | medium | hard"
}
```

**Important:** `options` are shuffled on `startQuiz` (Fisher-Yates). `correctAnswer` is always the string value, never an index — so shuffling is safe.

**Never fabricate quiz answers.** Only write questions where the correct answer is known with certainty. Flag uncertain facts before including them.

### image-identify question type
- `type: "image-identify"` — renders a full-width image + text input instead of option buttons
- `options` must be `[]`
- Answer validation uses `fuse.js` fuzzy match (threshold 0.4) — accepts typos and missing "The"
- If close enough → passes `correctAnswer` to store (marked correct); otherwise passes typed string (marked wrong)
- **Image files live in `public/` and are named `scene_XX.png`** (non-descriptive to avoid filename spoilers)
- Keep a record of which scene number maps to which series (not stored in code)

### Current quizzes
1. **Thai GL Couples 101** — 7Q, easy, general knowledge — `comingSoon: true`
2. **The Loyal Pin Deep Dive** — 6Q, medium, FreenBecky lore — `comingSoon: true`
3. **The GAP Universe** — 6Q, hard, GAP + Affair connections — `comingSoon: true`
4. **Name That Series** — 16Q, hard, image-identify type — `comingSoon: true` (pinned first, diagonal overlay)
5. **The Secret of Us** — 8Q, medium, LingOrm / Netflix — `comingSoon: true`

Name That Series is always sorted first in QuizBrowser and Home featured grid.

---

## Pairings (About page)

| Pairing | Members | Shows |
|---------|---------|-------|
| FreenBecky | Freen Sarocha & Becky Armstrong | GAP The Series, The Loyal Pin |
| EngLot | Engfa Waraha & Charlotte Austin | Show Me Love, Petrichor, Unlimited Love, 4 Elements: The Water, Love Bully |
| LMSY | Lookmhee & Sonya | Affair, Harmony Secret, Hometown Romance |
| MilkLove | Milk Pansa & Love Pattranite | 23.5 |
| LingOrm | Lingling Sirilak Kwong & Kornnaphat Sethratanapong | The Secret of Us |
| LenaMiu | Lena & Miu (full names TBC) | My Safe Zone |

---

## Quiz state flow

`startQuiz` → `answerQuestion` (records answer, stays on question) → user clicks Next → `nextQuestion` (advances index) → repeat → `isFinished: true` → redirect to `/results`

Timer calls `timeExpired` (records null answer) then `nextQuestion` on expiry.

Competition mode follows the same flow but `isFinished` triggers a write to `competition_participants` and redirects to `/room/:joinCode/results`.

---

## Competition flow

1. User goes to `/compete` (auth required)
2. **Create:** inserts `competitions` row (DB auto-generates `join_code`) + auto-joins as participant → redirected to `/room/:joinCode`
3. **Join:** looks up by `join_code`, inserts `competition_participants` row → redirected to `/room/:joinCode`
4. **Waiting room:** Realtime listener on `competition_participants` (new joiners) + `competitions` status change → when host clicks Start, status → `active`, all participants navigate to `/room/:joinCode/play`
5. **Play:** standard quiz via `useQuizStore`; on finish writes `score` + `completed_at` to `competition_participants`
6. **Results:** Realtime listener on `competition_participants` updates rankings live as scores arrive

---

## Grade tiers

| Score | Title |
|---|---|
| 100% | Ultimate GL Scholar 🌸 |
| 80–99% | Certified GL Enthusiast 💕 |
| 60–79% | Casual Watcher 📺 |
| < 60% | Needs a Rewatch Session 🫶 |

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/quizzes` | Quiz browser (filterable) |
| `/quiz/:id` | Quiz player |
| `/results` | Results screen |
| `/about` | About the genre + pairings |
| `/profile` | User profile — quiz history (auth required) |
| `/leaderboard` | Global leaderboard — best score per user per quiz |
| `/compete` | Multiplayer hub — create or join room (auth required) |
| `/room/:joinCode` | Competition waiting room |
| `/room/:joinCode/play` | Competition quiz player |
| `/room/:joinCode/results` | Competition results (live) |

---

## Scene map (image-identify quiz)

| File | Series |
|------|--------|
| `scene_01.png` | Denied Love |
| `scene_02.png` | Queendom |
| `scene_03.png` | Roller Coaster |
| `scene_04.png` | The Secret of Us |
| `scene_05.png` | Us |
| `scene_06.png` | Us |
| `scene_07.png` | Pluto |
| `scene_08.png` | Affair |
| `scene_09.png` | 4 Elements: The Water |
| `scene_10.png` | ClaireBell |
| `scene_11.png` | Love Design |
| `scene_12.png` | Player |
| `scene_13.png` | Love Senior |
| `scene_14.png` | Reverse with Me |
| `scene_15.png` | 4 Elements: The Earth |
| `scene_16.png` | Hometown Romance |

---

## Deployment

- **Platform:** Vercel (Hobby plan, GitHub repo must be **public**)
- **Repo:** github.com/Mikoolio41/thaiGl
- **Auto-deploy:** Every push to `main`
- **Note:** Vercel Hobby blocks deploys from commit authors not matching the project owner on private repos — keep the repo public to avoid this

---

## Footer
`© 2026 Mika Bibas · All rights reserved` — in `Home.jsx` footer alongside the fan site disclaimer.

## Dev commands

```bash
npm run dev       # dev server
npm run build     # production build
npm run preview   # preview production build
```
