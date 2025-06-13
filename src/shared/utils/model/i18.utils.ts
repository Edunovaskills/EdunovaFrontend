import {
    $FirstNamespace,
    KeyPrefix,
    KeysWithReturnObjects,
    Namespace,
    TFunction,
  } from 'i18next'
  import {
    FallbackNs,
    UseTranslationOptions,
    UseTranslationResponse,
    useTranslation,
  } from 'react-i18next'
  
  import { Leaves } from 'shared/typescript'
  
  type TransResponse<TNameSpace extends Namespace> = UseTranslationResponse<
    FallbackNs<TNameSpace>,
    KeysWithReturnObjects[$FirstNamespace<FallbackNs<TNameSpace>>]
  >
  
  export const getTranslation = <
    TKeyName extends string,
    TNameSpace extends Namespace,
  >(
    tKeyName: TKeyName,
    ns: TNameSpace
  ) => {
    return <KPrefix extends KeyPrefix<FallbackNs<TNameSpace>> = undefined>(
      keyPrefix?: KPrefix,
      options?: Omit<UseTranslationOptions<TNameSpace>, 'keyPrefix'>
    ) => {
      const { t, ...rest } = useTranslation(ns, { keyPrefix, ...options })
  
      return { [tKeyName]: t, ...rest } as {
        [key in TKeyName]: TFunction<TNameSpace, KPrefix>
      } & Omit<TransResponse<TNameSpace>, 't'>
    }
  }
  
  export type I18nKeys<T extends object = { [key: string]: string }> = Leaves<T>
  
  export interface I18nFunction<T extends object = { [key: string]: string }> {
    (key: Leaves<T>, params?: unknown): string
  }
  