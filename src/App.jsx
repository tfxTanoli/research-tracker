import { ThemeProvider } from './hooks/useTheme'
import { ToastProvider } from './hooks/useToast'
import { ResearchWorkspace } from './ResearchWorkspace'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ResearchWorkspace />
      </ToastProvider>
    </ThemeProvider>
  )
}
