import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';
import { device } from 'utilities';

const StyledMuiCard = styled(Card)`
  &.styled-mui-card {
    word-break: break-word;
    z-index: 1;
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: ${({ theme }) => theme.cardRadius};

    @media ${device.phone} {
      width: calc(100vw - ${({ theme }) => theme.p(6)});
      margin-top: ${({ theme }) => theme.m(1.5)};
      margin-bottom: ${({ theme }) => theme.m(1.5)};
    }

    @media ${device.tabletSM} {
      grid-column: auto;
      width: 100%;
      margin: auto;
    }

    @media ${device.tabletLG} {
      width: ${({ theme }) => theme.cardWidth};
      margin: ${({ theme }) => theme.m(1.5)}
    }
  }
`;

const StyledMuiCardContent = styled(CardContent)`
  padding-top: ${({ theme }) => theme.p(1.5)};
  padding-bottom: ${({ theme }) => theme.p(1.5)};
`;

// Overrides action attribute margins.
// see https://material-ui.com/guides/interoperability/ at 'Deeper Elements'
const StyledMuiCardHeader = styled(({ ...other }) => (
  <CardHeader classes={{ action: 'action' }} {...other} />
))`
  background-color: ${({ theme }) => theme.bgColor1};
  span {
    color: ${({ theme }) => theme.fgColor1};
    font-size: 1rem;
  }
  & .action {
    margin-top: -16px;
    margin-right: -16px;
  }
`;

export { StyledMuiCard, StyledMuiCardHeader, StyledMuiCardContent };
