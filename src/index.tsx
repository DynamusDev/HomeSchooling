import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { ThemeContext, LanguageContext, ProfileContext } from './services/contexts'
import type { Course, Level } from './types'
import Navigation from 'react-unavigation'
import { Login, ProfileTypeSelection, ProfileSelection, CourseSelection, LevelSelection, Notebook } from './screens'
import useProfile from './models/useProfile'

const App = () => {
  const [locale] = RNLocalize.getLocales()
  const [theme, setTheme] = React.useState('default')
  const [language, setLanguage] = React.useState(locale.languageTag)
  const [level, setLevel] = React.useState<Level>()
  const [course, setCourse] = React.useState<Course>()

  const { profile, updateProfile, logout } = useProfile()
  React.useEffect(() => {
    if (profile.theme) setTheme(profile.theme)
    if (profile.language) setLanguage(profile.language)
  }, [profile])

  const active = !profile ? 'login'
    : profile.isTeacher === undefined ? 'isTeacher'
      : (!profile.firstName || !profile.lastName) ? 'profile'
        : !level ? 'level'
          : !course ? 'course'
            : 'notebook'

  return (<ThemeContext.Provider value={{ theme, setTheme }}>
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ProfileContext.Provider value={{ profile, logout }}>
        <Navigation active={active}>
          <Login name='login' setJWT={(jwt: string) => updateProfile({ jwt })} />
          <ProfileTypeSelection name="isTeacher" setTeacher={(isTeacher: boolean) => updateProfile({ isTeacher })} />
          <ProfileSelection name="profile" updateProfile={updateProfile} />
          {profile && profile.isTeacher && <LevelSelection name="level" isTeacher={profile.isTeacher} createdLevels={[]} setLevel={setLevel} setCourse={setCourse} />}
          {level && <CourseSelection name="course" level={level.level} setCourse={setCourse} />}
          {level && course && <Notebook name="notebook" course={course} level={level} />}
        </Navigation>
      </ProfileContext.Provider>
    </LanguageContext.Provider>
  </ThemeContext.Provider>
  )
}

export default App
