import { User } from "./types"

export type DBUser = User & {
  password: string
}

export const users: DBUser[] = [
  {
    id: "1",
    email: "test@example.com",
    password: "123456"
  }
]
