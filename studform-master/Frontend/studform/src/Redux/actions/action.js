import { myTypes } from "../action-types/action.types"

export const editObject = (data) => {
    return {
        type: myTypes.EDIT_DATA,
        payload: data
    }
}

export const setData = (data) => {
    return {
        type: myTypes.SET_DATA,
        payload: data
    }
}