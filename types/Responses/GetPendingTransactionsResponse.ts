import { pick } from "../../utils/specHelpers";
import { ECONOMY_TRANSACTION, type EconomyTransaction } from "../EconomyTransaction";
import type { SpecObjectFor } from "../Util";

export type GetPendingTransactionsResponse = Pick<
    EconomyTransaction,
    "id" | "rewardId" | "purchaserId"
>;

export const GET_PENDING_TRANSACTIONS_RESPONSE: SpecObjectFor<GetPendingTransactionsResponse> =
    pick(ECONOMY_TRANSACTION, "id", "rewardId", "purchaserId");
