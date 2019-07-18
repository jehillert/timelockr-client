import React from 'react';
import styled from 'styled-components';

const RenderIfMobile = styled.div`
  @media (hover: hover) and (pointer: fine) {
    display: none;
  }
`;

const RenderIfDesktop = styled.div`
  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;

export { RenderIfMobile, RenderIfDesktop };
