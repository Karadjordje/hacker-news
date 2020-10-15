import { call, put } from 'redux-saga/effects';

function* request(url, [SUCCESS, FAILURE], options = {}) {
    try {
        const res = yield call(fetch, url, options);
        if (res.status === 200) {
            const payload = yield res.json();
            yield put({
                type: SUCCESS,
                payload,
            });
        }
    } catch (e) {
        yield put({
            type: FAILURE,
            error: e.message || e,
        });
    }
}

export default request;
