import { NextResponse } from "next/server"
import { users } from "@/app/lib/auth"
import { User } from "@/app/lib/types"

type LoginRequestBody = {
  email: string
  password: string
}

export async function POST(req: Request) {
  const body = (await req.json()) as LoginRequestBody
  const { email, password } = body

  const user = users.find(
    u => u.email === email && u.password === password
  )

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  const responseUser: User = {
    id: user.id,
    email: user.email
  }

  const response = NextResponse.json(responseUser)

  response.cookies.set("token", user.id, {
    httpOnly: true,
    path: "/"
  })

  return response
}
