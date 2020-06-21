import React from 'react'
import MenuButton from './MenuButton'
import { Accordion } from '.'
import { MenuName, Action, MenuButton as MenuButtonName } from '../types'

export interface MenuSectionProps {
  actions?: Action[];
  name: MenuName;
}

const MenuSection = ({ actions, name }: MenuSectionProps) => {
  return (
    <Accordion name={name} collapsable={true}>
      {actions && actions.map(({ name, callback }, index) => {
        return (
          <MenuButton
            key={index}
            onPress={callback}
            name={name as MenuButtonName}
          />
        )
      })}
    </Accordion>
  )
}

export default MenuSection
