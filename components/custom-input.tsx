import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CustomInputProps {
  disabled?: boolean
}

const CustomInput = ({ disabled }: CustomInputProps) => {
  const [message, setMessage] = useState("")
  const isSendClickable = message.trim() !== ""

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <div className="w-[80%] relative">
      <div className="fixed bottom-2 flex flex-col justify-center items-center w-full ">
        <div className="relative">
          <input
            type="text"
            className="lg:w-[800px] sm:w-[600px] px-4 py-4 outline-none border-none shadow-lg input bg-[#40414F] placeholder:font-normal
            rounded-lg my-2 text-white font-medium mr-64
            "
            placeholder="Send a message"
            onChange={handleInputChange}
            value={message}
            disabled={disabled}
          />
          {isSendClickable ? (
            <div className="absolute flex h-full items-center justify-center text-gray-400 top-0 right-[275px]">
              <Button
                size={"custom"}
                className="bg-[#19c37d] hover:bg-[#489d79]"
              >
                <Image src="/sendWhite.svg" alt="send" width={20} height={20} />
              </Button>
            </div>
          ) : (
            <div className="absolute flex h-full items-center justify-center text-gray-400 top-0 right-[275px] ">
              <Image src="/send.svg" alt="send" width={20} height={20} />
            </div>
          )}
        </div>
        <div className="relative px-2 py-2 text-center text-xs text-gray-300  md:px-[60px]  lg:right-32 sm:right-32 ">
          <span>
            Free Research Preview. Turing may produce inaccurate information
            about people, places, or facts. <br className="lg:hidden" />
            <a
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              OpenAI September 25 Version
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CustomInput
