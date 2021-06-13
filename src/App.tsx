import { routes } from 'constants/routes';
import MainLayout from 'layout/MainLayout';
import LoadingIcon from 'modules/common/LoadingIcon';
import ProtectedRoute from 'modules/common/ProtectedRoute';
import Login from 'modules/login/Login';
import { AppState } from 'modules/rootReducer';
import NotFound from 'modules/system/NotFound';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect, useDispatch } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import './App.scss';

function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const goToLogin = () => props?.history?.push(routes.LOGIN);
  // const fetchEmployeesInfo = async () => {
  //   //consistent employee status for all screens
  //   try {
  //     const res: some = await actionGetEmployeesInfo();
  //     if (res?.code === SUCCESS_CODE) {
  //       dispatch(actionSetStatus(res?.data?.status));
  //     }
  //   } catch (error) {
  //   } finally {
  //   }
  // };
  // const fetchDeviceId = async () => {
  //   const fp = await FingerprintJS.load();
  //   const result = await fp.get();
  //   if (result.visitorId) {
  //     localStorage.setItem(DEVICE_ID, result.visitorId);
  //     if (localStorage.getItem(ACCESS_TOKEN)) {
  //       fetchEmployeesInfo();
  //     }
  //   } else {
  //     goToLogin();
  //   }
  // };
  // useEffect(() => {
  //   fetchDeviceId(); //eslint-disable-next-line
  // }, []);

  return (
    <>
      <React.Suspense fallback={<LoadingIcon />}>
        <Switch>
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.NOT_FOUND} component={NotFound} />
          <ProtectedRoute path='*' component={MainLayout} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default connect(mapStateToProps)(withRouter(App));
