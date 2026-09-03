import { Moon, Sun } from 'lucide-react'
import { Button } from './Button'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'

/**
 * One-tap light/dark switch for the header.
 *
 * The icon shows the theme you would switch *to*, which is the convention users
 * already read from every other app, and the label spells it out for screen
 * readers. The three-way choice — including Match system — lives in Settings.
 */
export function ThemeToggle({ className, size = 'icon' }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const goingDark = resolvedTheme === 'light'
  const label = goingDark ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn('text-ink-faint hover:text-ink', className)}
    >
      {goingDark ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </Button>
  )
}
