
import { Conversation, Therapy, TherapyPreference, UserPersonality, UserSettings } from "@/types";

export const mockTherapySessions: Therapy[] = [
  {
    id: "therapy-1",
    date: "2023-08-10T14:30:00Z",
    topic: "Work-related anxiety",
    duration: 35,
    mood: {
      before: 3,
      after: 7,
    },
    summary: "Explored techniques for managing workplace stress and developing healthier boundaries.",
    insights: [
      "You tend to prioritize others' needs over your own",
      "Your anxiety increases when facing ambiguous tasks",
      "Deep breathing exercises were effective during our session",
    ],
  },
  {
    id: "therapy-2",
    date: "2023-08-24T15:00:00Z",
    topic: "Relationship challenges",
    duration: 45,
    mood: {
      before: 4,
      after: 8,
    },
    summary: "Discussed communication patterns in relationships and identified specific triggers.",
    insights: [
      "You communicate more effectively when you feel heard",
      "Taking time to process emotions before responding helps you",
      "Your relationship anxiety stems from past experiences",
    ],
  },
  {
    id: "therapy-3",
    date: "2023-09-05T16:30:00Z",
    topic: "Self-confidence building",
    duration: 40,
    mood: {
      before: 5,
      after: 9,
    },
    summary: "Explored cognitive distortions and developed practical techniques for building self-esteem.",
    insights: [
      "You're developing greater awareness of negative self-talk",
      "Visual achievements help motivate you more than abstract goals",
      "You respond well to affirmation-based exercises",
    ],
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "convo-1",
    date: "2023-08-10T14:30:00Z",
    topic: "Work-related anxiety",
    messages: [
      {
        id: "msg1",
        role: "user",
        content: "I've been feeling really overwhelmed at work lately.",
        timestamp: "2023-08-10T14:30:05Z",
      },
      {
        id: "msg2",
        role: "assistant",
        content: "I'm sorry to hear you're feeling overwhelmed. Can you tell me more about what's happening at work that's causing these feelings?",
        timestamp: "2023-08-10T14:30:15Z",
      },
      {
        id: "msg3",
        role: "user",
        content: "I have too many projects and my manager keeps adding more without removing anything from my plate.",
        timestamp: "2023-08-10T14:31:05Z",
      },
      {
        id: "msg4",
        role: "assistant",
        content: "That sounds really challenging. It's hard when responsibilities keep increasing without any adjustment to your capacity. Have you had a chance to discuss this with your manager?",
        timestamp: "2023-08-10T14:31:25Z",
      },
    ],
    insights: [
      "Difficulty setting workplace boundaries",
      "Hesitancy to communicate needs to authority figures",
      "Tendency to take on too much responsibility",
    ],
  },
  {
    id: "convo-2",
    date: "2023-08-24T15:00:00Z",
    topic: "Relationship challenges",
    messages: [
      {
        id: "msg1",
        role: "user",
        content: "My partner and I keep having the same argument over and over.",
        timestamp: "2023-08-24T15:00:05Z",
      },
      {
        id: "msg2",
        role: "assistant",
        content: "Recurring arguments can be frustrating. What's the argument about, and what happens when it starts?",
        timestamp: "2023-08-24T15:00:20Z",
      },
      {
        id: "msg3",
        role: "user",
        content: "It's always about how we spend our free time. They want more social activities and I need more alone time to recharge.",
        timestamp: "2023-08-24T15:01:15Z",
      },
      {
        id: "msg4",
        role: "assistant",
        content: "That's a common challenge, especially when people have different needs for social interaction and alone time. It sounds like you might be more introverted and need that time to recharge, while your partner may get energy from social interactions. Have you both discussed your needs outside of the arguments?",
        timestamp: "2023-08-24T15:01:45Z",
      },
    ],
    insights: [
      "Different social energy needs from partner",
      "Communication improves when not in emotional state",
      "Values alone time for mental health maintenance",
    ],
  },
];

export const mockTherapyPreferences: TherapyPreference[] = [
  {
    id: "pref-1",
    name: "Cognitive Behavioral",
    description: "Focus on identifying and changing negative thought patterns",
    icon: "brain",
  },
  {
    id: "pref-2",
    name: "Mindfulness-Based",
    description: "Present-moment awareness and acceptance practices",
    icon: "leaf",
  },
  {
    id: "pref-3",
    name: "Solution-Focused",
    description: "Emphasis on solutions rather than problems",
    icon: "lightbulb",
  },
  {
    id: "pref-4",
    name: "Compassion-Focused",
    description: "Developing self-compassion and emotional regulation",
    icon: "heart",
  },
];

export const mockUserPersonality: UserPersonality = {
  traits: {
    openness: 75,
    conscientiousness: 82,
    extraversion: 45,
    agreeableness: 88,
    neuroticism: 62,
  },
  insights: [
    "You're highly conscientious and value organization and reliability",
    "Your moderate extraversion suggests you enjoy social interactions but also need alone time",
    "Your high agreeableness indicates you prioritize harmony and cooperation",
    "Your openness to experience suggests you enjoy intellectual curiosity and creativity",
  ],
  strengths: [
    "Excellent at organization and planning",
    "Strong empathy for others",
    "Creative problem-solving abilities",
    "Consistent follow-through on commitments",
  ],
  challenges: [
    "Tendency to overthink decisions",
    "Difficulty setting boundaries with others",
    "Occasional anxiety in uncertain situations",
    "Perfectionism that can lead to procrastination",
  ],
};

export const mockUserSettings: UserSettings = {
  name: "Alex Johnson",
  email: "alex@example.com",
  preferences: {
    theme: "system",
    notifications: true,
    soundEffects: false,
    therapistStyle: "Compassionate and direct",
    sessionDuration: 30,
  },
};
