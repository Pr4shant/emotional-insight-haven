
import { useState } from "react";
import { ProgressAchievement } from "./ProgressAchievement";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Star, Award, BadgeCheck } from "lucide-react";

export function AchievementsList() {
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress">("all");
  
  // Example achievements data
  const achievements = [
    {
      id: "ach1",
      title: "Therapy Pioneer",
      description: "Complete your first therapy session",
      progress: 100,
      type: "session" as const,
      completed: true,
      icon: "trophy" as const,
    },
    {
      id: "ach2",
      title: "Mood Master",
      description: "Improve your mood by 5+ points in a session",
      progress: 100,
      type: "mood" as const,
      completed: true,
      icon: "star" as const,
    },
    {
      id: "ach3",
      title: "Consistency Champion",
      description: "Complete 5 therapy sessions",
      progress: 60,
      type: "streak" as const,
      level: 1,
      completed: false,
      icon: "medal" as const,
    },
    {
      id: "ach4",
      title: "Trait Explorer",
      description: "Discover all your personality traits",
      progress: 100,
      type: "trait" as const,
      completed: true,
      icon: "award" as const,
    },
    {
      id: "ach5",
      title: "Insight Gatherer",
      description: "Collect 10 personal insights from sessions",
      progress: 40,
      type: "session" as const,
      completed: false,
      icon: "badge" as const,
    },
    {
      id: "ach6",
      title: "Self-Awareness Guru",
      description: "Complete your personality profile",
      progress: 85,
      type: "trait" as const,
      completed: false,
      icon: "badge" as const,
    }
  ];
  
  // Filter achievements based on selected filter
  const filteredAchievements = achievements.filter(ach => {
    if (filter === "all") return true;
    if (filter === "completed") return ach.completed;
    return !ach.completed; // in-progress
  });
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2 pb-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button 
          variant={filter === "completed" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("completed")}
          className="flex items-center gap-1"
        >
          <BadgeCheck className="h-3.5 w-3.5" />
          Completed
        </Button>
        <Button 
          variant={filter === "in-progress" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("in-progress")}
        >
          In Progress
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAchievements.map(achievement => (
          <ProgressAchievement
            key={achievement.id}
            title={achievement.title}
            description={achievement.description}
            progress={achievement.progress}
            type={achievement.type}
            level={achievement.level}
            completed={achievement.completed}
            icon={achievement.icon}
          />
        ))}
      </div>
      
      {filteredAchievements.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No achievements found
        </div>
      )}
    </div>
  );
}
