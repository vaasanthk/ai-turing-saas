import clsx from "clsx"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { montserrat } from "@/config/font"

const testimonials = [
  {
    name: "John Doe",
    avatar: "/avatar.jpg",
    title: "Software Engineer",
    description:
      "Overall, I've been very impressed with the capabilities of this AI tools for software engineers. I'm excited to see how this technology continues to develop in the future.",
  },
  {
    name: "Peter Andrea",
    avatar: "/avatar1.jpg",
    title: "Business Analyst",
    description:
      "As a business analyst, I'm always looking for ways to improve my efficiency and productivity. This AI tool is game changer",
  },

  {
    name: "Sandra periara",
    avatar: "/avatar2.jpg",
    title: "Student",
    description:
      "As a student, I'm always looking for ways to improve my learning and productivity. This AI tool is a game-changer for me, helping me to understand complex concepts, generate creative content, and stay organized.",
  },
  {
    name: "David luth",
    avatar: "/avatar3.jpeg",
    title: "Lawyer",
    description:
      "Turing is a software platform that automates a variety of legal tasks, such as contract review, due diligence, and eDiscovery. This has freed up my time to focus on more strategic tasks, such as developing legal strategies and representing clients in court.",
  },
]
const LandingContent = () => {
  return (
    <div className="px-10 pb-20 -mt-8">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-gradient-to-r from-[#4a3956] to-[#242046]  border-none text-white rounded-2xl
            h-fit shadow-md shadow-black/20
              transition-all duration-300 hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <div className="flex items-center gap-x-2">
                    <Avatar>
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-lg -mt-4">{item.name}</p>
                  </div>
                  <p
                    className={clsx(
                      "text-zinc-400 text-xs ml-12 -mt-5",
                      montserrat.className
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              </CardTitle>

              <CardContent className="pt-4 px-0 ">
                <blockquote>
                  <p className={`${montserrat.className} text-[15px]`}>
                    {item.description}
                  </p>
                </blockquote>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LandingContent
