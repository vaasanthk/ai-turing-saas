"use client"

import { useProModal } from "@/hooks/use-pro-modal"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

import { Badge } from "./ui/badge"
import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react"

import { Card } from "./ui/card"
import clsx from "clsx"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
]

const ProModal = () => {
  const proModal = useProModal()
  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className="flex justify-center items-center
          flex-col gap-y-4 pb-2"
          >
            <div
              className="flex items-center gap-x-2 font-bold py-1
            bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text
            "
            >
              Upgrade to Turing
              <Badge
                variant={"premium"}
                className="uppercase text-sm py-1 text-white"
              >
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 font-medium text-white">
            {tools.map((tool) => (
              <Card
                key={tool.href}
                className="p-3 flex items-center justify-between bg-transparent"
              >
                <div className="flex items-center gap-x-4">
                  <div className={clsx("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={clsx("h-6 w-6", tool.color)} />
                  </div>

                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>

                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size={"lg"}
            variant={"premium"}
            className="w-full rounded-lg 
          font-bold"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
