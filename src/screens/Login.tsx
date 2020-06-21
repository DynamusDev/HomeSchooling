import React from 'react'
import styled from 'rn-css'
import { Button, Input } from '../components'

const Container = styled.View``

type LoginProps = {
  setJWT: (jwt: string) => void;
  name: string;
}

async function login (pseudo: string, password: string) {
  console.log('login', pseudo, password)
  // TODO: login request
  return Promise.resolve('jwt')
}

const Login = ({ setJWT }: LoginProps) => {
  const pseudo = React.useRef('')
  const password = React.useRef('')
  // TODO : handle loading
  const connect = async () => {
    const jwt = await login(pseudo.current, password.current)
    // TODO : handle errors
    setJWT(jwt)
  }
  // TODO : handle register
  return <Container>
    <Input name={'pseudo'} value={pseudo.current} onChange={value => (pseudo.current = value)}/>
    <Input name={'password'} value={password.current} onChange={value => (password.current = value)} />
    <Button name={'login'} onPress={connect} />
  </Container>
}

export default Login
