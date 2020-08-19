import React, { FunctionComponent } from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';

const loading: FunctionComponent<LoadingComponentProps> = () => null;

const Home = Loadable({
  loading,
  loader: () => import(/* webpackChunkName: 'home' */ './routes/home')
});
const routes: IRoutes[] = [
  {
    path: '/',
    basePath: '/',
    exact: true,
    component: Home,
  }
];

export default routes;

export interface IRoutes {
  childRoutes?: IRoutes[];
  basePath?: string;
  path?: string;
  exact?: boolean;
  // tslint:disable-next-line:no-any
  component?: React.ComponentType<any>;
  loadData?(): Generator;
}
