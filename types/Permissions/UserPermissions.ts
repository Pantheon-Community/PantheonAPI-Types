export enum UserPermissions {
    None = 0,

    ViewAllUsers = 1 << 0,

    ViewUserConnections = 1 << 1,

    ViewAllUserConnections = 1 << 2,

    ViewUserAnalytics = 1 << 3,

    ViewUserSessions = 1 << 4,

    DeleteUserSessions = 1 << 5,

    ManageUserRoles = 1 << 6,
}
