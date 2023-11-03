"use client"

import Heading from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SpiningLoader } from "@/components/spiningLoader"
import UserAvatar from "@/components/user-avatar"
import BotAvatar from "@/components/bot-avatar"
import { inter, montserratSmall, roboto } from "@/config/font"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { formSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import OpenAI from "openai"
import axios from "axios"
import clsx from "clsx"
import Image from "next/image"
import { useProModal } from "@/hooks/use-pro-modal"
import toast from "react-hot-toast"
import { error } from "console"

const ConversationPage = () => {
  const proModal = useProModal()
  const router = useRouter()

  const [messages, setMessages] = useState<
    OpenAI.Chat.ChatCompletionMessageParam[]
  >([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  // useEffect(() => {
  //   const savedMessages = localStorage.getItem("chatMessages")
  //   if (savedMessages) {
  //     setMessages(JSON.parse(savedMessages))
  //   }
  // }, [])

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      })

      setMessages((current) => [...current, userMessage, response.data])

      // Save the updated messages array to local storage
      // localStorage.setItem(
      //   "chatMessages",
      //   JSON.stringify([...messages, userMessage, response.data])
      // )

      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error("Something went wrong!")
      }
    } finally {
    }
    router.refresh()
  }

  return (
    <div>
      <Heading />
      <div className="space-y-4 mt-10">
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              className={clsx(
                "p-6 w-full ml-0 flex items-center gap-x-8 ",
                message.role === "user" ? "bg-transparent" : "bg-gray-600/20"
              )}
              key={message.content}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p
                className={clsx(
                  "leading-loose tracking-wide text-white font-medium"
                )}
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-24">
        {isLoading && (
          <div>
            <div
              className="p-8 h-56 fixed
              flex items-center justify-center
              bottom-76 sm:w-[700px] md:w-[700px] lg:w-full
               bg-[#181f2a]/95 mr-10 
              "
            >
              <div className="lg:mr-56">
                <SpiningLoader />
                {/* <Image
                  alt="Loading..."
                  src={"/apple.gif"}
                  height={100}
                  width={100}
                /> */}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {messages.length === 0 && !isLoading && (
          <div className="pb-2 flex flex-col mt-64">
            <h1 className="text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 gap-2 items-center justify-center">
              Turing Machine
            </h1>
          </div>
        )}
      </div>

      <div
        className="fixed bottom-6 w-full
        flex justify-center items-center 
      "
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-2xl border  p-4 px-3 md:px-6 
          focus-within:shadow-sm  gap-2
           w-[650px] mr-72 lg:mr-64 sm:mr-0 md:mr-72
          bg-[#16161b] flex flex-row"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10 w-full">
                  <FormControl>
                    <Input
                      className="border-0 outline-none 
                  focus-visible:ring-0
                  focus-visible:ring-offset-0
                  focus-visible:ring-[#16161b]
                  placeholder:text-gray-300/50
                  w-full bg-[#16161b]
                  "
                      disabled={isLoading}
                      placeholder="How do I calculate the price of a car?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="bg-[#c05426] hover:bg-[#e06b38] font-normal text-white"
              disabled={isLoading}
            >
              Generate
            </Button>
            {/* <ButtonRipple disabled={isLoading} /> */}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ConversationPage
