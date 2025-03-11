
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
