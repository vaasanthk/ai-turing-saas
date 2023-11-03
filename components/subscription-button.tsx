"use client"

import { Zap } from "lucide-react"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

interface SubscriptionButtonProps {
  isPro: boolean
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/stripe")
      window.location.href = response.data.url
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button
        className="bg-[#426de4] hover:bg-[#5a83f6] rounded-lg
        font-bold"
        variant={isPro ? "secondary" : "premium"}
        disabled={loading}
        onClick={onClick}
      >
        {isPro ? "Manage Subscription" : "Upgrade"}
        {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      </Button>
    </div>
  )
}

export default SubscriptionButton
