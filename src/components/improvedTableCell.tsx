import { TableCell, Tooltip, TableCellProps } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React from 'react';

// eslint-disable-next-line react/display-name
const ImprovedTableCell: React.FC<TableCellProps> = ({ title, children, ...props }) => {
  if (title) {
    return (
      <Tooltip title={title}>
        <TableCell {...props}>{children}</TableCell>
      </Tooltip>
    );
  } else {
    return <TableCell {...props}>{children}</TableCell>;
  }
};

export default React.memo(
  styled(ImprovedTableCell)({
    paddingLeft: 12,
    paddingRight: 12,
  })
);
