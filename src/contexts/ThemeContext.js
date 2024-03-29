import React, { useContext, useState } from 'react'
import { ConfigProvider, theme} from "antd";

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const rootElement = document.getElementById('root');
  const faviconLink = document.querySelector('link[rel="icon"]');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');

    if (theme === 'light') {
      document.title = 'Project Hub';
      faviconLink.href = './favicon.ico';
      rootElement.className = 'dark-theme';
    } else {
      document.title = 'Poro Hub';
      faviconLink.href = './graceIcon.png';
      rootElement.className = 'light-theme';
    }
  }

  return (
    <ConfigProvider theme={{algorithm: theme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
      <ThemeContext.Provider value={ theme }>
          <ThemeUpdateContext.Provider value={toggleTheme}>
              {children}
          </ThemeUpdateContext.Provider>
      </ThemeContext.Provider>
    </ConfigProvider>
  )
}
