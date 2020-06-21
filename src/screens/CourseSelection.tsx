import React from 'react'
import styled from 'rn-css'
import type { Course } from '../types'
import { getCourses, getCourseName } from '../services/languageProvider'

const Container = styled.View``

const Button = styled.TouchableOpacity``

const Text = styled.Text``

type CourseSelectionProps = {
  level: number;
  setCourse: (course: Course) => void;
  name: string;
}

const CourseSelection = ({ level, setCourse }: CourseSelectionProps) => {
  const courses = getCourses(level)
  // Names are available with getCourseName from languageProvider
  return <Container>
    {courses.map(course =>
      <Button key={course} onPress={() => setCourse(course)} ><Text>{getCourseName(course)}</Text></Button>
    )}
  </Container>
}

export default CourseSelection
