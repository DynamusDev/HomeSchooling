// TODO: should probably use useContext to respect React workflow
import React from 'react'
import { ThemeContext } from './contexts'
import { merge } from '../utils'
import { StyleProp, TextStyle } from 'react-native'
// TODO : Find a way to load the files only at runtime

type ThemeValue = {
  border?: string;
  background?: string;
  color?: string;
  font?: string;
  shadow?: string;
  hover?: {
    border?: string;
    background?: string;
    color?: string;
    font?: string;
    shadow?: string;
  };
  active?: {
    border?: string;
    background?: string;
    color?: string;
    font?: string;
    shadow?: string;
  };
};

type Theme = {
  [namespace: string]: {
    [name: string]: ThemeValue;
  };
}

// Available themes
type AvailableThemes = 'default' | 'light' | 'highContrasts'
const themes: { [x in AvailableThemes]: 'light' | 'highcontrast' } = {
  default: 'light',
  light: 'light',
  highContrasts: 'highcontrast'
}
export const availableThemes = Object.keys(themes).filter(l => l !== 'default')

// Initialization
let theme: Theme = {}
loadTheme('default')

/** Return the theme's name */
export function getThemeName (): string {
  return React.useContext(ThemeContext).theme || 'light'
}
/** Change the current theme */
export function setTheme (name: AvailableThemes): void {
  loadTheme(name)
  React.useContext(ThemeContext).setTheme(name)
}

/** Return the current theme object */
export default function getTheme (): Theme { return theme }

/** Read the theme file and merge it into the theme object */
function loadTheme (name: AvailableThemes) {
  function readTheme (name: AvailableThemes): Theme {
    const themeName = themes[name] || themes.default
    switch (themeName) {
      case 'light': return require('../assets/themes/light.js')
      case 'highcontrast': return require('../assets/themes/highcontrast.js')
      default: return readTheme('default')
    }
  }
  theme = merge(theme, readTheme('default')) // Clear the previous language
  if (themes[name] === themes.default) return
  theme = merge(theme, readTheme(name))
}

/** retrieve all theme data for the elements */
export function getThemeForElement (namespace: string, name: string, active?: boolean, hover?: boolean) {
  const ui: ThemeValue = {}
  if (theme[namespace]) {
    Object.assign(ui, theme[namespace])
    if (theme[namespace][name]) Object.assign(ui, theme[namespace][name])
  }
  if (hover && ui.hover) Object.assign(ui, ui.hover)
  if (active && ui.active) Object.assign(ui, ui.active)
  return ui
}

export function getStyle (namespace: string, name: string, active?: boolean, hover?: boolean) {
  const { border, background, color, font, shadow } = getThemeForElement(namespace, name, active, hover)
  const themedStyle: StyleProp<TextStyle> = {}
  if (border) themedStyle.borderColor = border
  if (background) themedStyle.backgroundColor = background
  if (color) themedStyle.color = color
  if (shadow) themedStyle.shadowColor = shadow
  if (font) themedStyle.fontFamily = font
  else themedStyle.fontFamily = (theme.font + '')
  return themedStyle
}
