import React, { useState } from 'react'
import styled from 'rn-css'
import { translate, getIcon, getStyle } from '../services'
import OwnIcon from './Icon'
import type { Action } from '../types'

const Container = styled.View`
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  align-content:center;
`

const ButtonContainer = styled.TouchableOpacity<{pressed: boolean;hovered: boolean}>`
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;

  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-radius: 10px;
  padding: 0.5rem 0.8rem;

  box-shadow: ${props => props.pressed ? 'none' : '0 1px 6px #00000014'};
`

const Icon = styled(OwnIcon)`
`

const Text = styled.Text`
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 6px;
`

const NavButton = ({ callback, name }: Action) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const [pressed, setPressed] = useState<boolean>(false)

  const containerStyle = getStyle('buttons', 'nav', hovered)
  const text = translate('buttons.' + name)
  const icon = getIcon('buttons', name)

  return (
    <Container>
      <ButtonContainer
        style={containerStyle}
        onPress={callback}
        activeOpacity={1}
        pressed={pressed}
        hovered={hovered}
        onMouseEnter={() => { setHovered(true) }}
        onMouseLeave={() => { setHovered(false) } }
        onPressIn={() => { setPressed(true) }}
        onPressOut={() => { setPressed(false) }}
      >
        {
          icon &&
          <Icon name={icon} width="20px" height="20px" />
        }
        {
          text &&
          <Text>{text}</Text>
        }
      </ButtonContainer>
    </Container>
  )
}

export default React.memo(NavButton)
