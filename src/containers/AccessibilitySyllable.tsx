import React from 'react'
import { Accordion, MenuWhiteBox, MenuSwitch, MenuRadio } from '../components'
import styled from 'rn-css'
import { AccessibilityOptions } from '../types'

type AccessibilityProps = {
  options: AccessibilityOptions;
  updateOptions: (updates: AccessibilityOptions) => void;
  name?: 'syllable';
}

const AccessibilitySyllable = ({ options, updateOptions }: AccessibilityProps) => {
  const separatorOptions = ['-' as const, '/' as const, '+' as const, '|' as const]
  const currentSeparator = options.syllableSeparator
  const [separatorIndex, setSeparatorIndex] = React.useState(separatorOptions.indexOf(currentSeparator || '-'))
  const updateSeparator = React.useCallback((_value, index: number) => {
    setSeparatorIndex(index)
    updateOptions({ syllableSeparator: separatorOptions[index] })
  }, [updateOptions])
  const toggleSeparator = () => updateOptions({ syllableSeparator: currentSeparator ? undefined : separatorOptions[separatorIndex] })
  const active = !!options.syllableSeparator
  return (
    <Accordion name='syllable' collapsable={false}>
      <SectionRoot>
        <MenuWhiteBox>
          <MenuSwitch onPress={toggleSeparator} name='syllable' menu='syllable' active={active} />
          <MenuRadio options={separatorOptions} activeIndex={active ? separatorIndex : -1} menu='syllable' onChange={updateSeparator} />
        </MenuWhiteBox>
      </SectionRoot>
    </Accordion>
  )
}

const SectionRoot = styled.View`
  flex: 1;
`

export default React.memo(AccessibilitySyllable)
