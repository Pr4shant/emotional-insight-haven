
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JourneyTask } from "@/types";
import { Clock, Award, Check, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface JourneyTaskProps {
  task: JourneyTask;
  onTaskUpdate: (taskId: string, status: "pending" | "in-progress" | "completed") => void;
}

export function JourneyTaskCard({ task, onTaskUpdate }: JourneyTaskProps) {
  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      mindfulness: "bg-amber-100 text-amber-800",
      physical: "bg-emerald-100 text-emerald-800",
      social: "bg-blue-100 text-blue-800",
      emotional: "bg-rose-100 text-rose-800",
      cognitive: "bg-purple-100 text-purple-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Get difficulty stars
  const getDifficultyStars = (difficulty: number) => {
    const stars = [];
    for (let i = 0; i < difficulty; i++) {
      stars.push(<Award key={i} className="h-4 w-4 text-amber-500" />);
    }
    return stars;
  };

  // Status styling
  const getStatusStyles = (status: string) => {
    const styles = {
      pending: {
        badge: "bg-gray-100 text-gray-800",
        progress: 0,
      },
      "in-progress": {
        badge: "bg-blue-100 text-blue-800",
        progress: 50,
      },
      completed: {
        badge: "bg-green-100 text-green-800",
        progress: 100,
      },
    };
    return styles[status as keyof typeof styles];
  };

  const statusStyle = getStatusStyles(task.status);

  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getCategoryColor(task.category)} variant="outline">
            {task.category}
          </Badge>
          <div className="flex items-center">
            <span className="text-xs mr-2">Difficulty:</span>
            <div className="flex">{getDifficultyStars(task.difficulty)}</div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{task.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{task.estimatedDuration} mins</span>
          </div>
          <Badge className="bg-primary/10 text-primary">+{task.xpReward} XP</Badge>
        </div>

        <Progress 
          value={statusStyle.progress} 
          className="h-2 mb-4" 
        />

        <div className="flex justify-between items-center">
          <Badge className={statusStyle.badge}>
            {task.status === "completed" ? (
              <span className="flex items-center">
                <Check className="h-3 w-3 mr-1" /> Completed
              </span>
            ) : (
              task.status.charAt(0).toUpperCase() + task.status.slice(1).replace("-", " ")
            )}
          </Badge>

          {task.status === "pending" && (
            <Button 
              size="sm" 
              onClick={() => onTaskUpdate(task.id, "in-progress")}
              className="text-xs"
            >
              Start Task <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}

          {task.status === "in-progress" && (
            <Button 
              size="sm" 
              onClick={() => onTaskUpdate(task.id, "completed")}
              className="text-xs"
            >
              Complete <Check className="h-3 w-3 ml-1" />
            </Button>
          )}

          {task.status === "completed" && (
            <div className="text-xs text-muted-foreground">
              {task.dateCompleted ? new Date(task.dateCompleted).toLocaleDateString() : ""}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
