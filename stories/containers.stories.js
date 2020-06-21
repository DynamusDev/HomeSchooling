/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import styled from 'rn-css'

import { Header, Aside, Editor, EditorToolbar } from '../src/containers'

const Column = styled.View``
const MediumBlock = styled.View`
  width: 50vw;
  height: 20em;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: red;
`

export default {
  title: 'Containers'
}

export const HeaderStory = () => <Header course={'maths'} menus={['menu']} openChapter={() => {}} setMenu={() => {}} />
export const AsideStory = () => <Column>
  <MediumBlock>
    <Aside show/>
  </MediumBlock>
  <MediumBlock>
    <Aside />
  </MediumBlock>
</Column>
export const EditorStory = () => <Editor url='' />

const actions = ['bold', 'italic', 'underline', 'undo', 'redo', 'zoomP', 'zoomM']
export const EditorToolbarStory = () => <EditorToolbar actions={actions.map(a => ({ name: a, callback: () => console.log('pressed') }))} />
