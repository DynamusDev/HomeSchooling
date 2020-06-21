import React from 'react'
import styled from 'rn-css'
import type { Action/*, ToggleAction, SelectAction */ } from '../types'
import { FlatButton, Dropdown, Button } from '../components'
import { getStyle } from '../services'
import { Text } from 'react-native'

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const ActionsGroup = styled.View`
  flex-direction: row;
`

export type ToolbarAction = Action & {
  name: 'fontPreset' | 'bold' | 'italic' | 'underline' | 'undo' | 'redo' | 'alignment' | 'color' | 'zoomIn' | 'zoomOut' | 'expand' | 'insert';
}

export type InsertAction = Action & {
  name: 'image' | 'file' | 'audio' | 'formula' | 'screenshot';
}

type EditorToolbarProps = {
  textActions: ToolbarAction[][];
  insertActions: InsertAction[];
}

const EditorToolbar = ({ textActions, insertActions }: EditorToolbarProps) => {
  const [expand, setExpandTools] = React.useState(false)
  const dividerStyle = getStyle('container', 'divider')
  // TODO: use the correct component instead of default Dropdown engine
  const defaultRender = ({ value }: { value: Action}) => <Text>{value.name}</Text>
  return <Container>
    <ActionsGroup>
      {expand ? textActions.map((actionGroup: ToolbarAction[], index: number): React.ReactNode => (
        <ActionsGroup key={'row' + index}>
          {actionGroup.map((action: ToolbarAction) => {
            // TODO: handle each possible name in the Action list to match the correct component
            if (['undo', 'redo', 'bold', 'italic', 'underline', 'zoomP', 'zoomM'].includes(action.name)) {
              return <FlatButton key={action.name} name={action.name as 'bold' | 'italic' | 'underline' | 'undo' | 'redo' | 'zoomP' | 'zoomM'} onPress={action.callback} />
            } else return <Button key={action.name} name={action.name} onPress={action.callback} />
          })}
        </ActionsGroup>
      )).reduce((prev, curr, i) => [prev, <Divider style={dividerStyle} row key={i} />, curr]) : null}
    </ActionsGroup>
    <ActionsGroup>
      <Button name={'expand'} onPress={() => setExpandTools(expand => !expand)} />
      <Dropdown renderCurrent={defaultRender} renderItem={defaultRender} options={insertActions} onChange={(action: Action) => action.callback()}/>
    </ActionsGroup>
  </Container>
}

const Divider = styled.View<{row?: boolean}>`
  border-width: 1;
  margin: ${props => props.row ? '0 5px' : '5px 0'};
`

export default EditorToolbar
