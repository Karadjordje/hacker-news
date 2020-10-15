import * as React from 'react';

const defaultProps = {
    viewBox: '0 0 80 80',
    pathClassName: 'st0',
};

/* eslint-disable */
export function SvgSpinnerAuto(props) {
    props = { ...defaultProps, ...props };
    const { pathClassName, ...svgProps } = props;

    return (
        <svg {...svgProps}>
            <path
                className={pathClassName}
                d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 40 40"
                    to="360 40 40"
                    dur="0.7s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    );
}
/* eslint-enable */
