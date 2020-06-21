/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { Profile } from '../models/useProfile'

const [locale] = RNLocalize.getLocales()

// Handle Language selection
type LanguageContextType = { language: string; setLanguage: (language: string) => void }
export const LanguageContext = React.createContext<LanguageContextType>({ language: locale.languageTag, setLanguage: () => {} })

// Handle Theme selection
type ThemeContextType = {theme: string; setTheme: (theme: string) => void}
export const ThemeContext = React.createContext<ThemeContextType>({ theme: 'default', setTheme: () => {} })

// Handle Profile selection
type ProfileContextType = {profile?: Profile; logout: () => void}
export const ProfileContext = React.createContext<ProfileContextType>({ profile: undefined, logout: () => {} })
