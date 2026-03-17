import { User } from "@/types/models/user";

export type UpdateUserPayload = Pick<User, "username" | "email" | "first_name" | "last_name">;