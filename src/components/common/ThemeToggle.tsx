import { useTheme } from '@/theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="px-3 py-2 rounded border"
      aria-label="Toggle theme"
    >
      {isDark ? 'Dark' : 'Light'}
    </button>
  )
}


