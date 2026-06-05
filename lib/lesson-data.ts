import type { Module, Lesson } from '@/types';

// ─── Modules ─────────────────────────────────────────────────────────────────

export const MODULES: Module[] = [
  {
    id: 'customer-problems',
    week: 1,
    title: 'Customer Problems',
    subtitle: 'Find the right problem to solve',
    description: 'Learn how to identify, validate, and articulate real customer problems that are worth solving.',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    lessons: ['week-1-customer-problems'],
    level: 'beginner',
  },
  {
    id: 'customer-interviews',
    week: 2,
    title: 'Customer Interviews',
    subtitle: 'Talk to users the right way',
    description: 'Master the art of conducting effective customer interviews to uncover insights and validate assumptions.',
    icon: '🎙️',
    color: 'from-violet-500 to-purple-500',
    gradient: 'from-violet-500/20 to-purple-500/20',
    lessons: ['week-2-customer-interviews'],
    level: 'beginner',
  },
  {
    id: 'jobs-to-be-done',
    week: 3,
    title: 'Jobs To Be Done',
    subtitle: 'Understand why customers hire products',
    description: 'Apply the JTBD framework to understand the functional, social, and emotional jobs customers are trying to accomplish.',
    icon: '⚙️',
    color: 'from-amber-500 to-orange-500',
    gradient: 'from-amber-500/20 to-orange-500/20',
    lessons: ['week-3-jobs-to-be-done'],
    level: 'intermediate',
  },
  {
    id: 'opportunity-solution-trees',
    week: 4,
    title: 'Opportunity Solution Trees',
    subtitle: 'Map the path from problem to solution',
    description: 'Use OSTs to connect desired outcomes to opportunities and solutions in a structured visual framework.',
    icon: '🌳',
    color: 'from-emerald-500 to-green-500',
    gradient: 'from-emerald-500/20 to-green-500/20',
    lessons: ['week-4-opportunity-solution-trees'],
    level: 'intermediate',
  },
  {
    id: 'experiment-design',
    week: 5,
    title: 'Experiment Design',
    subtitle: 'Test assumptions before you build',
    description: 'Design lean experiments to validate your most critical assumptions with minimal time and cost.',
    icon: '🧪',
    color: 'from-rose-500 to-pink-500',
    gradient: 'from-rose-500/20 to-pink-500/20',
    lessons: ['week-5-experiment-design'],
    level: 'intermediate',
  },
  {
    id: 'discovery-metrics',
    week: 6,
    title: 'Discovery Metrics',
    subtitle: 'Measure what matters',
    description: 'Define and track the right metrics to evaluate discovery outcomes and inform product decisions.',
    icon: '📊',
    color: 'from-indigo-500 to-blue-500',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    lessons: ['week-6-discovery-metrics'],
    level: 'advanced',
  },
];

// ─── Lessons ─────────────────────────────────────────────────────────────────

export const LESSONS: Record<string, Lesson> = {
  'week-1-customer-problems': {
    id: 'week-1-customer-problems',
    moduleId: 'customer-problems',
    week: 1,
    title: 'Understanding Customer Problems',
    subtitle: 'The foundation of great product discovery',
    duration: 20,
    difficulty: 'beginner',
    concept: {
      title: 'What is a Customer Problem?',
      body: `A customer problem is a gap between where your customer is today (current state) and where they want to be (desired state). Great products solve real problems — not imagined ones.

The key distinction in Product Discovery is separating **symptoms** from **root problems**. When a customer says "I need a faster horse," they're describing a symptom. The root problem is "I need to travel faster."

**The Three Dimensions of a Good Problem Statement:**
1. **Who** has the problem? (specific customer segment)
2. **What** is the problem? (current state vs. desired state)
3. **Why** does it matter? (impact and frequency)

Problems worth solving share three characteristics:
- They are **painful** — the customer actively feels the pain
- They are **frequent** — it happens often enough to care about
- They are **unsolved** — no adequate solution currently exists`,
      keyPoints: [
        'Distinguish between symptoms and root problems',
        'Always define the customer segment before the problem',
        'Measure problem severity by impact × frequency',
        'Use the "5 Whys" technique to get to root causes',
        'Never start with a solution — start with the problem',
      ],
    },
    example: {
      title: 'How Slack Found Their Problem',
      company: 'Slack',
      story: `Before Slack became Slack, it was a gaming company called Tiny Speck working on a game called Glitch. The team built an internal messaging tool to coordinate their distributed team.

When Glitch failed, Stewart Butterfield noticed the internal tool was genuinely loved. They interviewed other companies about their team communication problems.

The root problem wasn't "we need chat software." It was: "Teams working across multiple tools lose context, miss critical information, and waste hours each day switching between email, docs, and one-off messages."

Slack's insight was that the real problem was **information fragmentation** — not just "bad communication." This framing unlocked an entirely different solution space.`,
      insight: 'By identifying the root problem (information fragmentation) vs. the symptom (slow communication), Slack could build something 10x better than email — not just a faster email.',
    },
    exercise: {
      title: 'Problem Statement Practice',
      description: 'Write a clear problem statement for a product you use daily.',
      prompt: `Think of a product you use every day (Gmail, Notion, Spotify, etc.).

Now write a problem statement using this format:
**[Customer segment] struggles with [current state] when they want to [desired outcome], which causes [impact].**

Example: "Remote teams struggle with losing important decisions in long email chains when they want to maintain team alignment, which causes repeated discussions and slower execution."

Write your own problem statement below, then identify: Is this a symptom or a root problem? Use the "5 Whys" technique to dig deeper.`,
      hint: 'Ask "why does this matter?" at least 3 times to get past the surface-level symptom to the real problem.',
    },
    reflection: {
      question: 'Think of a product you use that seems to have missed the real customer problem. What do you think the root problem actually was?',
      context: 'Sometimes products solve the stated problem but not the underlying one. Google+ solved "I want to share updates" but missed that the real problem was "I want to share with the right people" — which Facebook\'s friend graph already solved.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the most important first step in Product Discovery?',
        options: [
          'Brainstorming solutions',
          'Identifying and validating the customer problem',
          'Building an MVP',
          'Conducting competitive analysis',
        ],
        correctAnswer: 1,
        explanation: 'Product Discovery begins with deeply understanding the customer problem. Building solutions before validating the problem leads to wasted effort and products no one wants.',
      },
      {
        id: 'q2',
        question: 'A customer says "I need a better to-do app." Using the 5 Whys approach, which is the most likely ROOT problem?',
        options: [
          'Their current to-do app has poor UX',
          'They need more features in their productivity tool',
          'They struggle to execute on priorities because tasks lack context and accountability',
          'The app is too slow',
        ],
        correctAnswer: 2,
        explanation: 'The surface request (better to-do app) masks the root problem: task management fails not because of UI, but because tasks lack the context and accountability structures that drive follow-through.',
      },
      {
        id: 'q3',
        question: 'Which combination defines a "problem worth solving"?',
        options: [
          'Unique + Complex + Expensive',
          'Painful + Frequent + Unsolved (or poorly solved)',
          'Technical + Scalable + Profitable',
          'Simple + Fast + Cheap to build',
        ],
        correctAnswer: 1,
        explanation: 'The best problems to solve are ones that cause real pain, happen often enough to matter, and don\'t yet have a good solution — not ones that are simply interesting to build.',
      },
    ],
    keyTakeaways: [
      'Start every discovery by deeply understanding who has the problem',
      'Use the 5 Whys to get past symptoms to root causes',
      'Validate that the problem is painful, frequent, and unsolved',
      'Your problem statement is a hypothesis — test it with real customers',
    ],
  },

  'week-2-customer-interviews': {
    id: 'week-2-customer-interviews',
    moduleId: 'customer-interviews',
    week: 2,
    title: 'Customer Interviews',
    subtitle: 'The Mom Test and beyond',
    duration: 25,
    difficulty: 'beginner',
    concept: {
      title: 'Why Most Customer Interviews Fail',
      body: `Most product teams conduct customer interviews and come away more confident than they should be. The reason: customers are polite. They don't want to hurt your feelings, so they tell you what you want to hear.

Rob Fitzpatrick's **The Mom Test** gives us a simple rule: Talk about their life, not your idea. Ask about the past, not the future.

**The Three Rules of a Good Interview:**
1. **Talk about their life, not your idea** — "Tell me about the last time you had to X" beats "Would you use a product that does Y?"
2. **Ask about specifics, not generalities** — "How do you currently handle this?" beats "Would you want a better way?"
3. **Listen more, talk less** — The 80/20 rule: customer talks 80% of the time

**Questions to avoid:**
- "Would you use this?" (hypothetical future)
- "Do you think this is a good idea?" (seeking validation)
- "How much would you pay?" (too early)

**Questions that reveal truth:**
- "Walk me through the last time you did X"
- "What's the hardest part of that process?"
- "What have you already tried to solve this?"
- "How much time/money does this cost you today?"`,
      keyPoints: [
        'The Mom Test: make questions impossible to answer politely',
        'Past behavior predicts future behavior — ask about the past',
        'Seek disconfirming evidence, not just validation',
        'Silence is golden — let customers fill the space',
        '"How much would you pay?" is the wrong question in early discovery',
      ],
    },
    example: {
      title: 'Airbnb\'s Early Customer Interviews',
      company: 'Airbnb',
      story: `Early Airbnb struggled to grow. Brian Chesky and Joe Gebbia flew to New York — their biggest market — and knocked on doors of hosts. They weren't doing a survey. They were doing deep interviews.

One insight: hosts' photos were terrible. Not because hosts were lazy, but because no one told them professional photography would matter. Chesky didn't ask "Would better photos help?" Instead, he asked hosts to walk him through their hosting experience from first listing to first guest.

The insight came from the story: hosts described the anxiety of "I don't know if my listing looks as good as others." The problem was comparison anxiety and low confidence, not bad cameras.

Their first "experiment" was hiring professional photographers for $80/shoot. Revenue doubled in that market within weeks.`,
      insight: 'By focusing on the customer\'s story and emotions ("comparison anxiety"), not the surface request ("better photos"), Airbnb found a solution that addressed the real driver of inaction.',
    },
    exercise: {
      title: 'Interview Script Builder',
      description: 'Design a 5-question interview script that follows The Mom Test.',
      prompt: `Choose a product area you're curious about (e.g., personal finance, remote work, health tracking).

Write 5 interview questions that follow The Mom Test rules:
1. Ask about past behavior, not future hypotheticals
2. Make them impossible to answer with just "yes/no"
3. Avoid leading questions that hint at your solution

Format your script as:
- Opening context setter (1 question)
- Problem exploration (2 questions)
- Behavior and workarounds (1 question)
- Closing insight question (1 question)

Also note: what assumption are you trying to validate or invalidate with this script?`,
      hint: 'Every question should start with "Tell me about a time..." or "Walk me through how you currently..." — not "Would you...?" or "Do you think...?"',
    },
    reflection: {
      question: 'Recall a time when you were building or planning something and got feedback that turned out to be misleading or over-optimistic. What would you do differently now?',
      context: 'Every founder and PM has stories of customers who enthusiastically validated an idea and then didn\'t use the product. Understanding why this happens is essential to doing discovery well.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'According to The Mom Test, why is "Would you use this product?" a bad interview question?',
        options: [
          'It reveals competitive intelligence',
          'It\'s too direct and makes customers uncomfortable',
          'It asks about a hypothetical future instead of actual past behavior',
          'It gives away your product idea too early',
        ],
        correctAnswer: 2,
        explanation: 'Hypothetical questions allow customers to be politely optimistic. People are bad at predicting their own behavior. Asking about what they actually did in the past reveals real patterns.',
      },
      {
        id: 'q2',
        question: 'A customer says "I would definitely pay for that." What should you do next?',
        options: [
          'Mark the interview as successful and move to the next one',
          'Ask them to pre-pay or commit right now',
          'Ask them to tell you about the last time they faced that problem and what they tried',
          'Immediately start building the feature',
        ],
        correctAnswer: 2,
        explanation: '"I would pay for that" is a compliment, not a commitment. Follow up with specifics about their past behavior to understand if the pain is real and urgent enough to drive action.',
      },
      {
        id: 'q3',
        question: 'What is the ideal customer-to-interviewer talk-time ratio?',
        options: [
          '50/50 — balanced conversation',
          'Interviewer talks 60%, customer talks 40%',
          'Customer talks 80%, interviewer talks 20%',
          'It doesn\'t matter as long as you get your questions answered',
        ],
        correctAnswer: 2,
        explanation: 'The customer should dominate the conversation. You\'re there to listen and learn, not pitch. The more they talk, the more signal you gather — and unexpected directions often yield the best insights.',
      },
    ],
    keyTakeaways: [
      'Never ask "would you use this?" — ask about what they actually did',
      'Silence is a tool: let customers fill the pause',
      'Look for "the mom test" in every question you design',
      'Enthusiasm in an interview ≠ intent to pay or use',
    ],
  },

  'week-3-jobs-to-be-done': {
    id: 'week-3-jobs-to-be-done',
    moduleId: 'jobs-to-be-done',
    week: 3,
    title: 'Jobs To Be Done',
    subtitle: 'Why customers "hire" your product',
    duration: 25,
    difficulty: 'intermediate',
    concept: {
      title: 'The JTBD Framework',
      body: `Clayton Christensen's Jobs To Be Done framework reframes how we think about customer motivation. People don't buy products — they **hire** products to get a job done.

The famous JTBD example: People don't buy a quarter-inch drill bit. They buy a quarter-inch hole. But even deeper: they hire the hole to hang a picture. They hire the picture to feel pride in their home.

**The Three Types of Jobs:**
1. **Functional Jobs** — the practical task (e.g., "transfer money quickly")
2. **Social Jobs** — how they want to be perceived (e.g., "be seen as financially savvy")
3. **Emotional Jobs** — how they want to feel (e.g., "feel in control of my finances")

**The JTBD Statement Format:**
"When I [situation], I want to [motivation], so I can [outcome]."

Example: "When I'm late to work and have 5 minutes before a meeting, I want to quickly understand the key takeaways from a 30-page report, so I can contribute meaningfully in the discussion."

**The Switch Interview Technique:**
The best way to uncover JTBD is to interview people about a recent purchase or switch. Ask:
- What were you doing when you decided to look for something new?
- What triggered the switch?
- What almost stopped you from switching?`,
      keyPoints: [
        'People hire products to make progress in their life',
        'The real job is usually social or emotional, not functional',
        'Use the JTBD statement: "When I [situation], I want [motivation], so I can [outcome]"',
        'Switch interviews reveal the real triggers and barriers',
        'Competing products often hire from wildly different categories',
      ],
    },
    example: {
      title: 'Milkshake Marketing — McDonald\'s JTBD Research',
      company: 'McDonald\'s',
      story: `McDonald's hired researchers to improve their milkshake sales. They surveyed customers: better flavors? More sizes? Nothing worked.

Then Clayton Christensen's team tried a different approach. They observed the drive-through for a full day and noticed something odd: 40% of milkshakes were sold before 8am to solo commuters.

They interviewed these customers: "Why did you buy a milkshake this morning?"

The answers revealed the real job. Not "I wanted something sweet." The job was: "I have a long, boring commute. I need something that takes a long time to consume, keeps me occupied, doesn't spill, and holds me over until lunch."

Milkshakes were competing with bananas, bagels, and coffee — not other shakes.`,
      insight: 'Once McDonald\'s understood the job ("make my commute less boring and fill me up"), they could improve the milkshake for that job — thicker, more viscous, small chunks of fruit — rather than competing on taste.',
    },
    exercise: {
      title: 'Write Three JTBD Statements',
      description: 'Identify the functional, social, and emotional jobs for a product.',
      prompt: `Choose a product you use regularly (e.g., LinkedIn, Spotify, Notion, Headspace).

Write three JTBD statements — one for each job type:

**Functional Job:**
"When I [situation], I want to [functional motivation], so I can [practical outcome]."

**Social Job:**
"When I [situation], I want to [social motivation], so I can [social outcome / how I'm perceived]."

**Emotional Job:**
"When I [situation], I want to [emotional motivation], so I can [emotional outcome / how I feel]."

Then answer: Which job do you think is the PRIMARY driver of usage? Why?`,
      hint: 'The emotional and social jobs are usually more powerful drivers of behavior than the functional job. That\'s why people "hire" premium products even when cheaper alternatives exist.',
    },
    reflection: {
      question: 'Think of a product that solved an unexpected job — one it wasn\'t designed for. What does this tell you about how customers actually use products vs. how designers intended them to be used?',
      context: 'Many breakthrough insights come from observing how customers actually use your product vs. the intended use. Instagram was designed for photo sharing but got "hired" as a discovery and identity platform.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'In the JTBD framework, what does "hire" mean?',
        options: [
          'Customers pay for a product subscription',
          'A product recruits users through marketing',
          'Customers choose a product to help them make progress in a specific situation',
          'Companies hire product managers to do discovery',
        ],
        correctAnswer: 2,
        explanation: 'JTBD uses "hire" as a metaphor: just as you hire an employee to accomplish a goal, customers "hire" products when they need to make progress in a specific life situation.',
      },
      {
        id: 'q2',
        question: 'What is the correct JTBD statement format?',
        options: [
          '"As a [user], I want [feature], so that [benefit]"',
          '"When I [situation], I want to [motivation], so I can [outcome]"',
          '"Given [context], when [trigger], then [action]"',
          '"I need [product] because [reason]"',
        ],
        correctAnswer: 1,
        explanation: 'The JTBD format anchors the job in a specific situation, which is key — the same person has different jobs in different contexts. Situation drives the hiring decision.',
      },
      {
        id: 'q3',
        question: 'In the McDonald\'s milkshake study, what was the real competition for the morning milkshake?',
        options: [
          'Other fast food milkshakes',
          'Starbucks Frappuccinos',
          'Bananas, bagels, and coffee — foods that addressed the same "commute job"',
          'Home-made smoothies',
        ],
        correctAnswer: 2,
        explanation: 'JTBD reveals that your real competition is anything hired for the same job — not products in your category. Milkshakes competed with anything that made a commute less boring while providing satiety.',
      },
    ],
    keyTakeaways: [
      'People hire products to make progress, not because of features',
      'Functional, social, and emotional jobs all drive purchase decisions',
      'Your real competitors are anything hired for the same job',
      'Switch interviews reveal the strongest triggers and barriers',
    ],
  },

  'week-4-opportunity-solution-trees': {
    id: 'week-4-opportunity-solution-trees',
    moduleId: 'opportunity-solution-trees',
    week: 4,
    title: 'Opportunity Solution Trees',
    subtitle: 'From outcomes to experiments',
    duration: 30,
    difficulty: 'intermediate',
    concept: {
      title: 'What is an Opportunity Solution Tree?',
      body: `Teresa Torres' Opportunity Solution Tree (OST) is a visual framework that helps product teams connect their desired **outcome** to the **opportunities** they discover and the **solutions** they generate — before jumping to experiments.

**The Four Levels of an OST:**
1. **Desired Outcome** — the business or customer metric you're trying to move (e.g., "increase weekly active users by 20%")
2. **Opportunities** — customer needs, pain points, or desires discovered through research (not solutions)
3. **Solutions** — potential ways to address an opportunity (features, experiments, design changes)
4. **Experiments** — ways to test if a solution actually addresses the opportunity

**Why OSTs Prevent Common Product Mistakes:**
- **Solution fixation**: Teams jump to solutions before understanding opportunities. OST forces you to enumerate opportunities first.
- **Output vs. outcome thinking**: OST starts with the outcome, keeping the team focused on impact rather than shipping features.
- **Over-reliance on a single path**: By mapping multiple opportunities and solutions, you avoid betting everything on one idea.

**Building an OST:**
Start at the top: define one clear desired outcome. Then ask: "What customer opportunities, if addressed, would drive this outcome?" List 3–5 opportunities. For each, brainstorm multiple solutions. For each promising solution, design one lean experiment.`,
      keyPoints: [
        'Start with the desired outcome, not the solution',
        'Opportunities are customer needs — not features or solutions',
        'Each opportunity can have multiple solution ideas',
        'The tree reveals which opportunities are most impactful to pursue',
        'Experiments validate whether your solution actually addresses the opportunity',
      ],
    },
    example: {
      title: 'Spotify\'s Discovery Feature OST',
      company: 'Spotify',
      story: `Imagine Spotify's team working on increasing weekly listening time (the outcome).

Discovery research surfaces multiple opportunities: users feel their playlist gets stale, users don't know about new releases from artists they like, users want to find music that matches their mood.

Without an OST, the team might immediately build "a better recommendation algorithm." But the OST reveals that "playlist staleness" and "mood-based discovery" are actually different problems requiring different solutions.

For "playlist staleness," solutions might include: Discover Weekly (weekly fresh playlist), Daily Mix (adaptive playlist), or Concert notifications. For "mood-based discovery," solutions might include mood-based search or context-aware autoplay.

By mapping the full tree, Spotify can prioritize "playlist staleness" — it affects more users and has higher impact on weekly time — and run experiments on multiple solutions before committing to a full build.`,
      insight: 'Discover Weekly became one of Spotify\'s most loved features not because someone had a "great idea," but because the OST revealed playlist staleness was the highest-leverage opportunity in driving listening time.',
    },
    exercise: {
      title: 'Build a Mini OST',
      description: 'Create a three-level OST for a product challenge.',
      prompt: `Choose a product outcome to improve. Example: "Increase user retention in week 2 of using the app."

Build a mini OST with:

**Level 1 — Desired Outcome:**
State the metric and target (e.g., "Improve week-2 retention from 30% to 45%")

**Level 2 — Opportunities (list 3):**
What customer needs or pain points, if addressed, would improve this outcome?
(Remember: these are customer problems, not features)

**Level 3 — Solutions (2 per opportunity):**
For each opportunity, brainstorm 2 possible solutions.

**Bonus — Experiment (for your best solution):**
How would you test your best solution with minimum effort?

Draw or describe the tree structure clearly.`,
      hint: 'A common mistake is writing solutions as opportunities. Check your Level 2: each item should describe a customer need or pain, not a feature or capability you want to build.',
    },
    reflection: {
      question: 'Have you ever been part of a project where the team jumped straight from a problem to one specific solution without considering alternatives? What was the outcome, and how might an OST have helped?',
      context: 'Solution fixation is one of the most common product mistakes. When a team aligns early on a specific solution, they unconsciously filter all research to confirm that solution — a form of confirmation bias baked into process.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the correct order for building an Opportunity Solution Tree?',
        options: [
          'Solutions → Opportunities → Outcome → Experiments',
          'Experiments → Solutions → Opportunities → Outcome',
          'Outcome → Opportunities → Solutions → Experiments',
          'Opportunities → Outcome → Experiments → Solutions',
        ],
        correctAnswer: 2,
        explanation: 'The OST flows from top to bottom: define the desired outcome first, then discover opportunities that would move it, then brainstorm solutions per opportunity, then design experiments to test the best solutions.',
      },
      {
        id: 'q2',
        question: 'Which of the following is an "opportunity" in an OST — not a solution?',
        options: [
          'Build an in-app tutorial for new users',
          'New users feel overwhelmed during their first session',
          'Add a progress bar to the onboarding flow',
          'Create an email drip campaign for inactive users',
        ],
        correctAnswer: 1,
        explanation: 'An opportunity describes a customer need or pain point. "New users feel overwhelmed" is an opportunity. The tutorial, progress bar, and email campaign are all solutions — they describe what you might build.',
      },
      {
        id: 'q3',
        question: 'Why is it important to map MULTIPLE opportunities in an OST before picking solutions?',
        options: [
          'It makes the presentation look more thorough',
          'Product teams are required to explore all options before selecting any',
          'It prevents solution fixation and reveals which opportunity has the highest leverage',
          'It ensures you have enough work for the entire team',
        ],
        correctAnswer: 2,
        explanation: 'Mapping multiple opportunities prevents the team from anchoring on the first opportunity they thought of. Comparing opportunities by impact and frequency helps the team focus their limited experimentation capacity on the highest-leverage bets.',
      },
    ],
    keyTakeaways: [
      'Always start with a desired outcome, not a solution',
      'Opportunities are customer needs — not features or capabilities',
      'Map multiple opportunities before committing to solutions',
      'The OST keeps teams focused on impact, not just shipping',
    ],
  },

  'week-5-experiment-design': {
    id: 'week-5-experiment-design',
    moduleId: 'experiment-design',
    week: 5,
    title: 'Experiment Design',
    subtitle: 'Test smart, build less',
    duration: 30,
    difficulty: 'intermediate',
    concept: {
      title: 'The Science of Lean Experiments',
      body: `An experiment is the fastest, cheapest way to learn whether your assumption is true. The goal is not to build — it's to learn.

**The Assumption-First Mindset:**
Every product decision rests on assumptions. Before building, list your assumptions and rank them by:
1. **Impact if true** — how much does this change our decision?
2. **Confidence** — how certain are we this is true?

Your highest-priority experiments target the assumptions that are **high impact + low confidence**.

**Experiment Types (from cheapest to most expensive):**
1. **Smoke test / Landing page** — put up a page describing the value proposition and measure sign-ups
2. **Wizard of Oz** — manually do what the software would do (fake it till you make it)
3. **Concierge MVP** — deliver the outcome manually, personally, to one customer
4. **Prototype test** — show a clickable mockup to users
5. **A/B test** — run controlled variants with live users
6. **Full feature** — build the real thing (most expensive, use last)

**The Experiment Card:**
- **Hypothesis**: "We believe [assumption]"
- **Test**: "To validate this, we will [experiment]"
- **Metric**: "We'll know it's true if [measurable signal]"
- **Timeline**: "We'll run this for [X days]"
- **Decision rule**: "If [condition], we proceed; if not, we pivot"`,
      keyPoints: [
        'Test the riskiest assumption first, not the easiest',
        'Start with the cheapest experiment type that can answer the question',
        'Define your success metric BEFORE running the experiment',
        'A failed experiment is a successful learning',
        'Never spend a dollar on code before validating the core assumption',
      ],
    },
    example: {
      title: 'Dropbox\'s Demo Video Experiment',
      company: 'Dropbox',
      story: `In 2007, Drew Houston was trying to validate Dropbox. Building a working product would have taken months. Instead, he made a 3-minute demo video showing a product that didn't fully exist yet.

The video walked through the seamless file sync experience. He posted it to Hacker News with the message: "I'm tired of forgetting my USB drive."

Overnight, the waitlist went from 5,000 to 75,000 sign-ups.

The experiment was a pure smoke test — no product, just a video of a prototype. But it validated the most critical assumption: "People want this enough to sign up before it exists."

By testing this assumption for essentially $0 (time to make the video), Dropbox avoided building for months only to discover no one wanted it.`,
      insight: 'Dropbox\'s experiment validated the hardest assumption (desirability) before touching the hard problems (technical feasibility). This is the essence of lean experimentation: cheapest test first on the riskiest assumption.',
    },
    exercise: {
      title: 'Design an Experiment Card',
      description: 'Create a complete experiment to test a product assumption.',
      prompt: `Choose a product idea or feature you think would be valuable. Identify the ONE assumption that, if wrong, would completely kill the idea.

Fill out a complete Experiment Card:

**1. Core Assumption:**
"We believe that [specific assumption]"

**2. Experiment Type:**
Choose the cheapest type that can answer the question:
- Landing page / smoke test
- Wizard of Oz
- Concierge MVP
- Prototype test

**3. How We'll Test It:**
Describe exactly what you'll do

**4. Success Metric:**
"We'll know the assumption is valid if [specific, measurable signal]"
Example: "40% of people who see the landing page sign up"

**5. Decision Rule:**
"If metric is met → [action]; If not met → [action]"

**6. Timeline:**
How long will you run this experiment?`,
      hint: 'The most common mistake is designing an experiment that confirms your assumption rather than challenges it. Ask yourself: "What would I see if I was wrong?" Make sure your metric could actually produce that result.',
    },
    reflection: {
      question: 'What is the riskiest assumption in a product or project you\'re working on right now? What is the cheapest experiment you could design to test it this week?',
      context: 'Most teams know intuitively what their riskiest assumptions are but avoid testing them — often because they\'re afraid of invalidation. But an invalidated assumption is the most valuable outcome of discovery: it saves you from building the wrong thing.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which assumption should you test FIRST in an experiment?',
        options: [
          'The one that\'s easiest to test',
          'The one that\'s most interesting to the team',
          'The one with the highest impact and lowest current confidence',
          'The technical feasibility assumption',
        ],
        correctAnswer: 2,
        explanation: 'Prioritize by impact × risk. Test assumptions that, if wrong, would kill the idea — and that you\'re least sure about. Easy-to-test or low-stakes assumptions don\'t need urgent experiments.',
      },
      {
        id: 'q2',
        question: 'What is a "Wizard of Oz" experiment?',
        options: [
          'A magical UX trick that makes users believe in your product',
          'Manually simulating what software would do to test demand before building automation',
          'A presentation technique using smoke and mirrors',
          'An A/B test where users don\'t know they\'re being tested',
        ],
        correctAnswer: 1,
        explanation: 'In a Wizard of Oz experiment, humans manually perform the tasks that the software would eventually automate. It tests desirability and workflow before investing in engineering — the "wizard behind the curtain."',
      },
      {
        id: 'q3',
        question: 'When should you define your success metric for an experiment?',
        options: [
          'After the experiment runs, based on what you observe',
          'Before the experiment, as part of experiment design',
          'During the experiment, as you learn more',
          'It\'s not necessary if the experiment is qualitative',
        ],
        correctAnswer: 1,
        explanation: 'Define success criteria BEFORE running. Post-hoc metrics are susceptible to confirmation bias — you\'ll unconsciously pick metrics that support what you found. Pre-defining forces intellectual honesty.',
      },
    ],
    keyTakeaways: [
      'List and rank your assumptions before designing any experiment',
      'Test the riskiest assumption with the cheapest possible method',
      'Define success metrics before running — never after',
      'A negative result is valuable data, not a failure',
    ],
  },

  'week-6-discovery-metrics': {
    id: 'week-6-discovery-metrics',
    moduleId: 'discovery-metrics',
    week: 6,
    title: 'Discovery Metrics',
    subtitle: 'Measure what moves the needle',
    duration: 25,
    difficulty: 'intermediate',
    concept: {
      title: 'What Gets Measured Gets Managed',
      body: `Discovery Metrics are the signals that tell you whether your discovery process is working — and whether the solutions you're discovering will actually move the business.

**Two Types of Discovery Metrics:**

**1. Discovery Process Metrics** — How well is your discovery process working?
- Interviews conducted per sprint
- Assumptions invalidated (a high number = healthy!)
- Time from insight to experiment
- Ratio of solutions explored to solutions built

**2. Discovery Outcome Metrics** — Are the solutions you're building moving the needle?
- **North Star Metric**: The single metric that best captures value delivered to customers (e.g., Spotify's "time spent listening")
- **Leading indicators**: Metrics that predict future outcomes (e.g., "users who complete onboarding" → retention)
- **Guardrail metrics**: Metrics you must not harm (e.g., customer satisfaction score)

**The HEART Framework (Google):**
- **H**appiness — user satisfaction, NPS
- **E**ngagement — frequency of use, depth of use
- **A**doption — new users, feature adoption
- **R**etention — return rate, churn
- **T**ask success — completion rates, time on task

**Anti-patterns to avoid:**
- Vanity metrics (downloads, page views) that feel good but don't indicate value
- Measuring only what's easy to measure, not what matters
- Having too many metrics (dilutes focus)`,
      keyPoints: [
        'Every product decision should be tied to a metric',
        'Lead with the North Star Metric, not revenue',
        'Leading indicators predict future outcomes — track them early',
        'Guardrail metrics protect what you can\'t afford to break',
        'A well-run discovery process should regularly invalidate assumptions',
      ],
    },
    example: {
      title: 'Facebook\'s "7 Friends in 10 Days" North Star',
      company: 'Facebook',
      story: `Early Facebook's growth team was struggling. They had sign-ups but poor retention. The team ran analysis to find: what do retained users have in common?

The answer was striking: users who added 7 or more friends in their first 10 days retained at massively higher rates. Not 5 friends, not 10 — exactly around 7 was the inflection point.

This became Facebook's North Star Metric for new user growth: **"7 friends in 10 days."**

Every product decision was evaluated against: "Does this help new users find and add 7 friends in their first 10 days?" Features that helped were shipped. Features that didn't were deprioritized.

The metric worked because it was a leading indicator (predicted retention) tied to core value (social graph density) rather than a lagging indicator (retention itself, which you can only measure after it's too late).`,
      insight: 'Facebook\'s discovery insight was that social graph density — not time on site or any engagement metric — was the leading indicator of retention. The metric came from discovery research, not from picking an obvious KPI.',
    },
    exercise: {
      title: 'Define Your North Star Metric',
      description: 'Identify the metric that best captures value creation for your product.',
      prompt: `Choose a product — real or hypothetical.

Answer these questions to identify the North Star Metric:

**1. Core Value Delivered:**
Complete the sentence: "We create value for customers when they [specific action or outcome]."

**2. North Star Metric Candidates:**
List 3 potential metrics. For each, ask:
- Does it reflect value delivered to customers?
- Does it predict long-term retention/revenue?
- Is it actionable by the product team?

**3. Select Your North Star:**
Which metric wins? Why?

**4. Leading Indicators:**
What 2 behaviors, if increased, would predict improvement in your North Star?

**5. Guardrail Metrics:**
What 1-2 metrics must you NOT harm while optimizing for the North Star?`,
      hint: 'The best North Star Metrics are customer-outcome-oriented, not product-activity-oriented. "Weekly active users" is weak. "Users who successfully complete their first project" is strong — it captures whether customers actually got value.',
    },
    reflection: {
      question: 'What is a vanity metric you\'ve seen used as a success measure in a product or project? Why was it misleading, and what would a better metric have been?',
      context: 'Vanity metrics (downloads, page views, sign-ups) make teams feel good but don\'t indicate real value creation. Identifying and replacing vanity metrics with meaningful ones is one of the highest-leverage things a PM can do.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is a North Star Metric?',
        options: [
          'The metric that the CEO cares about most',
          'The single metric that best captures the value your product delivers to customers and predicts long-term success',
          'The metric that\'s hardest to measure',
          'Monthly revenue or MRR',
        ],
        correctAnswer: 1,
        explanation: 'The North Star Metric captures core value delivered to customers — not internal business metrics like revenue. It aligns the team on what "working" means and should predict long-term sustainability.',
      },
      {
        id: 'q2',
        question: 'What makes "number of app downloads" a vanity metric?',
        options: [
          'It\'s too hard to measure accurately',
          'It doesn\'t reflect whether users found value or will return',
          'Downloads are not related to revenue',
          'It\'s a lagging indicator, not a leading indicator',
        ],
        correctAnswer: 1,
        explanation: 'Downloads measure intent, not value. A million downloads with zero retention means zero value created. Vanity metrics feel impressive but don\'t indicate whether your product is actually solving a problem people care about.',
      },
      {
        id: 'q3',
        question: 'What is a "guardrail metric" in product discovery?',
        options: [
          'A metric that shows when to stop an experiment',
          'A regulatory metric required by law',
          'A metric that must not decrease while you optimize for the North Star',
          'A metric used only in the early stages of discovery',
        ],
        correctAnswer: 2,
        explanation: 'Guardrail metrics protect values you can\'t sacrifice while pursuing your North Star. For example, optimizing for engagement (North Star) shouldn\'t be allowed to harm customer satisfaction (guardrail) through manipulative design.',
      },
    ],
    keyTakeaways: [
      'Choose a North Star Metric that reflects customer value, not business activity',
      'Lead with leading indicators, not just lagging ones',
      'Guardrail metrics prevent optimizing one thing at the expense of another',
      'A good discovery process should regularly produce invalidated assumptions — that\'s a sign it\'s working',
    ],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getLessonById(id: string): Lesson | null {
  return LESSONS[id] ?? null;
}

export function getModuleById(id: string): Module | null {
  return MODULES.find((m) => m.id === id) ?? null;
}

export function getAllLessons(): Lesson[] {
  return Object.values(LESSONS);
}

export const TOTAL_LESSONS = Object.keys(LESSONS).length;
