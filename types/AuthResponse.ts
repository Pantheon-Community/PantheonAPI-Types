import type { IsoString, UserToken } from "./Common";
import type { SteamUser } from "./SteamUser";
import type { User } from "./User";

export interface AuthResponse {
	readonly user: User;

	/** All the steam connections for this user, including their main one. */
	readonly steamUsers: SteamUser[];

	/** Seconds until session expires. */
	readonly expiresAt: IsoString;

	readonly token: UserToken;
}
