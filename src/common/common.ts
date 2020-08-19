import { createGlobalStyle } from 'styled-components';

import { breakpoints, colors } from './variables';

export default createGlobalStyle`
  *{
    outline: none;
  }

  body{
    overflow: auto;
    color: ${colors.darkGray};
  }

  #app{
    margin: auto;
    min-width: ${breakpoints.tabletPortrait}px;
  }

  @media screen and (min-width: ${breakpoints.tabletLandscape}px) {
    body.hasSummary{
      #app{
        padding-right: 18rem;
      }
    }
  }
`;
