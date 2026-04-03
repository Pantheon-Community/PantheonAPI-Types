import type { SteamUserWithTimes } from "../SteamUser";
import type { User, UserBasic } from "../User";

export interface GetMeUser
    extends
        UserBasic,
        Pick<User, "steam" | "balance" | "lifetimeBalance" | "lifetimePurchaseCount"> {}

export interface GetMeResponse {
    readonly user: GetMeUser;

    readonly steamUsers: SteamUserWithTimes[];
}
