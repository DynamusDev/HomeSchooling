
const lightGreen = '#B5E9D3'
const lightBlue = '#BFE9F8'
const lightRed = '#FFCACA'
const lightYellow = '#FFF0B3'
const lightGrey = '#DBDBDB'
const green = '#08B76C'
const yellow = '#FFCC00'
const red = '#FF4D4D'
const blue = '#29B4E8'
const grey = '#B8C6D4'
const dark = '#2C064B'
const darkRed = '#CC3D3D'
const darkYellow = '#CCA300'
const darkBlue = '#126CE3'
const darkGreen = '#069E5C'
const white = '#FFFFFF'
const light = '#F2F2F2'
const ultraLight = '#E5E5E5'
const darkGrey = '#2A044A'
const purple = '#7931CD'
const fuchsiaBlue = '#6D4BC4'
const royalPurple = '#5D3B9E'
const darkRoyalPurple = '#5E40A8'
const jacarta = '#3F286B'
const violentViolet = '#230b52'
const alabaster = '#f8f8f8'

const font = 'Nunito'

module.exports = {
  title: 'light',

  font,

  buttons: {
    menu: {
      border: lightGrey,
      background: white
    },
    label: {
      color: dark,
      font: 'Nunito',
      active: {
        color: white
      }
    },
    colorPicker: {
      border: grey,
      background: 'white',
      font: 'Nunito',
      color: purple
    },
    undo: {
      background: red
    },
    nav: {
      border: ultraLight,
      background: white,
      active: {
        background: light
      }
    },
    purpleButton: {
      background: fuchsiaBlue,
      border: royalPurple,
      color: white,
      hover: {
        background: darkRoyalPurple,
        border: royalPurple
      },
      active: {
        background: jacarta,
        border: violentViolet
      }
    },
    flatButton: {
      color: darkGrey,
      hover: {
        border: ultraLight,
        background: white,
        shadow: lightGrey,
        color: darkGrey
      },
      active: {
        background: alabaster,
        color: darkGrey,
        border: ultraLight
      }

    }
  },
  inputs: {
    border: lightGrey,
    color: darkBlue,
    font
  },

  slider: {
    track: {
      color: lightGrey
    },
    icon: {
      color: white
    }
  },

  switchs: {
    border: grey,
    color: dark
  },

  menus: {
    label: {
      color: darkGrey,
      font,
      active: {
        color: white
      }
    }
  },

  modalWindow: {
    body: blue,
    header: white
  },

  modalNotebook: {
    question: {
      font: 'Nunito',
      color: darkBlue
    },
    number: {
      font: 'Nunito',
      color: white
    },
    enterText: {
      font: 'Nunito',
      color: grey
    }
  },

  menusBorder: {
    interfaceParameters: {
      border: darkGreen
    },
    spacing: {
      border: darkYellow
    },
    syllable: {
      border: darkBlue
    },
    fonts: {
      border: darkRed
    },
    coloring: {
      border: darkGreen
    },
    notebook: {
      border: darkYellow
    },
    interface: {
      border: darkRed
    },
    file: {
      active: {
        border: red
      }
    },
    edit: {
      active: {
        border: yellow
      }
    },
    options: {
      active: {
        border: green
      }
    },
    help: {
      active: {
        border: blue
      }
    }
  },

  menusBackground: {
    interfaceParameters: {
      background: lightGreen,
      active: {
        background: green
      }
    },
    spacing: {
      background: lightYellow,
      active: {
        background: yellow
      }
    },
    syllable: {
      background: lightBlue,
      active: {
        background: blue
      }
    },
    fonts: {
      background: lightRed,
      active: {
        background: red
      }
    },
    coloring: {
      background: lightGreen,
      active: {
        background: green
      }
    },
    notebook: {
      background: lightYellow,
      active: {
        background: yellow
      }
    },
    interface: {
      background: lightRed,
      active: {
        background: red
      }
    },
    edit: {
      background: lightYellow,
      active: {
        background: yellow
      }
    },
    help: {
      background: lightBlue,
      active: {
        background: blue
      }
    },
    file: {
      background: lightRed,
      active: {
        background: red
      }
    },
    options: {
      background: lightGreen,
      active: {
        background: green
      }
    },
    disabled: {
      background: white,
      active: {
        background: white
      }
    }
  },

  container: {
    aside: {
      background: blue
    },
    menuBox: {
      border: lightGrey,
      background: white
    },
    divider: {
      border: lightGrey
    }
  },

  menuSound: {
    playSound: {
      color: dark,
      border: grey
    },
    setColor: {
      border: grey
    }
  }
}
