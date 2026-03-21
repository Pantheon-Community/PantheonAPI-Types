import type { DiscordId, Ip, IsoString, Origin, UserAgent } from "./Common";
import type { SteamUserBasicWithTimes } from "./SteamUser";

export interface User {
    readonly id: DiscordId;

    readonly username: string;

    readonly avatar: string | null;

    readonly steam: SteamUserBasicWithTimes | null;

    readonly firstSeenAt: IsoString;

    readonly lastSeenAt: IsoString;

    readonly ip: Ip | null;

    readonly userAgent: UserAgent | null;

    readonly origin: Origin | null;

    readonly lifetimeActionCount: number;
}

export type UserBasic = Pick<User, "id" | "username" | "avatar">;

export type UserBasicWithSteam = Pick<User, "id" | "username" | "avatar" | "steam">;
