import type { AuthResponse } from "./AuthResponse";

export type GetMeResponse = Pick<AuthResponse, "user" | "steamUsers">;
