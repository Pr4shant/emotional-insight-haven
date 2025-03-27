
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
    <Card className={`hover:shadow-md transition-all overflow-hidden border-0 ${milestone.completed ? "bg-gradient-to-r from-amber-50 to-amber-100" : "bg-white"}`}>
      <div className={`h-1 w-full ${milestone.completed ? "bg-amber-500" : "bg-amber-200"}`}></div>
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          {milestone.completed ? (
            <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center mr-3 border-2 border-amber-300">
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
          ) : (
            <div className="h-9 w-9 rounded-full bg-amber-50 flex items-center justify-center mr-3 border-2 border-amber-200">
              {progressPercentage > 0 ? (
                <span className="text-xs font-bold text-amber-600">{Math.round(progressPercentage)}%</span>
              ) : (
                <Lock className="h-4 w-4 text-amber-300" />
              )}
            </div>
          )}
          <div>
            <h3 className="text-base font-bold text-amber-900">{milestone.title}</h3>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 mr-1 text-amber-500" />
              <span className="text-amber-700 font-medium text-xs">+{milestone.reward.xp} XP</span>
            </div>
          </div>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2 my-2 bg-amber-100 rounded-full" 
        />
        
        <div className="flex justify-between text-xs mt-1">
          <span className="text-amber-700">{milestone.progress} / {milestone.tasksRequired} tasks</span>
          {milestone.completed && (
            <Badge className="bg-amber-100 text-amber-800 border border-amber-200 font-normal text-xs px-2 py-0 h-5">
              <Trophy className="h-3 w-3 mr-1" /> Complete
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
