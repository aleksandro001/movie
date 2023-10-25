import React from 'react';
import { Detector } from 'react-detect-offline';
import { Alert } from 'antd';
const NetworkState = (props) => {
  return (
    <Detector
      render={({ online }) => (online ? props.children : <Alert className="alert alert-net" message={'offline'} />)}
    />
  );
};
export default NetworkState;
