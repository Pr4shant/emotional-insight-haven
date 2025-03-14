
import { Progress } from "@/components/ui/progress";

interface TraitProgressProps {
  trait: string;
  value: number;
  colorIndex: number;
  colors: string[];
}

export function TraitProgress({ trait, value, colorIndex, colors }: TraitProgressProps) {
  // We'll use just grayscale colors regardless of the passed colors
  const grayscaleColors = ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333'];
  const color = grayscaleColors[colorIndex % grayscaleColors.length];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{trait}</span>
        <span className="text-sm text-therapy-text-muted">{value}%</span>
      </div>
      <Progress 
        value={value} 
        className="h-2 bg-black/30" 
        indicatorClassName={`bg-[${color}]`} 
      />
    </div>
  );
}
