import React from 'react'
import type { Course, Level, AccessibilityOptions } from '../types'

export type Profile = {
  jwt?: string;
  isTeacher?: boolean;
  firstName?: string;
  lastName?: string;
  language?: string;
  theme?: string;
  levels?: { course: Course; level: Level }[];
  accessibility?: AccessibilityOptions;
}

function createProfile (): Profile {
  return {}
}

async function readProfileFromStorage (): Promise<Profile> {
  console.log('profile read', {})
  // TODO: Read the stored profile data from the storage
  return Promise.resolve(createProfile())
}

async function writeProfile (profile: Profile) {
  console.log('profile written', profile)
  // TODO: Store the profile data locally
  return Promise.resolve()
}

async function readProfileFromWeb (jwt: string): Promise<Profile> {
  console.log('profile read from web', jwt)
  // TODO: Request the database for the profile
  return Promise.resolve(createProfile())
}

const useProfile = () => {
  const [profile, setProfile] = React.useState<Profile>(createProfile())
  /** Update the profile with the new data */
  function updateProfile (profileData: Profile) {
    setProfile((p: Profile) => ({ ...p, ...profileData }))
  }
  function logout () {
    setProfile(createProfile())
  }
  React.useEffect(() => { writeProfile(profile) }, [profile])
  React.useEffect(() => {
    async function downloadProfile (jwt: string) {
      const downloadedProfile = await readProfileFromWeb(jwt)
      setProfile((p: Profile) => ({ ...p, ...downloadedProfile }))
    }
    if (profile.jwt) downloadProfile(profile.jwt)
  }, [profile.jwt])
  React.useEffect(() => {
    (async function readProfile () {
      const profile = await readProfileFromStorage()
      setProfile(profile)
    })()
  }, [])

  return { profile, updateProfile, logout }
}

export default useProfile
