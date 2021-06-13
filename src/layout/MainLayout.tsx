import {
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Popover,
  Typography,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import { ReactComponent as IconMenuBack } from 'assets/icons/ic_menu_back_arrow.svg';
import { BLUE_NAVY, GREY_100, GREY_600, WHITE } from 'assets/theme/colors';
import clsx from 'clsx';
import { SIDE_BAR_WIDTH, some } from 'constants/constants';
import { routes } from 'constants/routes';
import ConfirmationDialog from 'modules/chats/component/ChatMain/components/ConfirmCloseDialog';
import { PageWrapper } from 'modules/common/Elements';
import LoadingIcon from 'modules/common/LoadingIcon';
import Home from 'modules/home/Home';
import { AppState } from 'modules/rootReducer';
import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import DefaultHelmet from './DefaultHelmet';
import { mainStyles } from './styles';

const SIDE_BAR_MENU: some[] = [
  {
    icon: <DashboardIcon />,
    name: 'Dashboard',
    route: routes.HOME,
    component: Home,
  },
];
function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const MainLayout: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { profile } = props;
  const classes = mainStyles();
  const intl = useIntl();
  const { pathname } = props?.location;
  const [open, setOpen] = React.useState(false); // open side bar
  const [openConfirmLogout, setOpenConfirmLogout] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // open logout dialog
  const [isCollapse, setCollapse] = React.useState<null | HTMLElement>(null); // open menu management

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => {
    setOpen(false);
    if (Boolean(isCollapse)) setCollapse(null);
  };
  const gotoAction = (route: string) => props?.history?.push(route);

  const handleCloseLogOut = () => {
    setOpenConfirmLogout(false);
  };
  const handleOpenMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const customIcon = (
    icon: ReactNode,
    isLast?: boolean,
    isActive?: boolean
  ) => (
    <span
      className={classes.customIcon}
      style={{
        marginRight: isLast ? 0 : 5,
        color: isActive ? BLUE_NAVY : 'rgb(117, 117, 117)',
      }}
    >
      {icon}
    </span>
  );

  return (
    <PageWrapper style={{ background: GREY_100 }}>
      <DefaultHelmet />
      <CssBaseline />
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {open && (
            <p
              style={{
                width: '100%',
                paddingLeft: 16,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              GAME PORTAL
            </p>
          )}
          <IconButton
            onClick={handleDrawerClose}
            className={clsx({ [classes.hide]: !open })}
          >
            <IconMenuBack />
          </IconButton>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, { [classes.hide]: open })}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <List style={{ padding: 0 }}>
          {SIDE_BAR_MENU.map((el: some, index: number) => {
            const isActive = pathname === el.route;
            return (
              <ListItem
                button
                key={index}
                onClick={() => gotoAction(el?.route)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: isActive ? 'rgb(232, 241, 255)' : WHITE,
                  borderRight:
                    open && isActive ? `4px solid ${BLUE_NAVY}` : 'none',
                }}
                title={el?.name}
              >
                {customIcon(el?.icon, false, isActive)}
                {open && (
                  <ListItemText
                    primary={el?.name}
                    style={{ color: isActive ? BLUE_NAVY : GREY_600 }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
        <List
          style={{ width: '100%', padding: 0, position: 'absolute', bottom: 0 }}
        >
          <ListItem button onClick={handleOpenMenu} title={profile?.name}>
            <ListItemIcon>
              {profile?.profilePhoto ? (
                <img
                  src={profile?.profilePhoto}
                  alt=''
                  style={{ width: 28, height: 28 }}
                />
              ) : (
                <AccountCircleIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={profile?.name} style={{ color: GREY_600 }} />
          </ListItem>
        </List>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Typography
            variant='body2'
            onClick={() => {
              setOpenConfirmLogout(true);
              handleCloseMenu();
            }}
            className={classes.menuItem}
          >
            {intl.formatMessage({ id: 'IDS_LOGOUT' })}
          </Typography>
        </Popover>
        <ConfirmationDialog
          dialogTitle='IDS_LOGOUT'
          dialogContent='IDS_CONFIRM_LOGOUT'
          handleCloseDialog={handleCloseLogOut}
          onAcceptDialog={() => {
            gotoAction(routes.LOGIN);
          }}
          openDialog={openConfirmLogout}
        />
      </Drawer>
      <main
        className={classes.content}
        style={{
          marginLeft: open ? SIDE_BAR_WIDTH : 73,
          transition: 'linear 225ms',
        }}
      >
        <React.Suspense fallback={<LoadingIcon />}>
          <Switch>
            {[...SIDE_BAR_MENU].map((item: some) => (
              <Route
                exact
                path={item.route}
                component={item.component}
                key={item.route}
              />
            ))}
          </Switch>
        </React.Suspense>
      </main>
    </PageWrapper>
  );
};

export default connect(mapStateToProps)(withRouter(MainLayout));
