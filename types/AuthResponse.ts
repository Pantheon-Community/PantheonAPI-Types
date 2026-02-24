import type { UserToken } from "./Common";
import type { SteamConnection } from "./SteamConnection";
import type { User } from "./User";

export interface AuthResponse {
	readonly user: User;

	readonly steamConnections: SteamConnection[];

	/** Seconds until session expires. */
	readonly expiresIn: number;

	readonly token: UserToken;
}
