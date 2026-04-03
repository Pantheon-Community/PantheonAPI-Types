import type { DiscordId, Ip, IsoString, Origin, UserAgent } from "./Common";
import type { SteamUserWithTimes } from "./SteamUser";

export interface User {
    readonly id: DiscordId;

    readonly username: string;

    readonly avatar: string | null;

    readonly steam: SteamUserWithTimes | null;

    readonly firstSeenAt: IsoString;

    readonly lastSeenAt: IsoString;

    readonly lifetimeActionCount: number;

    readonly ip: Ip | null;

    readonly userAgent: UserAgent | null;

    readonly origin: Origin | null;

    readonly balance: number;

    readonly lifetimeBalance: number;

    readonly lifetimePurchaseCount: number;
}

export type UserBasic = Pick<User, "id" | "username" | "avatar">;
