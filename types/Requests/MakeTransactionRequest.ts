import type { RewardId } from "../EconomyReward";

export interface MakeTransactionRequest {
    rewardId: RewardId;

    expectedPrice: number;
}
