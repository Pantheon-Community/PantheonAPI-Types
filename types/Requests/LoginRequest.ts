export interface LoginRequest {
    readonly code: string;

    readonly redirectUri: string;
}
