import type { DiscordId, Ip, IsoString, Origin, UserAgent } from "./Common";
import type { SteamUserBasicWithTimes } from "./SteamUser";

export interface UserBasic {
    readonly id: DiscordId;

    readonly username: string;

    readonly avatar: string | null;
}

export interface UserBasicWithSteam extends UserBasic {
    steam: SteamUserBasicWithTimes | null;
}

export interface User extends UserBasicWithSteam {
    readonly firstSeenAt: IsoString;

    readonly lastSeenAt: IsoString;

    readonly ip: Ip | null;

    readonly userAgent: UserAgent | null;

    readonly origin: Origin | null;

    readonly lifetimeActionCount: number;
}
