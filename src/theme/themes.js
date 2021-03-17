const bp = [
  null,
  '66rem', // DESKTOP    -->  1056px -->  Hides 'TimeLockr'
  '51rem', // TABLET_LG  -->  816px  -->  Relocates (+) button
  '44rem', // TABLET_SM  -->  736px  -->  Hides side panels
  '44rem', // TABLET_SM  -->  704px  -->  Main, AppBar, TabBar, CardAreaTabs, and CardArea --> width becomes 100%
  '31rem', // PHONE      -->  656px
  '0rem', // 6
];

const abp = [
  null,
  '32rem',
  '27.50rem',
];

const gap = (factor = 1) => {
  const padding = 0.5 * factor;
  return `${padding}rem`;
};

const m = (factor = 1) => {
  const margin = 0.5 * factor;
  return `${margin}rem`;
};

const p = (factor = 1) => {
  const padding = 0.5 * factor;
  return `${padding}rem`;
};

const defaultTheme = {
// BREAK POINTS
  bp, // main app
  abp, // auth modal
// COLORS
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

// DIMENSIONS - Cards, Modals, Dialogs
  cardWidth: '18rem',
  cardAreaWidth: '41rem',
  dialogWidth: '26rem',
  modalWidth: '27.5rem',

// FONT SIZE
  fontSizeDialogTitle: '2rem',

// RADIUS
  cardRadius: '0rem',
  backgroundBorderRadius: '0rem',
  dialogRadius: '0rem',
  tabBorderRadius: '0rem',

// SPACING
  gap,
  m,
  p,

// SHADOW
  insetBoxShadowBottom: 'inset 0 -10px 10px -10px grey;',
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  boxShadowTop: '0px -3px 4px -1px rgba(0, 0, 0, 0.2), 0px -5px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12);',
  boxShadowRight: '8px 0px 7px -1px rgba(0,0,0,0.63)',
  boxShadowLeft: '-8px 0px 7px -1px rgba(0,0,0,0.63)',
};

export default defaultTheme;
