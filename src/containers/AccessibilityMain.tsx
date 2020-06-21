import React, { useState } from 'react'
import { Accordion, MenuButton } from '../components'
import styled from 'rn-css'
import Navigation from 'react-unavigation'

import {
  AccessibilityColoring,
  AccessibilityFont,
  AccessibilityNotebook,
  AccessibilitySpacing,
  AccessibilitySyllable,
  AccessibilityInterface
} from './'

const Session = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content:center;
  align-content: center;
  width: 100%;
  flex: 1 0 100%;
`

const AccessibilityMain = () => {
  const [options, setOptions] = React.useState({})
  const [active, setActive] = useState('interfaceParameters')
  // const toHome = () => setActive('interfaceParameters')
  const toFonts = () => setActive('fonts')
  const toSpacing = () => setActive('spacing')
  const toSyllable = () => setActive('syllable')
  const toColoring = () => setActive('coloring')
  const toNotebook = () => setActive('interfaceStyle')
  const toInterface = () => setActive('notebookStyle')

  return (
    <Navigation active={active}>
      <Accordion name='interfaceParameters' collapsable={false}>
        <Session>
          <MenuButton name='fonts' onPress={toFonts}/>
          <MenuButton name='syllable' onPress={toSyllable}/>
          <MenuButton name='notebook' onPress={toNotebook}/>
          <MenuButton name='spacing' onPress={toSpacing}/>
          <MenuButton name='coloring' onPress={toColoring}/>
          <MenuButton name='interface' onPress={toInterface}/>
        </Session>
      </Accordion>

      <AccessibilityFont name="fonts" options={options} updateOptions={v => setOptions(o => ({ ...o, ...v }))} />
      <AccessibilitySpacing name="spacing" options={options} updateOptions={v => setOptions(o => ({ ...o, ...v }))} />
      <AccessibilitySyllable name="syllable" options={options} updateOptions={v => setOptions(o => ({ ...o, ...v }))} />
      <AccessibilityColoring name="coloring" options={options} updateOptions={v => setOptions(o => ({ ...o, ...v }))} />
      <AccessibilityNotebook name="notebook" options={options} updateOptions={v => setOptions(o => ({ ...o, ...v }))} />
      <AccessibilityInterface name="interface" options={options} updateOptions={v => setOptions(o => ({ ...o, ...v }))} />
    </Navigation>
  )
}

export default React.memo(AccessibilityMain)
