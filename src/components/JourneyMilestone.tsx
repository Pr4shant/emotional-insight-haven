
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JourneyMilestone } from "@/types";
import { Trophy, Lock, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface JourneyMilestoneProps {
  milestone: JourneyMilestone;
}

export function JourneyMilestoneCard({ milestone }: JourneyMilestoneProps) {
  // Calculate progress percentage
  const progressPercentage = (milestone.progress / milestone.tasksRequired) * 100;
  
  return (
    <Card className={`hover:shadow-md transition-all hover:-translate-y-1 border-2 overflow-hidden ${milestone.completed ? "border-amber-300" : "border-amber-100"}`}>
      <div className={`h-1 w-full ${milestone.completed ? "bg-amber-500" : "bg-amber-200"}`}></div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {milestone.completed ? (
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3 border-2 border-amber-300">
                <Trophy className="h-5 w-5 text-amber-500" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center mr-3 border-2 border-amber-200">
                {progressPercentage > 0 ? (
                  <span className="text-sm font-bold text-amber-600">{Math.round(progressPercentage)}%</span>
                ) : (
                  <Lock className="h-5 w-5 text-amber-300" />
                )}
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-amber-900">{milestone.title}</h3>
              <p className="text-xs text-muted-foreground">{milestone.tasksRequired} tasks required</p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-full px-3 py-1 flex items-center">
            <Star className="h-4 w-4 mr-1 text-amber-500" />
            <span className="text-amber-700 font-medium text-sm">+{milestone.reward.xp} XP</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{milestone.description}</p>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-amber-700">{milestone.progress} / {milestone.tasksRequired} tasks</span>
            {milestone.completed && (
              <span className="text-green-600 font-medium flex items-center">
                <Trophy className="h-4 w-4 mr-1" /> Completed!
              </span>
            )}
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-3 mb-1 bg-amber-100 rounded-full" 
          />
          
          {milestone.completed && milestone.reward.badge && (
            <div className="mt-3 bg-amber-50 rounded-lg p-2 flex items-center justify-center">
              <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
                <Trophy className="h-3 w-3 mr-1" /> {milestone.reward.badge} Badge Earned!
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
