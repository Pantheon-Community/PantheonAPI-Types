import type {
    DiscordId,
    Ip,
    IsoString,
    Origin,
    UserAgent,
    UserSessionId,
    UserToken,
} from "./Common";

export interface UserSessionBasic {
    readonly id: UserSessionId;

    readonly startedAt: IsoString;

    readonly ip: Ip | null;

    readonly userAgent: UserAgent | null;

    readonly origin: Origin | null;

    readonly lastActionAt: IsoString;
}

export interface UserSession extends UserSessionBasic {
    readonly accessToken: UserToken;

    readonly refreshToken: UserToken;

    readonly expiresAt: IsoString;

    readonly timesRefreshed: number;

    readonly userId: DiscordId;

    /** This does not include the creation or refreshing of the session. */
    readonly actionCount: number;
}
