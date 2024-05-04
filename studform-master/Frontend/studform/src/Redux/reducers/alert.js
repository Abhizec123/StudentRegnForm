import { alertSnackBar } from "../action-types/alert.type";

const initialState = {
    op: false,
    msg: "",
    alertType: "",
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case alertSnackBar.SET_ALERT_SNACKBAR:
            return {
                ...state,
                op: action.payload.open,
                msg: action.payload.msg,
                alertType: action.payload.alertType,
              };
        default:
            return state;
    }
};

export default alertReducer





