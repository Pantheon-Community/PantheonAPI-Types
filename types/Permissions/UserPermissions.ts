export enum UserPermissions {
    None = 0,

    ViewAll = 1 << 0,

    ViewConnections = 1 << 1,

    ViewAllConnections = 1 << 2,

    ViewAnalytics = 1 << 3,

    ViewSessions = 1 << 4,

    DeleteSessions = 1 << 5,

    ManageRoles = 1 << 6,
}
