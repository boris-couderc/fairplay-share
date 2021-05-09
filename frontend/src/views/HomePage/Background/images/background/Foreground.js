import React from 'react'

const Foreground = ({ refProps }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1440"
            height="1100"
            viewBox="0 0 1440 1100"
            id="foreground"
            className="svg-foreground"
        >
            <linearGradient
                id="svg-foreground-gradient"
                x1="895.99"
                x2="895.99"
                y1="642"
                y2="1090.09"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#D27F4F"></stop>
                <stop offset="1" stopColor="#D27F4F" stopOpacity="0"></stop>
            </linearGradient>
            <g ref={refProps}>
                <path fill="url(#svg-foreground-gradient)" d="M1617,582v522H340c0,0,195.2-17.2,341.1-89.9s128.5-113.7,168.6-177
		c25.8-40.7,77.4-52.9,100-56.3c5.1-0.8,15.2-2.1,20.4-2.4c27.3-1.7,37.4-12.6,43.3-33.8l21.8-77.9c6.1-21.7,26.3-36.7,49.4-36.7
		h47.2c11,0,21.5-4.9,28.2-13.4l60.5-76.1c34.3-40.1,79.6-54.1,130.9-52.7C1472,487.8,1617,582,1617,582z"/>
            </g>
        </svg>
    )
}

export default Foreground
