import type { IsoString } from "./Common";
import type { Brand } from "./Util";

/**
 * A SteamID64 account identifier.
 *
 * @see {@link https://steamid.io/}
 *
 * @example "76561198200316171"
 */
export type SteamId64 = Brand<string, "steamId64">;

/** Information about a Steam user's in-game activity. */
export interface SteamUserAnalytics {
    readonly firstSeenAt: IsoString;

    readonly lastSeenAt: IsoString;

    readonly timesSeen: number;
}

/** Steam user information, sourced from either in-game player info or Discord user connections. */
export interface SteamUser {
    readonly id: SteamId64;

    /**
     * Latest username associated with this Steam ID.
     *
     * This may come from in-game player info or a Discord user connection.
     */
    readonly username: string;

    /** @example "https://avatars.fastly.steamstatic.com/d789a47289ccb8c36eea2055a9b700e7718c6fac_full.jpg" */
    readonly avatar: string | null;

    /** @example "New Zealand" */
    readonly location: string | null;

    readonly memberSince: IsoString | null;

    readonly analytics: SteamUserAnalytics | null;
}

export type SteamUserBasic = Pick<
    SteamUser,
    "id" | "username" | "avatar" | "location" | "memberSince"
>;

export interface SteamUserWithTimes extends SteamUserBasic, Pick<SteamUser, "analytics"> {}
