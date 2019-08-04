import styled from 'styled-components';

export const size = {
  desktopLG: '66rem',
  desktopSM: '51rem',
  tabletLG: '44rem',
  tabletSM: '31rem',
  phone: '0rem',
};

export const device = {
  desktopLG: `(min-width: ${size.desktopLG})`,
  desktopSM: `(min-width: ${size.desktopSM})`,
  tabletLG: `(min-width: ${size.tabletLG})`,
  tabletSM: `(min-width: ${size.tabletSM})`,
  phone: `(min-width: ${size.phone})`,
};

export const isDesktop = window.matchMedia(
  '(hover: hover) and (pointer: fine)'
).matches;

export const isPhone = window.matchMedia(
  '(hover: none) and (pointer: coarse) and (max-width: 31rem)'
).matches;

export const isMobile = window.matchMedia(
  '(hover: none) and (pointer: coarse)'
).matches;

export const RenderIfMobile = styled.div`
  @media (hover: hover) and (pointer: fine) {
    display: none;
  }
`;

export const RenderIfDesktop = styled.div`
  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;

// https://www.styled-components.com/docs/advanced#getting-the-theme-without-styled-components
