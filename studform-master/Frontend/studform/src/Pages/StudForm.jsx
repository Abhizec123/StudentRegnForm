import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { delObject } from "../Redux/actions/action"
import { validateEmptyString, validateEmail, validateDOB } from "../validation"
import { setAlertSnackBar } from "../Redux/actions/alert.action"

export function StudForm(props) {

    const dispatch = useDispatch()
    const myState = useSelector((state) => state.changetheState) //Redux State

    //Hooks - useState
    let [state, setstate] = useState({
        GN: "",
        FirstName: "",
        LastName: "",
        MiddleName: "",
        Dob: "",
        PhoneNumber: "",
        Address: "",
        Email: "",
        Gender: "",
        Course: ""
    })

    let [editState, editSetState] = useState({})

    const handleInput = (e) => {
        setstate({ ...state, [e.target.id]: e.target.value })
        editSetState({ ...editState, [e.target.id]: e.target.value })
    }

    function concatName(firstName, middleName, lastName) {
        let fullname = middleName ? [firstName, middleName, lastName].join(" ") : [firstName, lastName].join(" ")
        fullname = fullname.trim()
        return fullname;
    }

    function calculateAge(b) {
        let curdate = new Date()
        let studdate = new Date(b)

        let dt = curdate.getDate()
        let mon = curdate.getMonth() + 1 //js counts month from 0 to 11
        let yr = curdate.getFullYear()

        let day2 = studdate.getDate()
        let mn2 = studdate.getMonth() + 1
        let yr2 = studdate.getFullYear()

        // finding age
        let age = yr - yr2
        if (mon < mn2 || (mon == mn2 && dt < day2))
            age--

        return age
    }

    function emailValidation(data) {
        return axios.post('http://localhost:4000/students/validate-email', { email : data })
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    function phoneValidation(data) {
        return axios.post('http://localhost:4000/students/validate-phone', { phoneNumber : data })
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    async function processDetails() {

        //Field Validation
        if (state && state.FirstName && state.LastName && state.Dob && state.PhoneNumber && state.Address && state.Email && state.Gender && state.Course) {

            //Empty String Validation Checking
            if (validateEmptyString([state.FirstName, state.LastName, state.PhoneNumber, state.Address, state.Gender, state.Course].join(";")) == false) {
                alert("Empty fields not allowed")
                return
            }

            //DOB Validation Checking
            if (validateDOB() == false) {
                alert("Invalid DOB")
                return
            }

            //Email Validation Checking  
            if (validateEmail() == false) {
                alert("Invalid Email")
                return
            }
        }
        else {
            dispatch(setAlertSnackBar({
                open: true,
                msg: "Please fill in all required fields.",
                alertType: "warning",
            }))
            return;
        }

        //EDIT OPERATION
        if (myState.objToEdit) {

            //Unique Email Validation
            if (myState.objToEdit.Email !== state.Email) {
                const val = await emailValidation(state.Email)

                if (val.exists === true) { // {exists: true/false}
                    alert("Email Already exists");
                    return;
                }
            }
            //unique Phone Number Validation
            if (myState.objToEdit.PhoneNumber !== state.PhoneNumber) {
                const val = await phoneValidation(state.PhoneNumber)

                if (val.exists === true) {
                    alert("Phone Number Already exists")
                    return
                }
            }

            if (editState.FirstName != undefined || editState.MiddleName != undefined || editState.LastName != undefined || editState.Dob != undefined) {
                let FirstName = editState.FirstName == undefined ? myState.objToEdit.FirstName : editState.FirstName
                let MiddleName = editState.MiddleName == undefined ? myState.objToEdit.MiddleName : editState.MiddleName
                let LastName = editState.LastName == undefined ? myState.objToEdit.LastName : editState.LastName
                let Dob = editState.Dob == undefined ? myState.objToEdit.Dob : editState.Dob

                dispatch({
                    type: 'EDIT_FORM', payload: ({
                        ...editState,
                        studentID: myState.objToEdit.studentID,
                        FirstName: FirstName,
                        MiddleName: MiddleName,
                        LastName: LastName,
                        FullName: concatName(FirstName.trim(), MiddleName.trim(), LastName.trim()),
                        Dob: Dob,
                        Age: calculateAge(Dob)
                    })
                })
            }
            else if (editState.PhoneNumber != undefined || editState.Address != undefined || editState.Email != undefined || editState.Gender != undefined || editState.Course != undefined) {
                dispatch({
                    type: 'EDIT_FORM', payload: ({
                        ...editState,
                        studentID: myState.objToEdit.studentID
                    })
                })
            }

            // If all required fields are filled and valid, save data
            dispatch(setAlertSnackBar({
                open: true,
                msg: "Data saved successfully!",
                alertType: "success",
            }))
            document.getElementById("studentForm").reset(); //Reset Form
            myState.objToEdit = undefined //to avoid showing details on adding new entry
            props.closeModal() //Using Props for accessing the close() to close the modal
        }
        else {
            //Unique Email Validation
            if (state.Email) {
                const val = await emailValidation(state.Email)

                if (val.exists === true) { //{exists: true/false}
                    alert("Email Already exists");
                    return;
                }
            }
            //unique Phone Number Validation
            if (state.PhoneNumber) {
                const val = await phoneValidation(state.PhoneNumber)

                if (val.exists === true) {
                    alert("Phone Number Already exists")
                    return
                }
            } 

            let MiddleName = state.MiddleName ? state.MiddleName : ""; //Entering Middle Name seperately (using let for useState)

            //send state to storeData() -> backend
            dispatch({
                type: 'ADD_DATA', payload: ({
                    ...state,
                    FullName: concatName(state.FirstName.trim(), MiddleName.trim(), state.LastName.trim()),
                    Age: calculateAge(state.Dob),
                    MiddleName: MiddleName
                })
            })

             //If all required fields are filled and valid, save data
             dispatch(setAlertSnackBar({
                open: true,
                msg: "Data saved successfully!",
                alertType: "success",
            }))
            document.getElementById("studentForm").reset(); //Reset Form
            props.closeModal() //Using Props for accessing the close() to close the modal
        }
    }

    function fillDetails() {

        let studDetObj = myState.objToEdit
        state = studDetObj

        if (studDetObj) {
            document.getElementById("studentID").innerHTML = studDetObj.studentID;
            document.getElementById('Address').value = studDetObj.Address;
            document.getElementById("Course").value = studDetObj.Course;
            document.getElementById("PhoneNumber").value = studDetObj.PhoneNumber;
            document.getElementById("Email").value = studDetObj.Email;
            document.getElementById('Gender').value = studDetObj.Gender;

            document.getElementById('FirstName').value = studDetObj.FirstName;
            document.getElementById('MiddleName').value = studDetObj.MiddleName;
            document.getElementById('LastName').value = studDetObj.LastName;
            document.getElementById('Dob').value = studDetObj.Dob;
        }
    }

    useEffect(() => {
        // This code will run after the component has rendered
        fillDetails();
    }, []);

    return (
        <>
            <h2>Student Registration Form</h2>
            <br />

            {/* Student ID */}
            {myState.objToEdit && (
                <div>
                    <label htmlFor="studentID">Student ID: </label>
                    <label id="studentID">{myState.id}</label>
                    <br /><br />
                </div>
            )}

            <form id="studentForm">

                {/* <!-- First Name --> */}
                <label htmlFor="FirstName">First Name*: </label>
                <input type="text" id="FirstName" value={state.FN} onChange={handleInput} required />
                <br /><br />

                {/* <!-- Middle Name --> */}
                <label htmlFor="MiddleName">Middle Name: </label>
                <input type="text" id="MiddleName" value={state.MN} onChange={handleInput} />
                <br /><br />

                {/* <!-- Last Name --> */}
                <label htmlFor="LastName">Last Name*: </label>
                <input type="text" id="LastName" value={state.LN} onChange={handleInput} required />
                <br /><br />

                {/* <!-- Date of Birth --> */}
                <label htmlFor="DOB">Date of Birth*: </label>
                <input type="date" id="Dob" value={state.DB} onChange={handleInput} required />
                <br /><br />

                {/* <!-- Phone Number --> */}
                <label htmlFor="PhoneNumber">Phone Number*: </label>
                <input type="number" id="PhoneNumber" value={state.PN} onChange={handleInput} required />
                <br /><br />

                {/* <!-- Address --> */}
                <label htmlFor="Address">Address*: </label>
                <textarea id="Address" rows="4" cols="50" value={state.AD} onChange={handleInput}></textarea>
                <br /><br />

                {/* <!-- Email --> */}
                <label htmlFor="Email">Email*: </label>
                <input type="email" id="Email" value={state.EM} onChange={handleInput} required />
                <br /><br />

                {/* <!-- Gender --> */}
                <label htmlFor="gender">Gender*: </label>
                <select id="Gender" value={state.GN} onChange={handleInput}>
                    <option value="" disabled>Select Your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <br /><br />

                {/* <!-- Course --> */}
                <label>Course*: </label>
                <input type="text" id="Course" required value={state.CO} onChange={handleInput} />
                <br /><br />

                {/* <!-- Save Button --> */}
                <button type="button" id="save" onClick={() => {
                    processDetails()
                }}>SAVE</button>

            </form>
        </>
    )
}