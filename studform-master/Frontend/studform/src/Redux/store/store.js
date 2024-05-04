import rootReducer from "../reducers/index";
import {configureStore} from '@reduxjs/toolkit'

import reduxSaga from "../saga/reduxSaga";
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware=createSagaMiddleware()

const store=configureStore(
    {
        reducer:rootReducer,
        middleware:() => [sagaMiddleware]
    }
)

sagaMiddleware.run(reduxSaga)
export default store;