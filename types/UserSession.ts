import type {
    DiscordId,
    Ip,
    IsoString,
    Origin,
    UserAgent,
    UserSessionId,
    UserToken,
} from "./Common";

export interface UserSession {
    readonly id: UserSessionId;

    readonly accessToken: UserToken;

    readonly refreshToken: UserToken;

    readonly startedAt: IsoString;

    readonly expiresAt: IsoString;

    readonly timesRefreshed: number;

    readonly userId: DiscordId;

    readonly ip: Ip | null;

    readonly userAgent: UserAgent | null;

    readonly origin: Origin | null;

    /** This does not include the creation or refreshing of the session. */
    readonly actionCount: number;

    readonly lastActionAt: IsoString;
}

export type UserSessionBasic = Pick<
    UserSession,
    "id" | "startedAt" | "ip" | "userAgent" | "origin" | "lastActionAt"
>;
