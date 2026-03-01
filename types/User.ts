import type { DiscordId } from "./Common";
import type { SteamUser } from "./SteamUser";

export interface User {
	readonly id: DiscordId;

	readonly username: string;

	readonly avatar: string | null;

	readonly steam: SteamUser | null;
}
