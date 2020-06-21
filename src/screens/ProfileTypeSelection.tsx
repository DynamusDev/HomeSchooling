import React from 'react'
import styled from 'rn-css'
import { Button } from '../components'

const Container = styled.View``

type TypeSelectionProps = {
  setTeacher: (teacher: boolean) => void;
  name: string;
}

const TypeSelection = ({ setTeacher }: TypeSelectionProps) => {
  return <Container>
    <Button name='teacher' onPress={() => setTeacher(true)} />
    <Button name='pupil' onPress={() => setTeacher(false)} />
  </Container>
}

export default TypeSelection
