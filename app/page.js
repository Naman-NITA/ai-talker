// app/page.jsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard")
  }, [router])

  return null // optional: or show a loading spinner while redirecting
}

export default Home
