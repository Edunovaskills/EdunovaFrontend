import { useState } from 'react'

import Cookies from 'js-cookie'

/**
 * Define a type for the key used to store the state in local storage
 * Add more keys as needed
 */
type LocalStateKey = string

// Define a type for the value that can be stored in local storage
type LocalStorageValue<T> = T | (() => T)

export const useLocalState = <T>(
  key: LocalStateKey,
  initialValue: LocalStorageValue<T>,
  storageType: 'localStorage' | 'sessionStorage' | 'cookie' = 'localStorage'
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  /**
   * Function to update the value to the storage chosen
   */
  const updateLocalState = (value: unknown) => {
    switch (storageType) {
      case 'cookie': {
        const setCookie = Cookies.set
        setCookie(key, value as string)
        break
      }
      case 'sessionStorage':
        window.sessionStorage.setItem(key, JSON.stringify(value))
        break
      case 'localStorage':
        window.localStorage.setItem(key, JSON.stringify(value))
        break
      default:
        window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Retrieve the initial state from local storage if it exists
      let item = window.localStorage.getItem(key)
      if (storageType === 'sessionStorage') {
        item = window.sessionStorage.getItem(key)
      } else if (storageType === 'cookie') {
        item = Cookies.get(key) ?? null
      }

      if (item) {
        return storageType === 'cookie' ? item : JSON.parse(item)
      }

      const value =
        typeof initialValue === 'function'
          ? (initialValue as () => T)()
          : initialValue

      // Update the value of the storage if not present
      updateLocalState(value)

      return value
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error retrieving state for key "${key}" from localStorage:`,
        error
      )
      return initialValue
    }
  })

  // Update both the local state and localStorage
  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Update state
      setStoredValue(valueToStore)
      // Update localStorage
      updateLocalState(valueToStore)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error setting state for key "${key}" in localStorage:`,
        error
      )
    }
  }

  return [storedValue, setValue]
}
