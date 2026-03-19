import type { DiscordId, Ip, IsoString, Origin, UserAgent, UserToken } from "./Common";
import type { Brand } from "./Util";

/**
 * Way of uniquely referring to a user session.
 *
 * Although the `accessToken` field of a user session is also unique, using it to externally
 * identify user sessions has obvious security drawbacks.
 */
export type UserSessionId = Brand<number, "userSessionId">;

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
