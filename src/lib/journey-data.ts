
import { JourneyTask, JourneyMilestone } from "@/types";

export const mockJourneyTasks: JourneyTask[] = [
  {
    id: "task-1",
    title: "5-Minute Mindful Breathing",
    description: "Take 5 minutes to focus on your breath. Inhale for 4 counts, hold for 2, exhale for 6 counts.",
    status: "completed",
    difficulty: 1,
    category: "mindfulness",
    xpReward: 50,
    dateCreated: "2023-09-01T09:00:00Z",
    dateCompleted: "2023-09-02T14:35:00Z",
    relatedTopic: "Work-related anxiety",
    estimatedDuration: 5
  },
  {
    id: "task-2",
    title: "Journal Your Feelings",
    description: "Write down your emotions about work stress without judgment. Note physical sensations and thought patterns.",
    status: "in-progress",
    difficulty: 1,
    category: "emotional",
    xpReward: 75,
    dateCreated: "2023-09-02T09:00:00Z",
    relatedTopic: "Work-related anxiety",
    estimatedDuration: 15
  },
  {
    id: "task-3",
    title: "Schedule Worry Time",
    description: "Set aside 15 minutes today to focus exclusively on your worries. Outside this time, postpone worry thoughts.",
    status: "pending",
    difficulty: 2,
    category: "cognitive",
    xpReward: 100,
    dateCreated: "2023-09-03T09:00:00Z",
    relatedTopic: "Work-related anxiety",
    estimatedDuration: 15
  },
  {
    id: "task-4",
    title: "Active Listening Practice",
    description: "During your next conversation, focus entirely on listening without planning your response. Notice the difference.",
    status: "pending",
    difficulty: 2,
    category: "social",
    xpReward: 100,
    dateCreated: "2023-09-04T09:00:00Z",
    relatedTopic: "Relationship challenges",
    estimatedDuration: 20
  },
  {
    id: "task-5",
    title: "Gratitude Walk",
    description: "Take a 10-minute walk focusing only on things you're grateful for. Notice small details in your environment.",
    status: "pending",
    difficulty: 1,
    category: "physical",
    xpReward: 75,
    dateCreated: "2023-09-05T09:00:00Z",
    relatedTopic: "Self-confidence building",
    estimatedDuration: 10
  },
  {
    id: "task-6",
    title: "Challenge Negative Self-Talk",
    description: "Notice and write down 3 negative thoughts about yourself, then create evidence-based counter-arguments.",
    status: "pending",
    difficulty: 3,
    category: "cognitive",
    xpReward: 150,
    dateCreated: "2023-09-06T09:00:00Z",
    relatedTopic: "Self-confidence building",
    estimatedDuration: 30
  }
];

export const mockJourneyMilestones: JourneyMilestone[] = [
  {
    id: "milestone-1",
    title: "Mindfulness Novice",
    description: "Complete 3 mindfulness tasks to build your awareness foundation.",
    tasksRequired: 3,
    progress: 1,
    completed: false,
    reward: {
      xp: 200,
      badge: "mindfulness-novice"
    }
  },
  {
    id: "milestone-2",
    title: "Anxiety Management",
    description: "Complete the anxiety reduction task series.",
    tasksRequired: 3,
    progress: 2,
    completed: false,
    reward: {
      xp: 300,
      badge: "anxiety-master"
    }
  },
  {
    id: "milestone-3",
    title: "First Week Journey",
    description: "Complete your first week of consistent practice.",
    tasksRequired: 5,
    progress: 5,
    completed: true,
    reward: {
      xp: 500,
      badge: "first-week"
    }
  }
];
