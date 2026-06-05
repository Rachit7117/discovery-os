# DiscoveryOS — AI Product Discovery Coach

A production-quality Next.js 15 web application that helps aspiring Product Managers learn Product Discovery through a personalized AI-guided experience.

---

## Live Features

| Feature | Description |
|---|---|
| **Landing Page** | Hero, features, curriculum overview, testimonials, CTA |
| **Personalized Onboarding** | 4-step wizard collecting name, experience, goal, and weekly time |
| **6-Week Roadmap** | Progressive unlock system with progress tracking |
| **Interactive Lessons** | 5-tab lesson format: Learn → Example → Exercise → Reflect → Quiz |
| **AI Mentor Chat** | Mock AI responses with topic detection and conversation history |
| **Progress Tracking** | Streak, points, quiz scores, and completion % — all in localStorage |

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + custom CSS variables
- **UI Primitives**: Radix UI (Progress, ScrollArea, etc.) + custom components
- **Icons**: Lucide React
- **Storage**: Browser localStorage (no backend required)
- **Deployment**: Vercel-ready

---

## Folder Structure

```
discovery-os/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── globals.css             # Global styles, CSS variables, utilities
│   ├── page.tsx                # Landing page
│   ├── onboarding/
│   │   └── page.tsx            # 4-step onboarding wizard
│   ├── roadmap/
│   │   └── page.tsx            # Learning roadmap with progress
│   ├── lesson/
│   │   └── [id]/
│   │       └── page.tsx        # Interactive lesson (5 tabs + quiz)
│   └── mentor/
│       └── page.tsx            # AI mentor chat interface
│
├── components/
│   ├── ui/
│   │   ├── button.tsx          # Button variants (gradient, glow, etc.)
│   │   ├── card.tsx            # Card components
│   │   ├── badge.tsx           # Status badges
│   │   ├── progress.tsx        # Progress bar
│   │   ├── input.tsx           # Text input
│   │   └── textarea.tsx        # Multi-line textarea
│   └── shared/
│       ├── Navigation.tsx      # Top navbar with active states
│       ├── LoadingState.tsx    # Spinner + skeleton cards
│       ├── EmptyState.tsx      # Empty state with icon + CTA
│       └── ErrorState.tsx      # Error state with retry
│
├── lib/
│   ├── utils.ts                # cn(), formatDate(), scoreLabel()
│   ├── storage.ts              # All localStorage read/write
│   ├── lesson-data.ts          # Complete 6-module curriculum content
│   └── mock-ai.ts              # Topic-aware mock AI responses
│
├── hooks/
│   ├── useProgress.ts          # Progress state + mutation helpers
│   └── useUserProfile.ts       # Profile state management
│
├── types/
│   └── index.ts                # All TypeScript types
│
├── public/                     # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Local Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone or copy the project
cd discovery-os

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 3. Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Vercel Deployment

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Link to your Vercel account
# - Select the project directory
# - Use default settings (Next.js auto-detected)
```

### Option 2: Deploy via GitHub

1. Push the project to a GitHub repository
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your app is live in ~2 minutes

### Environment Variables

No environment variables are required for the MVP (all data is stored in localStorage and AI responses are mocked).

To add real AI (Claude or OpenAI), add these to your Vercel dashboard:

```env
# For Claude API (optional, future)
ANTHROPIC_API_KEY=your_key_here

# For OpenAI (optional, future)
OPENAI_API_KEY=your_key_here
```

---

## Upgrading to Real AI

The `lib/mock-ai.ts` file is designed for easy replacement. To upgrade:

1. Create `app/api/chat/route.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const client = new Anthropic();
  
  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    system: 'You are an expert Product Discovery coach...',
    messages,
  });

  return Response.json({ content: response.content[0].text });
}
```

2. Update `getMockAIResponse` in `lib/mock-ai.ts` to call `/api/chat` instead of returning mock data.

---

## Curriculum Content

The app includes full lesson content for 6 modules:

| Week | Module | Key Frameworks |
|---|---|---|
| 1 | Customer Problems | 5 Whys, Problem Statement |
| 2 | Customer Interviews | The Mom Test, Switch Interviews |
| 3 | Jobs To Be Done | JTBD Framework, Milkshake Study |
| 4 | Opportunity Solution Trees | OST (Teresa Torres) |
| 5 | Experiment Design | Lean Experiments, Assumption Mapping |
| 6 | Discovery Metrics | North Star, HEART Framework |

Each lesson contains:
- Concept explanation with key points
- Real company case study (Slack, Airbnb, McDonald's, Spotify, Dropbox, Facebook)
- Hands-on exercise with hint
- Reflection question
- 3-question multiple-choice quiz with explanations

---

## Adding More Content

To add lessons, extend `lib/lesson-data.ts`:

```typescript
// Add to LESSONS object
'new-lesson-id': {
  id: 'new-lesson-id',
  moduleId: 'module-id',
  week: 7,
  title: 'Continuous Discovery Habits',
  // ... rest of lesson structure
}

// Add to MODULES array
{
  id: 'continuous-discovery',
  week: 7,
  title: 'Continuous Discovery Habits',
  lessons: ['new-lesson-id'],
  // ...
}
```

---

## Design Decisions

- **Dark theme** — reduces eye strain for focused learning sessions
- **Progressive unlock** — prevents overwhelm; lessons unlock sequentially
- **5-tab lesson format** — forces progression through learn → practice → quiz
- **Local storage only** — zero friction, no account required for MVP
- **Mock AI responses** — topic-aware responses that feel contextual without API costs
- **Score persistence** — quiz scores and exercise answers saved for review

---

## License

MIT — free to use, modify, and deploy.
