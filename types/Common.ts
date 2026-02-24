import type { Brand } from "./Util";

export type HexColorString = `#${string}`;

/**
 * A string in ISO format, used to store dates.
 *
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601}
 *
 * @example "2022-11-08T02:20:08.190Z"
 */
export type IsoString = Brand<string, "isoString">;

/**
 * A Discord ID snowflake.
 *
 * @see {@link https://discord.com/developers/docs/reference#snowflakes}
 *
 * @example "909645967081476147"
 */
export type DiscordId = Brand<string, "discordIdString">;

/**
 * A SteamID64 account identifier.
 *
 * @see {@link https://steamid.io/}
 *
 * @example "76561198200316171"
 */
export type SteamId64 = Brand<string, "steamId64">;

/**
 * An authorization token used by our users.
 *
 * Also serves as a Discord OAuth2 access token.
 *
 * @see {@link https://docs.discord.com/developers/topics/oauth2}
 *
 * @example "6qrZcUqja7812RVdnEKjpzOL4CvHBFG"
 */
export type UserToken = Brand<string, "userToken">;

/**
 * An authorization token used by our SCP:SL plugins.
 *
 * @example "dd61ae073412c7738e687847c658e94a"
 */
export type PluginToken = Brand<string, "pluginToken">;
