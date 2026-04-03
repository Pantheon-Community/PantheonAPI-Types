import type { DiscordId, IsoString } from "./Common";
import type { Brand } from "./Util";

export type RewardId = Brand<number, "rewardId">;

export interface EconomyReward {
    readonly id: RewardId;

    readonly title: string;

    readonly subtitle: string;

    readonly description: string;

    readonly image: string;

    readonly cost: number;

    readonly normalCost: number;

    readonly itemId: number | null;

    readonly itemCount: number;

    readonly postedBy: DiscordId | null;

    readonly postedAt: IsoString;

    readonly lastUpdatedAt: IsoString;
}

export type EconomyRewardInput = Omit<
    EconomyReward,
    "id" | "postedBy" | "postedAt" | "lastUpdatedAt"
>;
