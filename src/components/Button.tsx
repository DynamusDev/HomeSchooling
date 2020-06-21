import React from 'react'
import styled from 'rn-css'
import { translate, getStyle, getIcon } from '../services'
import { TouchableOpacityProps } from 'react-native'
import Icon from './Icon'

const Container = styled.TouchableOpacity`
  flex-direction: row;
`
const Text = styled.Text``

type ButtonProps = TouchableOpacityProps & {
  name: string;
  iconSize?: string;
}

const Button = ({ name, iconSize = '2em', ...props }: ButtonProps) => {
  const text = translate('buttons.' + name)
  const icon = getIcon('buttons', name)
  const containerStyle = getStyle('buttons', name)
  return <Container style={containerStyle} {...props}>
    {icon && <Icon name={icon} width={iconSize} height={iconSize}/>}
    <Text>{text}</Text>
  </Container>
}

export default React.memo(Button)
