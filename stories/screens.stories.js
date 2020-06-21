/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import { CourseSelection, LevelSelection, Login, Notebook, ProfileSelection, ProfileTypeSelection } from '../src/screens'

export default {
  title: 'Screens'
}

export const LoginStory = () => <Login name="login" setProfile={() => {}} />
export const ProfileTypeSelectionStory = () => <ProfileTypeSelection name="isTeacher" setTeacher={() => {}} />
export const ProfileSelectionStory = () => <ProfileSelection name='profile' updateProfile={() => {}} />
export const LevelSelectionStory = () => <LevelSelection isTeacher createdLevels={[]} setLevel={() => {}} />
export const CourseSelectionStory = () => <CourseSelection level={0} setCourse={() => {}}/>
export const NotebookStory = () => <Notebook course={'maths'} />
