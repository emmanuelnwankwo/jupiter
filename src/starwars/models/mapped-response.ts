export interface MappedResponse<T> {
  count: number
  next: string
  previous: string
  results: T
}
