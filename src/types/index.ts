
export type Therapy = {
  id: string;
  date: string;
  topic: string;
  duration: number;
  mood: {
    before: number;
    after: number;
  };
  summary: string;
  insights: string[];
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  date: string;
  topic: string;
  messages: Message[];
  insights: string[];
};

export type TherapyPreference = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type UserPersonality = {
  traits: {
    [key: string]: number;
  };
  insights: string[];
  strengths: string[];
  challenges: string[];
  level?: number;
  xp?: number;
};

export type UserAchievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  type: "session" | "mood" | "trait" | "streak";
  level?: number;
  completed: boolean;
  icon: "badge" | "trophy" | "star" | "medal" | "award";
  unlockedAt?: string;
};

export type UserSettings = {
  name: string;
  email: string;
  preferences: {
    theme: "light" | "dark" | "system";
    notifications: boolean;
    soundEffects: boolean;
    therapistStyle: string;
    sessionDuration: number;
  };
};

export type JourneyTask = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  difficulty: 1 | 2 | 3; // 1 = easy, 2 = medium, 3 = challenging
  category: "mindfulness" | "physical" | "social" | "emotional" | "cognitive";
  xpReward: number;
  dateCreated: string;
  dateCompleted?: string;
  relatedTopic?: string;
  estimatedDuration: number; // in minutes
};

export type JourneyMilestone = {
  id: string;
  title: string;
  description: string;
  tasksRequired: number;
  progress: number;
  completed: boolean;
  reward: {
    xp: number;
    badge?: string;
  };
};
