export type Nullable<T> = T | null

export type Undefined<T> = T | undefined

export type ObjectUnknown = Record<string, unknown>

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

export type Noop = () => void

export type ArrayValue<T extends { value: string }[]> = T[number]['value']

/**
 * Makes object properties Partial
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Makes object properties Nullable
 */
export type NullableProperties<T> = {
  [K in keyof T]: T[K] | null
}

/**
 * Object keys leaves
 * @example 'user.name.first'
 */
export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never

/**
 * Path of the key in an nested object as an array
 */
export type PathArray<T> = T extends object
  ? { [K in keyof Required<T>]: [K, ...PathArray<Required<T[K]>>] }[keyof T]
  : []

export type DefaultAllType =
  | object
  | undefined
  | string
  | number
  | boolean
  | null

/**
 * Its a string type with intellisense
 */
export type SuggestionString<TKey extends string> =
  | TKey
  | (string & NonNullable<unknown>)

export type OrEmptyString<TKey extends string> = TKey | ''

/**
 * Record with undefined value
 */
export type PartialRecord<K extends string | number | symbol, T> = Partial<
  Record<K, T>
>

/**
 * Utility type that enforces exclusivity of properties in an object, allowing only one property at a time.
 * @template T - The input object type.
 */
export type ExclusiveProperty<T> = {
  [K in keyof T]: {
    [P in K]: T[P]
  } & {
    [Q in Exclude<keyof T, K>]?: never
  }
}[keyof T]

/**
 * Utility type that enforces exclusivity of properties in an object, allowing either K set or T minus K set of property at a time.
 * @template T - The input object type.
 */
export type EitherOr<T, K extends keyof T> =
  | ({ [P in K]: T[P] } & { [P in Exclude<keyof T, K>]?: never })
  | ({ [P in K]?: never } & { [P in Exclude<keyof T, K>]: T[P] })

/**
 * Utility type that enforces at least one property in an object.
 * @template T - The input object type.
 */
export type AtLeastOneRequiredProperty<T> = {
  [K in keyof T]: Pick<T, K>
}[keyof T] &
  Partial<T>

/**
 * Extracts the keys of an object whose which are optional.
 */
export type OptionalKeys<T> = Exclude<
  {
    [K in keyof T]: object extends Pick<T, K> ? K : never
  }[keyof T],
  undefined
>

export type OrNever<T> = T | PartialRecord<keyof T, never>

/**
 * Extracts the keys of an object whose which are required.
 */
export type RequiredKeys<T> = Exclude<
  {
    [K in keyof T]: object extends Pick<T, K> ? never : K
  }[keyof T],
  undefined
>

/**
 * Omit properties by value type
 */
export type OmitByValue<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? never : K]: T[K]
}

/**
 * Extracts the keys by value type
 */
export type PickByValue<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K]
}

/**
 * Make object properties required
 */
export type DefinedProperties<T> = {
  [K in keyof T]: Exclude<T[K], null | undefined>
}

export type NoTrailingSegment<
  TSeg extends string,
  TValue extends string,
> = TValue extends `${string}${TSeg}` ? never : TValue

/**
 * Extracts the keys of an object whose values are of a certain type.
 */
export type ExtractKeys<T, TType> = {
  [K in keyof T]: T[K] extends TType ? K : never
}[keyof T]
