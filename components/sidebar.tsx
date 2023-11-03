"use client"

import { inter, montserrat, montserratSmall, roboto } from "@/config/font"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Video,
} from "lucide-react"
import Image from "next/image"

import clsx from "clsx"
import { Button } from "./ui/button"
import { useState } from "react"
import FreeCounter from "./free-counter"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },

  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },

  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-green-500",
  },

  {
    label: "Video Generation",
    icon: Video,
    href: "/video",
    color: "text-pink-500",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-orange-500",
  },

  {
    label: "Code",
    icon: Code,
    href: "/code",
    color: "text-red-500",
  },

  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-[#80faf4]",
  },
]

interface SidebarProps {
  apiLimitCount: number
  isPro: boolean
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const [chatCleared, setChatCleared] = useState(false)

  // Function to handle clearing the chat
  const handleClearChat = () => {
    // Clear the chat messages from local storage
    localStorage.clear()

    // Update the state to indicate that chat has been cleared
    setChatCleared(true)

    router.replace("/conversation")
  }

  return (
    <div
      className="text-white space-y-4 py-4
  flex flex-col h-full 
  "
    >
      <div className="px-3 py-2 mb-20">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-24">
          <div className="h-8 w-8 mr-4 hover:animate-spin">
            <Image
              alt="logo"
              src={"/logo.png"}
              width={52}
              height={32}
              style={{ height: "auto" }}
            />
          </div>
          <h1
            className={clsx(
              "text-2xl bg-white font-bold  hover:bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text transition"
            )}
          >
            TURING
          </h1>
        </Link>

        <div className="space-y-4">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={clsx(
                "text-medium flex p-3 w-full justify-center rounded-lg hover:bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1 group">
                <route.icon
                  className={clsx(
                    "h-6 w-6 mr-2",
                    route.color,
                    "group-hover:text-yellow-400"
                  )}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>

        <div className="ml-4 mt-8">
          <Button
            onClick={handleClearChat}
            className={clsx(
              "bg-red-500 hover:bg-red-400 text-white",
              montserrat.className
            )}
          >
            Clear Chat
          </Button>
        </div>
      </div>

      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  )
}

export default Sidebar
