import type { DiscordId, IsoString } from "./Common";
import type { RewardId } from "./EconomyReward";
import type { Brand } from "./Util";

export type TransactionId = Brand<number, "transactionId">;

export interface EconomyTransaction {
    readonly id: TransactionId;

    readonly rewardId: RewardId;

    readonly amount: number;

    readonly madeAt: IsoString;

    readonly purchaser: DiscordId;
}
