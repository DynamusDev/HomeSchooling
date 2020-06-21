import React from 'react'
import * as RN from 'react-native'
import styled from 'rn-css'

export type TouchableProps<T extends { color?: string } | {color: string}> = (RN.TouchableOpacityProps & T & { children?: React.ReactNode })

const withMenuColorPicker = <T extends { color?: string } | {color: string}>(TouchableComponent: React.ComponentType<TouchableProps<T>>, onChange: (color: string) => void, colors?: string[]) => ({ color, children, ...props }: TouchableProps<T>) => {
  const ref = React.createRef<RN.TouchableOpacity>()
  const window = RN.Dimensions.get('window')
  const availableColors = colors || ['red', 'blue', 'yellow', 'orange', 'green', 'black', 'cyan', 'purple']

  const [width, setWidth] = React.useState(0)
  const [left, setLeft] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const updateLayout = React.useCallback((e: RN.LayoutChangeEvent) => {
    const newWidth = e.nativeEvent.layout.width
    if (newWidth !== width) setWidth(newWidth)
  }, [])

  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.measure((_x, _y, _width, _height, pageX) => {
        setLeft(pageX < window.width / 2)
      })
    }
  }, [width, ref.current])

  const togglePicker = React.useCallback(() => setOpen(!open), [open])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <TouchableComponent {...props} ref={ref} onPress={togglePicker} onLayout={updateLayout} color={color}>
      {children}
      <PickerContainer left={left} open={open}>
        <Triangle left={left} offset={width / 2} />
        {availableColors.map((c: string) => (
          <ColorChoiceButton
            key={'color-' + c}
            color={c}
            onPress={() => { onChange(c); setOpen(false) }}
            active={c === color}
          >
            <ColorChoice
              color={c}
              active={c === color}
            />
          </ColorChoiceButton>
        ))}
      </PickerContainer>
    </TouchableComponent>
  )
}

const Triangle = styled.View<{left: boolean; offset: number}>`
  position: absolute;
  top: -10px;
  width: 20px;
  height: 20px;
  ${props => props.left ? 'left' : 'right'}: ${props => props.offset}px;
  background-color: white;
  box-shadow: 6px 4px -4px #00000029;
  transform: rotate(45deg);
`

// We need to set the size in px to ensure that the circle will be centered.
const ColorChoice = styled.View<{color: string; active: boolean}>`
  border-radius: 50%;
  background-color: ${props => props.color};
  height: ${props => props.active ? 24 : 30}px;
  width: ${props => props.active ? 24 : 30}px;
  margin: 4px;
  margin-bottom: 3px;
`

const ColorChoiceButton = styled.TouchableOpacity<{active: boolean; color: string}>`
  border-width: ${props => props.active ? 2 : 0}px;
  border-color: ${props => props.color};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`

const PickerContainer = styled.View<{left: boolean; open: boolean}>`
  position: absolute;
  top: 100%;
  padding: 0.2em 0.6em;
  ${props => props.left ? 'left' : 'right'}: -9px;
  display: ${props => props.open ? 'flex' : 'none'};
  background-color: white;
  border-radius: 0.7em;
  margin-top: 15px;
  box-shadow: 0px 0px 6px #00000029;
  align-items: center;
  flex-direction: row;
  z-index: 1000;
`

export default withMenuColorPicker
