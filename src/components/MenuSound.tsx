import React from 'react'
import { Icon, MenuWhiteBox, MenuLabel, withColorPicker } from '.'
import { getIcon, getStyle, Sound, translate, getSound } from '../services'
import styled from 'rn-css'

const Container = styled.View`
  align-items: center;
`

const Title = styled(MenuLabel)`
  margin-bottom: 0.4em;
  font-size: 1.2em;
  text-align: center;
`

const Content = styled.View`
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  height: 2.5em;
`

const PlaySound = styled.TouchableOpacity`
  border-width: 1px;
  border-style: solid;
  border-radius: 0.8em;
  margin-right: 0.5em;
  justify-content: center;
  align-items: center;
  width: 2.5em;
`

const SetColor = styled.TouchableOpacity<{color?: string}>`
  border-width: 2px;
  border-style: dashed;
  border-radius: 0.8em;
  flex: 1;
  padding: 0 0.2em;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 4em;
  ${props => props.color ? `background-color: ${props.color};` : ''}
`

interface SoundProps{
  name: Sound;
  color?: string;
  setColor: (color: string) => void;
}

const MenuSound = ({ name, color, setColor }: SoundProps) => {
  // const [color, setColor] = React.useState<string>()

  const speaker = getIcon('menuSound', 'speaker')
  const plusPaint = getIcon('menuSound', 'plusPaint')
  const paint = getIcon('menuSound', 'paint')
  const titleStyle = getStyle('menuSound', 'title')
  const soundStyle = getStyle('menuSound', 'playSound')
  const colorStyle = getStyle('menuSound', 'setColor')

  const soundName = translate('sounds.' + name)
  const title = translate('menuSound.title', name, soundName)
  const sound = getSound(name)

  function playSound (name: string) {
    const audio = document.getElementById(name) as HTMLAudioElement
    audio.play()
  }

  const ColorPicker = withColorPicker(SetColor, setColor)

  return (
    <MenuWhiteBox>
      <Container>
        <Title type='label' style={titleStyle} content={title!} />
        <Content>
          <PlaySound style={soundStyle} onPress={ () => playSound(name) }>
            <audio id={name} src={sound}></audio>
            <Icon name={speaker!} width={'1.5em'} height={'1.5em'}/>
          </PlaySound>
          <ColorPicker color={color} style={colorStyle}>
            <Icon name={plusPaint!} width={'1.2em'} height={'1.2em'}/>
            <Icon name={paint!} width={'1.5em'} height={'1.5em'}/>
          </ColorPicker>
        </Content>
      </Container>
    </MenuWhiteBox>
  )
}

export default React.memo(MenuSound)
