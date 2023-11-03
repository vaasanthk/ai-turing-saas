"use client"

import { MAX_FREE_COUNTS } from "@/constant"

import { Card, CardContent } from "./ui/card"
import { useEffect, useState } from "react"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { Zap } from "lucide-react"
import { useProModal } from "@/hooks/use-pro-modal"

interface FreeCounterProps {
  apiLimitCount: number
  isPro: boolean
}

const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const proModal = useProModal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (isPro) return null

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-2">
          <div
            className="text-center text-sm text-white mb-4 space-y-2
            
          "
          >
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>

            <Progress
              className="bg-black/60 h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            className="w-full bg-green-500 rounded-lg"
            variant={"premium"}
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter
