import React from 'react'
import styled from 'rn-css'
import MenuSection, { MenuSectionProps } from '../components/MenuSection'

export interface MenuProps {
  sections: MenuSectionProps[];
}

const Menu = ({ sections }: MenuProps) => {
  return (
    <MenuRoot>
      {sections.map(({ actions, name }, index) => {
        return (
          <MenuSection
            key={index}
            actions={actions}
            name={name}
          />
        )
      })}
    </MenuRoot>
  )
}

const MenuRoot = styled.View`
`

export default React.memo(Menu)
