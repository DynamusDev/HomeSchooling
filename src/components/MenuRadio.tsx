import React from 'react'
import styled from 'rn-css'
import { getStyle } from '../services'
import { ViewProps } from 'react-native'
import { AccessibilityMenu } from '../types'

export type MenuRadioProps<T> = ViewProps & {
  options: T[];
  menu: AccessibilityMenu;
  activeIndex?: number;
  onChange: (value: T, index: number) => void;
}

const MenuRadio = <T, >({ menu, options, activeIndex = 0, onChange }: MenuRadioProps<T>) => {
  const dividerStyle = getStyle('container', 'divider')

  const optionsViews: React.ReactNode[] = options.map((option: T, index: number) => {
    const zoom = menu === 'fonts' ? (option as unknown as number) : 1
    const active = index === activeIndex
    const valueStyle = getStyle('buttons', 'label', active)
    const containerStyle = active ? [getStyle('menusBackground', menu, true), getStyle('menusBorder', menu)] : undefined
    return <ValueContainer
      style={containerStyle}
      key={'option' + index}
      onPress={() => !active && onChange(option, index)}
    >
      <Value style={valueStyle} zoom={zoom} selected={active}>{menu === 'fonts' ? 'A' : option}</Value>
    </ValueContainer>
  })

  return (
    <Container>
      {Array.isArray(optionsViews) ? optionsViews.reduce((prev, curr, i) => [prev, <Divider style={dividerStyle} key={'divider' + i} />, curr]) : optionsViews}
    </Container>
  )
}

// TODO: We might need to read the font color from the theme
const Value = styled.Text<{zoom?: number; selected?: boolean}>`
  text-align: center;
  font-weight: bold;
  color: ${props => props.selected ? 'white' : 'black'}
  ${props => props.zoom ? '' : 'padding: 5px;'}
  ${props => props.zoom ? `font-size: ${props.zoom}em;` : ''} 
`
const ValueContainer = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 5px;
  border-radius: 10px;
  border-color: transparent;
`

const Container = styled.View`
  flex-direction: row;
  align-items: stretch;
`

const Divider = styled.View`
  border-width: 1;
  flex: 0;
  margin: 0 5px;
`

export default MenuRadio
