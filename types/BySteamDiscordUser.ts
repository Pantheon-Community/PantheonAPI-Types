import type { SteamUser } from "./SteamUser";
import type { User } from "./User";

export interface BySteamDiscordUser {
    readonly steamId: SteamUser["id"];

    readonly discordId: User["id"];

    readonly discordUsername: User["username"];

    readonly discordAvatar: User["avatar"];
}
