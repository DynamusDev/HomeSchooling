import React, { useState, useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import styled from 'rn-css'

import { getStyle } from '../services'

const Content = styled(Animated.View)`
  position: absolute;
  height: 100%;
`

type AsideProps = {
  show: boolean;
  children: React.ReactNode;
}

const Aside = ({ show, children }: AsideProps) => {
  const { width } = Dimensions.get('window')
  const asideWidth = width / 6
  const [right] = useState(new Animated.Value(-asideWidth))

  useEffect(() => {
    if (show) {
      Animated.timing(right, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(right, {
        toValue: -asideWidth,
        duration: 200,
        useNativeDriver: true
      }).start()
    }
  }, [show])

  const contentStyle = [
    getStyle('container', 'aside'),
    { width: asideWidth, right }
  ]
  return (
    <Content style={contentStyle}>
      {children}
    </Content>
  )
}

export default React.memo(Aside)
