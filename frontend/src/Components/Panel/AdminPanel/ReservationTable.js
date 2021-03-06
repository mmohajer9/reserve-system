/* eslint-disable no-unused-vars */
import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  jssPreset,
  StylesProvider
} from "@material-ui/core/styles";
import rtl from "jss-rtl";
import { create } from "jss";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import moment from "jalali-moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import FloatingAddButton from "./FloatingAddButton";

import AdminPanelDeleteDateTimeSlotDialog from "./AdminPanelDeleteDateTimeSlotDialog";
import AdminPanelEditDateTimeSlotDialog from "./AdminPanelEditDateTimeSlotDialog";
import AdminPanelAddDateTimeSlotDialog from "./AdminPanelAddDateTimeSlotDialog";
import { setSelectedDateTimeSlot, setSelectedReservation, setReservations } from "../../../Actions";
import DeleteReservationDialog from "./DeleteReservationDialog";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

//*--------------------------------------------------------------------

const columns = [
  { id: "id", label: "انتخاب ها", minWidth: 100, align: "center" },
  { id: "date", label: "تاریخ", minWidth: 100, align: "center" },
  { id: "place", label: "مکان", minWidth: 100, align: "center" },
  {
    id: "begin_time",
    label: "زمان شروع",
    minWidth: 170,
    align: "center",
    format: value => value.toFixed(2)
  },
  {
    id: "end_time",
    label: "زمان پایان",
    minWidth: 170,
    align: "center",
    format: value => value.toLocaleString()
  },

  {
    id: "description",
    label: "توضیحات",
    minWidth: 100,
    align: "center",
    format: value => value.toLocaleString()
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    fontFamily: "Vazir"
  },
  container: {
    maxHeight: 500,
    fontFamily: "Vazir"
  }
});

function StickyHeadTable(props) {
  const rows = props.rows;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontFamily: "Vazir" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    style={{ fontFamily: "Vazir" }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell style={{ fontFamily: "Vazir" }} align="center">
                      <IconButton
                        onClick={e => {
                          props.dispatch(setSelectedReservation(row));
                          props.open_delete_dialog();
                        }}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ fontFamily: "Vazir" }} align="center">
                      {moment(row.date, "YYYY/MM/DD")
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </TableCell>
                    <TableCell style={{ fontFamily: "Vazir" }} align="center">
                        {row.place}
                    </TableCell>
                    <TableCell style={{ fontFamily: "Vazir" }} align="center">
                      {row.begin_time}
                    </TableCell>
                    <TableCell style={{ fontFamily: "Vazir" }} align="center">
                      {row.end_time}
                    </TableCell>
                    <TableCell style={{ fontFamily: "Vazir" }} align="center">
                      {row.description}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="تعداد سطر ها"
        labelDisplayedRows={e => {}}
      />
    </Paper>
  );
}

class ReservationTable extends React.Component {
  state = {
    delete_dialog_is_open: false
  };

  open_delete_dialog = e => {
    this.setState({
      delete_dialog_is_open: true
    });
  };
  close_delete_dialog = e => {
    this.setState({
      delete_dialog_is_open: false
    });
  };

  render() {
    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            {this.state.delete_dialog_is_open ? (
              <DeleteReservationDialog
                close_delete_dialog={this.close_delete_dialog}
              />
            ) : null}

            <StickyHeadTable
              open_delete_dialog={this.open_delete_dialog}
              rows={this.props.reservations}
              dispatch={this.props.dispatch}
            />
          </div>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ReservationTable);
