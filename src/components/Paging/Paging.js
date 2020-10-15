import React from 'react';
import { useSelector } from 'react-redux';
import './paging.scss';
import { useChangePage, ITEMS_PER_PAGE } from '../../state/stories';

export const Paging = () => {
    const { allStories } = useSelector(({ stories }) => ({
        allStories: stories.list,
    }));
    const page = useSelector(({ stories }) => stories.page);
    const next = useChangePage(page + 1);
    const prev = useChangePage(page - 1);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const lastPage = allStories.length / ITEMS_PER_PAGE;

    return (
        <div className="paging">
            {page !== 1 && <button className="paging__btn" onClick={() => { prev(); scrollToTop(); }}>
                Prev
            </button>}
            {(page !== 1 && page !== lastPage) && ' | '}
            {page !== lastPage && <button className="paging__btn" onClick={() => { next(); scrollToTop(); }}>
                More
            </button>}
        </div>
    );
};
