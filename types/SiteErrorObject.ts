import type { OAS } from "../global/OAS";

export interface SiteErrorObject {
    /**
     * The error described in a few words.
     *
     * @example "User Not Found"
     */
    title: Capitalize<string>;

    /**
     * A sentence that explains how the error occurred.
     *
     * @example "A user with this ID does not exist in the database."
     */
    description: string;
}

export const SITE_ERROR_OBJECT = {
    type: "object",
    properties: {
        title: {
            type: "string",
            description: "The error described in a few words.",
            example: "User Not Found",
        },
        description: {
            type: "string",
            description: "A sentence that explains how the error occurred.",
            example: "A user with this ID does not exist in the database.",
        },
    },
    required: ["title", "description"],
    additionalProperties: false,
} as const satisfies OAS.Schema;
