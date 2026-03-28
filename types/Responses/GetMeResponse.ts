import type { SteamUserWithTimes } from "../SteamUser";
import type { UserWithSteam } from "../User";

export interface GetMeResponse {
    readonly user: UserWithSteam;

    readonly steamUsers: SteamUserWithTimes[];
}
