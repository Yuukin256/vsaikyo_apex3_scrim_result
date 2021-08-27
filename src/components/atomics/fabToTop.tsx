import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';

const FabToTop: React.VFC = () => (
  <Fab variant="extended" color="primary" href="#top" style={{ position: 'fixed', bottom: 10, right: 10 }}>
    <UpIcon />
    トップに戻る
  </Fab>
);

export default FabToTop;
