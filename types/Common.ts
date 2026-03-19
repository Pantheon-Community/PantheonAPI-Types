import type { Brand } from "./Util";

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
 * @example "240312568273436674"
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

/**
 * An IP address, not uniformly structured!
 *
 * @example "152.143.112.125"
 * @example "::ffff:127.0.0.1"
 * @example "6ae1:c1b3:ac70:af3e:643b:bc3e:fda4:3e9b"
 */
export type Ip = Brand<string, "ip">;

/**
 * Browser and other software information.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent MDN Reference}
 *
 * @example "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0"
 */
export type UserAgent = Brand<string, "userAgent">;

/**
 * An origin URL of a client.
 *
 * @example "http://localhost:5000"
 * @example "https://dev.pantheoncommunity.org"
 */
export type Origin = Brand<string, "userOrigin">;
