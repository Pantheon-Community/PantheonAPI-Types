import type { WithPagination } from "../Pagination";
import type { RoleId } from "../Role";
import type { SteamUserWithTimes } from "../SteamUser";
import type { User, UserBasic } from "../User";

export interface UserFromGetAll
    extends
        UserBasic,
        Pick<
            Partial<User>,
            "firstSeenAt" | "lastSeenAt" | "lifetimeActionCount" | "ip" | "userAgent" | "origin"
        > {
    roleIds: RoleId[];

    steam?: SteamUserWithTimes | null;
}

export type GetAllUsersResponse = WithPagination<UserFromGetAll>;
