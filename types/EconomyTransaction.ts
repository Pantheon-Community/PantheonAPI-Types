import type { IsoString } from "./Common";
import type { RewardId } from "./EconomyReward";
import type { SteamId64 } from "./SteamUser";
import type { Brand } from "./Util";

export type TransactionId = Brand<number, "transactionId">;

export interface EconomyTransaction {
    readonly id: TransactionId;

    readonly rewardId: RewardId;

    readonly cost: number;

    readonly madeAt: IsoString;

    readonly purchaser: SteamId64;
}

export interface CompletedEconomyTransaction extends EconomyTransaction {
    readonly completedAt: IsoString;
}
