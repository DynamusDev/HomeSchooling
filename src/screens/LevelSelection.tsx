// Techers should select or create : level + classname + course
// Pupils should select or create : level + classname
import React from 'react'
import styled from 'rn-css'
import { Button, Input, Dropdown } from '../components'
import type { Level, Course } from '../types'
import { getLevelName, getCourseName, getCycles, getCycleLevels, getCycleStart, getCourses } from '../services/languageProvider'

const Container = styled.View``

const Select = styled.TouchableOpacity``

const Text = styled.Text``

type LevelSelectionProps = {
  isTeacher: boolean;
  createdLevels: { course: Course; level: Level }[];
  setLevel: (level: Level) => void;
  setCourse: (course: Course) => void;
  name: string;
}

const LevelSelection = ({ isTeacher, createdLevels, setLevel, setCourse }: LevelSelectionProps) => {
  const className = React.useRef('')
  const [cycle, setCycle] = React.useState<string | undefined>()
  const level = React.useRef(0)
  const course = React.useRef<Course>()
  const defaultRender = ({ value }: { value: string | Course}) => <Text>{value}</Text>
  function changeCycle (value: string) {
    const cycle = value
    setCycle(cycle)
    level.current = getCycleStart(cycle)
  }
  function createLevel (level: Level, course?: Course) {
    // TODO: save created levels both locally and remotely
    setLevel(level)
    if (course) setCourse(course)
  }
  return <Container>
    {/* Here, we select a level among a list */}
    <Container>
      {createdLevels.map(({ level, course }, i) =>
        <Select key={i} onPress={() => setLevel(level)}>
          <Text>{getLevelName(level.level)}</Text>
          {course && <Text>{getCourseName(course)}</Text>}
          {level.className && <Text>{level.className}</Text>}
        </Select>
      )}
    </Container>
    {/* Here, we create a new level */}
    <Container>
      <Text>Create a new level</Text>
      <Input value={className.current} name="className" onChange={value => (className.current = value)} />
      <Dropdown renderCurrent={defaultRender} renderItem={defaultRender} options={getCycles()} onChange={changeCycle}/>
      {cycle && <Dropdown renderCurrent={defaultRender} renderItem={defaultRender} options={getCycleLevels(cycle)} onChange={(_value, index) => (level.current = getCycleStart(cycle) + index)}/>}
      {/* use getCourseName from languageProvider to get the course name */}
      {isTeacher && <Dropdown renderCurrent={defaultRender} renderItem={defaultRender} options={getCourses(level.current)} onChange={value => (course.current = value)}/>}
      <Button name="create-level" onPress={() => createLevel({ level: level.current, className: className.current }, course.current)}/>
    </Container>
  </Container>
}

export default LevelSelection
