"use client"

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"
import { useEffect, useState } from "react"

interface MobileSidebarProps {
  apiLimitCount: number
  isPro: boolean
}

const MobileSidebar = ({
  apiLimitCount,
  isPro = false,
}: MobileSidebarProps) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [])

  if (!setLoad) return null

  return (
    <Sheet>
      <SheetTrigger>
        <div
          className="md:hidden hover:bg-purple-300 p-2
          rounded-xl hover:text-black m-2"
        >
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 ">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
