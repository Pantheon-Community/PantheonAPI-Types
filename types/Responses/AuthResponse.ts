import type { IsoString, RoleId, UserSessionId, UserToken } from "../Common";
import type { GetMeResponse } from "./GetMeResponse";

export interface AuthResponse extends GetMeResponse {
    readonly expiresAt: IsoString;

    readonly token: UserToken;

    readonly sessionId: UserSessionId;

    readonly roleIds: RoleId[];
}
