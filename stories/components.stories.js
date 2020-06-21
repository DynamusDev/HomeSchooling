import React from 'react'
import styled from 'rn-css'

import { Input, Dropdown, Icon, withColorPicker, ColorCircle, ColorDropdown } from '../src/components'

const Text = styled.Text`
  color: #FFFFFF;
`

export default {
  title: 'Components'
}

// eslint-disable-next-line react/prop-types
const defaultRender = ({ value }) => <Text>{value}</Text>
export const IconStory = () => <Icon name='undo' width='10vw' height='10vw' />
export const InputStory = () => <Input name='login' onChange={value => console.log('value changed:', value)} />
export const DropdownStory = () => <Dropdown renderCurrent={defaultRender} renderItem={defaultRender} options={['value1', 'value2', 'value3']} onChange={value => console.log('value changed:', value)} ListFooterComponent={<Text>ListFooter on here</Text>} />

export const MenuColorPickerStory = () => {
  const [activeColor, setActiveColor] = React.useState('#DE3758')
  const colorChoices = ['#DE3758', '#752E7F', '#3699E0', '#4DAF98', '#F2C746', '#E64531']

  const ColorPicker = React.useMemo(() => withColorPicker(ColorCircle, setActiveColor, colorChoices), [])
  const ColorPicker2 = React.useMemo(() => withColorPicker(ColorDropdown, setActiveColor, colorChoices), [])

  return (
    <StoryBackground>
      <StorySeparator>
        <ColorPicker color={activeColor} />
      </StorySeparator>
      <StorySeparator style={{ alignItems: 'flex-end' }}>
        <ColorPicker2 color={activeColor} />
      </StorySeparator>
      <StorySeparator >
        <StoryFixedBox width={200}>
          <ColorPicker2 color={activeColor} />
        </StoryFixedBox>
      </StorySeparator>
      <StorySeparator style={{ alignItems: 'flex-end' }}>
        <StoryFixedBox width={150}>
          <ColorPicker color={activeColor} />
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
