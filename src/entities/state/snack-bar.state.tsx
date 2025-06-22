import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'
import { SnackBar, type SnackBarProps } from 'shared/components'

type SnackBarState = Omit<SnackBarProps, 'onClose'>

type SnackBarStateWithoutColor = Omit<SnackBarState, 'color'>

type ShowMethod = {
  (options: SnackBarState): void
  error: (options: SnackBarStateWithoutColor) => void
  success: (options: SnackBarStateWithoutColor) => void
  warning: (options: SnackBarStateWithoutColor) => void
}

type SnackBarContextType = {
  show: ShowMethod
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined
)

export const useSnackBar = () => {
  const context = useContext(SnackBarContext)
  if (!context) {
    throw new Error('useSnackBar must be used within a SnackProvider')
  }
  return context
}

type SnackbarProviderProps = {
  children: ReactNode
}

export function SnackBarProvider({ children }: SnackbarProviderProps) {
  const [snackBarState, setSnackBarState] = useState<SnackBarState>({
    title: '',
    description: '',
    open: false,
    color: 'Primary',
  })

  const showSnackBar = (options: SnackBarState) => {
    setSnackBarState({
      ...options,
      open: true,
    })
  }

  const show = useCallback(showSnackBar, []) as ShowMethod

  show.error = (options: SnackBarStateWithoutColor) =>
    showSnackBar({ ...options, color: 'Error' })

  show.success = (options: SnackBarStateWithoutColor) =>
    showSnackBar({ ...options, color: 'Success' })

  show.warning = (options: SnackBarStateWithoutColor) =>
    showSnackBar({ ...options, color: 'Warning' })

  const contextValue = useMemo(() => {
    return { show }
  }, [show])

  const handleClose = () => {
    setSnackBarState((prevState) => ({ ...prevState, open: false }))
  }

  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}
      <SnackBar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        {...snackBarState}
        onClose={handleClose}
      />
    </SnackBarContext.Provider>
  )
}
