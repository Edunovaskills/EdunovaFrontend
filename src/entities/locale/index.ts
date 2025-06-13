import { getTranslation } from 'shared/utils'

export const ENTITIES_KEY = 'entities'

export { entitiesEn } from './en'
export type { EntitiesEn, EntitiesEnKey, EntitiesEnKeyExtended } from './en'

export const useEntitiesTranslation = getTranslation('tEntities', ENTITIES_KEY)
