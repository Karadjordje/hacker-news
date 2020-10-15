import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchStories, ITEMS_PER_PAGE } from '../../../../state/stories';
import { NewsItem } from '../NewsItem';
import { Paging } from '../../../../components/Paging';
import { Icon } from '../../../../components/Icon';
import './news-list.scss';

export const NewsList = () => {
    const { allStories, page } = useSelector(({ stories }) => ({
        allStories: stories.list,
        page: stories.page,
    }));
    const fetchStories = useFetchStories();

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    if (!allStories || !allStories.length) {
        return <p className="news-list__spinner"><Icon icon={'SvgSpinnerAuto'} /></p>;
    }

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = page * ITEMS_PER_PAGE;
    return (
        <div className="news-list">
            {allStories.slice(start, end).map((id, i) => (
                <NewsItem id={id} key={id} newsNumber={start + i} />
            ))}
            <Paging />
        </div>
    );
};
