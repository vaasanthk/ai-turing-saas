"use client"

import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inter, montserratSmall } from "@/config/font"
import { SpiningLoader } from "@/components/spiningLoader"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { numberOfPics, formSchema, resolutionOptions } from "./constants"
import clsx from "clsx"
import Image from "next/image"
import { Download } from "lucide-react"
import { useProModal } from "@/hooks/use-pro-modal"
import toast from "react-hot-toast"

const PhotoPage = () => {
  const proModal = useProModal()

  const router = useRouter()
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])

      const response = await axios.post("/api/image", values)

      const urls = response.data.map((image: { url: string }) => image.url)

      setImages(urls)
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
      <div className="px-4 lg:px-8 mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              border-gray-300/50
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
              
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className={clsx(
                        "border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:text-gray-300/50 placeholder:text-center"
                      )}
                      disabled={isLoading}
                      placeholder="A picture of a horse in Swiss alps"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={clsx("bg-[#16161b]")}>
                      {numberOfPics.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#16161b]">
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full
              bg-[#c05426] hover:bg-[#e06b38] font-normal text-white
              "
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div
            className="p-8 h-56 
              flex items-center justify-center
              sm:w-[700px] md:w-[700px] lg:w-full
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
          {images.map((src, index) => (
            <Card
              key={src}
              className="rounded-2xl shadow-lg shadow-black
             overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-square">
                <Image src={src} alt="Image" fill />
              </div>
              <CardFooter className="p-2 bg-[#181F2A] ">
                <Button
                  variant={"secondary"}
                  className="w-full bg-blue-600 hover:bg-blue-500"
                  onClick={() => window.open(src)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div>
          {images.length === 0 && !isLoading && (
            <div className="pb-2 flex flex-col mt-64">
              <h1 className="text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 gap-2 items-center justify-center">
                Turing Machine
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhotoPage
