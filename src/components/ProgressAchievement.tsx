
import { useState } from "react";
import { Badge, BadgeCheck, Trophy, Star, Award, Medal } from "lucide-react";
import { motion } from "framer-motion";

interface AchievementProps {
  title: string;
  description: string;
  progress: number; // 0-100
  type: "session" | "mood" | "trait" | "streak";
  level?: number;
  completed?: boolean;
  icon?: "badge" | "trophy" | "star" | "medal" | "award"; 
}

export function ProgressAchievement({ 
  title, 
  description, 
  progress, 
  type, 
  level = 1, 
  completed = false,
  icon = "badge"
}: AchievementProps) {
  const [hovered, setHovered] = useState(false);
  
  // Get the appropriate icon
  const getIcon = () => {
    switch (icon) {
      case "trophy": return <Trophy className="h-6 w-6" />;
      case "star": return <Star className="h-6 w-6" />;
      case "medal": return <Medal className="h-6 w-6" />;
      case "award": return <Award className="h-6 w-6" />;
      case "badge":
      default: 
        return completed ? <BadgeCheck className="h-6 w-6" /> : <Badge className="h-6 w-6" />;
    }
  };
  
  // Get the color based on type
  const getColor = () => {
    if (completed) {
      switch (type) {
        case "session": return "text-indigo-500";
        case "mood": return "text-emerald-500";
        case "trait": return "text-amber-500";
        case "streak": return "text-blue-500";
        default: return "text-primary";
      }
    }
    return "text-muted-foreground";
  };
  
  return (
    <motion.div 
      className={`p-3 border rounded-lg flex items-center gap-3 ${completed ? 'border-primary/30' : 'border-muted'} hover:border-primary/50 transition-colors`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      animate={completed ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-2 rounded-full ${getColor()} ${completed ? 'bg-muted' : 'bg-muted/40'}`}>
        {getIcon()}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-medium">{title}</h4>
          {level > 1 && (
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">Lvl {level}</span>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground">{description}</p>
        
        {!completed && (
          <div className="mt-2 bg-muted h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      {completed && (
        <div className="text-xs font-medium text-primary-foreground bg-primary py-1 px-2 rounded-full">
          Complete!
        </div>
      )}
    </motion.div>
  );
}
