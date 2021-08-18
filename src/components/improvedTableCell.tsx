import { TableCell, Tooltip, TableCellProps } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React from 'react';

const ImprovedTableCell: React.FC<TableCellProps> = ({ title, children, style, ...props }) => {
  if (title) {
    return (
      <Tooltip title={title}>
        <TableCell style={{ ...style }} {...props}>
          {children}
        </TableCell>
      </Tooltip>
    );
  } else {
    return (
      <TableCell style={{ ...style }} {...props}>
        {children}
      </TableCell>
    );
  }
};

export default styled(ImprovedTableCell)({
  paddingLeft: 12,
  paddingRight: 12,
});
