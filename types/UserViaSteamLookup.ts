import type { SteamId64 } from "./Common";
import type { User } from "./User";

export interface UserViaSteamLookup extends Omit<User, 'steam'> {
    steamId: SteamId64;
}
