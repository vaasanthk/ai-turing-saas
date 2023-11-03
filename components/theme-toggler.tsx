"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className="hover:shadow-sm hover:shadow-[#8ee2f5]
      h-9 w-9"
    >
      <SunIcon
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme("dark")}
      />
      <MoonIcon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#f776e4]"
        onClick={() => setTheme("light")}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
