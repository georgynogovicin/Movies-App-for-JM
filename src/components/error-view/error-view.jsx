import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

function ErrorView({ error }) {
  if (error === "Sorry, we didn't find anything") {
    return <Alert message="No comprendo!?" description={error} type="info" showIcon />;
  }
  if (error === "You didn't rate any movie yet") {
    return <Alert message="Try to rate some movie first" description={error} type="info" showIcon />;
  }
  if (error === 'Failed to fetch') {
    return <Alert message="Oops!" description="Try to check your connection" type="error" showIcon />;
  }

  return (
    <Alert message="Oops! Something went terribly wrong" description="We will fix it soon" type="error" showIcon />
  );
}

ErrorView.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorView;
