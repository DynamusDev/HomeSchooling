/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { ImageSourcePropType } from 'react-native'

export type ImageName = 'accessibility'
  | 'about'
  | 'alignLeft'
  | 'alignRight'
  | 'alignCenter'
  | 'alignJustify'
  | 'arrowDown'
  | 'ask'
  | 'attachment'
  | 'bag'
  | 'check'
  | 'coloring'
  | 'crossGrey'
  | 'edition'
  | 'export'
  | 'fonts'
  | 'formula'
  | 'greenNotebook'
  | 'help'
  | 'image'
  | 'language'
  | 'link'
  | 'loadNotebook'
  | 'logo'
  | 'mathmlconversion'
  | 'maths'
  | 'menu'
  | 'mic'
  | 'newNotebook'
  | 'notebook'
  | 'options'
  | 'pageDisplay'
  | 'paint'
  | 'pencil'
  | 'picker'
  | 'plus'
  | 'plusPaint'
  | 'print'
  | 'redo'
  | 'save'
  | 'screenshot'
  | 'spacing'
  | 'speaker'
  | 'svgconversion'
  | 'syllable'
  | 'text'
  | 'themedisplay'
  | 'tutorials'
  | 'tutorialvideos'
  | 'undo'
  | 'updatetools'
  | 'zoomM'
  | 'zoomP'

export function getImage (name: ImageName): ImageSourcePropType {
  // TODO use svg everywhere if possible
  return loadImage(name)
}
type IconEntry = { [name: string]: ImageName }
type Icons = {
  [namespace: string]: IconEntry & {
    active?: IconEntry;
  };
}

const icons: Icons = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  buttons: {
    redo: 'redo',
    undo: 'undo',
    switch: 'crossGrey',
    print: 'print',
    newNotebook: 'newNotebook',
    loadNotebook: 'loadNotebook',
    pageDisplay: 'pageDisplay',
    export: 'export',
    tutorials: 'tutorials',
    about: 'about',
    tutorialvideos: 'tutorialvideos',
    ask: 'ask',
    language: 'language',
    svgconversion: 'svgconversion',
    mathmlconversion: 'mathmlconversion',
    themedisplay: 'themedisplay',
    updatetools: 'updatetools',
    help: 'help',
    bag: 'bag',
    plus: 'plus',
    zoomM: 'zoomM',
    zoomP: 'zoomP',
    save: 'save',
    fonts: 'fonts',
    spacing: 'spacing',
    syllable: 'syllable',
    coloring: 'coloring',
    interfaceStyle: 'notebook',
    notebookStyle: 'loadNotebook',
    active: {
      switch: 'check'
    },
    pencil: 'pencil'
  },
  menus: {
    file: 'loadNotebook',
    edit: 'edition',
    options: 'options',
    help: 'help',
    fonts: 'fonts',
    spacing: 'spacing',
    syllable: 'syllable',
    coloring: 'coloring',
    notebook: 'notebook',
    interfaceParameters: 'greenNotebook',
    interface: 'loadNotebook'
  },
  inputs: {},
  menuSound: {
    speaker: 'speaker',
    paint: 'paint',
    plusPaint: 'plusPaint'
  },
  accessibility: {
    accessibility: 'accessibility'
  }
}

export function getIcon (namespace: string, name: string, active?: boolean): ImageName | undefined {
  const spaceData = icons[namespace]
  if (!spaceData) return undefined
  if (!spaceData[name]) name = 'default'
  return (active && spaceData.active && spaceData.active[name]) ? spaceData.active[name] : spaceData[name]
}

function loadImage (name: ImageName): ImageSourcePropType {
  let image
  switch (name) {
    case 'about': image = require('../assets/images/about.svg'); break
    case 'accessibility': image = require('../assets/images/accessibility.svg'); break
    case 'alignLeft': image = require('../assets/images/alignLeft.svg'); break
    case 'alignRight': image = require('../assets/images/alignRight.svg'); break
    case 'alignCenter': image = require('../assets/images/alignCenter.svg'); break
    case 'alignJustify': image = require('../assets/images/alignJustify.svg'); break
    case 'arrowDown': image = require('../assets/images/arrowDown.svg'); break
    case 'ask': image = require('../assets/images/ask.svg'); break
    case 'attachment': image = require('../assets/images/attachment.svg'); break
    case 'bag': image = require('../assets/images/bag.svg'); break
    case 'check': image = require('../assets/images/check.svg'); break
    case 'coloring': image = require('../assets/images/coloring.svg'); break
    case 'crossGrey': image = require('../assets/images/crossGrey.svg'); break
    case 'edition': image = require('../assets/images/edition.svg'); break
    case 'export': image = require('../assets/images/export.svg'); break
    case 'fonts': image = require('../assets/images/textRed.svg'); break
    case 'formula': image = require('../assets/images/formula.svg'); break
    case 'greenNotebook': image = require('../assets/images/greenNotebook.svg'); break
    case 'help': image = require('../assets/images/help.svg'); break
    case 'image': image = require('../assets/images/image.svg'); break
    case 'language': image = require('../assets/images/language.svg'); break
    case 'link': image = require('../assets/images/link.svg'); break
    case 'loadNotebook': image = require('../assets/images/loadNotebook.svg'); break
    case 'logo': image = require('../assets/images/logo.svg'); break
    case 'mathmlconversion': image = require('../assets/images/mathmlconversion.svg'); break
    case 'maths': image = require('../assets/images/maths.svg'); break
    case 'menu': image = require('../assets/images/menu.svg'); break
    case 'mic': image = require('../assets/images/mic.svg'); break
    case 'newNotebook': image = require('../assets/images/newNotebook.svg'); break
    case 'notebook': image = require('../assets/images/notebook.svg'); break
    case 'options': image = require('../assets/images/options.svg'); break
    case 'pageDisplay': image = require('../assets/images/pagedisplay.svg'); break
    case 'paint': image = require('../assets/images/paint.svg'); break
    case 'pencil': image = require('../assets/images/pencil.svg'); break
    case 'picker': image = require('../assets/images/picker.png'); break
    case 'plus': image = require('../assets/images/plus.svg'); break
    case 'plusPaint': image = require('../assets/images/plusPaint.svg'); break
    case 'print': image = require('../assets/images/print.svg'); break
    case 'redo': image = require('../assets/images/redo.svg'); break
    case 'save': image = require('../assets/images/save.svg'); break
    case 'screenshot': image = require('../assets/images/screenshot.svg'); break
    case 'spacing': image = require('../assets/images/spacing.svg'); break
    case 'speaker': image = require('../assets/images/speaker.svg'); break
    case 'svgconversion': image = require('../assets/images/svgconversion.svg'); break
    case 'syllable': image = require('../assets/images/syllable.svg'); break
    case 'text': image = require('../assets/images/text.svg'); break
    case 'themedisplay': image = require('../assets/images/themedisplay.svg'); break
    case 'tutorials': image = require('../assets/images/tutorials.svg'); break
    case 'tutorialvideos': image = require('../assets/images/tutorialvideos.svg'); break
    case 'updatetools': image = require('../assets/images/updatetools.svg'); break
    case 'undo': image = require('../assets/images/undo.svg'); break
    case 'zoomM': image = require('../assets/images/zoomM.svg'); break
    case 'zoomP': image = require('../assets/images/zoomP.svg'); break
  }
  return image
}
