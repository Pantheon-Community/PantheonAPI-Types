import type { DiscordId, Ip, IsoString, UserAgent } from "./Common";
import type { SteamUser } from "./SteamUser";

export interface User {
    readonly id: DiscordId;

    readonly username: string;

    readonly avatar: string | null;

    readonly steam: SteamUser | null;

    readonly firstSeenAt: IsoString;

    readonly lastSeenAt: IsoString;

    readonly ip: Ip;

    readonly userAgent: UserAgent;

    readonly lifetimeActionCount: number;
}

export type UserBasicWithSteam = Pick<User, "id" | "username" | "avatar" | "steam">;
