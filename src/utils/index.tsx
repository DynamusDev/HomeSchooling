export function merge<T> (obj1: T, obj2: T): T {
  if (obj2 === undefined) return obj1
  if (obj1 === undefined) return obj2
  if (!(obj1 instanceof Object)) return obj2 || obj1
  if (!(obj2 instanceof Object)) return obj2 || obj1
  const result = {} as T
  Object.assign(result, obj1)
  Object.keys(obj2).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    result[key] = merge(obj1[key] as T, obj2[key] as T)
  })
  return result as T
}
