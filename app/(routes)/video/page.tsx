"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { SpiningLoader } from "@/components/spiningLoader"
import Heading from "@/components/heading"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { formSchema } from "./constants"
import { useProModal } from "@/hooks/use-pro-modal"
import toast from "react-hot-toast"

const VideoPage = () => {
  const proModal = useProModal()

  const router = useRouter()
  const [video, setVideo] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined)
      const response = await axios.post("/api/video", values)

      setVideo(response.data[0])
      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading />
      <div
        className="space-y-4  px-4 lg:px-8
      rounded-lg shadow-lg
      "
      >
        {video && (
          <video
            controls
            className="w-full lg:h-[700px] mt-8 rounded-lg
            aspect-video 
            "
            width={512}
            height={512}
          >
            <source src={video} />
          </video>
        )}
      </div>

      {isLoading && (
        <div
          className="p-8 h-56 fixed
              flex items-center justify-center
              bottom-96 sm:w-[700px] md:w-[700px] lg:w-full
               bg-[#181f2a]/95 mr-10 
              "
        >
          <div className="lg:mr-72 mt-14">
            <SpiningLoader />
          </div>
        </div>
      )}

      <div>
        {!video && !isLoading && (
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
                      placeholder="Campfire at night in a snowy forest with starry sky in the background."
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
          </form>
        </Form>
      </div>
    </div>
  )
}

export default VideoPage
