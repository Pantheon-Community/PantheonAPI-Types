import { UserPermissions } from "../../types/Permissions/UserPermissions";
import { type PermissionsInfo, NONE } from "./PermissionsInfo";

export const UserPermissionsInfo: Record<UserPermissions, PermissionsInfo> = {
    [UserPermissions.None]: NONE,

    [UserPermissions.ViewAllUsers]: {
        name: "View All Users",
        description: "See all registered users. Includes their Discord ID, username, and avatar.",
    },

    [UserPermissions.ViewUserConnections]: {
        name: "View User Connections",
        description:
            "See the primary Steam connection of users. Includes their Steam ID, username, and avatar.",
    },

    [UserPermissions.ViewAllUserConnections]: {
        name: "View All User Connections",
        description:
            "See ALL of the Steam connections of users, including non-primary and private ones.",
    },

    [UserPermissions.ViewUserAnalytics]: {
        name: "View User Analytics",
        description:
            "See when a user was first and last seen, and their total action count on the site.",
    },

    [UserPermissions.ViewUserSessions]: {
        name: "View User Sessions",
        description: "See where users are logged in, this is sensitive information.",
    },

    [UserPermissions.DeleteUserSessions]: {
        name: "Delete User Sessions",
        description: "Delete sessions of other users, effectively logging them out from the site.",
    },

    [UserPermissions.ManageUserRoles]: {
        name: "Manage User Roles",
        description: "Add and remove roles from other users and themselves.",
    },
};
