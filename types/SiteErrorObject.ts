export interface SiteErrorObject {
	/**
	 * The error described in a few words.
	 *
	 * @example "User Not Found"
	 */
	readonly title: Capitalize<string>;

	/**
	 * A sentence that explains how the error occurred.
	 *
	 * @example "A user with this ID does not exist in the database."
	 */
	readonly description: string;
}
