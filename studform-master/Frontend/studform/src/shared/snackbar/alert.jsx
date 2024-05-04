import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

const Alert = React.forwardRef(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
    }
);

const SnackbarAlert = (props) => {
    const { alertOpen, alertClose, alertMsg, alertType } = props;

    return (
        <>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={alertClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={alertClose} severity={alertType} sx={{ width: "100%" }}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SnackbarAlert;