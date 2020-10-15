import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { HomePageContainer } from './pages/HomePage/HomePageContainer';

export default function HackerNews() {
    return (
        <Provider store={store}>
            <HomePageContainer />
        </Provider>
    );
}
