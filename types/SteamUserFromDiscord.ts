import type { SteamUser } from "./SteamUser";
import type { User } from "./User";

export interface SteamUserFromDiscord {
    readonly discordId: User["id"];

    readonly steamId: SteamUser["id"];

    readonly steamUsername: SteamUser["username"];

    readonly steamAvatar: SteamUser["avatar"];
}
