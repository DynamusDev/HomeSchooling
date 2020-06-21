import React from 'react'
import styled from 'rn-css'
import { MenuWhiteBox, MenuSwitch, Accordion } from '../components'
import { AccessibilityOptions } from '../types'

type AccessibilityProps = {
  options: AccessibilityOptions;
  updateOptions: (updates: AccessibilityOptions) => void;
  name?: 'notebook';
}

const AccessibilityNotebook = ({ options, updateOptions }: AccessibilityProps) => {
  return (
    <Accordion name='notebook' collapsable={false}>
      <SectionRoot>
        <Separator>
          <MenuWhiteBox>
            <MenuSwitch active={!!options.showMargin} onPress={() => updateOptions({ showMargin: !options.showMargin })} name='margin' menu='notebook'/>
          </MenuWhiteBox>
        </Separator>
      </SectionRoot>
    </Accordion>
  )
}

const SectionRoot = styled.View`
  flex: 1;
  padding: 0px 16px;
`

const Separator = styled.View`
  padding-bottom: 10px;
`

export default React.memo(AccessibilityNotebook)
