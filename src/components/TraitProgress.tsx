
import { Progress } from "@/components/ui/progress";

interface TraitProgressProps {
  trait: string;
  value: number;
  colorIndex: number;
  colors: string[];
}

export function TraitProgress({ trait, value, colorIndex, colors }: TraitProgressProps) {
  // Get the color directly from the array instead of using a template string with array access
  const color = colors[colorIndex % colors.length];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{trait}</span>
        <span className="text-sm text-therapy-text-muted">{value}%</span>
      </div>
      <Progress 
        value={value} 
        className="h-2 bg-therapy-muted" 
        indicatorClassName={`bg-[${color}]`} 
      />
    </div>
  );
}
