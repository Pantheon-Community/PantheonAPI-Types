import type { SteamUser } from "./SteamUser";
import type { User } from "./User";

export interface ByDiscordSteamUser {
    readonly discordId: User["id"];

    readonly steamId: SteamUser["id"];

    readonly steamUsername: SteamUser["username"];
}
