const defaultTheme = {
  // BREAK POINTS: [1] title ==> [2] button ==> [3] 2 columns ==> [4] single column)
  bp1: '66rem',
  bp2: '51rem',
  bp3: '46rem',
  bp4: 'rem',
  bp5: 'rem',
  // COLORS
  accentColor: '#B81205',
  backgroundBorderHoverColor: '#D93646',
  lightColor: 'white',
  backgroundHoverColor: '#D93646',
  bgColor1: '#202020',
  bgColor2: '#6A6A6A',
  borderColor1: '#202020',
  headerFooterColor: '#A18664',
  hoverColor: '#D93646',
  hoverFontColor: 'white',
  secondaryColor: '#202020',
  textColor1: 'white',
  textColor2: '#9D9D9D',
  // DIMENSIONS - Cards
  cardWidth: '19rem',
  cardAreaWidth: '41rem',
  // MARGINS - Card Columns
  insideFacingMargin: '0.25rem',
  outsideFacingMargin: '0.25rem',
  cornerButtonRightMargin: '-0.25',
  cornerButtonTopMargin: '-0.25rem',
  // RADIUS
  cardRadius: '0rem',
  backgroundBorderRadius: '0rem',
  dialogRadius: '0rem',
  tabBorderRadius: '0rem',
  // SPACING
  sp: (factor = 1) => {
    const spacing = 0.5 * factor;
    return `${spacing}rem`
  },
  // SHADOW
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  rightBoxShadow: '8px 0px 7px -1px rgba(0,0,0,0.63)',
  leftBoxShadow: '-8px 0px 7px -1px rgba(0,0,0,0.63)',
};

export default defaultTheme;
/*

            MATERIAL-UI DEFAULT THEME
                 (partial list)

————————————————————————————————————————————————
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
    xs: 0
    sm: 600
    md: 960
    lg: 1280
    xl: 1920
up: function f()
down: function down()
between: function d()
only: function only()
width: function width()

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
