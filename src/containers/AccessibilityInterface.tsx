import React from 'react'
import styled from 'rn-css'
import { Accordion, MenuSwitch, MenuWhiteBox, MenuSlider, MenuLabel } from '../components'
import { translate } from '../services'
import { AccessibilityOptions } from '../types'

type AccessibilityProps = {
  options: AccessibilityOptions;
  updateOptions: (updates: AccessibilityOptions) => void;
  name?: 'interface';
}

const AccessibilityInterface = ({ options, updateOptions }: AccessibilityProps) => {
  return (
    <Accordion name='interface' collapsable={false}>
      <SectionRoot>
        <Separator>
          <MenuWhiteBox >
            <MenuSwitch active={!!options.highContrast} name='highContrast' menu='interface' onPress={() => updateOptions({ highContrast: !options.highContrast })}/>
          </MenuWhiteBox>
        </Separator>
        <Separator>
          <MenuLabel type='boxTitle' content={translate('menus.interfaceSize')!} />
          <MenuSlider menu='interface' value={options.interfaceSize} onChange={interfaceSize => updateOptions({ interfaceSize })}/>
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

export default React.memo(AccessibilityInterface)
