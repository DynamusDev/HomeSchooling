export type Sound = 'a'|'b'|'d'|'ə'|'e'|'ε'|'f'|'g'|'i'|'ks'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'r'|'y'|'v'|'z'|'ʒ'|'s'|'t'|'ʃ'|'ɲ'|'ã'|'ɛ̃'|'ɔ̃'|'u'|'w'

export default function getSound (name: Sound) {
  switch (name) {
    case 'a': return require('../assets/sounds/a.mp3')
    case 'b': return require('../assets/sounds/b.mp3')
    case 'd': return require('../assets/sounds/d.mp3')
    case 'ə': return require('../assets/sounds/eee.mp3')
    case 'e': return require('../assets/sounds/e.mp3')
    case 'ε': return require('../assets/sounds/ee.mp3')
    case 'f': return require('../assets/sounds/f.mp3')
    case 'g': return require('../assets/sounds/g.mp3')
    case 'i': return require('../assets/sounds/i.mp3')
    case 'ks': return require('../assets/sounds/ks.mp3')
    case 'j': return require('../assets/sounds/j.mp3')
    case 'k': return require('../assets/sounds/k.mp3')
    case 'l': return require('../assets/sounds/l.mp3')
    case 'm': return require('../assets/sounds/m.mp3')
    case 'n': return require('../assets/sounds/n.mp3')
    case 'o': return require('../assets/sounds/o.mp3')
    case 'p': return require('../assets/sounds/p.mp3')
    case 'r': return require('../assets/sounds/r.mp3')
    case 'y': return require('../assets/sounds/y.mp3')
    case 'v': return require('../assets/sounds/v.mp3')
    case 'z': return require('../assets/sounds/z.mp3')
    case 'ʒ': return require('../assets/sounds/ji.mp4')
    case 's': return require('../assets/sounds/s.mp3')
    case 't': return require('../assets/sounds/t.mp3')
    case 'ʃ': return require('../assets/sounds/ch.mp4')
    case 'ɲ': return require('../assets/sounds/gni.mp3')
    case 'ã': return require('../assets/sounds/an.mp3')
    case 'ɛ̃': return require('../assets/sounds/un.mp3')
    case 'ɔ̃': return require('../assets/sounds/on.mp3')
    case 'u': return require('../assets/sounds/u.mp3')
    case 'w': return require('../assets/sounds/w.mp3')
  }
}

export const availableSounds: Sound[] = [
  'a',
  'b',
  'd',
  'ə',
  'e',
  'ε',
  'f',
  'g',
  'i',
  'ks',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'r',
  'y',
  'v',
  'z',
  'ʒ',
  's',
  't',
  'ʃ',
  'ɲ',
  'ã',
  'ɛ̃',
  'ɔ̃',
  'u',
  'w'
]
