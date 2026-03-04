import type { DiscordId, Ip, IsoString, UserAgent, UserToken } from "./Common";

export interface UserSession {
    readonly accessToken: UserToken;

    readonly refreshToken: UserToken;

    readonly startedAt: IsoString;

    readonly expiresAt: IsoString;

    readonly timesRefreshed: number;

    readonly userId: DiscordId;

    readonly ip: Ip;

    readonly userAgent: UserAgent;

    /** This does not include the creation or refreshing of the session. */
    readonly actionCount: number;

    readonly lastActionAt: IsoString;
}

export type UserSessionBasic = Pick<UserSession, "startedAt" | "ip" | "userAgent" | "lastActionAt">;
