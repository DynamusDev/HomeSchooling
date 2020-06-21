import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import styled from 'rn-css'
import { Icon, MenuLabel } from '.'
import { getStyle, getIcon, translate } from '../services'
import { AccessibilityMenu } from '../types'

const size = 1.55

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  width: ${size * 2}em;
  height: ${size}em;
  position: relative;
  border-radius: ${size / 2}em;
  border-width: 1px;
  overflow: hidden;
`

const StateIcon = styled(Icon)<{active: boolean}>`
  padding: ${size / 3.6}em;
  position: absolute;
  top: -1px;
  z-index: 1;
  ${props => props.active ? 'left' : 'right'}: 0;
`

const Dot = styled(Animated.View)`
  width: ${size * 5 / 7}em;
  height: ${size * 5 / 7}em;
  margin: ${size / 7}em;
  border-radius: 50%;
  position: absolute;
  top: -1px;
  z-index: 10;
`

const ButtonContainer = styled.View`
  justify-content: center;
`

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

type SwitchProps = {
  onPress: () => void;
  active: boolean;
  menu: AccessibilityMenu;
  name: string;
}

const MenuSwitch = ({ onPress, active, menu, name }: SwitchProps) => {
  const [dotLeft] = useState(new Animated.Value(active ? 50 : 0))
  const label = translate('switchs.' + name)
  useEffect(() => {
    if (active) Animated.timing(dotLeft, { toValue: 50, duration: 100, useNativeDriver: true }).start()
    else Animated.timing(dotLeft, { toValue: 0, duration: 100, useNativeDriver: true }).start()
  }, [active])
  const labelStyle = getStyle('switchs', menu)
  const buttonStyle = [
    getStyle('switchs', menu),
    getStyle('menusBackground', active ? menu : 'disabled', active)
  ]
  const dotStyle = [
    getStyle('menusBackground', active ? 'disabled' : menu, true),
    {
      left: dotLeft.interpolate({
        inputRange: [0, 50],
        outputRange: ['0%', '50%']
      })
    }
  ]
  const icon = getIcon('buttons', 'switch', active)
  return (
    <Container>
      {label && <MenuLabel type='label' style={labelStyle} content={label} />}
      <ButtonContainer>
        <Button style={buttonStyle} onPress={onPress}>
          <Dot style={dotStyle} />
          <StateIcon name={icon!} active={active} width={`${size * 1.1}em`} height={`${size}em`} />
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default React.memo(MenuSwitch)
