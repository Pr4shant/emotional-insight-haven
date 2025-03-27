
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JourneyMilestone } from "@/types";
import { Trophy, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface JourneyMilestoneProps {
  milestone: JourneyMilestone;
}

export function JourneyMilestoneCard({ milestone }: JourneyMilestoneProps) {
  // Calculate progress percentage
  const progressPercentage = (milestone.progress / milestone.tasksRequired) * 100;
  
  return (
    <Card className={`hover:shadow-md transition-all ${milestone.completed ? "bg-primary/5 border-primary/20" : ""}`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {milestone.completed ? (
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Trophy className="h-4 w-4 text-primary" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {progressPercentage > 0 ? (
                  <span className="text-xs font-medium">{Math.round(progressPercentage)}%</span>
                ) : (
                  <Lock className="h-4 w-4 text-gray-400" />
                )}
              </div>
            )}
            <h3 className="text-lg font-semibold">{milestone.title}</h3>
          </div>
          <Badge className="bg-primary/10 text-primary">+{milestone.reward.xp} XP</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 pl-11">{milestone.description}</p>

        <div className="pl-11">
          <div className="flex justify-between text-sm mb-2">
            <span>{milestone.progress} / {milestone.tasksRequired} tasks</span>
            {milestone.completed && <span className="text-primary font-medium">Completed!</span>}
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-2 mb-2" 
          />
        </div>
      </CardContent>
    </Card>
  );
}
