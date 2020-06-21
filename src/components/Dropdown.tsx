import React from 'react'
import styled from 'rn-css'

const Container = styled.View`

`

const ItemView = styled.TouchableHighlight`
  background-color: white;
  cursor: pointer;
`

const CurrentValue = styled.TouchableHighlight`
  cursor: pointer;
`

const Options = styled.FlatList`
  position: absolute;
  top: 100%;
  z-index: 1;
`

type ItemProps<T> = {
  renderItem: (data: { value: T; hover: boolean; active: boolean }) => React.ReactElement;
  value: T;
  active: boolean;
  onPress: () => void;
}

const Item = <T, >({ renderItem, value, active, onPress }: ItemProps<T>) => {
  const [hover, setHover] = React.useState(false)
  return (<ItemView
    onPress={onPress}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
    {renderItem({ value, hover, active })}
  </ItemView>)
}

type DropdownProps<T> = {
  renderCurrent: (data: { hover: boolean; value: T }) => React.ReactElement;
  renderItem: (data: { value: T; hover: boolean; active: boolean }) => React.ReactElement;
  initialIndex?: number;
  options: T[];
  onChange: (value: T, index: number) => void;
  ListFooterComponent?: React.ReactElement;
}

const Dropdown = <T, >({ renderCurrent, renderItem, initialIndex = 0, options, onChange, ListFooterComponent }: DropdownProps<T>) => {
  const [activeIndex, setActive] = React.useState(initialIndex)
  const [show, setShow] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  const select = (index: number) => {
    setActive(index)
    onChange(options[index], index)
    setShow(false)
  }
  return (<Container>
    <CurrentValue
      onPress={() => setShow(!show)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {renderCurrent({ hover, value: options[activeIndex] })}
    </CurrentValue>
    {show && (<Options
      data={options}
      keyExtractor={(_item: T, index: number) => 'dropdown-option-' + index}
      renderItem={({ item, index }: ({ item: T; index: number })) => <Item renderItem={renderItem} value={item} active={index === activeIndex} onPress={() => select(index)} />}
      ListFooterComponent={ListFooterComponent}
    />)}
  </Container>
  )
}

export default Dropdown
