import React from 'react'
import RN from 'react-native'
import styled from 'rn-css'
import type { Action, ToggleAction, SelectAction } from '../types'
import EditorToolbar, { ToolbarAction, InsertAction } from './EditorToolbar'
import { useChapter } from '../models'
const Container = styled.View``

const EditorView = styled.View<{zoom: number}>`
  font-size: ${({ zoom }) => (1 + zoom * zoom * 0.18 + zoom * 0.22)}em
`

const Text = styled.Text``

type Alignment = 'left' | 'right' | 'center' | 'justify'

type EditorProps = {
  url: string;
}

const Editor = ({ url }: EditorProps) => {
  const [inputStyle, setInputStyle] = React.useState<RN.TextStyle>({})
  const [zoom, setZoom] = React.useState(0)
  const { updateContent, htmlContent } = useChapter(url, () => console.log('file saved'))
  console.log(updateContent)
  // TODO find how we will get the current editor content to put it into a file
  // TODO display something while loading
  const boldAction: ToggleAction & ToolbarAction = {
    name: 'bold',
    callback: () => setInputStyle((inputStyle: RN.TextStyle) => ({
      ...inputStyle,
      fontWeight: inputStyle.fontWeight === 'bold' ? 'normal' : 'bold'
    })),
    active: false
  }

  const italicAction: ToggleAction & ToolbarAction = {
    name: 'italic',
    callback: () => setInputStyle((inputStyle: RN.TextStyle) => ({
      ...inputStyle,
      fontStyle: inputStyle.fontStyle === 'italic' ? 'normal' : 'italic'
    })),
    active: false
  }

  const underlineAction: ToggleAction & ToolbarAction = {
    name: 'underline',
    callback: () => setInputStyle((inputStyle: RN.TextStyle) => ({
      ...inputStyle,
      textDecorationLine: inputStyle.textDecorationLine === 'underline' ? 'none' : 'underline'
    })),
    active: false
  }

  const alignmentAction: SelectAction<Alignment> & ToolbarAction = {
    name: 'alignment',
    callback: (option: Alignment) => setInputStyle((inputStyle: RN.TextStyle) => ({
      ...inputStyle,
      textAlign: option
    })),
    options: ['left', 'right', 'center', 'justify']
  }

  const undoAction: Action & ToolbarAction = {
    name: 'undo',
    callback: () => { console.log('undo') }// TODO
  }

  const redoAction: Action & ToolbarAction = {
    name: 'redo',
    callback: () => { console.log('undo') }// TODO
  }

  const zoomInAction: Action & ToolbarAction = {
    name: 'zoomIn',
    callback: () => setZoom(zoom => Math.min(zoom + 1, 10)),
    enabled: zoom === 10
  }

  const zoomOutAction: Action & ToolbarAction = {
    name: 'zoomOut',
    callback: () => setZoom(zoom => Math.max(zoom - 1, -3)),
    enabled: zoom === -3
  }

  const colorAction: Action & ToolbarAction = {
    name: 'color',
    callback: () => {} // TODO: Display foreground / background selection frame
  }

  const presetAction: SelectAction<RN.TextStyle> & ToolbarAction = {
    name: 'fontPreset',
    callback: (choice: RN.TextStyle) => setInputStyle(choice),
    options: [
      { fontSize: 24, fontWeight: 'bold', textDecorationLine: 'underline' },
      { fontSize: 18, fontWeight: 'bold', textDecorationLine: 'none' },
      { fontSize: 16, fontWeight: 'normal', textDecorationLine: 'underline' },
      { fontSize: 14, fontWeight: 'bold', textDecorationLine: 'none' },
      { fontSize: 12, fontWeight: 'normal', textDecorationLine: 'none' }
    ]
  }

  const textActions = [
    [presetAction, colorAction, boldAction, italicAction, underlineAction, alignmentAction],
    [zoomInAction, zoomOutAction, undoAction, redoAction]
  ]

  // TODO: implement the insert actions
  const insertActions: InsertAction[] = [
    { name: 'image', callback: () => {} },
    { name: 'file', callback: () => {} },
    { name: 'audio', callback: () => {} },
    { name: 'formula', callback: () => {} },
    { name: 'screenshot', callback: () => {} }
  ]

  return (
    <Container>
      <EditorToolbar textActions={textActions} insertActions={insertActions} />
      <Text style={inputStyle}>Demo editor</Text>
      <EditorView zoom={zoom}>{htmlContent}</EditorView>
    </Container>
  )
}

export default Editor
