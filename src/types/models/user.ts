// src/types/models/user.ts

/**
 * Represents a user in the system.
 * Based on the auth_user table structure.
 */
export interface User {
  id: number;
  password?: string;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  first_name: string;
}

/**
 * Payload for updating user account information.
 */
export type UpdateUserPayload = Pick<User, "username" | "email" | "first_name" | "last_name">;

/**
 * Payload for changing user password.
 */
export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

/**
 * Payload for submitting feedback.
 */
export interface FeedbackPayload {
  category: "bug" | "feature" | "improvement" | "general";
  subject: string;
  message: string;
  rating?: number;
}
