// Sample assessment catalogue. Hours are mock monthly baselines, not live quotes.
export const SERVICES = [
  {
    id: 'strategy',
    pillar: 'Strategy',
    title: 'Strategy',
    description:
      'Clarify direction, priorities, and the decisions that shape sustainable growth.',
    baseHoursByBusinessSize: {
      small: 40,
      medium: 70,
      large: 100,
    },
  },
  {
    id: 'process-optimization',
    pillar: 'Process Optimization',
    title: 'Process Optimization',
    description:
      'Remove operational friction so teams deliver with more consistency and less rework.',
    baseHoursByBusinessSize: {
      small: 35,
      medium: 60,
      large: 90,
    },
  },
  {
    id: 'market-expansion',
    pillar: 'Market Expansion',
    title: 'Market Expansion',
    description:
      'Enter or deepen presence across South Africa and the wider SADC region.',
    baseHoursByBusinessSize: {
      small: 45,
      medium: 80,
      large: 120,
    },
  },
]
