import React from 'react'
import styled from 'rn-css'
import * as RN from 'react-native'
import { getStyle } from '../services'

const CustomSelectContainer = styled.TouchableOpacity`
  padding: 2px;
  border-width: 1px;
  margin: 0.2em;
  border-radius: 0.6em;
  width: 4em;
  height: 2em;
  flex-direction: row;
  background-color: white;
`
const ColorBox = styled.View<{color: string}>`
  flex: 2;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: ${props => props.color};
`

const TriangleContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Chevron = styled.View<{color: string}>`
  width: 0px;
  height: 0px;

  border-radius: 5px;

  border-right-style: solid;
  border-right-color: transparent;
  border-right-width: 6px;

  border-left-style: solid;
  border-left-color: transparent;
  border-left-width: 6px;

  border-top-style: solid;
  border-top-color: ${props => props.color};
  border-top-width: 6px;
`

type ColorDropdownProps = RN.TouchableOpacityProps & {
  color: string;
  children?: React.ReactChildren;
}

const ColorDropdown = React.forwardRef<typeof RN.TouchableOpacity, ColorDropdownProps>(({ color, children, ...props }: ColorDropdownProps, ref) => {
  const style = getStyle('buttons', 'colorPicker')
  return <CustomSelectContainer ref={ref} style={style} {...props}>
    {children}
    <ColorBox color={color!} />
    <TriangleContainer>
      <Chevron color={color!} />
    </TriangleContainer>
  </CustomSelectContainer>
})

ColorDropdown.displayName = 'ColorDropdown'

export default ColorDropdown
