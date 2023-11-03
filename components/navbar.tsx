import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubsricption } from "@/lib/subsbricption"

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubsricption()
  return (
    <div className="flex items-center p-4 ">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className="flex w-full justify-end ">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
