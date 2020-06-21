import React from 'react'
import styled from 'rn-css'
import { Input, Button } from '../components'

const Container = styled.View``

type ProfileSelectionProps = {
  updateProfile: (infos: {firstName: string; lastName: string}) => void;
  name: string;
}

const ProfileSelection = ({ updateProfile }: ProfileSelectionProps) => {
  const firstName = React.useRef('')
  const lastName = React.useRef('')
  return <Container>
    {/* TODO: change focus on enter */}
    <Input name='firstname' value={firstName.current} onChange={value => (firstName.current = value)} />
    <Input name='lastname' value={lastName.current} onChange={value => (lastName.current = value)} />
    {/* TODO: prevent empty */}
    <Button name='validate' onPress={() => updateProfile({ firstName: firstName.current, lastName: lastName.current })} />
  </Container>
}

export default ProfileSelection
