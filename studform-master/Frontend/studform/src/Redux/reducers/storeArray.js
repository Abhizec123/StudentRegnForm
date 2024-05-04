import { myTypes } from "../action-types/action.types";

const initialState = {
    count: 1,
    studArray: [],
    objToEdit: undefined,
}

const changetheState = (state = initialState, action) => {
    switch (action.type) {

        case myTypes.SET_DATA:

            return {
                ...state,
                count: action.payload.length+1,
                studArray: action.payload,
            }

        case myTypes.EDIT_DATA:

            state.objToEdit = action.payload
            return state

        default:
            return state;
    }
}

export default changetheState;