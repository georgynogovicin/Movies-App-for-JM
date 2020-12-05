import React from 'react';
import { Alert } from 'antd';

function ErrorView({ error }) {
  let errorView = null;

  if (error.message === "Sorry, we didn't find anything") {
    errorView = <Alert message="No comprendo!?" description={error.message} type="info" showIcon />;
  }
  if (error.message === "You didn't rate any movie yet") {
    errorView = <Alert message="Try to rate some movie first" description={error.message} type="info" showIcon />;
  }
  if (error.message === 'Failed to fetch') {
    errorView = <Alert message="Oops!" description="Try to check your connection" type="error" showIcon />;
  }

  return { errorView };
}

export default ErrorView;
