"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"


/**
 * Define the type of the prop object so we can add props to the "Radix" component
 * @typedef {Object} ExtraProps
 * @property {string} [className]
 * @property {boolean} [inset] this is a comment that will be visible in intellisense
 * @property {React.ReactNode} [children]
 */


/**
 * We import the radix props and merge them with the extra props we just created
 * @typedef {ExtraProps & import("@radix-ui/react-avatar").AvatarProps} MergedDropdownMenuSubTriggerProps
 */


/**
 * and we give it to the forward ref (first is the ref, second is the type we created in the previous step)
 * @type {React.ForwardRefRenderFunction<HTMLElement, MergedDropdownMenuSubTriggerProps>}
 */
const Avatar = React.forwardRef
    // <
    //   React.ElementRef<typeof AvatarPrimitive.Root>,
    //   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
    // >
    (({ className, ...props }, ref) => (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(
                "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
                className
            )}
            {...props}
        />
    ))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef
    // <
    //     React.ElementRef < typeof AvatarPrimitive.Image >,
    //     React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
    // >
    (({ className, ...props }, ref) => (
        <AvatarPrimitive.Image
            ref={ref}
            className={cn("aspect-square h-full w-full", className)}
            {...props}
        />
    ))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef
    // <
    //     React.ElementRef < typeof AvatarPrimitive.Fallback >,
    //     React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
    // >
    (({ className, ...props }, ref) => (
        <AvatarPrimitive.Fallback
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-muted",
                className
            )}
            {...props}
        />
    ))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
