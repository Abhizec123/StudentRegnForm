import axios from "axios"
import { call, put, takeEvery, fork, take } from 'redux-saga/effects'
import { setData } from "../actions/action";
import { setAlertSnackBar } from "../actions/alert.action";
import { useDispatch } from "react-redux";

// getting Student Details
async function getDetails() {
    try {
        const res = await axios.get('http://localhost:4000/students');
        return res.data; 
    } catch (error) {
        throw new Error('Error fetching data'); // Throw an error if the request fails
    }
}
function* getData() {
    try {
        const response = yield call(getDetails)
        const jsonData = response.data
        yield put(setData(jsonData))

    } catch (error) {
        alert("Error fetching data...")
    }
}

// adding StudDetails
function sendDetails(data) {
    return axios.post('http://localhost:4000/students/add-students', data)
        .then(res => res.data)
        .catch(err => console.log(err))
}
function* addData(action) {
    try {
        const response = yield call(sendDetails, action.payload);
        if (response.status == 'success') {
            yield getData() //retrieve data after every addition of data entry
        }
    } catch (error) {
        const errorMessage = error.message || "Error connecting to server..."; // Get the error message
        yield put(setAlertSnackBar({ // Dispatch the action to set the snackbar alert
            open: true,
            msg: errorMessage,
            alertType: "warning",
        }));
    }
}

// to edit StudDetails in Backend
function editDetails(data) {
    return axios.post('http://localhost:4000/students/edit-students', data)
        .then(res => res.data)
        .catch(err => console.log(err))
}
function* editData(action) {
    try {
        //console.log("DATA",action.payload)
        const response = yield call(editDetails, action.payload)
        if (response.message == 'Student updated successfully') {
            yield getData() //retrieve data after editing data 
        }
    } catch (error) {
        const errorMessage = error.message || "Error connecting to server..."; 
        yield put(setAlertSnackBar({ 
            open: true,
            msg: errorMessage,
            alertType: "warning",
        }));
    }
}

// to delete an Entry in Backend
function deleteDetails(data) {
    return axios.post('http://localhost:4000/students/delete-students', data)
        .then(res => res.data)
        .catch(err => console.log(err))
}
function* deleteData(action) {
    try {
        const response = yield call(deleteDetails, action.payload)
        if (response.message == 'Students deleted successfully') {
            yield getData() //retrieve data after editing data
        }
    } catch (error) {
        const errorMessage = error.message || "Error connecting to server..."; 
        yield put(setAlertSnackBar({ 
            open: true,
            msg: errorMessage,
            alertType: "warning",
        }));
    }
}

function* reduxSaga() {
    yield takeEvery('GET_DATA', getData)
    yield takeEvery('ADD_DATA', addData)
    yield takeEvery('EDIT_FORM', editData)
    yield takeEvery('DELETE_ENTRY', deleteData)
}

export default reduxSaga;