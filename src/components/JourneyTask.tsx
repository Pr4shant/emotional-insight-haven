
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JourneyTask } from "@/types";
import { Clock, Award, Check, ChevronRight, Star, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface JourneyTaskProps {
  task: JourneyTask;
  onTaskUpdate: (taskId: string, status: "pending" | "in-progress" | "completed") => void;
}

export function JourneyTaskCard({ task, onTaskUpdate }: JourneyTaskProps) {
  // Get category color and icon
  const getCategoryDetails = (category: string) => {
    const details = {
      mindfulness: {
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: <Star className="h-4 w-4 text-amber-500 mr-1" />
      },
      physical: {
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: <Shield className="h-4 w-4 text-emerald-500 mr-1" />
      },
      social: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Clock className="h-4 w-4 text-blue-500 mr-1" />
      },
      emotional: {
        color: "bg-rose-100 text-rose-800 border-rose-200",
        icon: <Award className="h-4 w-4 text-rose-500 mr-1" />
      },
      cognitive: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: <Award className="h-4 w-4 text-purple-500 mr-1" />
      },
    };
    return details[category as keyof typeof details] || {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <Award className="h-4 w-4 text-gray-500 mr-1" />
    };
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
        badge: "bg-gray-100 text-gray-800 border-gray-200",
        progress: 0,
      },
      "in-progress": {
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        progress: 50,
      },
      completed: {
        badge: "bg-green-100 text-green-800 border-green-200",
        progress: 100,
      },
    };
    return styles[status as keyof typeof styles];
  };

  const statusStyle = getStatusStyles(task.status);
  const categoryDetails = getCategoryDetails(task.category);

  return (
    <Card className="hover:shadow-md transition-all hover:-translate-y-1 border-2 overflow-hidden">
      <div className={`h-1 w-full ${task.status === "completed" ? "bg-green-500" : task.status === "in-progress" ? "bg-blue-500" : "bg-amber-200"}`}></div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge className={`${categoryDetails.color} flex items-center px-2 py-1 border`} variant="outline">
            {categoryDetails.icon}
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </Badge>
          <div className="flex items-center bg-amber-50 rounded-full px-2 py-1">
            <span className="text-xs mr-1 text-amber-800">Reward:</span>
            <Badge className="bg-amber-200 text-amber-800 border-none">+{task.xpReward} XP</Badge>
          </div>
        </div>

        <h3 className="text-lg font-bold mb-2 text-amber-900">{task.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{task.description}</p>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1 text-amber-500" />
            <span>{task.estimatedDuration} mins</span>
          </div>
          <div className="flex">
            <span className="text-xs mr-2 text-amber-700">Difficulty:</span>
            <div className="flex">{getDifficultyStars(task.difficulty)}</div>
          </div>
        </div>

        <Progress 
          value={statusStyle.progress} 
          className="h-2 mb-4 bg-amber-100" 
        />

        <div className="flex justify-between items-center">
          <Badge className={`${statusStyle.badge} border`}>
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
              className="text-xs bg-amber-500 hover:bg-amber-600"
            >
              Start Task <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}

          {task.status === "in-progress" && (
            <Button 
              size="sm" 
              onClick={() => onTaskUpdate(task.id, "completed")}
              className="text-xs bg-amber-500 hover:bg-amber-600"
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
