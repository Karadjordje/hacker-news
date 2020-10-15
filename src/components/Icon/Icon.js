import * as React from 'react';
import cx from 'classnames';
import * as SvgIcons from './SvgComponents/index';
import './icon.scss';

const defaultProps = {
    icon: 'SvgSpinnerAuto',
};

const resolveSvgByType = (type) => {
    if (!SvgIcons[type]) {
        return null;
    }

    return SvgIcons[type];
};

export const Icon = (props) => {
    const mergedProps = { ...defaultProps, ...props };
    const {
        className, icon, svgProps, children, ...iconProps
    } = mergedProps;

    if (!icon) {
        return null;
    }

    const SvgIcon = resolveSvgByType(icon);
    if (!SvgIcon) {
        return null;
    }

    const formattedClassName = cx('icon', className);

    return (
        <i {...iconProps} className={formattedClassName}>
            <SvgIcon {...svgProps} />
            {children}
        </i>
    );
};
