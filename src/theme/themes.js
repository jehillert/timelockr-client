const bp = [
  null,
  '66rem',  // DESKTOP    -->  1056px -->  Hides 'TimeLockr'
  '51rem',  // TABLET_LG  -->  816px  -->  Relocates (+) button
  '44rem',  // TABLET_SM  -->  736px  -->  Hides side panels
  '44rem',  // TABLET_SM  -->  704px  -->  Main, AppBar, TabBar, CardAreaTabs, and CardArea --> width becomes 100%
  '31rem',  // PHONE      -->  656px
  '0rem',   // 6
];

const abp = [
  null,
  '32rem',
  '27.50rem',
];

const m = (factor = 1) => {
  const margin = 0.5 * factor;
  return `${margin}rem`
};

const p = (factor = 1) => {
  const padding = 0.5 * factor;
  return `${padding}rem`
};

const defaultTheme = {
//BREAK POINTS
  bp, //main app
  abp, //auth modal
//COLORS
  accentColor: '#B81205',
  lightColor: 'white',
  darkColor: '#222324',
  hoverColor: '#D93646',
  backgroundHoverColor: '#D93646',
  backgroundBorderHoverColor: '#D93646',
  primary: '#37474f',
  fgColor1: '#FFFFFF',
  fgColor2: '#455a64',
  fgColor3: '#222324',
  bgColor1: '#607d8b',
  bgColor2: '#455a64',
  bgColor3: '#222324',
  borderColor1: '#607d8b',
  borderColor2: '#455a64',
  borderColor3: '#222324',
  hoverFontColor: 'white',
  textColor1: 'white',
  textColor2: '#9D9D9D',

//DIMENSIONS - Cards, Modals, Dialogs
  cardWidth: '19rem',
  cardAreaWidth: '41rem',
  dialogWidth: '26rem',
  modalWidth: '27.5rem',

//FONT SIZE
  fontSizeDialogTitle: '2rem',

//RADIUS
  cardRadius: '0rem',
  backgroundBorderRadius: '0rem',
  dialogRadius: '0rem',
  tabBorderRadius: '0rem',

//SPACING
  m,
  p,

//SHADOW
  insetBoxShadowBottom: 'inset 0 -10px 10px -10px grey;',
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  boxShadowTop: '0px -3px 4px -1px rgba(0, 0, 0, 0.2), 0px -5px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12);',
  boxShadowRight: '8px 0px 7px -1px rgba(0,0,0,0.63)',
  boxShadowLeft: '-8px 0px 7px -1px rgba(0,0,0,0.63)',
};

export default defaultTheme;
/*
════════════════════════════════════════════════
                    NOTES
════════════════════════════════════════════════
STYLED-COMPONENTS WORK-AROUND;
  S.__________ = styled(props => <__________ {...props} />)`

DETERMINING DEVICE:
  mouse, touch pad           ==>    "@media (hover: hover) and (pointer: fine) {}"
  smartphones, touchscreens  ==>    "@media (hover: none) and (pointer: coarse) {}"
  stylus-based screens       ==>    "@media (hover: none) and (pointer: fine) {}"
  Wii controller/MS Kinect   ==>    "@media (hover: hover) and (pointer: coarse) {}"

════════════════════════════════════════════════
                     WIP
════════════════════════════════════════════════
primary: {
  light: '#7986cb',
  main: '#3f51b5',
  dark: '#303f9f',
  contrastText: '#fff',
},
secondary: {
  light: '#ff4081',
  main: '#f50057',
  dark: '#c51162',
  contrastText: '#fff',
},

════════════════════════════════════════════════
          MATERIAL-UI DEFAULT THEME
════════════════════════════════════════════════
zIndex
————————————————————————————————————————————————
mobileStepper: 1000
appBar: 1100
drawer: 1200
modal: 1300
snackbar: 1400
tooltip: 1500
————————————————————————————————————————————————
BREAKPOINTS
————————————————————————————————————————————————
keys: Array[5]
    0: "xs"
    1: "sm"
    2: "md"
    3: "lg"
    4: "xl"
values: Object
    xs: 0px
    sm: 600px
    md: 960px
    lg: 1280px
    xl: 1920px
————————————————————————————————————————————————
PALETTE
————————————————————————————————————————————————
common: Object
    black: "#000"
    white: "#fff"
type: "light"
primary: Object
    light: "#7986cb"
    main: "#3f51b5"
    dark: "#303f9f"
    contrastText: "#fff"
secondary: Object
    light: "#ff4081"
    main: "#f50057"
    dark: "#c51162"
    contrastText: "#fff"
error: Object
    light: "#e57373"
    main: "#f44336"
    dark: "#d32f2f"
    contrastText: "#fff"
grey: Object
    50: "#fafafa"
    100: "#f5f5f5"
    200: "#eeeeee"
    300: "#e0e0e0"
    400: "#bdbdbd"
    500: "#9e9e9e"
    600: "#757575"
    700: "#616161"
    800: "#424242"
    900: "#212121"
    A100: "#d5d5d5"
    A200: "#aaaaaa"
    A400: "#303030"
    A700: "#616161"
contrastThreshold: 3
getContrastText: function O()
augmentColor: function P()
tonalOffset: 0.2
text: Object
    primary: "rgba(0, 0, 0, 0.87)"
    secondary: "rgba(0, 0, 0, 0.54)"
    disabled: "rgba(0, 0, 0, 0.38)"
    hint: "rgba(0, 0, 0, 0.38)"
divider: "rgba(0, 0, 0, 0.12)"
background: Object
    paper: "#fff"
    default: "#fafafa"
action: Object
    active: "rgba(0, 0, 0, 0.54)"
    hover: "rgba(0, 0, 0, 0.08)"
    hoverOpacity: 0.08
    selected: "rgba(0, 0, 0, 0.14)"
    disabled: "rgba(0, 0, 0, 0.26)"
    disabledBackground: "rgba(0, 0, 0, 0.12)"

————————————————————————————————————————————————
PROPS
————————————————————————————————————————————————
typography: Object
    htmlFontSize: 16
    pxToRem: function O()
    round: function u()
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontSize: 14
    fontWeightLight: 300
    fontWeightRegular: 400
    fontWeightMedium: 500
    fontWeightBold: 700
h1: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 300
    fontSize: "6rem"
    lineHeight: 1
    letterSpacing: "-0.01562em"
h2: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 300
    fontSize: "3.75rem"
    lineHeight: 1
    letterSpacing: "-0.00833em"
h3: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "3rem"
    lineHeight: 1.04
    letterSpacing: "0em"
h4: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "2.125rem"
    lineHeight: 1.17
    letterSpacing: "0.00735em"
h5: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "1.5rem"
    lineHeight: 1.33
    letterSpacing: "0em"
h6: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 500
    fontSize: "1.25rem"
    lineHeight: 1.6
    letterSpacing: "0.0075em"
subtitle1: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "1rem"
    lineHeight: 1.75
    letterSpacing: "0.00938em"
subtitle2: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 500
    fontSize: "0.875rem"
    lineHeight: 1.57
    letterSpacing: "0.00714em"
body1: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "1rem"
    lineHeight: 1.5
    letterSpacing: "0.00938em"
body2: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "0.875rem"
    lineHeight: 1.43
    letterSpacing: "0.01071em"
button: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 500
    fontSize: "0.875rem"
    lineHeight: 1.75
    letterSpacing: "0.02857em"
    textTransform: "uppercase"
caption: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "0.75rem"
    lineHeight: 1.66
    letterSpacing: "0.03333em"
overline: Object
    fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
    fontWeight: 400
    fontSize: "0.75rem"
    lineHeight: 2.66
    letterSpacing: "0.08333em"
    textTransform: "uppercase"

————————————————————————————————————————————————
OTHER
————————————————————————————————————————————————
spacing: function n()
  mui: true
shape: Object
  borderRadius: 4

*/
