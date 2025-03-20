
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-white/20 bg-black/50 backdrop-blur-md px-3 py-2 text-base text-white ring-offset-background placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60 focus-visible:border-white/30 focus-visible:shadow-[0_0_10px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
