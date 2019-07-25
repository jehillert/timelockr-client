import styled from 'styled-components';

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

export const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
export const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// https://www.styled-components.com/docs/advanced#getting-the-theme-without-styled-components
