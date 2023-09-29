import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/task";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button} from '@mui/material';
// import {withStyles} from "@mui/styles"
// import {EditIcon, DeleteIcon} from "@mui/icons-material";
import { withStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { useToasts } from "react-toast-notifications";
import UpdateTask from "./UpdateTask";
import { StylesProvider } from '@mui/styles';
import moment from 'moment';
// import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem"
    }
  },
  paper: {
    margin: 50,
    padding: 30,
  }
});

const ViewTask = ({ classes, taskList, fetchAllTask, deleteTask }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    fetchAllTask();
  }, [fetchAllTask]);

  const getUserToken = async () => {
    const userToken = await localStorage.getItem('token');
    console.log("USER Token", userToken);
  }

  useEffect(() => {
    getUserToken()
  }, [])
  //toast msg.
  const { addToast } = useToasts();

  const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?'))
      deleteTask(id, () => addToast("Deleted successfully", { appearance: 'info' }));
  };

  return (
    <div>
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item xs={6}>
            <UpdateTask currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={6}>
            <TableContainer>
              <Table>
                <TableHead className={classes.root}>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>DueDate</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taskList.map((record, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{record.title}</TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>{record.isCompleted ? 'Done' : 'Pending'}</TableCell>
                      {/* <TableCell>{record.dueDate}</TableCell> */}
                      <TableCell>{record.dueDate ? moment(record.dueDate).format('YYYY-MM-DD') : ''}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }} />
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => onDelete(record.id)} />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  taskList: state.task.list
});

const mapActionToProps = {
  fetchAllTask: actions.fetchAll,  
  deleteTask: actions.Delete
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ViewTask));
