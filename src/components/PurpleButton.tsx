import React, { useState } from 'react'
import styled from 'rn-css'
import { getStyle } from '../services'

const StyledButton = styled.TouchableHighlight<{pressed: boolean}>`
  border-radius: 9px;
  border-top-width: ${({ pressed }) => pressed ? '2px' : '0px'};
  border-right-width: 0px;
  border-left-width: 0px;
  border-bottom-width: ${({ pressed }) => pressed ? '0px' : '3px'};
`

const StyledWrapper = styled.View<{pressed: boolean}>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.375em 0.5em;
  border-radius: 9px;
  borderTopLeftRadius: ${({ pressed }) => pressed ? '7px' : '9px'};
  borderTopRightRadius: ${({ pressed }) => pressed ? '7px' : '9px'};
`

type ButtonProps = {
  onPress: () => void;
  children: React.ReactChildren;
}

const PurpleButton = ({ children, ...props }: ButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const [pressed, setPressed] = useState<boolean>(false)

  const purpleBtnStyle = getStyle('buttons', 'purpleButton', pressed, hovered)

  return (
    <StyledButton
      {...props}
      style={purpleBtnStyle}
      activeOpacity={1}
      pressed={pressed}
      underlayColor={purpleBtnStyle.backgroundColor}
      onPressOut={() => setPressed(false)}
      onPressIn={() => setPressed(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StyledWrapper pressed={pressed} style={purpleBtnStyle}>
        {children}
      </StyledWrapper>
    </StyledButton>
  )
}

export default PurpleButton
