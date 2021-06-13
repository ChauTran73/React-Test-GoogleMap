import { some } from 'constants/constants';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Home = (props: some) => {
  return <></>;
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Home));
