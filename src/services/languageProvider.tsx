// TODO: should probably use useContext to respect React workflow
import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { LanguageContext } from './contexts'
import { merge } from '../utils'
import { Course } from '../types'

type Language = {
  [namespace: string]: {
    [name: string]: string | {
      [id: string]: string;
    };
  };
} & {
  cycles: { [name: string]: [number, number] };
  courses: { [name: string]: string[] };
  materia: { [name: string]: string };
  notebooks: { [name: string]: string[] };
};

// Available languages
type AvailableLanguage = 'default' | 'en' | 'en-EN' | 'en-US' | 'fr' | 'fr-FR' | 'fr-BE'
type LanguageTag = 'fr' | 'en'
const languages: { [x in AvailableLanguage]: LanguageTag} = {
  default: 'en',
  en: 'en',
  'en-EN': 'en',
  'en-US': 'en',
  fr: 'fr',
  'fr-FR': 'fr',
  'fr-BE': 'fr'
}
export const availableLanguages = Object.keys(languages).filter(l => l !== 'default')

// Initialization
let language: Language = {} as Language
const [locale] = RNLocalize.getLocales()
loadLanguage(locale.languageTag as AvailableLanguage)

export default function getLanguage () { return language }

function loadLanguage (name: AvailableLanguage) {
  function readLanguage (name: AvailableLanguage): Language {
    const [tag] = name.split('-')
    const languageName = languages[name] || languages[tag as AvailableLanguage] || languages.default
    switch (languageName) {
      case 'fr': return require('../assets/languages/fr.json')
      case 'en': return require('../assets/languages/en.json')
      default : return readLanguage('default')
    }
  }
  language = merge(language, readLanguage('default')) // Clear the previous language
  if (languages[name] === languages.default) return
  language = merge(language, readLanguage(name))
}

/** Return the name of the language in the available languages list */
export function getLanguageName (): AvailableLanguage {
  return React.useContext(LanguageContext).language as AvailableLanguage || 'en-us'
}
/** Return the real language tag the language name was mapped to */
export function getLanguageTag (): LanguageTag {
  return languages[getLanguageTag()] || 'en'
}
export function setLanguage (name: AvailableLanguage) {
  loadLanguage(name)
  React.useContext(LanguageContext).setLanguage(name)
}

export function translate (key: string, ...values: (string | number | undefined)[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function lookKey (object: { [x: string]: any }, key: string) {
    return object ? key ? object[key] : object : undefined
  }
  const keys = key.split('.')
  const translation = keys.reduce((object, key) => lookKey(object, key), language) as unknown as (string | undefined)
  if (!translation) return translation
  // We replace the placeholders in the current translation by the provided values
  return translation.replace(/{(\d+)}/g, (_match, index) => values[index - 1] + '')
}

/** Get the list of the cycles in the current country */
export function getCycles () {
  return Object.keys(language.cycles)
}

/** Get the levels belonging to a cycle */
export function getCycleLevels (cycleName: string) {
  const [start, end] = language.cycles[cycleName]
  const levels = Object.keys(language.courses).slice(start, end + 1)
  return levels
}

/** Get the courses received within a class */
export function getCourses (level: number): Course[] {
  return Object.values(language.courses)[level] as Course[]
}

export function getLevelName (level: number): string {
  return Object.keys(language.courses)[level]
}

/** Transform the course id into their names */
export function getCourseName (course: Course) {
  return language.materia[course]
}

/** Returns the level index at which the cycle starts (starts at 0) */
export function getCycleStart (cycle: string) {
  return language.cycles[cycle][0]
}

/** Returns the notebooks needed for the specified course */
export function getNotebooks (course: Course) {
  return language.notebooks[course]
}
