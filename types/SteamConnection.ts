import type { SteamId64 } from "./Common";

export interface SteamConnection {
	readonly id: SteamId64;

	readonly username: string;
}
