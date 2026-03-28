import type { Brand } from "./Util";

/** Page number, starts at 0. */
export type PageNumber = Brand<number, "pageNumber">;

export interface PaginationParams {
    readonly page?: PageNumber;

    /** Maximum number of results to show per page. */
    readonly perPage?: number;
}

export interface WithPagination<T> {
    /** Total number of relevant items across all pages.  */
    readonly totalItemCount: number;

    readonly items: T[];
}
