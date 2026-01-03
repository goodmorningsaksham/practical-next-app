"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [loading, user, router])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
