import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserIP } from 'modules/user/selectors';
import { getUserGeolocation } from 'modules/user/actions';

import Home from './Home';

const mapStateToProps = {
  ip: getUserIP
};

const structuredSelector = createStructuredSelector(mapStateToProps);

const mapDispatchToProps = {
  getUserGeolocation
};

const withConnect = connect(
  structuredSelector,
  mapDispatchToProps
);

export default withConnect(Home);
