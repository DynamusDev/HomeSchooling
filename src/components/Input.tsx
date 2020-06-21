import React from 'react'
import styled from 'rn-css'
import * as RN from 'react-native'
import { translate, getStyle } from '../services'

const Container = styled.View``

const StyledInput = styled.TextInput`
  font-size: 1.5em;
  outline: none;
  padding: 0.5em 1em;
  border-radius: 1em;
  border-top-width:1px;
  border-left-width:1px;
  border-right-width:1px;
  border-bottom-width:7px;
`
const Label = styled.Text`
  font-size: 2em;
  padding: 0.3em 0;
  font-weight: bold;
`

type InputProps = {
  onChange: (value: string) => void;
  name: string;
  value?: string;
}

const Input = ({ onChange, name, value }: InputProps) => {
  const placeholder = translate('inputs.placeholder.' + name)
  const label = translate('inputs.' + name)
  const style = getStyle('inputs', name)
  return (
    <Container>
      <Label style={style}>{label}</Label>
      <StatefulTextInput style={style} placeholder={placeholder} value={value || ''} onChangeText={onChange} />
    </Container>
  )
}

/** We need to split like this to avoid rerendering bigger components for nothing */
const StatefulTextInput = ({ value, onChangeText, ...props }: RN.TextInputProps) => {
  const [currentValue, setValue] = React.useState(value)
  function handleChange (newValue: string) {
    setValue(newValue)
    onChangeText && onChangeText(newValue)
  }
  return <TextInput {...props} onChangeText={handleChange} value={currentValue} />
}

const TextInput = (props: RN.TextInputProps) => {
  return <StyledInput {...props} />
}

export default React.memo(Input)
