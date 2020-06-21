import React from 'react'
import { Accordion, MenuSlider, MenuLabel } from '../components'
import styled from 'rn-css'
import { translate } from '../services'
import { AccessibilityOptions } from '../types'

type AccessibilityProps = {
  options: AccessibilityOptions;
  updateOptions: (updates: AccessibilityOptions) => void;
  name?: 'spacing';
}

const AccessibilitySpacing = ({ options, updateOptions }: AccessibilityProps) => {
  return (
    <Accordion name='spacing' collapsable={false}>
      <SectionRoot>
        <SliderContainer>
          <MenuLabel type='boxTitle' content={translate('menus.lineSpacing')!} />
          <MenuSlider value={options.lineSpacing} menu='spacing' onChange={(value: number) => updateOptions({ lineSpacing: value })} />
        </SliderContainer>
        <SliderContainer>
          <MenuLabel type='boxTitle' content={translate('menus.wordSpacing')!} />
          <MenuSlider value={options.wordSpacing} menu='spacing' onChange={(value: number) => updateOptions({ wordSpacing: value })} />
        </SliderContainer>
        <SliderContainer>
          <MenuLabel type='boxTitle' content={translate('menus.syllableSpacing')!} />
          <MenuSlider value={options.syllableSpacing} menu='spacing' onChange={(value: number) => updateOptions({ syllableSpacing: value })} />
        </SliderContainer>
      </SectionRoot>
    </Accordion>
  )
}

const SectionRoot = styled.View`
  flex: 1;
  padding: 0px 16px;
`

const SliderContainer = styled.View`
  margin-bottom: 10px;
`

export default React.memo(AccessibilitySpacing)
