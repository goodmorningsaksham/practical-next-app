import { users } from "@/app/lib/auth"
import { NextResponse } from "next/server"
import { User } from "@/app/lib/types"

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie")
  const token = cookie?.split("token=")[1]

  const user = users.find(u => u.id === token)

  if (!user) {
    return NextResponse.json(null, { status: 401 })
  }

  const responseUser: User = {
    id: user.id,
    email: user.email
  }

  return NextResponse.json(responseUser)
}
