import type { SteamUser } from "../SteamUser";
import type { UserBasicWithSteam } from "../User";

export interface GetMeResponse {
    readonly user: UserBasicWithSteam;

    readonly steamUsers: Pick<SteamUser, "id" | "username" | "lastSeenAt">;
}
