import React from 'react'
import { Image, ImageStyle, View } from 'react-native'
import type { ImageName } from '../services/imageProvider'

import { getImage } from '../services'

type IconProps = {
  name: ImageName;
  resizeMode?: 'contain' | 'cover' | 'repeat' | 'stretch' | 'center';
  width?: string;
  height?: string;
  style?: ImageStyle;
}

const Icon = ({ style: s, name, resizeMode = 'contain', width = '100%', height = '100%' }: IconProps) => {
  const image = getImage(name)
  return (image ? <View style={[s, { width, height }]}>
    <Image
      source={image}
      resizeMode={resizeMode}
      style={{
        width: '100%',
        height: '100%'
      }}
    />
  </View>
    : null)
}

const Memo = React.memo(Icon, (oldProps, newProps) => JSON.stringify(oldProps) === JSON.stringify(newProps))

export default Memo
