export interface AssessmentQuestion {
  id: string;
  topic: string;
  topicLabel: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    topic: 'customer_discovery',
    topicLabel: 'Customer Discovery',
    question: 'What is the primary goal of customer discovery?',
    options: [
      'Validating that customers like your solution',
      'Understanding the problems customers have before designing solutions',
      'Gathering feature requests for your roadmap',
      'Confirming that your initial assumptions were correct',
    ],
    correctAnswer: 1,
    explanation: 'Customer discovery is about deeply understanding problems before jumping to solutions. Validating a solution comes later — first you need to be sure you\'re solving a real, significant problem.',
    points: 10,
  },
  {
    id: 'q2',
    topic: 'customer_interviews',
    topicLabel: 'Customer Interviews',
    question: 'According to The Mom Test, which interview question is most useful?',
    options: [
      '"Would you use a product that did X?"',
      '"How much would you pay for this feature?"',
      '"Tell me about the last time you tried to solve this problem."',
      '"On a scale of 1-10, how important is this to you?"',
    ],
    correctAnswer: 2,
    explanation: 'The Mom Test teaches that hypothetical questions get hypothetical answers. Asking about actual past behaviour — "the last time you tried to solve this" — reveals real data instead of polite speculation.',
    points: 10,
  },
  {
    id: 'q3',
    topic: 'mom_test',
    topicLabel: 'The Mom Test',
    question: 'A customer says "I would definitely use your app every day." According to The Mom Test, this is:',
    options: [
      'Strong validation — move to building',
      'Useless data — compliments don\'t count as evidence',
      'Moderate validation — ask a few more people',
      'Negative signal — they\'re being too enthusiastic',
    ],
    correctAnswer: 1,
    explanation: 'Rob Fitzpatrick\'s core insight: "The Mom Test" is named after the fact that even your mum would lie to make you feel good. Future intent and compliments are not evidence. Past behaviour and commitment (money, time, referrals) are.',
    points: 10,
  },
  {
    id: 'q4',
    topic: 'jobs_to_be_done',
    topicLabel: 'Jobs To Be Done',
    question: 'In Jobs To Be Done theory, people "hire" a product to:',
    options: [
      'Collect the most features possible',
      'Make progress in their lives — functional, social, and emotional jobs',
      'Replace their existing tools entirely',
      'Satisfy technical requirements from their IT department',
    ],
    correctAnswer: 1,
    explanation: 'JTBD frames purchasing decisions as hiring a product to make progress. The famous milkshake example: customers hired milkshakes to make their morning commute less boring — not to satisfy hunger. Understanding all three dimensions (functional, social, emotional) drives better product decisions.',
    points: 10,
  },
  {
    id: 'q5',
    topic: 'jobs_to_be_done',
    topicLabel: 'Jobs To Be Done',
    question: 'What does "switching cost" in JTBD theory primarily refer to?',
    options: [
      'The financial price of changing software subscriptions',
      'The forces that prevent a customer from adopting a new solution despite its benefits',
      'The technical effort required to migrate data',
      'The time it takes to onboard a new team member',
    ],
    correctAnswer: 1,
    explanation: 'The JTBD "Four Forces" model includes both push forces (pain of the current situation) and pull forces (attraction to a new solution) as well as anxiety about the new and loyalty to the old. All four matter when designing for adoption.',
    points: 10,
  },
  {
    id: 'q6',
    topic: 'opportunity_solution_trees',
    topicLabel: 'Opportunity Solution Trees',
    question: 'In an Opportunity Solution Tree, what comes directly below the desired outcome?',
    options: [
      'Solutions',
      'Experiments',
      'Opportunities (customer needs, pain points, desires)',
      'Metrics',
    ],
    correctAnswer: 2,
    explanation: 'The OST structure is: Desired Outcome → Opportunities → Solutions → Experiments. Opportunities sit between the outcome and solutions — they represent customer needs, pain points, and desires that, if addressed, would move you toward the desired outcome.',
    points: 10,
  },
  {
    id: 'q7',
    topic: 'opportunity_solution_trees',
    topicLabel: 'Opportunity Solution Trees',
    question: 'Teresa Torres recommends "continuous discovery" means:',
    options: [
      'Running a large research sprint at the start of each quarter',
      'Having at least one customer touchpoint every week',
      'Conducting usability tests before every release',
      'Hiring a dedicated researcher for each product team',
    ],
    correctAnswer: 1,
    explanation: 'Continuous discovery means building a habit of at least one customer touchpoint per week. It\'s about the cadence, not the volume — small, regular interactions compound into deep understanding over time.',
    points: 10,
  },
  {
    id: 'q8',
    topic: 'experiment_design',
    topicLabel: 'Experiment Design',
    question: 'What is the correct order of experiments from cheapest to most expensive validation?',
    options: [
      'A/B test → Prototype → Customer interview → Full build',
      'Customer interview → Smoke test → Prototype → Wizard of Oz → Full build',
      'Full build → A/B test → Prototype → Interview',
      'Smoke test → Full build → Interview → A/B test',
    ],
    correctAnswer: 1,
    explanation: 'Good experiment design follows the principle of using the cheapest test that can invalidate your riskiest assumption. Interviews and smoke tests cost hours; A/B tests cost weeks of engineering. Always start with the cheapest option that can give you enough signal.',
    points: 10,
  },
  {
    id: 'q9',
    topic: 'experiment_design',
    topicLabel: 'Experiment Design',
    question: 'Dropbox validated demand before building the product by:',
    options: [
      'Running an A/B test on their landing page',
      'Releasing a beta to 100 users',
      'Creating a demo video that explained the product — driving 75,000 sign-ups overnight',
      'Interviewing 500 potential customers about cloud storage',
    ],
    correctAnswer: 2,
    explanation: 'Drew Houston created a 3-minute demo video showing how Dropbox would work — before building it. The waiting list grew from 5,000 to 75,000 overnight. This is a classic "smoke test": validate demand with minimal investment before writing production code.',
    points: 10,
  },
  {
    id: 'q10',
    topic: 'discovery_metrics',
    topicLabel: 'Discovery Metrics',
    question: 'What is a North Star Metric?',
    options: [
      'The metric that measures your team\'s velocity',
      'A single metric that best captures the core value your product delivers to customers',
      'Your monthly recurring revenue target',
      'The KPI your CEO cares most about',
    ],
    correctAnswer: 1,
    explanation: 'A North Star Metric (NSM) captures the value your product delivers to customers — not vanity metrics like sign-ups. Examples: Spotify (time listened), Airbnb (nights booked), Facebook (daily active users). A good NSM correlates with long-term business health and guides product decisions.',
    points: 10,
  },
];

export function calculateMaturityLevel(score: number): 'beginner' | 'intermediate' | 'advanced' {
  if (score <= 30) return 'beginner';
  if (score <= 70) return 'intermediate';
  return 'advanced';
}

export function getMaturityLabel(level: 'beginner' | 'intermediate' | 'advanced'): string {
  return { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }[level];
}

export function getMaturityDescription(level: 'beginner' | 'intermediate' | 'advanced'): string {
  const descriptions = {
    beginner: 'You\'re at the start of your discovery journey. You\'ll build strong foundations in customer research, interviews, and the core frameworks every PM needs.',
    intermediate: 'You have solid foundations. Your roadmap focuses on applying frameworks practically — running real interviews, building OSTs, and designing experiments.',
    advanced: 'You\'ve got the fundamentals. Your roadmap covers advanced strategy, case studies from top companies, and nuanced discovery challenges.',
  };
  return descriptions[level];
}

export const TOPIC_LABELS: Record<string, string> = {
  customer_discovery: 'Customer Discovery',
  customer_interviews: 'Customer Interviews',
  mom_test: 'The Mom Test',
  jobs_to_be_done: 'Jobs To Be Done',
  opportunity_solution_trees: 'Opportunity Solution Trees',
  experiment_design: 'Experiment Design',
  discovery_metrics: 'Discovery Metrics',
};
