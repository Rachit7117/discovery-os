import type { ChatMessage } from '@/types';

// ─── Mock AI Responses ────────────────────────────────────────────────────────

interface AIResponse {
  content: string;
  delay: number; // ms
}

const TOPIC_RESPONSES: Record<string, AIResponse> = {
  default: {
    content: `Great question! Product Discovery is all about finding the right problem before building the right solution.

The core loop is:
1. **Understand** the customer and their context
2. **Define** the problem worth solving
3. **Explore** multiple solutions
4. **Test** your riskiest assumptions cheaply
5. **Iterate** based on evidence

What specific aspect would you like to go deeper on? I can help with customer interviews, JTBD frameworks, experiment design, or metrics.`,
    delay: 1200,
  },
  interview: {
    content: `Customer interviews are one of the most powerful — and most commonly misused — discovery tools.

**The #1 mistake:** Asking "Would you use this?" instead of "Tell me about the last time you [had this problem]."

**My top tips:**
- **Listen 80%, talk 20%** — the interview is about them, not your idea
- **Ask about the past** — "What did you do last time X happened?" reveals real behavior
- **Follow the energy** — if they get animated, dig deeper there
- **The Mom Test rule** — every question should be impossible to answer politely

A great opening: *"Before I explain what I'm building, can you walk me through the last time you had to [problem area]? I want to understand your experience first."*

Want help writing specific interview questions for your use case?`,
    delay: 1400,
  },
  jtbd: {
    content: `Jobs To Be Done is one of my favorite frameworks because it completely reframes how you think about customer motivation.

The key insight: **People don't buy products — they hire them to make progress in their life.**

The classic example: People don't buy milkshakes. They hire milkshakes to make their morning commute less boring and to stay full until lunch. The competition isn't other shakes — it's bananas and bagels!

**To uncover the real job:**
1. Run a Switch Interview — ask about a recent purchase decision
2. Find the "trigger moment" — what happened that made them look for a solution?
3. Identify the anxiety — what almost stopped them from switching?
4. Understand the social and emotional dimensions — not just the functional

**A good JTBD statement:**
*"When I [situation], I want to [motivation], so I can [outcome]."*

What product or market are you trying to understand using JTBD?`,
    delay: 1300,
  },
  ost: {
    content: `Opportunity Solution Trees (OSTs) by Teresa Torres are brilliant for structuring your discovery thinking.

**The core problem they solve:** Teams jump from "here's a metric to improve" directly to "here's the feature we'll build" — skipping the most important step of mapping all possible opportunities.

**The four levels:**
1. 🎯 **Desired Outcome** — what metric are you trying to move?
2. 🔍 **Opportunities** — what customer needs/pains, if addressed, would move it?
3. 💡 **Solutions** — what could you build or change to address each opportunity?
4. 🧪 **Experiments** — how do you test each solution cheaply?

**The key rule:** Opportunities describe customer problems, not solutions. If you catch yourself writing "build a better onboarding flow" as an opportunity — that's a solution. The opportunity is "new users don't understand the product's value in the first session."

Shall I walk you through building an OST for a specific product challenge?`,
    delay: 1500,
  },
  experiment: {
    content: `Experiment design is where Discovery meets Engineering — and where most teams slow down instead of speed up.

**The core principle:** The goal of an experiment is to LEARN, not to validate your existing idea.

**Before designing any experiment, ask:**
- What is my riskiest assumption? (high impact + low confidence)
- What is the cheapest way to test it?
- What would I see if I was wrong?

**The experiment hierarchy (cheapest → most expensive):**
1. 🗣️ **Customer interviews** — just talking
2. 📄 **Smoke test / landing page** — measure demand before building
3. 🧙 **Wizard of Oz** — fake the automation manually
4. 🎨 **Prototype test** — clickable mockup
5. ⚗️ **A/B test** — live variants
6. 🏗️ **Full feature** — actual code

**The Dropbox example:** Before building, Drew Houston made a demo video of a product that didn't fully exist. 75,000 sign-ups overnight. The experiment answered the most critical question — does anyone want this? — for the cost of a few hours.

What assumption do you need to test? I can help design the right experiment.`,
    delay: 1200,
  },
  metrics: {
    content: `Discovery Metrics are how you know your discovery process is actually working — and whether you're building the right things.

**Two layers to track:**

**Process Metrics** (is discovery healthy?):
- Interviews per sprint
- Assumptions invalidated (more = better!)
- Time from insight to experiment launch

**Outcome Metrics** (are you moving the needle?):
- North Star Metric — the single number that captures customer value
- Leading indicators — early signals that predict future retention/revenue
- Guardrail metrics — what you must not harm

**Finding your North Star:**
Ask: *"When does our product create real value for a customer?"* Then measure that moment.
- Spotify: time spent listening
- Airbnb: nights booked
- Facebook: 7 friends in 10 days (for new user retention)

**The anti-pattern:** Tracking vanity metrics like downloads and page views. They feel good but they don't tell you if you've solved anyone's problem.

What product are you trying to define metrics for?`,
    delay: 1400,
  },
  roadmap: {
    content: `Your personalized roadmap is designed to build your Discovery skills in the right sequence:

**Week 1 — Customer Problems** 🔍
Foundation of everything. Learn to separate symptoms from root causes and write sharp problem statements.

**Week 2 — Customer Interviews** 🎙️
The Mom Test. How to ask questions that can't be answered politely. How to listen for the real story.

**Week 3 — Jobs To Be Done** ⚙️
Understand the functional, social, and emotional jobs customers are hiring your product to do.

**Week 4 — Opportunity Solution Trees** 🌳
Teresa Torres' framework for connecting outcomes → opportunities → solutions → experiments.

**Week 5 — Experiment Design** 🧪
Lean experiments. Test riskiest assumptions first. Build less, learn more.

**Week 6 — Discovery Metrics** 📊
North Star metrics, leading indicators, and guardrails. Measure what matters.

Each week builds on the previous one. The real learning happens in the exercises — don't skip them!

Which week are you currently on? I can give you specific guidance.`,
    delay: 1100,
  },
};

function detectTopic(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('interview') || lower.includes('mom test') || lower.includes('talk to')) return 'interview';
  if (lower.includes('jtbd') || lower.includes('jobs to be done') || lower.includes('hire')) return 'jtbd';
  if (lower.includes('ost') || lower.includes('opportunity solution') || lower.includes('opportunity tree')) return 'ost';
  if (lower.includes('experiment') || lower.includes('test') || lower.includes('mvp') || lower.includes('validate')) return 'experiment';
  if (lower.includes('metric') || lower.includes('north star') || lower.includes('measure') || lower.includes('kpi')) return 'metrics';
  if (lower.includes('roadmap') || lower.includes('learn') || lower.includes('curriculum') || lower.includes('week')) return 'roadmap';
  return 'default';
}

// ─── Suggested prompts ────────────────────────────────────────────────────────

export const SUGGESTED_PROMPTS = [
  'How do I conduct better customer interviews?',
  'Explain Jobs To Be Done with an example',
  'What is an Opportunity Solution Tree?',
  'How do I design a lean experiment?',
  'What should my North Star Metric be?',
  'How do I write a good problem statement?',
  'What\'s the difference between discovery and delivery?',
  'Walk me through my learning roadmap',
];

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getMockAIResponse(
  userMessage: string,
  _history: ChatMessage[]
): Promise<string> {
  const topic = detectTopic(userMessage);
  const response = TOPIC_RESPONSES[topic] ?? TOPIC_RESPONSES.default;

  await new Promise((resolve) => setTimeout(resolve, response.delay));

  return response.content;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}
