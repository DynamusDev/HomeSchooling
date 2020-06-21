import React from 'react'
import { Animated } from 'react-native'
import { Accordion, MenuWhiteBox, MenuSwitch, MenuRadio, MenuSounds, MenuLabel, MenuMultipleColorPicker } from '../components'
import styled from 'rn-css'
import { translate, getStyle } from '../services'
import { AccessibilityOptions, ColorMode } from '../types'

type AccessibilityProps = {
  options: AccessibilityOptions;
  updateOptions: (updates: AccessibilityOptions) => void;
  name?: 'coloring';
}

const AccessibilityColoring = ({ options, updateOptions }: AccessibilityProps) => {
  const coloringModes: ColorMode[] = ['line', 'word', 'syllable', 'sound']
  const [colorModeIndex, setColorModeIndex] = React.useState(coloringModes.indexOf(options.colorByMode || coloringModes[0]))

  // const initialColorSet = options.colorSet || ['blue', 'red']
  // const updateColorSet = (colorSet: string[]) => updateOptions({ colorSet })

  // const initialsoundsColors = options.soundsColors || {}
  // const updateSoundsColors = (soundsColors: { [sound: string]: string }) => updateOptions({ soundsColors })

  const dividerStyle = getStyle('menusBorder', 'coloring')

  const toggleColorBy = () => {
    const colorByMode = options.colorByMode ? undefined : coloringModes[colorModeIndex]
    updateOptions({ colorByMode })
  }

  const updateMode = (colorByMode: ColorMode) => {
    setColorModeIndex(coloringModes.indexOf(colorByMode))
    updateOptions({ colorByMode })
  }

  const updateSoundColor = React.useCallback((sound: string, color: string) => updateOptions({ soundsColors: { ...(options.soundsColors || {}), [sound]: color } }), [updateOptions])

  const coloringOptions = React.useMemo(() => {
    if (colorModeIndex === coloringModes.indexOf('sound')) {
      return (<>
        <MenuLabel type='boxTitle' content={translate('menus.highlightSounds')!} />
        <MenuSounds colors={options.soundsColors || {}} updateColor={updateSoundColor}/>
      </>)
    } else {
      const name = coloringModes[colorModeIndex] + 'sColors'
      return (
        <MenuWhiteBox>
          <MenuSwitch active={!!options.colorByMode} name={name} menu='coloring' onPress={toggleColorBy} />
          <MenuMultipleColorPicker colorSet={options.colorSet || ['blue', 'red']} updateColorSet={colorSet => updateOptions({ colorSet })}/>
        </MenuWhiteBox>
      )
    }
  }, [options.colorByMode, options.colorSet])

  const active = !!options.colorByMode
  return (
    <Accordion name='coloring' collapsable={false}>
      <SectionRoot>
        <MenuWhiteBox>
          <MenuSwitch active={!!options.colorByMode} name='colorBy' menu='coloring' onPress={toggleColorBy} />
          <MenuRadio options={coloringModes} activeIndex={active ? colorModeIndex : -1} menu='coloring' onChange={updateMode}/>
        </MenuWhiteBox>
        <Divider style={dividerStyle} />
        <Animated.View>
          {coloringOptions}
        </Animated.View>
      </SectionRoot>
    </Accordion>
  )
}

const SectionRoot = styled.View`
  flex: 1
`

const Divider = styled.View`
  border-width: 1px;
  margin: 10px 0;
  flex: 1;
`

export default React.memo(AccessibilityColoring)
