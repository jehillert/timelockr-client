// https://jamie.build/styled-theming.html
// npm install styled-theming --save
// import theme from 'styled-theming';
// theme(name, values)
// theme.variants(name, prop, themes)
// theme('size', { normal: ..., compact: ... });
// <ThemeProvider theme={{ mode: 'dark', size: 'compact' }}>


const defaultTheme = {
  // color
  accentColor: '#D93646',
  backgroundColor: 'white',
  backgroundHoverColor: '#D93646',
  backgroundBorderHoverColor: '#D93646',
  headerFooterColor: '#A18664',
  primaryColor: '#6A6A6A',
  secondaryColor: '#202020',
  bgColor1: '#202020',
  bgColor2: '#6A6A6A',
  buttonBorderColor1: '#202020',
  textColor1: 'white',
  textColor2: '#9D9D9D',
  // dimensions
  cardWidth: '19rem',
  cardAreaWidth: '41rem',
  // margin
  insideFacingMargin: '0.25rem',
  outsideFacingMargin: '0.25rem',
  cornerButtonRightMargin: '-0.25',
  cornerButtonTopMargin: '-0.25rem',
  // radius
  cardRadius: '0rem',
  backgroundBorderRadius: '0rem',
  dialogRadius: '0rem',
  tabBorderRadius: '0rem',
  // shadow
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);',
  rightBoxShadow: '8px 0px 7px -1px rgba(0,0,0,0.63)',
  leftBoxShadow: '-8px 0px 7px -1px rgba(0,0,0,0.63)',
};

export default defaultTheme;
  // boxShadowToLeft: '-10px 0px 5px rgba(24,29,39,.1)',
  // boxShadowToRight: '10px 0px 45px rgba(24,29,39,.1)',
// 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
