
import { Progress } from "@/components/ui/progress";

interface MoodProgressProps {
  before: number;
  after: number;
  max?: number;
}

export function MoodProgress({ before, after, max = 10 }: MoodProgressProps) {
  const percentage = (after / max) * 100;
  
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-lg font-medium">{before}</span>
      <div className="flex-1">
        <Progress 
          value={percentage} 
          className="h-2 bg-therapy-muted" 
          indicatorClassName="bg-therapy-accent" 
        />
      </div>
      <span className="text-lg font-medium">{after}</span>
    </div>
  );
}
