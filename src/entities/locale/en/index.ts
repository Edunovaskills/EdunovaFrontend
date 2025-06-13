import { Leaves } from 'shared/typescript'

import { cloudInfoEn } from './clooudInfo.en'
import { cloudAccountEn } from './cloud-account.en'
import { defaultEn } from './entities.en'
import { errorEn } from './error.en'

export const entitiesEn = {
  ...defaultEn,
  errorEn,
  cloudInfoEn,
  cloudAccountEn,
}

export type EntitiesEn = typeof entitiesEn
export type EntitiesEnKey = keyof typeof entitiesEn
export type EntitiesEnKeyExtended<T extends EntitiesEnKey> = Leaves<
  EntitiesEn[T]
>
