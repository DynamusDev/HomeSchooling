import { Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import localforage from 'localforage'

const keyPrefix = '@cantoo:scribe'

function getFullKey (key: string) {
  if (key.startsWith(':') || key.endsWith(':')) key = key.replace(/^[:]+|[:]+$/g, '')

  return `${keyPrefix}:${key}`
}

async function getItem (key: string) {
  const fullKey = getFullKey(key)

  let jsonValue = null
  if (Platform.OS === 'web') jsonValue = await localforage.getItem(fullKey)
  else jsonValue = await AsyncStorage.getItem(fullKey)

  return typeof jsonValue === 'string' && jsonValue !== '' ? JSON.parse(jsonValue) : null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function setItem (key: string, value: any) {
  // TODO validate key

  const fullKey = getFullKey(key)
  const jsonValue = JSON.stringify(value)

  if (Platform.OS === 'web') await localforage.setItem(fullKey, jsonValue)
  else await AsyncStorage.setItem(fullKey, jsonValue)
}

export default { getItem, setItem }
