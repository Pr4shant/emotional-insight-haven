
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface MoodProgressProps {
  before: number;
  after: number;
  max?: number;
}

export function MoodProgress({ before, after, max = 10 }: MoodProgressProps) {
  const percentage = (after / max) * 100;
  const improvement = after - before;
  
  // Generate stars based on improvement
  const renderStars = () => {
    const starCount = Math.min(Math.max(Math.floor(improvement), 0), 3);
    return (
      <div className="flex">
        {Array.from({ length: starCount }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
        ))}
      </div>
    );
  };
  
  // Get the color based on improvement
  const getProgressColor = () => {
    if (improvement >= 3) return "bg-emerald-500";
    if (improvement > 0) return "bg-teal-500";
    if (improvement === 0) return "bg-amber-500";
    return "bg-rose-500"; // negative improvement
  };
  
  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">{before}</span>
          <span className="text-xs text-therapy-text-muted">Before</span>
        </div>
        <div className="flex-1">
          <Progress 
            value={percentage} 
            className="h-2.5 bg-therapy-muted" 
            indicatorClassName={getProgressColor()} 
          />
          <div className="flex justify-end mt-1">
            {renderStars()}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">{after}</span>
          <span className="text-xs text-therapy-text-muted">After</span>
        </div>
      </div>
      
      {/* Achievement message */}
      {improvement > 0 && (
        <div className="text-xs text-center text-muted-foreground mt-1 animate-fade-in">
          {improvement >= 3 ? '🎯 Outstanding progress!' : 'Great improvement!'}
        </div>
      )}
    </div>
  );
}
