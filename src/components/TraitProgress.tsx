
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
    <div className="group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-white/90">{trait}</span>
        <span className="text-sm text-white/70">{value}%</span>
      </div>
      <Progress 
        value={value} 
        className="h-2.5 bg-white/10" 
        indicatorClassName="bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
      />
    </div>
  );
}
