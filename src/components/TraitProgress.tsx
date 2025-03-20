
import { Progress } from "@/components/ui/progress";

interface TraitProgressProps {
  trait: string;
  value: number;
  colorIndex: number;
  colors: string[];
}

export function TraitProgress({ trait, value, colorIndex, colors }: TraitProgressProps) {
  // Get the color directly from the array
  const color = colors[colorIndex % colors.length];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-therapy-text">{trait}</span>
        <span className="text-sm text-therapy-text-muted">{value}%</span>
      </div>
      <Progress 
        value={value} 
        className="h-2.5 bg-therapy-muted rounded-full" 
        indicatorClassName={`bg-[${color}]`} 
      />
    </div>
  );
}
