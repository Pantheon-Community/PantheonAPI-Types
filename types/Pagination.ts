import { INTEGER, SMALLINT } from "../spec/schemas/integer";
import { validateArray } from "../spec/validators/array";
import { validateInteger, validateSmallInt } from "../spec/validators/integer";
import { validateObject } from "../spec/validators/object";
import type { Brand, SpecObject, SpecObjectFor } from "./Util";

/** Page number, starts at 0. */
export type PageNumber = Brand<number, "pageNumber">;

export const PAGE_NUMBER = {
    schema: {
        ...SMALLINT,
        minimum: 0,
        description: "Page number, starts at 0.",
        default: 0,
    },
    validate: (input) => validateSmallInt(input, 0),
} as const satisfies SpecObject;

export interface PaginationParams {
    page: PageNumber;

    /** Maximum number of results to show per page. */
    perPage: number;
}

export const PAGINATION_PARAMS = {
    schema: {
        type: "object",
        properties: {
            page: PAGE_NUMBER.schema,
            perPage: {
                ...SMALLINT,
                minimum: 1,
                description: "Maximum number of results to show per page.",
                default: 10,
            },
        },
        required: [],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        page: (input) => input === undefined || PAGE_NUMBER.validate(input),
        perPage: (input) => input === undefined || validateSmallInt(input, 1),
    },
} as const satisfies SpecObjectFor<PaginationParams>;

export interface WithPagination<T> {
    /** Total number of relevant items across all pages. */
    totalItemCount: number;

    items: T[];
}

export const WITH_PAGINATION = {
    schema: {
        type: "object",
        properties: {
            totalItemCount: {
                ...INTEGER,
                description: "Total number of relevant items across all pages.",
                minimum: 0,
            },
            items: {
                type: "array",
            },
        },
        required: ["totalItemCount", "items"],
        additionalProperties: false,
    },
    validate(input) {
        validateObject(input, this);
    },
    subValidators: {
        totalItemCount: (input) => validateInteger(input, 0),
        items: (input) => validateArray(input, 0, Number.MAX_SAFE_INTEGER, () => {}),
    },
} as const satisfies SpecObjectFor<WithPagination<unknown>>;
