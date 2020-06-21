import React from 'react'
import styled from 'rn-css'
import { getStyle } from '../services'
import { ViewProps, StyleSheet } from 'react-native'

export interface MenuWhiteBoxProps extends ViewProps {
  children: React.ReactNode;
  row?: boolean;
}

const MenuWhiteBox = ({ children, row, style }: MenuWhiteBoxProps) => {
  const containerStyle = getStyle('container', 'menuBox')
  const dividerStyle = getStyle('container', 'divider')
  return (
    <Container style={StyleSheet.flatten([containerStyle, style])} row={row}>
      {Array.isArray(children) ? children.reduce((prev, curr, i) => [prev, <Divider style={dividerStyle} row={row} key={i} />, curr]) : children}
    </Container>
  )
}

const Container = styled.View<{row?: boolean}>`
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 5px;
  border-radius: 1em;
  box-shadow: 0px 1px 6px #00000014;
  padding: 0.7em 0.7em;
  margin: 0.2em 0;
  flex-direction: ${props => props.row ? 'row' : 'column'};
`

const Divider = styled.View<{row?: boolean}>`
  border-width: 1;
  margin: ${props => props.row ? '0 5px' : '5px 0'};
`

export default React.memo(MenuWhiteBox)
