import * as React from 'react'
import * as RN from 'react-native'
import { SvgXml } from 'react-native-svg'

type Props = RN.TextProps & {
  svg: string;
  width: string | number;
  height: string | number;
}

const SVG = React.forwardRef<RN.View | React.FunctionComponent, Props>(({ svg, width = '100%', height = '100%', style, ...props }: Props, ref) => {
  const flatStyle = RN.StyleSheet.flatten(style)
  const color = flatStyle && flatStyle.color
  if (color) {
    svg = svg.replace(/<svg([^>]*?)( stroke=['"](.*?)['"])(.*?)>/mgsi, "<svg$1 stroke='" + color + "'$4>")
    svg = svg.replace(/<svg([^>]*?)( fill=['"](.*?)['"])(.*?)>/mgsi, "<svg$1 fill='" + color + "'$4>")
  }
  if (RN.Platform.OS !== 'web') return <SvgXml xml={svg} width={width} height={height}/>
  const svgRef = (ref || React.createRef<RN.View>()) as React.MutableRefObject<RN.View>
  React.useLayoutEffect(() => {
    if (!svgRef.current) return
    (svgRef.current as unknown as HTMLDivElement).innerHTML = svg
  }, [svg, svgRef.current])

  return require('react-native-web').unstable_createElement('div', {
    ref: svgRef,
    style: [style, { width, height }],
    ...props
  })
})

SVG.displayName = 'SVG'
export default React.memo(SVG, (oldProps, newProps) => JSON.stringify(oldProps) === JSON.stringify(newProps))
