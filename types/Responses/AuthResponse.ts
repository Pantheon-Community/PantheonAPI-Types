import type { IsoString, UserToken } from "../Common";
import type { RoleId } from "../Role";
import type { UserSessionId } from "../UserSession";
import type { GetMeResponse } from "./GetMeResponse";

export interface AuthResponse extends GetMeResponse {
    readonly expiresAt: IsoString;

    readonly token: UserToken;

    readonly sessionId: UserSessionId;

    readonly roleIds: RoleId[];
}
