import { cn } from "@/lib/utils"

function Skeleton({
  className,
  children,
  ...props
}) {
  return (<div className={cn("animate-pulse bg-muted", className)} {...props}>
    {children}
  </div>);
}

export { Skeleton }
