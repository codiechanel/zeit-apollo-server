

export function emptyResolver(_, { limit = 50, offset = 1 }) {
    /**
     * instead of returning empty json
     * we could use this as convenience
     * if user specifies limit on the root
     * it cascade to child requests
     */
    return {
        limit: limit,
        offset: offset,
    };
}