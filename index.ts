import { AppRegistry, Platform } from 'react-native'
import App from './src'
import { name as appName } from './app.json'
import './index.css'

AppRegistry.registerComponent(appName, () => App)

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementsByTagName('body')[0]
  })
}
