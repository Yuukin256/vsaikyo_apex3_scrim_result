import { TableCell, Tooltip, TableCellProps } from '@material-ui/core';
import React from 'react';

const ImprovedTableCell: React.FC<TableCellProps> = ({ title, children, style, ...props }) => {
  if (title) {
    return (
      <Tooltip title={title}>
        <TableCell style={{...style, paddingRight: 12 }} {...props}>
          {children}
        </TableCell>
      </Tooltip>
    );
  } else {
    return (
      <TableCell style={{...style, paddingRight: 12 }} {...props}>
        {children}
      </TableCell>
    );
  }
};

export default ImprovedTableCell;
