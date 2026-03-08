import type { IsoString } from "./Common";

export interface SteamUserInfo {
    /** @example "https://avatars.fastly.steamstatic.com/d789a47289ccb8c36eea2055a9b700e7718c6fac_full.jpg" */
    readonly avatarFull: string | null;

    /** @example "New Zealand" */
    readonly location: string | null;

    /** @example "2015-06-05T12:00:00.000Z"*/
    readonly memberSince: IsoString | null;
}
