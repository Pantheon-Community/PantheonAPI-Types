import type { IsoString, SteamId64 } from "./Common";

export interface SteamUserBasic {
    readonly id: SteamId64;

    /**
     * Latest username associated with this Steam ID.
     *
     * This may come from in-game player info or a Discord user connection.
     */
    readonly username: string;
}

export interface SteamUserBasicWithTimes extends SteamUserBasic {
    /** When this Steam ID was first seen in-game. */
    readonly firstSeenAt: IsoString | null;

    /** When this Steam ID was last seen in-game. */
    readonly lastSeenAt: IsoString | null;
}

/** Steam user information, sourced from either in-game player info or Discord user connections. */
export interface SteamUser extends SteamUserBasicWithTimes {
    /** Number of times this Steam ID has been seen in-game. */
    readonly timesSeen: number;
}
