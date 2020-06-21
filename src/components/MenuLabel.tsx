import React from 'react'
import { TextStyle } from 'react-native'
import { getStyle } from '../services'
import styled from 'rn-css'

type MenuLabelProps = {
  style?: TextStyle;
  content: string;
  active?: boolean;
  type: 'boxTitle' | 'label' | 'sectionTitle' | 'buttonLabel';
}

const MenuLabel = ({ content, style, active, type }: MenuLabelProps) => {
  const color = getStyle('menus', 'label', active)
  const fontSize =
    type === 'boxTitle' ? 1.1
      : type === 'sectionTitle' ? 1.4
        : type === 'buttonLabel' ? 0.7
          : 1
  return <Text fontSize={fontSize} style={[color, style]}>{content}</Text>
}

const Text = styled.Text<{fontSize: number}>`
  letter-spacing: 0px;
  font-weight: bold;
  font-size: ${props => props.fontSize}em;
`

export default MenuLabel
