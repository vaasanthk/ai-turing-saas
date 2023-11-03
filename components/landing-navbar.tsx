"use client"

import { ModeToggle } from "@/components/theme-toggler"
import { montserrat } from "@/config/font"
import { useAuth } from "@clerk/nextjs"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

const LandingNavbar = () => {
  const { isSignedIn } = useAuth()
  const { theme } = useTheme()

  const lightThemeFontColor = "text-zinc-600"

  const fontColorClass = theme === "light" ? lightThemeFontColor : ""

  return (
    <nav className={`p-4 bg-transparent flex items-center justify-between `}>
      <Link href={"/"} className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image
            className="hover:animate-spin"
            fill
            src={"/logo.png"}
            alt="logo"
          />
        </div>

        <h1
          className={clsx(
            "text-2xl lg:text-3xl font-bold text-white ",
            montserrat.className,
            fontColorClass
          )}
        >
          Turing
        </h1>
      </Link>

      <div className="flex items-center gap-x-2">
        {/* <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            size={"sm"}
            className="rounded-2xl font-bold bg-[#0369c8] hover:bg-[#237acc]
            hover:shadow-sm hover:shadow-[#95f3e8] text-white
            "
          >
            Get Started
          </Button>
        </Link> */}

        <div className="rounded-lg border p-1 hover:shadow-sm hover:shadow-[#8ee2f5]">
          <Link href={"https://twitter.com/Vasanth74405679"}>
            {theme === "light" ? (
              <Image
                src={"/twitter-light.svg"}
                alt="github"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={"/twitter-dark.svg"}
                alt="github"
                width={24}
                height={24}
              />
            )}
          </Link>
        </div>

        <div className="rounded-lg border p-1 hover:shadow-sm hover:shadow-[#8ee2f5]">
          <Link href={"https://github.com/vaasanthk"}>
            {theme === "light" ? (
              <Image
                src={"/github-light.svg"}
                alt="github"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={"/github-dark.svg"}
                alt="github"
                width={24}
                height={24}
              />
            )}
          </Link>
        </div>

        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default LandingNavbar
