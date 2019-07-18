import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';

const StyledMuiCard = styled(Card)`
  &.styled-mui-card {
    z-index: 1;
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: ${props => props.theme.cardRadius};
    width: ${props => props.theme.cardWidth}
  }
`;

const StyledMuiCardContent = styled(CardContent)`
  font-size: .8rem;
  padding-top: .75rem;
  padding-bottom: .75rem;
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
