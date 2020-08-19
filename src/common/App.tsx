import { Helmet } from 'react-helmet';
import GlobalStyle from '@common/reset';
import styled from 'styled-components';
import PreLoader from '@common/Loader';
import React from 'react';
import CommonGlobalStyle from '@common/common';
import { RouteComponentProps } from 'react-router';
import routes from '@common/routes';
import { renderRoutes } from 'react-router-config';

export interface IProps {
  exact?: boolean;
  path?: string;
  // tslint:disable-next-line:no-any
  component?: React.ComponentType<RouteComponentProps<any>>;
}

const StyledAppInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

export default () => {
  return (
    <>
      <StyledAppInner className='styledAppInner'>
        <Helmet>
          <title>Puzzle game</title>
          <meta
            name='description'
            content='react typescript ssr with code split'
          />
        </Helmet>
        <PreLoader />
        {renderRoutes(routes)}
        <GlobalStyle />
        <CommonGlobalStyle />
      </StyledAppInner>
    </>
  );
};
