import React from 'react'
import MenuSound from './MenuSound'
import styled from 'rn-css'
import { getStyle, availableSounds } from '../services'

const Container = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
`

const Item = styled.View`
  margin: 0.4em 0.2em;
`

type MenuSoundsProps = {
  colors: {
    [sound: string]: string;
  };
  updateColor: (sound: string, color: string) => void;
}

const MenuSounds = ({ colors, updateColor }: MenuSoundsProps) => {
  const style = getStyle('menusBackground', 'coloring')
  const sounds = availableSounds
  return (
    <Container style={style}>
      {sounds.map(sound => <Item key={sound}>
        <MenuSound name={sound} color={colors[sound]} setColor={(color: string) => updateColor(sound, color)} />
      </Item>)}
    </Container>
  )
}

export default React.memo(MenuSounds)
