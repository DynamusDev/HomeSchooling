import React from 'react'
import styled from 'rn-css'
import { Aside, Header, Editor } from '../containers'
import type { Course, Level } from '../types'

const Container = styled.View``

const Text = styled.Text``

type NotebookProps = {
  level: Level;
  course: Course;
  name: string;
}

const Notebook = ({ level, course }: NotebookProps) => {
  const menus = ['menu', 'accessibility']

  const [menu, setMenu] = React.useState<string>()
  const [chapterURL, setChapterURL] = React.useState<string>()

  return <Container>
    <Header menus={menus} openChapter={setChapterURL} level={level} course={course} setMenu={setMenu} />
    <Aside show={menu !== undefined}>
      <Text>${menu}</Text>
    </Aside>
    {chapterURL && <Editor url={chapterURL} />}
  </Container>
}

export default Notebook
