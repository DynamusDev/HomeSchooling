import React from 'react'
import { Accordion, MenuRadio, MenuWhiteBox, Dropdown, MenuLabel } from '../components'
import styled from 'rn-css'
import { translate } from '../services'
import { AccessibilityOptions } from '../types'

type AccessibilityProps = {
  options: AccessibilityOptions;
  updateOptions: (updates: AccessibilityOptions) => void;
  name?: 'fonts';
}

const AccessibilityFont = ({ options, updateOptions }: AccessibilityProps) => {
  const fontOptions = ['Nunito', 'Helvetica bold', 'Times', 'Robotto']
  const fontSizeOptions = [1, 1.2, 1.4, 1.8]
  const initialFontIndex = fontOptions.indexOf(options.fontFamily || 'Nunito')
  const initialSizeIndex = fontSizeOptions.indexOf(options.fontSize || 1)

  const defaultRender = React.useCallback(({ value }: { value: string }) => <DropdownLabel>{value}</DropdownLabel>, [])
  return (
    <Accordion name='fonts' collapsable={false}>
      <SectionRoot>
        <MenuLabel type='boxTitle' content={translate('accessibility.font')!} />
        <Dropdown renderCurrent={defaultRender} renderItem={defaultRender} initialIndex={initialFontIndex} options={fontOptions} onChange={(value: string) => updateOptions({ fontFamily: value })} />
        <MenuLabel type='boxTitle' content={translate('accessibility.fontSize')!} />
        <MenuWhiteBox>
          <MenuRadio activeIndex={initialSizeIndex} menu='fonts' options={fontSizeOptions} onChange={(value: number) => updateOptions({ fontSize: value })} />
        </MenuWhiteBox>
      </SectionRoot>
    </Accordion>
  )
}

const SectionRoot = styled.View`
  flex: 1;
  padding: 0px 16px;
`

const DropdownLabel = styled.Text`
  color: #2A044A;
  font-size: 16px;
  font-weight: bold;
`

export default React.memo(AccessibilityFont)
