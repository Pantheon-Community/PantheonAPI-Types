import type { SteamUserBasicWithTimes } from "../SteamUser";
import type { UserBasicWithSteam } from "../User";

export interface GetMeResponse {
    readonly user: UserBasicWithSteam;

    readonly steamUsers: SteamUserBasicWithTimes[];
}
