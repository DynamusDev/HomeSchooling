# Cantoo Scribe

## Design:

### Editor

global: https://xd.adobe.com/view/943a3848-3515-407a-7086-847392972720-e20b/
specs: https://xd.adobe.com/view/943a3848-3515-407a-7086-847392972720-e20b/screen/06cd47bc-88b0-4a59-8add-ae7459edb0fe/Web-1280-1

Password: Cantoo20

### Accessibility

global: https://xd.adobe.com/view/d2d4a995-976f-4f4f-74c5-65c26243ccfe-a4e5/
specs: https://xd.adobe.com/view/d2d4a995-976f-4f4f-74c5-65c26243ccfe-a4e5/screen/5d1d6852-4229-47b1-abb6-16a8a9be35cc/Proposta-de-tela-1

Password: Cantoo20

## Fonts:

We use Nunito.
For compatibility with React-Native, please check: https://stackoverflow.com/questions/38815234/how-to-add-fonts-for-different-font-weights-for-react-native-android-project

## Native development

For now, we don't care about iOS and Android. Focus on web. We will see the rest later.

## Internationalization

You can translate like that:

```javascript
import { translate } from '../services'

translate('namespace.name.id', value1, value2)
```

Sentences like `sentence with {1} and {0}` will become `sentence with value2 and value1`

You can find some data in `./src/services/languageProvider`

## Theming and icons

### Colors and theming

To add new colors to the theme, you should edit: `./src/assets/themes/light.js`

You can use a namespace, a name and the special properties: `active` and `hover` to extend the UI of a component.

Here is an example:

```javascript
module.exports = {
  button: {
    background: [white, white],
    color: '#4D4D4D',
    border: '#4400A8',
    active: {
      border: lightBlue,
    },

    insert: {
      background: ['#6F0094', '#4400A8'],
      color: white,
      active: {
        color: red
      }
    },
  }
}
```

To use your theme as a style, do it like that:

```javascript
function MyStyledComponent() {
  const style = getStyle(namespace, name, active)
  return <View style={style}>...</View>
}
```

For instance, the borderColor of `getStyle('button','insert', true).borderColor` will default to `#4400A8`

Using an array for background color will automatically use a LinearGradient

### Icons

To add new icons to the theme, you should:

 * add en entry to the switch in `loadImage` function.
 * add the image name to the type `ImageType`
 * edit the object `icons` in: `./src/services/imageProvider.tsx`.

This object works like the language. You can map the icons by namespaces and by names.
You can use `default` when you don't want to use a name in the namespace, and `active` to provide a different icon when the component is considered active.

Here is an example:

```javascript
const icons: Icons = {
  buttons: {
    default: 'stuff',
    login: 'login',
    password: 'password',
    active: {
      default: 'activeStuff',
      login: 'activeLogin'
    }
  },
  custom: {
    default: 'stuff'
  }
}
```

Now, to use the icon, do something like:

```javascript
import { Icon } from '../components/Icon'
import { getIcon } from '../services'

...
  const icon = getIcon('namespace', 'name')
  return <Icon name={icon} />
```