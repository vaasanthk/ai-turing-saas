"use client"

import { Progress } from "@/components/ui/progress"
import { inter } from "@/config/font"

import clsx from "clsx"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { useEffect, useState } from "react"

const DashboardPage = () => {
  const [module, setModule] = useState(false)

  useEffect(() => {
    setModule(true)
  }, [])

  if (!module) {
    return null
  }

  const data = [
    {
      month: "Jan",
      Gpt3: 30,
      Replicate: 40,
    },
    {
      month: "Feb",
      Gpt3: 35,
      Replicate: 50,
    },
    {
      month: "Mar",
      Gpt3: 35,
      Replicate: 23,
    },
    {
      month: "Apr",
      Gpt3: 45,
      Replicate: 60,
    },
    {
      month: "May",
      Gpt3: 56,
      Replicate: 71,
    },
    {
      month: "Jun",
      Gpt3: 80,
      Replicate: 120,
    },
    {
      month: "Jul",
      Gpt3: 120,
      Replicate: 150,
    },
  ]

  return (
    <main
      className="flex h-full flex-col items-center lg:flex 
    lg:justify-center md:justify-center lg:flex-col sm:w-full"
    >
      <div
        className="space-y-4 mb-20 mt-30 text-align  
      flex flex-col ml-3 lg:flex lg:justify-start"
      >
        <h2
          className={clsx(
            "text-2xl md:text-3xl font-bold text-white",
            inter.className
          )}
        >
          API Usage
        </h2>
        <p
          className={clsx(
            "font-light text-sm md:text-lg  text-gray-400",
            inter.className
          )}
        >
          Below you'll find a summary of API usage for your organization. All
          dates and times are UTC-based, <br className="hidden lg:block" /> and
          data may be delayed up to 5 minutes.
        </p>

        <div>
          <h3 className={clsx("font-bold", inter.className)}>
            Yearly Budget Usage
          </h3>
          <div className="mt-2 flex items-center space-x-2">
            <Progress
              aria-label="Loading..."
              value={(915 / 2000) * 100}
              className="max-w-md"
            />

            <p className="text-gray-400">$915 / $2000</p>
          </div>
        </div>
      </div>

      <div className="mr-2 lg:mr-20 space-y-4 ipad-mini">
        <BarChart width={650} height={250} data={data}>
          <CartesianGrid vertical={false} stroke="#393838" />
          <XAxis dataKey="month" axisLine={true} tickLine={false} />
          <YAxis
            axisLine={true}
            tickLine={true}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip contentStyle={{ backgroundColor: "black", opacity: 0.8 }} />
          <Legend />
          <Bar dataKey="Gpt3" stackId={"a"} fill="#e273fb" barSize={50} />{" "}
          <Bar dataKey="Replicate" stackId={"a"} fill="#5148f8" barSize={50} />
        </BarChart>

        <LineChart
          width={650}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke="#393838" />
          <XAxis dataKey="month" axisLine={true} tickLine={false} />
          <YAxis
            axisLine={true}
            tickLine={true}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip contentStyle={{ backgroundColor: "black", opacity: 0.8 }} />
          <Legend />
          <Line type="monotone" dataKey="Gpt3" stroke="#e273fb" />
          <Line type="monotone" dataKey="Replicate" stroke="#5148f8" />
        </LineChart>
      </div>
    </main>
  )
}

export default DashboardPage
