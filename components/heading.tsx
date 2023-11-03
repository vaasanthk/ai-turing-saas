import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./ui/button"
import clsx from "clsx"
import { montserrat } from "@/config/font"
import Image from "next/image"

const Heading = () => {
  return (
    <div className="flex justify-center items-center">
      <Card className="h-14 w-80 rounded-[12px] bg-[#16161b] ">
        <CardContent>
          <div className="flex items-center justify-center w-full mt-2 space-x-3">
            <div>
              <Button
                className={clsx(
                  "rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 w-36  font-semibold hover:from-yellow-600 hover:via-pink-500 hover:to-purple-600"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#5fe853"
                  stroke="#5fe853"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-zap"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span className="ml-2 font-extrabold text-[15px] text-white">
                  T-3.5
                </span>
              </Button>
            </div>
            <div>
              <Button
                className="w-36 bg-[#16161b] text-white
              hover:bg-[#16161b] text-[15px]
              "
              >
                <Image alt="logo" src="/star.svg" width={24} height={24} />
                <span
                  className="ml-2 font-extrabold text-[15px] text-white
                mr-2"
                >
                  T-5.0
                </span>
                <svg
                  fill="gray"
                  height="20"
                  width="20"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 330 330"
                >
                  <g id="XMLID_509_">
                    <path
                      id="XMLID_510_"
                      d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85
		S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15
		s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
		C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
                    />
                  </g>
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Heading
