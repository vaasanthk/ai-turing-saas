import SubscriptionButton from "@/components/subscription-button"
import { Button } from "@/components/ui/button"
import { checkSubsricption } from "@/lib/subsbricption"
import { Settings } from "lucide-react"

const SettingsPage = async () => {
  const isPro = await checkSubsricption()

  return (
    <div>
      <div className="flex items-center gap-x-3 px-4 lg:px-8 mb-8">
        <div className="bg-[#80faf4]/10 p-2 flex w-fit rounded-lg">
          <Settings className="h-10 w-10 text-[#80faf4]" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage account settings
          </p>
        </div>
      </div>

      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-gray-300">
          {isPro
            ? "You are currently on a Pro plan."
            : "You are currently on a Free plan."}
        </div>

        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default SettingsPage
