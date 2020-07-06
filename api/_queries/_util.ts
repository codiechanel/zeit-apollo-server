export function emptyResolver(_, { limit = 10, offset = 1 }) {
  /* if query definition has set default for lmit , this will be overriden  */
  //   console.log('limit', limit)

  /**
   * instead of returning empty json
   * we could use this as convenience
   * if user specifies limit on the root
   * it cascade to child requests
   */
  return {
    limit: limit,
    offset: offset,
  }
}
