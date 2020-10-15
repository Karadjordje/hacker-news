import React from 'react';
import Refresh from '../../assets/images/refresh.svg';
import { useRefresh } from '../../state/stories';
import './header.scss';

export const Header = () => {
    const refresh = useRefresh();

    const handleClick = () => {
        refresh();
    };

    return (
        <header className="header">
            <h1 className="header__title">HackerNews</h1>
            <button className="header__btn" onClick={handleClick}>
                <img className="header__btn__icon" src={Refresh} alt="Refresh icon"/>
            </button>
        </header>
    );
};
