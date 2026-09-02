import { ToastProvider } from './hooks/useToast'
import { ResearchWorkspace } from './ResearchWorkspace'

export default function App() {
  return (
    <ToastProvider>
      <ResearchWorkspace />
    </ToastProvider>
  )
}
