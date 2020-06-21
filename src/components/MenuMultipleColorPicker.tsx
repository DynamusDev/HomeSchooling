import React from 'react'
import { ColorDropdown, withColorPicker } from '.'
import styled from 'rn-css'
import { getStyle } from '../services'

interface MenuMultipleColorPickerProps {
  colorSet: string[];
  updateColorSet: (colors: string[]) => void;
}

const colors = ['red', 'blue', 'yellow', 'orange', 'green', 'black', 'cyan', 'purple', 'magenta', 'grey']

const MenuMultipleColorPicker = ({ colorSet, updateColorSet }: MenuMultipleColorPickerProps) => {
  const buttonStyle = getStyle('buttons', 'menu')
  const labelStyle = getStyle('buttons', 'colorPicker')

  const pushNewColor = () => {
    if (colorSet.length < 10) updateColorSet([...colorSet, colors[colorSet.length - 1]])
  }

  const removeColor = () => {
    if (colorSet.length > 2) updateColorSet(colorSet.slice(0, colorSet.length - 1))
  }

  const onColorChange = (newColor: string, i: number) => {
    const newColors = [...colorSet]
    newColors[i] = newColor
    updateColorSet(newColors)
  }
  console.log(colorSet.length >= 10)

  return (
    <Container>
      <ColorRow>
        {colorSet.map((color, index) => {
          const ColorPicker = withColorPicker(ColorDropdown, (color: string) => onColorChange(color, index))
          return <ColorPicker key={'color-' + index} color={color} />
        })}
      </ColorRow>
      <ButtonView>
        <ButtonContainer style={buttonStyle} onPress={pushNewColor} disabled={colorSet.length >= 10}><ButtonText style={labelStyle}>+</ButtonText></ButtonContainer>
        <ButtonContainer style={buttonStyle} onPress={removeColor} disabled={colorSet.length <= 2}><ButtonText style={labelStyle}>-</ButtonText></ButtonContainer>
      </ButtonView>
    </Container>
  )
}

const Container = styled.View``

const ColorRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const ButtonView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  line-height: 0.7em;
`

const ButtonContainer = styled.TouchableOpacity<{disabled: boolean}>`
  overflow: hidden;
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  border-bottom-width: ${props => props.disabled ? 1 : 3}px;
  border-radius: 10px;
  box-shadow: 0px 1px 6px #00000014;
  opacity: ${props => props.disabled ? 0.75 : 1};
  padding: 5px;
  margin: 0.2em;
  width: 2em;
  height: 2em;
`

export default MenuMultipleColorPicker
