import type { DiscordId, IsoString } from "./Common";
import type { PermissionsObject } from "./Permissions/PermissionsObject";
import type { SteamConnection } from "./SteamConnection";

export interface UserMeta {
	readonly firstSeenAt: IsoString;

	readonly lastSeenAt: IsoString;
}

export interface User {
	readonly id: DiscordId;

	readonly username: string;

	readonly avatar: string | null;

	readonly latestIp: string;

	/** Number of times a session has been created or refreshed for this user. */
	readonly sessionCount: number;

	readonly steam: SteamConnection | null;

	readonly meta: UserMeta;

	readonly steamMeta: UserMeta | null;

	readonly permissions: PermissionsObject;
}
