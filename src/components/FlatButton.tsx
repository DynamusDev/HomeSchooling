import React, { useState } from 'react'
import styled from 'rn-css'
import { getStyle, getIcon, translate } from '../services'
import Icon from './Icon'

const StyledButton = styled.TouchableHighlight<{hovered?: boolean; pressed?: boolean}>`
  border-radius: 10px;
  shadow-opacity: ${({ hovered, pressed }) => (hovered && !pressed) ? 1 : 0};
  shadow-radius: 4px;
  shadow-offset: 0px 0px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: 10px;
  border-bottom-width: ${({ hovered, pressed }) => (hovered && !pressed) ? '3px' : '0px'};
  border-top-width: ${({ pressed }) => (pressed) ? '3px' : '0px'};
`

const StyledText = styled.Text<{name?: string}>`
  /* font-family: 'waiting for xia to tell me what he used for the icons...' ; */
  font-weight: ${({ name }) => name === 'bold' ? 'bold' : 'normal'};
  text-decoration: ${({ name }) => name === 'underline' ? 'underline' : 'none'};
  font-style: ${({ name }) => name === 'italic' ? 'italic' : 'normal'};
  font-size: 1.2em;
`

type ButtonProps = {
  onPress: () => void;
  name: 'bold' | 'italic' | 'underline' | 'undo' | 'redo' | 'zoomP' | 'zoomM';
  iconSize?: string;
  active?: boolean;
}

const FlatButton = ({ name, iconSize = '1em', active, ...props }: ButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const flatBtnStyle = getStyle('buttons', 'flatButton', active, hovered)

  const icon = getIcon('buttons', name)

  const translatedInitial = translate('buttons.' + name)?.charAt(0)
  return (
    <StyledButton
      {...props}
      style={flatBtnStyle}
      activeOpacity={1}
      underlayColor={flatBtnStyle.backgroundColor}
      hovered={hovered}
      pressed={active}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {
        icon
          ? <Icon name={icon} width={iconSize} height={iconSize} />
          : (
            <StyledText name={name} style={flatBtnStyle}>
              {translatedInitial}
            </StyledText>
          )
      }
    </StyledButton>
  )
}

export default FlatButton
