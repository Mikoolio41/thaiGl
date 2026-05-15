# Enemize Ben Yafit

> *"All flavors"* — Thai GL quiz fan website.  
> **Tagline:** How well do you know your Thai GL?

A React + Vite quiz site celebrating Thai Girl's Love dramas. Covers 27 shows spanning 2022–2026, with quizzes on couples, plot, history, and more.

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** — custom design tokens (dark romanticism palette)
- **React Router v6** — client-side routing with scroll restoration
- **Zustand** — quiz session state
- **Supabase** — client wired up, ready for leaderboards / score persistence

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up env vars (copy the example, fill in your Supabase credentials)
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run dev server
npm run dev

# 4. Build for production
npm run build
```

---

## Supabase Credentials

Copy `.env.example` → `.env.local` and fill in:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_KEY=your-anon-public-key-here
```

The app runs fully without Supabase (all quiz data is local JSON). The Supabase client is set up in `src/lib/supabase.js` for future use — leaderboards, user scores, etc.

---

## Adding New Quizzes

Edit `src/data/quizzes.json`. Each quiz object:

```json
{
  "id": "unique-slug",
  "title": "Quiz Title",
  "description": "Short description",
  "category": "general knowledge | cast | plot | couples",
  "difficulty": "easy | medium | hard",
  "coverImage": "https://picsum.photos/800/400?random=N",
  "seriesTag": "Show Name or general",
  "questionCount": 7,
  "estimatedMinutes": 5,
  "questions": [ ... ]
}
```

Each question object:

```json
{
  "id": "unique-question-id",
  "quizId": "parent-quiz-id",
  "type": "multiple-choice | image | quote | audio",
  "question": "Question text?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "explanation": "Fun fact shown after answering.",
  "mediaUrl": null,
  "seriesTag": "Show Name or general",
  "difficulty": "easy | medium | hard"
}
```

**For image questions:** set `type: "image"` and `mediaUrl` to an image URL.  
**For audio questions:** set `type: "audio"` and `mediaUrl` to an audio file URL. The `MediaPlayer` component handles playback UI.  
**For quote questions:** set `type: "quote"` — the question block renders a special "Quote Question" label.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with mobile menu
│   ├── QuizCard.jsx        # Browse card for quiz listing
│   ├── QuestionBlock.jsx   # Renders any question type + option states
│   ├── ProgressBar.jsx     # Question progress indicator
│   ├── Timer.jsx           # Per-question countdown (30s)
│   ├── MediaPlayer.jsx     # Audio player UI
│   ├── ResultCard.jsx      # Score + grade + share screen
│   └── SeriesTag.jsx       # Colored badge per show/category
├── pages/
│   ├── Home.jsx            # Hero, featured quizzes, series showcase
│   ├── QuizBrowser.jsx     # Filterable quiz listing
│   ├── QuizPlayer.jsx      # Active quiz session
│   ├── Results.jsx         # Post-quiz results wrapper
│   └── About.jsx           # About the genre + pairings
├── data/
│   └── quizzes.json        # All quiz + question data
├── store/
│   └── useQuizStore.js     # Zustand quiz session store
└── lib/
    └── supabase.js         # Supabase client (credentials via env)
```

---

## Grade Tiers

| Score | Title |
|-------|-------|
| 100% | Ultimate GL Scholar 🌸 |
| 80–99% | Certified GL Enthusiast 💕 |
| 60–79% | Casual Watcher 📺 |
| < 60% | Needs a Rewatch Session 🫶 |
