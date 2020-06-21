import React from 'react'

import {
  Menu,
  AccessibilityMain,
  AccessibilityColoring,
  AccessibilitySpacing,
  AccessibilityFont,
  AccessibilitySyllable,
  AccessibilityNotebook,
  AccessibilityInterface
} from '../src/containers'

export default {
  title: 'Menus'
}

const menus = {
  file: ['newNotebook', 'loadNotebook', 'pageDisplay', 'export', 'print'],
  edit: ['svgconversion', 'mathmlconversion'],
  options: ['language', 'themedisplay', 'updatetools'],
  help: ['help', 'about', 'tutorialvideos', 'tutorials', 'ask']
}

export const MenuStory = () => {
  // Transform the menus into sections
  const sections = Object.keys(menus).map(key => ({
    name: key,
    actions: menus[key].map(name => ({ name, callback: () => {} }))
  }))

  return <Menu sections={sections} />
}

const accessibilityStory = Comp => {
  const [options, setOptions] = React.useState({})
  return <Comp options={options} updateOptions={v => setOptions(o => ({ ...o, ...v }))} />
}

export const AccessibilityMainStory = () => <AccessibilityMain/>
export const AccessibilitySyllableStory = () => accessibilityStory(AccessibilitySyllable)
export const AccessibilityColoringStory = () => accessibilityStory(AccessibilityColoring)
export const AccessibilitySpacingStory = () => accessibilityStory(AccessibilitySpacing)
export const AccessibilityFontStory = () => accessibilityStory(AccessibilityFont)
export const AccessibilityNotebookStory = () => accessibilityStory(AccessibilityNotebook)
export const AccessibilityInterfaceStory = () => accessibilityStory(AccessibilityInterface)
