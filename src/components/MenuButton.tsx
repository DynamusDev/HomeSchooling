import React, { useState } from 'react'
import styled from 'rn-css'
import { translate, getIcon, getStyle } from '../services'
import { Icon, MenuLabel } from './'
import type { MenuButton as MenuButtonName, AccessibilityMenu } from '../types'

const Container = styled.View`
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  align-content:center;
  width: 5.6em;
`

const ButtonContainer = styled.TouchableOpacity.attrs<{pressed: boolean}>(props => ({ activeOpacity: props.pressed ? 0.9 : 1 }))`
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  border-bottom-width: ${props => props.pressed ? 2 : 3}px;
  padding: 1em;
  border-radius: 0.8em;
  height: 4em;
  width: 4em;
  box-shadow: ${props => props.pressed ? '0px 0.5px 2px #00000014' : '0px 1px 6px #00000014'};
`

const Text = styled(MenuLabel)`
  padding-top: 0.4em;
  text-align: center;
`

export type MenuButtonProps = {
  onPress: () => void;
  name: MenuButtonName | AccessibilityMenu;
}

const MenuButton = ({ onPress, name }: MenuButtonProps) => {
  const [pressed, setPressed] = useState<boolean>(false)
  const text = translate('buttons.' + name)
  const icon = React.useMemo(() => getIcon('buttons', name), [name])
  const buttonStyle = getStyle('buttons', 'menu')

  return (
    <Container>
      <ButtonContainer
        style={buttonStyle}
        onPress={onPress}
        activeOpacity={1}
        onPressIn={() => { setPressed(true) }}
        onPressOut={() => { setPressed(false) }}
        pressed={pressed}
      >
        {
          icon &&
          <Icon name={icon} />
        }
      </ButtonContainer>
      <Text type='buttonLabel' content={text!} />
    </Container>
  )
}

export default React.memo(MenuButton)
