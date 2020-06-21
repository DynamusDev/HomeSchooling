import React, { useState } from 'react'
import styled from 'rn-css'
import { Icon, MenuLabel } from '.'
import { MenuName, AccessibilityMenu } from '../types'
import { translate, getStyle, getIcon, getThemeForElement } from '../services'

export interface AccordionProps {
  name: MenuName | AccessibilityMenu;
  children: React.ReactNode;
  collapsable: boolean;
}

const Accordion = ({ children, name, collapsable }: AccordionProps) => {
  const [open, setOpen] = useState<boolean>(true)
  const text = translate('menus.' + name)
  const icon = getIcon('menus', name)

  const buttonStyle = getStyle('menusBorder', name, true)
  const contentStyle = getStyle('menusBackground', name)
  const { border } = getThemeForElement('menusBorder', name, true)

  const height = open ? 'auto' : '0'
  const bottomRadius = open ? 8 : 0

  return (
    <AccordionRoot>
      <AccordionButton
        disabled={!collapsable}
        style={buttonStyle}
        onPress={() => { setOpen(!open) }}
      >
        <Row grow>
          {icon && <SectionIcon name={icon} width={'2em'} height={'2em'}/>}
          <MenuLabel type='sectionTitle' content={text!} />
        </Row>
        {collapsable && <Row>
          <Chevron color={border!} />
        </Row>}
      </AccordionButton>
      {/* TODO: Add transition */}
      {open && <AccordionContent
        style={contentStyle}
        bottomRadius={collapsable ? bottomRadius : 0}
        height={height}
      >
        {children}
      </AccordionContent>}
    </AccordionRoot>
  )
}

const AccordionRoot = styled.View`
`

const SectionIcon = styled(Icon)`
  margin-right: 1em;
`

const AccordionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  border-bottom-width: 5px;
`

const Row = styled.View<{grow?: boolean}>`
  flex-direction: row;
  align-items: center;
  flex-grow: ${props => props.grow ? 1 : 0};
`

const Chevron = styled.View<{color: string}>`
  width: 0px;
  height: 0px;

  border-radius: 5px;

  border-right-style: solid;
  border-right-color: transparent;
  border-right-width: 10px;

  border-left-style: solid;
  border-left-color: transparent;
  border-left-width: 10px;

  border-top-style: solid;
  border-top-color: ${props => props.color};
  border-top-width: 10px;
`

const AccordionContent = styled.View<{height: string; bottomRadius: number}>`
  height: ${props => props.height};
  overflow: hidden;
  border-bottom-left-radius: ${props => props.bottomRadius};
  border-bottom-right-radius: ${props => props.bottomRadius};
  flex-direction: row;
  padding: 10px;
`

export default React.memo(Accordion)
