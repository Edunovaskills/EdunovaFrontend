export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

export function asConst<T extends string>(value: T): T {
  return value
}

export function isNotEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim() !== ''
}

export function isNonEmptyArray<T>(val: unknown): val is T[] {
  return Array.isArray(val) && val.length > 0
}

export function isNonEmptyObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && Object.keys(val).length > 0
}

export function objectAsValueOptions<
  T extends Record<string, object & { value?: never }>,
>(obj: T) {
  return Object.entries(obj).map(
    ([value, item]) => ({ value, ...item }) as { value: keyof T } & T[keyof T]
  )
}

export function isStringJson(value: string) {
  return /^[\],:{}\s]*$/.test(value) && /(?:^|:|,)(?:\s*\[)+/g.test(value)
}

export function arraysAsValueObject<T extends string, TData extends object>(
  arr: ({ value: T } & TData)[]
) {
  return arr.reduce(
    (val, item) => ({
      ...val,
      [item.value]: item,
    }),
    {} as Record<T, TData>
  )
}

export function getObjectKeyFromValue<T extends object>(
  obj: T,
  value: unknown
) {
  return Object.keys(obj).find(
    (key) => obj[key as keyof typeof obj] === value
  ) as keyof T
}

/**
 * Record modifier utility type function that takes a record and a modifier function and returns a new record with modified values
 */
export function modifyRecord<
  TValue,
  TRecord extends object = Record<string, string>,
>(record: TRecord, modifier: (value: TRecord[keyof TRecord]) => TValue) {
  return Object.entries(record).reduce(
    (newObj, [key, value]) => ({
      ...newObj,
      [key]: modifier(value as TRecord[keyof TRecord]),
    }),
    {} as Record<keyof TRecord, TValue>
  )
}

/**
 * Adds empty string or - to the object properties if they are null or undefined
 */
export const addDefaultEmptyValue = <TData extends object>(
  data: TData,
  emptyValue: '' | '-' = '-'
) =>
  Object.entries(data).reduce(
    (acc, [key, value]) => {
      acc[key as keyof TData] = (value ?? emptyValue) as Exclude<
        TData[keyof TData],
        undefined | null
      >
      return acc
    },
    {} as {
      [K in keyof TData]: Exclude<TData[K], null | undefined>
    }
  )

/**
 * Given a list of keys and a value, returns an object with the keys as the properties with same value
 */
export const aliasKeys = <TKeys extends string | number | symbol, TData>(
  keys: TKeys[],
  value: TData
) =>
  ({
    ...Object.fromEntries([...new Set(keys)].map((key) => [key, value])),
  }) as Record<TKeys, TData>
