import type { IsoString, SteamId64 } from "./Common";

/**
 * Steam user information, sourced from either in-game player info or Discord user connections.
 *
 * Note that tracking fields ({@link firstSeenAt}, {@link lastSeenAt}, and {@link timesSeen}) are
 * only updated from in-game player info - never from Discord user conections. This is because
 * in-game activity is much more useful to us than website activity.
 */
export interface SteamUser {
	readonly id: SteamId64;

	/**
	 * Latest username associated with this Steam ID.
	 *
	 * This may come from in-game player info or a Discord user connection.
	 */
	readonly username: string;

	/** When this Steam ID was first seen in-game. */
	readonly firstSeenAt: IsoString | null;

	/** When this Steam ID was last seen in-game. */
	readonly lastSeenAt: IsoString | null;

	/** Number of times this Steam ID has been seen in-game. */
	readonly timesSeen: number;
}
