"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import Typewriter from "typewriter-effect"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

const LandingHero = () => {
  const { isSignedIn } = useAuth()

  const { theme } = useTheme()

  const lightThemeFontColor = "text-zinc-600"

  const fontColorClass = theme === "light" ? lightThemeFontColor : ""

  return (
    <div className="text-white font-bold py-36 text-center space-y-5 -mt-8">
      <div
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        space-y-5 font-extrabold"
      >
        {theme === "light" ? (
          <h1 className={fontColorClass}>All In One AI Tool for</h1>
        ) : (
          <h1>All In One AI Tool for</h1>
        )}
        <div
          className="text-transparent bg-clip-text bg-gradient-to-r 
        from-yellow-400 to-pink-600"
        >
          <Typewriter
            options={{
              strings: [
                "Chatbot.",
                "Code Generation.",
                "Image Generation.",
                "Video Generation.",
                "Music Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className=" text-sm md:text-xl font-normal text-zinc-400">
          Create content using advance AI 10x faster.
        </div>

        <div>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button
              variant={"premium"}
              className="md:text-lg p-4 
            md:p-6 rounded-full
            font-bold"
            >
              Start Generating For Free
            </Button>
          </Link>
        </div>

        <div className="text-sm lg:text-lg text-zinc-400 font-normal">
          No credit card required.
        </div>
      </div>
    </div>
  )
}

export default LandingHero
