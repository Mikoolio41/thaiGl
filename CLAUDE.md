# Emenize Ben Yafit — CLAUDE.md

Thai GL quiz fan website. This file is the source of truth for Claude Code sessions.

---

## Project identity

- **Name:** Emenize Ben Yafit (สัพพรส — "all flavors")
- **Tagline:** How well do you know your Thai GL?
- **Type:** Fan site — not affiliated with any studio or network

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Routing | React Router v6 |
| State | Zustand (quiz store + auth store) |
| Backend | Supabase (auth, database) |
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
│   ├── Navbar.jsx           # Sticky nav, auth state, mobile menu
│   ├── ProgressBar.jsx      # Quiz question progress
│   ├── QuestionBlock.jsx    # Renders all 4 question types
│   ├── QuizCard.jsx         # Typography-first browse card (index prop for accent)
│   ├── ResultCard.jsx       # Score ring, grade title, share button
│   ├── SeriesTag.jsx        # Colored badge — color derived from tag string hash
│   └── Timer.jsx            # 30s per-question countdown
├── pages/
│   ├── About.jsx            # Genre explainer + pairing profiles
│   ├── Home.jsx             # Hero (full-bleed /hero.jpg), quizzes, series list, CTA
│   ├── QuizBrowser.jsx      # Filterable quiz listing
│   ├── QuizPlayer.jsx       # Active quiz session
│   └── Results.jsx          # Score screen, saves attempt to Supabase if logged in
├── data/
│   └── quizzes.json         # All quiz + question data (source of truth)
├── store/
│   ├── useAuthStore.js      # Zustand: user, profile, modal, sign in/out actions
│   └── useQuizStore.js      # Zustand: quiz session state
├── lib/
│   └── supabase.js          # Supabase client (credentials via env)
├── App.jsx                  # Router, AuthInit, AuthModal mount
├── main.jsx
└── index.css                # Tailwind + all custom component/utility classes
```

---

## Environment variables

```env
# .env.local (never commit this)
VITE_SUPABASE_URL=https://zysojphokmxczztssrgp.supabase.co
VITE_SUPABASE_KEY=eyJ...anon key...
```

Copy `.env.example` → `.env.local` to get started.

---

## Supabase schema

**Project ID:** `zysojphokmxczztssrgp`

### Tables

| Table | Purpose |
|---|---|
| `profiles` | Public user data. Auto-created on signup via `on_auth_user_created` trigger. |
| `quiz_attempts` | One row per completed quiz. Stores `quiz_id`, `score`, `total_questions`, computed `percentage`. |
| `competitions` | A room with a 6-char `join_code`. Creator picks a quiz. |
| `competition_participants` | Who's in each competition and their score once finished. |

### RLS policies (all confirmed active)
- `profiles` — SELECT all, UPDATE own
- `quiz_attempts` — SELECT all, INSERT own
- `competitions` — SELECT all, INSERT own, UPDATE own
- `competition_participants` — SELECT all, INSERT own, UPDATE own

### Trigger
- `on_auth_user_created` on `auth.users` → auto-inserts a row into `profiles` on signup

### Auth providers enabled
- Google OAuth
- Email / password

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
  "questions": [...]
}
```

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

### Current quizzes
1. **Thai GL Couples 101** — 7Q, easy, general knowledge
2. **The Loyal Pin Deep Dive** — 6Q, medium, FreenBecky lore
3. **The GAP Universe** — 6Q, hard, GAP + Affair connections

---

## Quiz state flow

`startQuiz` → `answerQuestion` (records answer, stays on question) → user clicks Next → `nextQuestion` (advances index) → repeat → `isFinished: true` → redirect to `/results`

Timer calls `timeExpired` (records null answer) then `nextQuestion` on expiry.

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
| `/about` | About the genre |

---

## What's next (planned)

- **Step 4:** Competitions feature — create a room, share join code, others join and compete on the same quiz, leaderboard at the end
- Real show images/audio to replace placeholders
- User profile page with quiz history

---

## Dev commands

```bash
npm run dev       # dev server
npm run build     # production build
npm run preview   # preview production build
```
