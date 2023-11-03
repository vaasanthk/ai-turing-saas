"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("65e81704-ae4d-4dad-9a09-ffcccf4166ee")
  }, [])

  return null
}
