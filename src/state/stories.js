import { combineReducers } from 'redux';
import {
    takeEvery, put, select, all, actionChannel, fork, take, takeLatest, delay,
} from 'redux-saga/effects';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import ms from 'ms';
import request from '../utils/request';

const FETCH_STORIES = 'FETCH_STORIES';
const FETCH_STORIES_SUCCESS = 'FETCH_STORIES_SUCCESS';
const FETCH_STORIES_FAILURE = 'FETCH_STORIES_FAILURE';

const FETCH_STORY = 'FETCH_STORY';
const FETCH_STORY_SUCCESS = 'FETCH_STORY_SUCCESS';
const FETCH_STORY_FAILURE = 'FETCH_STORY_FAILURE';

const REFRESH = 'REFRESH';
const CHANGE_PAGE = 'CHANGE_PAGE';

export const ITEMS_PER_PAGE = 20;

// const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

export const fetchStoriesAction = () => ({
    type: FETCH_STORIES,
});

export const fetchStoryAction = (id) => ({
    type: FETCH_STORY,
    id,
});

export const refreshAction = () => ({
    type: REFRESH,
});

export const changePageAction = (payload) => ({
    type: CHANGE_PAGE,
    payload,
});

const listReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_STORIES_SUCCESS:
            return [
                ...action.payload,
            ];
        default:
            return state;
    }
};

const storyByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_STORIES_SUCCESS:
            return {
                ...state,
                ...action.payload.reduce((acc, id) => {
                    acc[id] = {
                        ...(state[id] || {
                            story: {},
                            loading: true,
                        }),
                    };
                    return acc;
                }, {}),
            };
        case FETCH_STORY_SUCCESS:
            return {
                ...state,
                [action.payload.id]: {
                    ...(state[action.payload.id] || {}),
                    loading: false,
                    error: null,
                    story: {
                        ...action.payload,
                    },
                },
            };
        default:
            return state;
    }
};

export const pageReducer = (state = 1, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    list: listReducer,
    storyById: storyByIdReducer,
    page: pageReducer,
});

export function* rootSaga() {
    yield all([
        takeEvery([FETCH_STORIES, REFRESH], fetchStories),
        fetchStoriesQueue(),
        takeLatest(FETCH_STORIES, refreshLoop),
        takeLatest([FETCH_STORIES_SUCCESS, CHANGE_PAGE], fetchCurrentStories),
    ]);
}

function* fetchStories() {
    yield request('https://hacker-news.firebaseio.com/v0/topstories.json', [FETCH_STORIES_SUCCESS, FETCH_STORIES_FAILURE]);
}

function* fetchStory(chan) {
    while (true) {
        const { id } = yield take(chan);
        yield request(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, [FETCH_STORY_SUCCESS, FETCH_STORY_FAILURE]);
    }
}

function* refreshLoop() {
    yield delay(ms('30s'));
    yield put(fetchStoriesAction());
}

function* fetchCurrentStories() {
    const { page, list } = yield select(({ stories }) => stories);
    const start = ITEMS_PER_PAGE * (page - 1);
    const end = ITEMS_PER_PAGE * page;

    for (let i = start; i < end; i++) {
        yield put(fetchStoryAction(list[i]));
    }
}

function* fetchStoriesQueue() {
    const chan = yield actionChannel(FETCH_STORY);

    for (let i = 0; i < 3; i++) {
        yield fork(fetchStory, chan);
    }
}

export const useFetchStories = () => {
    const dispatch = useDispatch();
    return useCallback(
        () => {
            dispatch(fetchStoriesAction());
        },
        [dispatch],
    );
};

export const useRefresh = () => {
    const dispatch = useDispatch();
    return useCallback(
        () => {
            dispatch(refreshAction());
        },
        [dispatch],
    );
};

export const useChangePage = (nextPage) => {
    const dispatch = useDispatch();
    return useCallback(
        () => {
            dispatch(changePageAction(nextPage));
        },
        [dispatch, nextPage],
    );
};
