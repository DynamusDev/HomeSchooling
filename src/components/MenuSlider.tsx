import React from 'react'
import { MenuWhiteBox, MenuLabel } from '.'
import Slider from '@sharcoux/slider'
import styled from 'rn-css'
import { getStyle } from '../services'
import { AccessibilityMenu } from '../types'

interface MenuSliderProps {
  menu: AccessibilityMenu;
  max?: number;
  min?: number;
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const MenuSlider = ({ menu, min = 0, max = 1, step = 0.1, value: initialValue = 0, onChange = () => {} }: MenuSliderProps) => {
  const [value, setValue] = React.useState(initialValue)
  const containerStyle = [getStyle('menusBorder', menu), getStyle('menusBackground', menu, true)]
  const labelStyle = getStyle('slider', 'icon')
  const { backgroundColor: thumbColor } = getStyle('menusBackground', menu, true)
  const { color: trackColor } = getStyle('slider', 'track')

  // TODO: Add this in the
  const updateValue = (newValue: number) => {
    const rounded = Math.round(newValue / step) * step
    const inBounds = Math.min(max, Math.max(rounded, min))
    setValue(inBounds)
    onChange(inBounds)
  }

  return (
    <MenuWhiteBox row>
      <SliderContainer>
        <Container
          style={containerStyle}
          onPress={() => updateValue(value - step)}
        >
          <Label style={labelStyle}>-</Label>
        </Container>
        <Slider
          minimumValue={min}
          value={value}
          thumbTintColor={thumbColor}
          minimumTrackTintColor={trackColor}
          maximumTrackTintColor={trackColor}
          maximumValue={max}
          style={{ marginHorizontal: 10 }}
          step={step}
          onValueChange={updateValue}
        />
        <Container
          style={containerStyle}
          onPress={() => updateValue(value + step)}
        >
          <Label style={labelStyle}>+</Label>
        </Container>
      </SliderContainer>
      <ValueContainer>
        <MenuLabel type='label' content={`${Math.round(value / (max - min) * 100)}%`} />
      </ValueContainer>
    </MenuWhiteBox>
  )
}

const Label = styled.Text`
  font-weight: bold;
  font-size: 1.8em;
  text-align: center;
  padding-bottom: 3px;
  position: relative;
  top: 1px;
`

const ValueContainer = styled.View`
  justify-content: center;
  padding: 5px;
  align-items: flex-end;
  width: 3em;
`

const SliderContainer = styled.View`
  flex-direction: row;
  flex-grow: 1;
`

const Container = styled.TouchableOpacity<{row?: boolean}>`
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 3px;
  border-radius: 0.6em;
  justify-content: center;
  height: 1.8em;
  width: 1.8em;
  flex-direction: ${props => props.row ? 'row' : 'column'};
`

export default React.memo(MenuSlider)
