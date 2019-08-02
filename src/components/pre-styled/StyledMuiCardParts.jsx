import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';
import { device } from 'utilities';

const StyledMuiCard = styled(Card)`
  &.styled-mui-card {
    z-index: 1;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: ${props => props.theme.cardRadius};

    @media ${device.phone} {
      width: calc(100vw - ${props => props.theme.p(6)});
      margin-top: ${props => props.theme.m(1.5)};
      margin-bottom: ${props => props.theme.m(1.5)};
    }

    @media ${device.tabletSM} {
      grid-column: auto;
      width: 100%;
      margin: auto;
    }

    @media ${device.tabletLG} {
      width: ${props => props.theme.cardWidth};
      margin: ${props => props.theme.m(1.5)}
    }
  }
`;

const StyledMuiCardContent = styled(CardContent)`
  padding-top: ${props => props.theme.p(1.5)};
  padding-bottom: ${props => props.theme.p(1.5)};
`;

// Overrides action attribute margins.
// see https://material-ui.com/guides/interoperability/ at 'Deeper Elements'
const StyledMuiCardHeader = styled(({ ...other }) => (
  <CardHeader classes={{ action: 'action' }} {...other} />
))`
  background-color: ${props => props.theme.bgColor1};
  span {
    color: ${props => props.theme.fgColor1};
    font-size: 1rem;
  }
  & .action {
    margin-top: -16px;
    margin-right: -16px;
  }
`;

export { StyledMuiCard, StyledMuiCardHeader, StyledMuiCardContent };
