
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Star } from "lucide-react";

interface TraitProgressProps {
  trait: string;
  value: number;
  colorIndex: number;
  colors: string[];
}

export function TraitProgress({ trait, value, colorIndex, colors }: TraitProgressProps) {
  // Get the color directly from the array
  const color = colors[colorIndex % colors.length];
  
  // Determine achievement level based on value
  const getAchievementIcon = () => {
    if (value >= 90) return <Trophy className="h-4 w-4 text-amber-500" />;
    if (value >= 75) return <Award className="h-4 w-4 text-indigo-500" />;
    if (value >= 60) return <Star className="h-4 w-4 text-teal-500" />;
    return null;
  };

  // Generate level based on trait value
  const level = Math.floor(value / 20) + 1;
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">{trait}</span>
          {getAchievementIcon()}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium py-0.5 px-1.5 rounded-full bg-muted">Lvl {level}</span>
          <span className="text-sm text-therapy-text-muted">{value}%</span>
        </div>
      </div>
      <Progress 
        value={value} 
        className="h-2 bg-therapy-muted" 
        indicatorClassName={`bg-[${color}]`} 
      />
      
      {/* XP indicator */}
      <div className="flex justify-end mt-1">
        <span className="text-xs text-muted-foreground">
          {value % 20}/20 XP to Lvl {level + 1}
        </span>
      </div>
    </div>
  );
}
