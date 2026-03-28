import type { WithPagination } from "../Pagination";
import type { RoleId } from "../Role";
import type { SteamUserBasicWithTimes } from "../SteamUser";
import type { User, UserBasic } from "../User";

export interface UserFromGetAll
    extends
        UserBasic,
        Pick<
            Partial<User>,
            "firstSeenAt" | "lastSeenAt" | "lifetimeActionCount" | "ip" | "userAgent" | "origin"
        > {
    roleIds: RoleId[];

    steam?: SteamUserBasicWithTimes | null;
}

export type GetAllUsersResponse = WithPagination<UserFromGetAll>;
