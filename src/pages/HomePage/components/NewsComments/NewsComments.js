import React from 'react';

export const NewsComments = ({ id, items, className }) => {
    const hackerNewsCommentsUrl = `https://news.ycombinator.com/item?id=${id}`;

    return (
        <a
            href={hackerNewsCommentsUrl}
            className={`${className}__comments`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {items && items.length ? `${items.length} comments` : 'discuss'}
        </a>
    );
};
