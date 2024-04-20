import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { Button, ButtonSize, ButtonType } from './components/Button/Button'
import { Menu, MenuItem, SubMenu } from './components/Menu'
import { Icon } from './components/Icon'
import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
