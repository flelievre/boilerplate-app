import {
  TableRow,
  TableCell,
  TableBody as MaterialTableBody,
} from '@mui/material';

const TableBody = ({
  emptyRows = 0,
  dense = false,
  colSpan = 6,
  children = <></>,
}) => (
  <MaterialTableBody>
    {children}
    {emptyRows > 0 && (
      <TableRow
        style={{
          height: (dense ? 33 : 53) * emptyRows,
        }}
      >
        <TableCell colSpan={colSpan} />
      </TableRow>
    )}
  </MaterialTableBody>
);

export default TableBody;
