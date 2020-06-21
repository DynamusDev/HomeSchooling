import React from 'react'
import styled from 'rn-css'
import { MenuLabel, ModalCard, Input } from '../components'
import { translate, getStyle } from '../services'

const Container = styled.View``

const CardView = styled.View`
  height: 200px;
  width: 100%;
  flex-direction: row;
`

const Separate = styled.View`
  width: 24px;
  height:20px;
`

const SeparateButton = styled.View`
  width: 24px;
  height:24px;
`

const Page = styled.View`
  height: 809px;
  width: 726px;
  border-radius: 20px;
  padding: 45px;
`
const QuestionView = styled.View`
  height:83px;
  flex-direction:row;
  align-items: center;
`
const ButtonView = styled.View`
  height: 48px;
  flex-direction: row;
  align-items:center;
`
const Button = styled.TouchableOpacity`
/*Temporary button while the green one is not finished, please delete this button  when the green one is available */
  height:48px;
  width: 108px;
  background: #008000;
`

const EnterText = styled.Text`
  font-size: 20px;
  margin-left: 20px;
`

const NumberView = styled.View`
  height: 32px;
  width: 32px;
  background-color: #2469C4;
  border-radius:50px;
  align-items:center;
  justify-content:center;
`
const Number = styled.Text`
  font-size:18px;
`

const Question = styled.Text`
  font-size:24px;
  margin-left:8px;
`

const ModalNotebook = () => {
  const question = translate('modalNotebook.question')
  const enterText = translate('modalNotebook.enterText')
  const enterStyle = getStyle('modalNotebook', 'enterText', true)
  const numberStyle = getStyle('modalNotebook', 'number', true)
  const questionStyle = getStyle('modalNotebook', 'question', true)

  return (
    <Container>
      <Page>
        <MenuLabel type="boxTitle" style={{ marginBottom: 12 }} content={ translate('modalNotebook.hello')}/>
        <MenuLabel type="sectionTitle" style={{ marginBottom: 33 }} content={ translate('modalNotebook.welcome')}/>

        <QuestionView>
          <NumberView>
            <Number style={numberStyle}>1</Number>
          </NumberView>
          <Question style={questionStyle}>{question}</Question>
        </QuestionView>

        <CardView>
          <ModalCard name="teacher" />
          <Separate/>
          <ModalCard name="pupil" />
        </CardView>

        <Separate/>
        <Input name="fullName" onChange={value => console.log('value changed:', value)}/>
        <SeparateButton/>
        <ButtonView>
          <Button/>
          <EnterText style={enterStyle}>{enterText}</EnterText>
        </ButtonView>
      </Page>
    </Container>
  )
}

export default ModalNotebook
