import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { ToastViewport } from '../components/ui/Toast'

const ToastContext = createContext(null)

const DEFAULT_DURATION = 4000

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const toast = useCallback(
    ({ title, description, variant = 'success', action, duration = DEFAULT_DURATION }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

      setToasts((current) => [...current.slice(-2), { id, title, description, variant, action }])
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      )

      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside a ToastProvider')
  return context
}
