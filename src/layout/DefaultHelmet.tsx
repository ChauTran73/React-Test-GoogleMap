import React from 'react';
import { useIntl } from 'react-intl';
import Helmet from 'react-helmet';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { routes } from 'constants/routes';

interface Props {}

const DefaultHelmet: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const intl = useIntl();
  const { pathname } = props?.location;

  const getTitle = () => {
    if (pathname === routes.LOGIN) return 'IDS_LOGIN';
    if (pathname === routes.HOME) return 'IDS_CHAT_HOME';
    if (pathname === routes.CHAT) return 'IDS_CHAT';
    if (pathname === routes.TRAFFIC) return 'IDS_CHAT_TRAFFIC';
    if (pathname === routes.TAG_MANAGEMENT) return 'IDS_CHAT_MANAGEMENT_TAG';
    if (pathname === routes.SHORTCUT_MANAGEMENT)
      return 'IDS_CHAT_MANAGEMENT_SHORTCUT';
    if (pathname === routes.TEAM_MANAGEMENT) return 'IDS_CHAT_MANAGEMENT_TEAM';
    if (pathname === routes.AGENCY_MANAGEMENT)
      return 'IDS_CHAT_MANAGEMENT_AGENCY';
    if (pathname === routes.EMPLOYEE_MANAGEMENT)
      return 'IDS_CHAT_MANAGEMENT_EMPLOYEE';
    if (pathname === routes.CORPORATION_MANAGEMENT)
      return 'IDS_CHAT_MANAGEMENT_CORPORATION';
    return 'IDS_CHAT';
  };

  return (
    <Helmet>
      {getTitle() ? (
        <title>{intl.formatMessage({ id: getTitle() })}</title>
      ) : (
        <title>Chat Portal</title>
      )}
    </Helmet>
  );
};

export default withRouter(DefaultHelmet);
