import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all } from 'redux-saga/effects';
import stories, { rootSaga as storiesSaga } from './stories';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware,
];

const rootReducer = combineReducers({
    stories,
});

const composeEnhancers = composeWithDevTools({});

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares),
    ),
);

function* rootSaga() {
    yield all([
        storiesSaga(),
    ]);
}

sagaMiddleware.run(rootSaga);

export default store;
