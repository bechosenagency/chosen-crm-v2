import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[hsl(var(--c-border))] bg-[hsl(var(--c-surface-1))] px-3 py-2 text-sm text-[hsl(var(--c-text-primary))] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsl(var(--c-text-secondary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--c-primary))]/60 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }