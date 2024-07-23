import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center focus:ring-0 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary  text-white hover:bg-primary-40/80 transition-colors duration-500",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 transition-colors duration-500",
        outline:
          "border border-[#717972] bg-transparent hover:bg-[#717972]/20 text-primary hover:text-primary/80 transition-colors duration-500",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 transition-colors duration-500",
        ghost: "text-[#171D19] border border-[#1d1b201f]",
        link: "text-slate-900 underline-offset-4 hover:underline transition-colors duration-500",
      },
      size: {
        default: "rounded-lg px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
