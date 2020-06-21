import React from 'react'
import { Text } from 'react-native'

import {
  MenuSection,
  MenuWhiteBox,
  MenuButton,
  MenuSwitch,
  MenuRadio,
  MenuSlider,
  MenuSounds,
  MenuSound,
  MenuMultipleColorPicker
} from '../src/components'
import styled from 'rn-css'

export default {
  title: 'Menu Components'
}

const menus = {
  file: ['newNotebook', 'loadNotebook', 'pageDisplay', 'export', 'print'],
  edit: ['svgconversion', 'mathmlconversion'],
  options: ['language', 'themedisplay', 'updatetools'],
  help: ['help', 'about', 'tutorialvideos', 'tutorials', 'ask']
}

export const MenuButtonStory = () => (
  <MenuButton
    onPress={() => { console.log('pressed') }}
    name='print'
  />
)

export const MenuSectionStory = () => {
  // Transform the menus value into actions
  const actions = menus.file.map(name => ({ name, callback: () => {} }))
  return (
    <MenuSection
      actions={actions}
      name={'file'}
    />
  )
}

export const MenuWhiteBoxStory = () => {
  return (
    <StoryBackground>
      <StorySeparator>
        <MenuWhiteBox>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
        </MenuWhiteBox>
      </StorySeparator>
      <StorySeparator>
        <MenuWhiteBox row>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
        </MenuWhiteBox>
      </StorySeparator>
    </StoryBackground>
  )
}

export const MenuSwitchStory = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <StoryBackground color={'lightblue'}>
      <StorySeparator>
        <StoryFixedBox width={250}>
          <MenuSwitch active={open} menu={'coloring'} name={'lineColors'} onPress={() => setOpen(!open)} />
        </StoryFixedBox>
      </StorySeparator>
      <StorySeparator>
        <StoryFixedBox width={130}>
          <MenuSwitch active={open} menu={'syllable'} name={'wordColors'} onPress={() => setOpen(!open)} />
        </StoryFixedBox>
      </StorySeparator>
      <StorySeparator>
        <StoryFixedBox width={250}>
          <MenuSwitch menu={'spacing'} />
        </StoryFixedBox>
      </StorySeparator>
    </StoryBackground>
  )
}

export const MenuRadioStory = () => {
  const [active, setActive] = React.useState(0)
  return <StoryFixedBox width={250}>
    <MenuWhiteBox>
      <MenuRadio menu={'fonts'} activeIndex={active} options={['A', 'A', 'A', 'A']} onChange={(_, i) => setActive(i)}/>
      <MenuRadio menu={'spacing'} activeIndex={active} options={['-', '/', '|', '+']} onChange={(_, i) => setActive(i)}/>
    </MenuWhiteBox>
  </StoryFixedBox>
}

export const MenuSliderStory = () => {
  return (
    <StoryBackground>
      <StoryFixedBox width={250}>
        <MenuSlider menu={'interface'}/>
      </StoryFixedBox>
      <StoryFixedBox width={250}>
        <MenuSlider menu={'spacing'}/>
      </StoryFixedBox>
    </StoryBackground>
  )
}

export const MenuSoundStory = () => {
  const [color, setColor] = React.useState()
  return <StoryFixedBox width={150}>
    <MenuSound name={'a'} color={color} setColor={setColor} />
  </StoryFixedBox>
}

export const MenuSoundsStory = () => {
  const [colors, setColors] = React.useState([])
  return <StoryFixedBox width={300}>
    <MenuSounds colors={colors} updateColor={(sound, color) => setColors(current => ({ ...current, [sound]: color }))}/>
  </StoryFixedBox>
}

export const MultipleColorPickerStory = () => {
  const [colors, setColors] = React.useState(['blue', 'red'])
  return (
    <StoryBackground>
      <StorySeparator>
        <StoryFixedBox width={300}>
          <MenuMultipleColorPicker colorSet={colors} updateColorSet={setColors} />
        </StoryFixedBox>
      </StorySeparator>
    </StoryBackground>
  )
}

const StorySeparator = styled.View`
  padding: 10px;
`

const StoryBackground = styled.View`
  background-color: ${props => props.color || 'lightgrey'};
  padding: 10px;
`

const StoryFixedBox = styled.View`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`
