import React from 'react';
import sanitaze from 'sanitize-html';
import { useSelector } from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { getDomainName } from '../../../../utils/utilities';
import { NewsComments } from '../NewsComments';
import { NewsItemFakeContent } from './NewsItemFakeContent';
import './news-item.scss';

export const NewsItem = ({ id, newsNumber }) => {
    const baseClass = 'news-item';
    const hackerNewsUrl = 'https://news.ycombinator.com';
    const state = useSelector(({ stories }) => stories.storyById[id] || {});

    const { story } = state;
    const loading = state.loading || !story;

    if (state.error) {
        return state.error;
    }

    if (loading) {
        return (
            <NewsItemFakeContent />
        );
    }

    return (
        <div className="news-item">
            <span className="news-item__number">
                {newsNumber + 1}.
            </span>
            <div className="news-item__data">
                <h1 className="news-item__title">
                    {loading ? <div className="fake-content" /> : <>
                        <a
                            className="news-item__title__link"
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {sanitaze(story.title)} {' '}
                        </a>
                        {story.url && <span className="news-item__title__source">({getDomainName(story.url)})</span>}
                    </>}
                </h1>
                <div className="news-item__info">
                    {loading ? <div className="fake-content" /> : <>
                        <span className="news-item__info__text">
                            {story.score} points {' '}
                        </span>
                        <span className="news-item__info__text">
                            <span className="news-item__info__text news-item__info__text--gray">
                            by {' '}
                            </span>
                            <a
                                className="news-item__info__link"
                                href={`${hackerNewsUrl}/user?id=${story.by}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {story.by} {' '}
                            </a>
                        </span>
                        <span className="news-item__info__text news-item__info__text--gray">
                            {formatDistanceToNow(new Date(story.time * 1000))} | { }
                        </span>
                        <NewsComments className={baseClass} id={id} items={story.kids} />
                    </>}
                </div>
            </div>
        </div>
    );
};
