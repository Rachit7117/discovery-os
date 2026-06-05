import type { MentorPersona } from '@/types';

export const MENTOR_PERSONAS: MentorPersona[] = [
  {
    id: 'teresa',
    name: 'Teresa Torres',
    title: 'Discovery Coach',
    avatar: '🌳',
    gradient: 'from-emerald-500 to-teal-500',
    description: 'Author of Continuous Discovery Habits. Expert in Opportunity Solution Trees and weekly discovery rhythms.',
    style: 'Methodical & Evidence-based',
    systemPrompt: 'teresa',
  },
  {
    id: 'marty',
    name: 'Marty Cagan',
    title: 'Product Leadership',
    avatar: '⚡',
    gradient: 'from-blue-500 to-indigo-500',
    description: 'Author of Inspired & Empowered. Founding partner at SVPG. Opinionated on what great product work looks like.',
    style: 'Direct & High-conviction',
    systemPrompt: 'marty',
  },
  {
    id: 'founder',
    name: 'Startup Founder',
    title: 'Execution Focus',
    avatar: '🚀',
    gradient: 'from-orange-500 to-rose-500',
    description: 'Serial founder who\'s built and shipped products fast. Cuts through theory to what actually works in the trenches.',
    style: 'Raw & Pragmatic',
    systemPrompt: 'founder',
  },
];

export const PERSONA_SUGGESTED_PROMPTS: Record<string, string[]> = {
  teresa: [
    'How do I set up a continuous discovery rhythm?',
    'Explain the Opportunity Solution Tree framework',
    'What makes a good discovery interview question?',
    'How do I map opportunities from customer interviews?',
    'What\'s the difference between opportunities and solutions?',
    'How do I test assumptions without building a full product?',
  ],
  marty: [
    'What separates great product teams from feature teams?',
    'How do I assess the four risks in my product?',
    'What does real product discovery look like at top tech companies?',
    'How should I think about product strategy vs roadmap?',
    'What makes a great product manager?',
    'How do I get my company to trust the product team?',
  ],
  founder: [
    'How do I validate an idea without building anything?',
    'What\'s the cheapest way to test product-market fit?',
    'When should I stop talking to customers and just build?',
    'How do I interview customers without them just being polite?',
    'What\'s the fastest way to find my first 10 customers?',
    'How do I know if feedback is signal or noise?',
  ],
};
