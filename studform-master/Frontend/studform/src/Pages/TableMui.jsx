import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { editObject } from "../Redux/actions/action";
import { delObject } from "../Redux/actions/action";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { StudForm } from "./StudForm";
import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useEffect } from "react";

import SnackbarAlert from "../shared/snackbar/alert";
import { setAlertSnackBar } from "../Redux/actions/alert.action";

import Button from "@mui/material/Button";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4, //padding
  overflowY: "auto", // Enable vertical scrollbar
  maxHeight: "80vh", // Set a maximum height for the modal
};

export function TableMui() {
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.changetheState); //Redux State

  //for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const modalClose = () => {
    myState.objToEdit = undefined; //handling edit form
    setOpen(false);
  };

  //for snackbar-alert
  const { op, msg, alertType } = useSelector((state) => state.alert);

  //For calling API
  useEffect(() => {
    dispatch({ type: "GET_DATA" }); //first time display
  }, []);

  const columns = [
    /* { field: 'id', headerName: 'ID', width: 70 }, */
    { field: "FullName", headerName: "Full Name", width: 130 },
    { field: "Gender", headerName: "Gender", width: 130 },
    {
      field: "Age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    { field: "Email", headerName: "Email", width: 150 },
    {
      field: "edit",
      headerName: "Edit Action",
      width: 130,
      renderCell: (params) => (
        <button onClick={(e) => handleEdit(params.row, e)}>
          <EditIcon />
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete Action",
      width: 130,
      renderCell: (params) => (
        <button onClick={(e) => handleDelete(params.row, e)}>
          <DeleteForeverIcon />
        </button>
      ),
    },
  ];

  //to ADD new row
  function addEntry() {
    handleOpen();
  }

  //to EDIT row
  function handleEdit(data, event) {
    event.stopPropagation(); //to avoid selecting the row
    dispatch(editObject(data));
    handleOpen();
  }

  //to DELETE a single row
  function handleDelete(data, event) {
    event.stopPropagation(); //to avoid selecting the row
    if (window.confirm("Are you sure you want to delete this item?")) {
      const payload = { studentID: [data.studentID] };
      dispatch({
        type: "DELETE_ENTRY",
        payload: payload,
      });
      dispatch(
        setAlertSnackBar({
          open: true,
          msg: "Students deleted successfully",
          alertType: "success",
        })
      );
    }
  }

  //to DELETE MUTIPLE rows
  function deleteMultiple() {
    if (selectedID.length > 0) {
      if (window.confirm("Are you sure you want to delete these items?")) {
        const payload = { studentID: selectedID };
        dispatch({ type: "DELETE_ENTRY", payload: payload });
        dispatch(
          setAlertSnackBar({
            open: true,
            msg: "Students deleted successfully",
            alertType: "success",
          })
        );
        selectedID = [];
      }
    } else {
      dispatch(
        setAlertSnackBar({
          open: true,
          msg: "No rows selected",
          alertType: "warning",
        })
      );
    }
  }

  //to SORT the array before dispaying
  let studentArray;
  function sortDetails() {
    studentArray = myState.studArray;

    studentArray.sort(function (a, b) {
      return a.studentID - b.studentID;
    });

    //add an extra id field for this mui
    studentArray = studentArray.map((student) => ({
      ...student,
      id: student.studentID,
    }));
  }

  sortDetails(); //Sort the details before displaying
  const rows = studentArray; //rows to be DISPLAYED

  let selectedID = [];
  const onRowsSelectionHandler = (ids) => {
    selectedID = ids; //array of ids
  };

  return (
    <>
      <SnackbarAlert
        alertOpen={op}
        alertClose={() =>
          dispatch(
            setAlertSnackBar({
              open: false,
              msg: "",
              alertType: "",
            })
          )
        }
        alertMsg={msg}
        alertType={alertType}
      />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h5" component="p">
          STUDENT DETAILS
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
            width: "55%",
            margin: "auto",
            marginBottom: "10px",
          }}
        >
          <Button
            startIcon={<DeleteRoundedIcon />}
            variant="contained"
            id="delete"
            onClick={() => {
              deleteMultiple();
            }}
            sx={{
              backgroundColor: "red",
              "&: hover": {
                backgroundColor: "blue",
              },
            }}
          >
            DELETE MULTIPLE
          </Button>

          <Button
            startIcon={<AddCircleOutlineRoundedIcon />}
            variant="contained"
            id="addNewEntry"
            onClick={() => {
              addEntry();
            }}
            sx={{
              backgroundColor: "green",
              "&: hover": {
                backgroundColor: "black",
              },
            }}
          >
            ADD NEW ENTRY
          </Button>
        </div>

        <div style={{ height: "400px", width: "55%", margin: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          />
        </div>
      </div>

      {/* Popup for Edit/Add */}
      <div>
        <Modal
          open={open}
          onClose={modalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              aria-label="close"
              onClick={modalClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <StudForm closeModal={modalClose} />
          </Box>
        </Modal>
      </div>
    </>
  );
}
