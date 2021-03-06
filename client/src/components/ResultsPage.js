import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { findClubsByAddress } from "../api/club";
import { findAllNotPending } from "../api/ride-api";
import AuthContext from "../context/AuthContext";
import withRouter from '../utility/withRouter';
import SearchForm from './SearchForm'

function createData(clubId, clubName, clubDescription, clubPostalCode, clubMembershipFee ) {
  return {
    clubId,
    clubName,
    clubDescription,
    clubPostalCode,
    clubMembershipFee,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCellsClub = [
  {
    id: "clubName",
    numeric: false,
    disablePadding: true,
    label: 'Club',
  },
  {
    id: 'clubDescription',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'clubPostalCode',
    numeric: true,
    disablePadding: false,
    label: 'Postal Code',
  },
  {
    id: 'clubMembershipFee',
    numeric: true,
    disablePadding: false,
    label: 'Monthly Membership Fee ($)',
  },

];

const headCellsRide = [
  {
    id: "rideDatetime",
    numeric: false,
    disablePadding: true,
    label: 'Ride Date',
  },
  {
    id: 'rideDescription',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'rideLimit',
    numeric: true,
    disablePadding: false,
    label: 'Max Attendance',
  }
];

function EnhancedTableHead(props) {
  const headCells = props.parameter === "clubs" ? headCellsClub : headCellsRide;
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.parameter}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const ResultsPage = (props) => {

  const router = {...props}

  const authContext = React.useContext(AuthContext);

  const [rows, setRows] = React.useState(null);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('clubMembershipFee');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchFunction = props.parameter === "clubs" ? findClubsByAddress : findAllNotPending;

  const addressState = router.router.location.state;



  React.useEffect(() => {
    if (addressState == null) {
      return;
    }
     const fetchData = async () => {
     const response = await fetchFunction(`${!addressState.street}, ${addressState.state} ${addressState.postal}`);
     setRows(props.parameter === "clubs" ? await response._embedded[props.parameter] : response);
     }
     fetchData();
 }, [fetchFunction]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.clubName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleView = () =>{
    router.router.navigate(`/${props.parameter}/${props.parameter === "clubs" ? selected : selected}`);
  };

  const handleClick = (id) => {
    setSelected([id]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {

    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    if (!rows) {
      return <h5>loading</h5>
   }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              parameter={props.parameter}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => e.target.disabled = true}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              parameter={props.parameter}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(props.parameter === "clubs" ? row.clubId: row.rideId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (

                    <TableRow
                      hover
                      onClick={() => handleClick(props.parameter === "clubs" ? row.clubId : row.rideId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={props.parameter === "clubs" ? row.clubId : row.rideId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {props.parameter === "clubs" ? row.clubName : row.rideDatetime}
                      </TableCell>
                      <TableCell align="left">{props.parameter === "clubs" ? row.clubDescription : row.rideDescription}</TableCell>
                      <TableCell align="right">{props.parameter === "clubs" ? row.clubPostalCode : row.rideLimit}</TableCell>
                      {props.parameter === "clubs" ?
                      <TableCell align="right">{row.clubMembershipFee}</TableCell> : null
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Button />}
        label="View Details"
        onClick={handleView}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={() =>handleChangeDense()} />}
        label="Dense padding"
      />
      <FormControlLabel
      control={<Button />}
      onClick={() => router.router.navigate(`/${props.parameter}/new`)}
      label={`New ${props.parameter.substr(0, 4)}`}
      />
          </Box>
  );
}
export default withRouter(ResultsPage);
