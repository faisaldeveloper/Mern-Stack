import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ColorModeProvider } from "@/components/ui/color-mode"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ColorModeProvider>
      <Provider>      
        <App />
      </Provider>
    </ColorModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
