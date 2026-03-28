import type { Ip } from "../Common";
import type { PaginationParams } from "../Pagination";

export interface GetAllUsersRequest extends PaginationParams {
    /**
     * Discord username search.
     *
     * Will also search Steam usernames if the user has the **ViewUserConnections** permission.
     */
    usernameSearch?: string;

    /**
     * IP address search.
     *
     * Only applicable if the user has the **ViewUserSessions** permission.
     */
    ipSearch?: Ip;

    orderBy?: "id" | "username" | "firstSeenAt" | "lastSeenAt" | "lifetimeActionCount";

    order?: "asc" | "desc";
}
