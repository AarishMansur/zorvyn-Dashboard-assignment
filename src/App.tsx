import Dashboard from "./components/core/dashboard/dashboard"
import { TooltipProvider } from "./components/ui/tooltip"


function App() {
  return (
   <>
   <TooltipProvider>
   <Dashboard />
   </TooltipProvider>
   </>
  )
}

export default App
