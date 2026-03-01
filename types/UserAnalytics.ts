import type { DiscordId, Ip, IsoString, UserAgent } from "./Common";

export interface UserAnalytics {
	readonly id: DiscordId;

	readonly firstSeenAt: IsoString;

	readonly lastSeenAt: IsoString;

	readonly ip: Ip;

	readonly userAgent: UserAgent;

	readonly lifetimeActionCount: number;
}
