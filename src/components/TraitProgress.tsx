
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
        <span className="text-sm font-medium transition-colors duration-300 group-hover:text-white/90">{trait}</span>
        <span className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/70">{value}%</span>
      </div>
      <Progress 
        value={value} 
        className="h-2 bg-background/20 backdrop-blur-sm" 
        indicatorClassName={`bg-gradient-to-r from-white/80 to-white/50 shadow-[0_0_10px_rgba(255,255,255,0.3)]`} 
      />
    </div>
  );
}
