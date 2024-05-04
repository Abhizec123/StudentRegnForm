import { alertSnackBar } from "../action-types/alert.type";

export const setAlertSnackBar = (payload) => {
  return {
    type: alertSnackBar.SET_ALERT_SNACKBAR,
    payload: payload,
  };
};
