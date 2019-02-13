import React from 'react'

import { LanguageProvider, LanguageConsumer, initLanguage } from './language.js'
import { ThemeProvider, ThemeConsumer, initTheme } from './theme.js'

const CombinedContextProvider = ({ language, theme, children }) => (
  <LanguageProvider value={initLanguage}>
    <ThemeProvider value={initTheme}>
      {children}
    </ThemeProvider>
  </LanguageProvider>
)

export { CombinedContextProvider, LanguageConsumer, ThemeConsumer }
