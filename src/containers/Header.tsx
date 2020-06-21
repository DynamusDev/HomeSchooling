import React from 'react'
import styled from 'rn-css'
import { Button, Dropdown } from '../components'
import { getNotebooks } from '../services/languageProvider'
import type { Course, Level } from '../types'
import { useBook } from '../models'

const Container = styled.View``

const Text = styled.Text``

type HeaderProps = {
  openChapter: (url: string) => void;
  setMenu: (menu: string) => void;
  menus: string[];
  level: Level;
  course: Course;
}

const Header = ({ openChapter, level, course, setMenu, menus }: HeaderProps) => {
  const notebooks = getNotebooks(course)
  const defaultRender = ({ value }: { value: string}) => <Text>{value}</Text>
  // TODO : handle chapter creation when no chapter in the book
  // TODO : Changing notebook should change chapter
  const [notebook, setNotebook] = React.useState(notebooks[0])
  const [chapter, setChapter] = React.useState(0)
  const bookUrl = 'book url from ' + notebook + ' ' + level.level
  // TODO : handle [not saved / saving / saved / save failed] states
  console.log(chapter, bookUrl)
  // TODO: handle errors
  const { chaptersNames, chaptersURL /* createChapter, deleteChapter, updateChapter */ } = useBook(bookUrl)
  React.useEffect(() => setChapter(chaptersURL.length - 1), [chaptersURL])
  React.useEffect(() => openChapter(chaptersURL[chapter]), [chaptersURL, chapter])

  return <Container>
    <Text>Logo</Text>
    <Text>{course} logo</Text>
    <Dropdown renderItem={defaultRender} renderCurrent={defaultRender} options={notebooks} onChange={setNotebook} />
    <Dropdown renderItem={defaultRender} initialIndex={chapter} renderCurrent={defaultRender} options={chaptersNames} onChange={(_name: string, index: number) => setChapter(index)} />
    {menus.map(menu => <Button key={menu} name={menu} onPress={() => setMenu(menu)} />)}
  </Container>
}

export default Header
