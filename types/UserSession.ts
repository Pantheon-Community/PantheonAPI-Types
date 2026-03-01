import type { DiscordId, Ip, IsoString, UserAgent, UserToken } from "./Common";

export interface UserSession {
	accessToken: UserToken;

	refreshToken: UserToken;

	startedAt: IsoString;

	expiresAt: IsoString;

	timesRefreshed: number;

	userId: DiscordId;

	ip: Ip;

	userAgent: UserAgent;

	/** This does not include the creation or refreshing of the session. */
	actionCount: number;

	lastActionAt: IsoString;
}
