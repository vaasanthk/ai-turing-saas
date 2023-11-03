import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubsricption } from "@/lib/subsbricption"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubsricption()

  return (
    <div className="h-full relative ipad-mini mobile">
      <div
        className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 
bg-gray-900 md:w-72  
"
      >
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72 ">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
