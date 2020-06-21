import React from 'react'
import styled from 'rn-css'

import { Button, MenuButton, NavButton, PurpleButton, Icon, FlatButton } from '../src/components'

export default {
  title: 'Buttons'
}

const Text = styled.Text`
  color: #FFFFFF;
`

export const ButtonStory = () => <Root row>
  <Button name='undo' onPress={() => console.log('pressed')} />
</Root>

ButtonStory.story = {
  name: 'Button'
}

export const MenuButtonStory = () => (
  <Root>
    <MenuButton
      onPress={() => { console.log('pressed') }}
      name='print'
    />
  </Root>
)

export const NavButtonStory = () => (
  <Root>
    <NavButton
      onPress={() => { console.log('pressed') }}
      name='bag'
    />
    <NavButton
      onPress={() => { console.log('pressed') }}
      name='plus'
    />
  </Root>
)

export const PurpleBtn = () => <ul style={{ listStyleType: 'none' }}>
  <li style={{ marginTop: '20px', height: '32px', display: 'flex', alignItems: 'stretch' }}>
    <PurpleButton onPress={() => console.log('pressed')}>
      <Text>Insérer</Text>
      <Icon name="arrowDown" width="1em" height="1em" />
    </PurpleButton>
  </li>
  <li style={{ marginTop: '20px', height: '32px', display: 'flex', alignItems: 'stretch' }}>
    <PurpleButton onPress={() => console.log('pressed')}>
      <Text>Insérer</Text>
    </PurpleButton>
  </li>
  <li style={{ marginTop: '20px', height: '32px', display: 'flex', alignItems: 'stretch' }}>
    <PurpleButton onPress={() => console.log('pressed')}>
      <Icon name="pencil" width="1em" height="1em" />
    </PurpleButton>
  </li>
</ul>

const flatButtonList = [
  'bold', 'italic', 'underline', 'undo', 'redo', 'zoomP', 'zoomM'
]

export const flatButton = () => {
  const [active, setActive] = React.useState(false)
  const updateActive = button => () => button === 'bold' && setActive(!active)
  return (
    <ul style={{
      display: 'flex',
      flexDirection: 'row',
      listStyleType: 'none'
    }}>
      {flatButtonList.map((button, index) => (
        <li
          key={`${button}-${index}`}
          style={{
            height: '32px',
            display: 'flex',
            alignItems: 'stretch'
          }}>
          <FlatButton
            name={button}
            onPress={updateActive(button)}
            active={button === 'bold' && active}
          />
        </li>
      ))}
    </ul>
  )
}

const Root = styled.View`
  padding: 20px;
  background-color: #F1F4F6;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  height: 100vh;
`
