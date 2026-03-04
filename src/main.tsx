import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TesloShop } from './TesloShop';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TesloShop />
  </StrictMode>,
)
